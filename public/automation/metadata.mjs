import fs from 'node:fs';
import assert from 'node:assert/strict';
import {analyze} from 'eslint-scope';
import {parseJS,sha} from './analyze.mjs';
import {replaceNodes,updateLoader} from './prepare.mjs';
import {clientProfiles,prepareClient,profileFromMetadata} from '../extension/client/loader.mjs';
export function symbolsFor(profile){
  const scope=analyze(parseJS(profile.bindings),{ecmaVersion:2025,sourceType:'module'});
  const references=scope.globalScope.through.map(ref=>ref.identifier);
  const occludes=profile.bindings.match(/occludesBlock:([$\w]+)/)?.[1];
  const translate=profile.bindings.match(/translate:([$\w]+)/)?.[1];
  assert.ok(occludes&&translate);
  const symbols={...profile.names,occludesBlock:occludes,translate,boot:profile.boot.split('(')[0]};
  const names=Object.keys(symbols);
  const byIdentifier=new Map(names.map((role,i)=>[symbols[role],i]));
  assert.equal(byIdentifier.size,names.length);
  const edits=references.filter(n=>!['console','globalThis'].includes(n.name)).map(n=>{
    assert.ok(byIdentifier.has(n.name),'Missing reviewed role for '+n.name);
    return {...n,value:'__MINING_SYMBOL_'+byIdentifier.get(n.name)+'__'};
  });
  return {symbols,template:replaceNodes(profile.bindings,edits),locals:[...new Set(scope.scopes.flatMap(s=>s.variables.map(v=>v.name)))]};
}
export async function compatibilityRecord(source, before, after, profile=clientProfiles[0]){
  const loader=fs.readFileSync(new URL('../extension/client/loader.mjs',import.meta.url),'utf8');
  const mapped=updateLoader(loader,profile,before,after).profile;
  return encodeRecord(source,mapped);
}

// This also accepts a separately reviewed profile when the maintainer has checked
// the affected native interfaces and the installed binding template still applies.
export async function encodeRecord(source, profile){
  const {entryURL,hash,imports}=profile;
  assert.equal(sha(source),hash);
  const record={schema:1,entryURL,hash,imports,symbols:symbolsFor(profile).symbols};
  const restored=profileFromMetadata(record,entryURL,hash);
  assert.ok(restored,'Installed loader rejected the compatibility record');
  for(const property of ['boot','bindings','names','avatarSchema'])assert.deepEqual(restored[property],profile[property]);
  const prepared=await prepareClient(source,entryURL,()=>record);
  assert.ok(prepared.reviewed);
  parseJS(prepared.code);
  return record;
}
if(process.argv[2]==='install-template'){
  const path='public/extension/client/loader.mjs',source=fs.readFileSync(path,'utf8');
  const {symbols,template,locals}=symbolsFor(clientProfiles[0]);
  const marker='const gameEntryPattern=';
  assert.equal(source.split(marker).length,2);
  fs.writeFileSync(path,source.replace(marker,()=>
    'const compatibilitySymbols='+JSON.stringify(Object.keys(symbols))+';\n'+
    'const compatibilityLocalNames='+JSON.stringify(locals)+';\n'+
    'const compatibilityBindings='+JSON.stringify(template)+';\n'+marker));
}
