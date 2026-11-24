// An artificial update exercises the real candidate path without publishing it.
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';import {spawnSync} from 'node:child_process';
import {analyzeEntry,fingerprint,equivalent,sha} from './analyze.mjs';
import {replaceNodes} from './prepare.mjs';
import {compatibilityRecord} from './metadata.mjs';
import {clientProfiles,prepareClient,profileFromMetadata,selectEntry} from '../extension/client/loader.mjs';
const root=fileURLToPath(new URL('../../',import.meta.url)),out=path.join(root,'public/automation/out');
const actual=JSON.parse(fs.readFileSync(path.join(out,'report.json')));
const baseline=JSON.parse(fs.readFileSync(path.join(root,'public/automation/baseline.json')));
let profile=clientProfiles[0];
if(actual.status==='compatibility'){
 const current=JSON.parse(fs.readFileSync(path.join(out,'compatibility.json')));
 profile=profileFromMetadata(current,actual.entryURL,actual.entryHash);
}
const source=fs.readFileSync(path.join(out,'research',new URL(profile.entryURL).pathname.split('/').at(-1)),'utf8');
const original=fingerprint(source,profile.entryURL,baseline.assets);
const analysis=analyzeEntry(source,profile.entryURL,baseline.assets),top=analysis.manager.scopes.find(s=>s.type==='module');
const names=[profile.boot.split('(')[0],profile.names.pAe,profile.names.Rke],edits=new Map();
for(const [index,name]of names.entries()){
 const variable=top.variables.find(v=>v.name===name);assert.ok(variable);
 for(const n of [...variable.identifiers,...variable.references.map(r=>r.identifier)])edits.set(n.start,{...n,value:'__compatibilitySelfTest'+index});
}
const changed=replaceNodes(source,[...edits.values()])+'\n// compatibility self-test only\n';
const url='https://speakirpg.overture.io.kr/assets/index-compatibilitySelfTest.js';
const next=fingerprint(changed,url,baseline.assets);assert.ok(equivalent(baseline,next),'Pure renaming should pass');
assert.ok(!equivalent(baseline,fingerprint(changed.replace(/\b128\b/,'129'),url,baseline.assets)),'Constant change must stop');
const record=await compatibilityRecord(changed,original,next,profile);
assert.equal(selectEntry([{src:'https://example.com/assets/index-bad.js'},{src:url}]),url);
assert.equal(selectEntry([{src:profile.entryURL},{src:url}]),null);
assert.equal((await prepareClient(changed,url,()=>record)).profile,'registry');
for(const bad of [null,{...record,entryURL:profile.entryURL},{...record,hash:'a'.repeat(64)},
 {...record,imports:record.imports+1},{...record,symbols:{...record.symbols,boot:'console'}},
 {...record,symbols:{...record.symbols,boot:'a();alert(1);'}}]){
 const fallback=await prepareClient(changed,url,()=>bad);
 assert.equal(fallback.reviewed,false);
 assert.equal(fallback.code,(await prepareClient(changed,url)).code);
}
const temporary=fs.mkdtempSync(path.join(out,'selftest-'));
fs.cpSync(path.join(out,'research'),path.join(temporary,'research'),{recursive:true});
fs.writeFileSync(path.join(temporary,'research/index-compatibilitySelfTest.js'),changed);
fs.writeFileSync(path.join(temporary,'research/snapshot.json'),JSON.stringify(next));
const encoded=JSON.stringify(record,null,2)+'\n';
fs.writeFileSync(path.join(temporary,'compatibility.json'),encoded);
fs.writeFileSync(path.join(temporary,'report.json'),JSON.stringify({schema:1,status:'compatibility',scope:'full',baseVersion:baseline.reviewedVersion,baseHash:baseline.entrySHA256,entryURL:url,entryHash:next.entrySHA256,recordSHA256:sha(encoded)}));
const run=spawnSync(process.execPath,[path.join(root,'public/automation/validate.mjs')],{encoding:'utf8',timeout:120000,env:{...process.env,SPEAKI_AUTOMATION_OUT:temporary}});
assert.equal(run.status,0,run.stderr+'\n'+run.stdout);
assert.equal(JSON.parse(fs.readFileSync(path.join(temporary,'report.json'))).validated,true);
console.log('Artificial rename: the installed loader accepted the record and passed nine regression suites. Invalid records and constant change rejected.');
