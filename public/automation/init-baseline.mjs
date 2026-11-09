// Maintainer-only command. Scheduled workflows NEVER call this to trust new code.
import fs from 'node:fs';
import {snapshot,get,findEntry} from './snapshot.mjs';
import {clientProfiles} from '../extension/client/loader.mjs';
const profile=clientProfiles[0],entry= findEntry(await get('https://speakirpg.overture.io.kr/',1024*1024));
if(entry!==profile.entryURL)throw Error('Live entry is not the manually reviewed profile');
const {result}=await snapshot(entry,'public/automation/out/research');
if(result.entrySHA256!==profile.hash)throw Error('Live bytes differ from reviewed hash');
const baseline={schema:1,reviewedVersion:JSON.parse(fs.readFileSync('public/extension/manifest.json')).version,...result};
fs.writeFileSync('public/automation/baseline.json',JSON.stringify(baseline,null,2)+'\n');
console.log(JSON.stringify({entry,dependencies:Object.keys(result.assets).length,normalizedSHA256:result.normalizedSHA256}));
