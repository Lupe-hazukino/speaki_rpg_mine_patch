// An artificial update exercises the real candidate path without publishing it.
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
import {fileURLToPath,pathToFileURL} from 'node:url';import {spawnSync} from 'node:child_process';
import {analyzeEntry,fingerprint,equivalent} from './analyze.mjs';
import {makeCandidate,replaceNodes} from './prepare.mjs';
const root=fileURLToPath(new URL('../../',import.meta.url)),out=path.join(root,'public/automation/out');
const actual=JSON.parse(fs.readFileSync(path.join(out,'report.json')));
const base=actual.status==='candidate'?path.join(out,'candidate'):root;
const baseline=JSON.parse(fs.readFileSync(path.join(base,'public/automation/baseline.json')));
const {clientProfiles}=await import(pathToFileURL(path.join(base,'public/extension/client/loader.mjs'))),profile=clientProfiles[0];
const source=fs.readFileSync(path.join(out,'research',new URL(profile.entryURL).pathname.split('/').at(-1)),'utf8');
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
const temporary=fs.mkdtempSync(path.join(out,'selftest-')),repo=path.join(temporary,'repo');fs.mkdirSync(path.join(repo,'public'),{recursive:true});
fs.cpSync(path.join(base,'public/extension'),path.join(repo,'public/extension'),{recursive:true});
fs.cpSync(path.join(root,'public/src'),path.join(repo,'public/src'),{recursive:true});
fs.mkdirSync(path.join(repo,'public/automation'),{recursive:true});
fs.writeFileSync(path.join(repo,'public/automation/baseline.json'),JSON.stringify(baseline));
// The repository README is user-maintained. Local workspace has a separate personal README.
const readme=fs.readFileSync(path.join(base,base===root&&!process.env.GITHUB_ACTIONS?'public/README.md':'README.md'),'utf8');
fs.writeFileSync(path.join(repo,'README.md'),readme);
const candidate=makeCandidate(repo,path.join(temporary,'candidate'),baseline,next,profile);
fs.cpSync(path.join(out,'research'),path.join(temporary,'research'),{recursive:true});
fs.writeFileSync(path.join(temporary,'research/index-compatibilitySelfTest.js'),changed);
fs.writeFileSync(path.join(temporary,'research/snapshot.json'),JSON.stringify(next));
fs.writeFileSync(path.join(temporary,'report.json'),JSON.stringify({schema:1,status:'candidate',scope:'full',version:candidate.version,baseVersion:baseline.reviewedVersion,baseHash:baseline.entrySHA256,entryURL:url,entryHash:next.entrySHA256}));
const run=spawnSync(process.execPath,[path.join(root,'public/automation/validate.mjs')],{encoding:'utf8',timeout:120000,env:{...process.env,SPEAKI_AUTOMATION_OUT:temporary}});
assert.equal(run.status,0,run.stderr+'\n'+run.stdout);
const packageTest=spawnSync(process.env.PYTHON||'python3',[path.join(root,'public/automation/verify-candidate-fixture.py'),repo,temporary],{encoding:'utf8',timeout:30000});
assert.equal(packageTest.status,0,packageTest.stderr+'\n'+packageTest.stdout);
console.log(packageTest.stdout.trim());
console.log('Artificial rename: candidate, bindings and six regression suites passed; constant change rejected. No publication.');
