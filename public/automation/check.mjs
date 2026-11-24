import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {equivalent,sha} from './analyze.mjs';
import {get,findEntry,snapshot} from './snapshot.mjs';
import {compatibilityRecord} from './metadata.mjs';
const root=fileURLToPath(new URL('../../',import.meta.url)),out=path.join(root,'public/automation/out');
fs.mkdirSync(out,{recursive:true});
const baseline=JSON.parse(fs.readFileSync(path.join(root,'public/automation/baseline.json')));
const {clientProfiles}=await import('../extension/client/loader.mjs');
const profile=clientProfiles[0];let report={schema:1,status:'error',checkedAt:new Date().toISOString(),baseEntry:baseline.entryURL,baseHash:baseline.entrySHA256,baseVersion:baseline.reviewedVersion};
try{
  if(profile.entryURL!==baseline.entryURL||profile.hash!==baseline.entrySHA256)throw Error('Baseline and extension disagree');
  const entryURL=findEntry(await get('https://speakirpg.overture.io.kr/',1024*1024));report.entryURL=entryURL;
  const force=process.argv.includes('--full');
  const filename=new URL(entryURL).pathname.split('/').at(-1);
  const registry=path.join(root,'compatibility/v1');
  const registered=!force&&fs.existsSync(registry)&&fs.readdirSync(registry).some(hash=>
    /^[a-f0-9]{64}$/.test(hash)&&fs.existsSync(path.join(registry,hash,filename+'.json')));
  const observationsPath=path.join(out,'observations.json');
  const observed=fs.existsSync(observationsPath)?JSON.parse(fs.readFileSync(observationsPath)).find(value=>value.entryURL===entryURL):null;
  if(entryURL===baseline.entryURL&&!force){report.status='unchanged';report.scope='entry-url';}
  else if(registered){report.status='registered';report.scope='entry-url';}
  else if(observed&&!force){Object.assign(report,observed,{status:'review',cached:true,reason:'この更新は既に確認待ちです。配布版を維持しています。'});}
  else {
    const {result}=await snapshot(entryURL,path.join(out,'research'));report.entryHash=result.entrySHA256;
    const existing=path.join(registry,result.entrySHA256,filename+'.json');
    if(fs.existsSync(existing)){
      const {prepareClient}=await import('../extension/client/loader.mjs');
      const source=fs.readFileSync(path.join(out,'research',filename),'utf8');
      const record=JSON.parse(fs.readFileSync(existing,'utf8'));
      if(!(await prepareClient(source,entryURL,()=>record)).reviewed)throw Error('Published compatibility record cannot load this client');
      report.status='registered';
    }else if(!equivalent(baseline,result)){
      report.status='review';report.reason='ゲームの処理、定数、プロパティ、依存モジュールに変更があります。自動公開を停止しました。';
      report.structureChanged=baseline.normalizedSHA256!==result.normalizedSHA256;
      report.changedDependencies=[...new Set([...Object.keys(baseline.assets),...Object.keys(result.assets)])].filter(url=>baseline.assets[url]?.sha256!==result.assets[url]?.sha256);
    }else if(result.entrySHA256===baseline.entrySHA256&&entryURL===baseline.entryURL){report.status='unchanged';report.scope='full';}
    else {
      const source=fs.readFileSync(path.join(out,'research',filename),'utf8');
      const record=await compatibilityRecord(source,baseline,result,profile);
      const encoded=JSON.stringify(record,null,2)+'\n';
      fs.writeFileSync(path.join(out,'compatibility.json'),encoded);
      Object.assign(report,{status:'compatibility',scope:'full',recordSHA256:sha(encoded)});
    }
  }
}catch(error){report.status='error';report.reason=String(error.message).slice(0,1500);}
fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2)+'\n');
if(process.env.GITHUB_OUTPUT)fs.appendFileSync(process.env.GITHUB_OUTPUT,`status=${report.status}\nfull=${report.scope==='full'}\n`);
if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,`### MOD compatibility\n\nStatus: **${report.status}**\n\n${report.reason||'Entry: '+report.entryURL}\n`);
console.log(JSON.stringify(report));if(report.status==='error')process.exitCode=1;
