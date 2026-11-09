import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {analyze as scopes} from 'eslint-scope';
import {parseJS,sha} from './analyze.mjs';
export function replaceNodes(source,edits){
  const sorted=edits.sort((a,b)=>b.start-a.start);let last=source.length;
  for(const edit of sorted){assert.ok(edit.end<=last);source=source.slice(0,edit.start)+edit.value+source.slice(edit.end);last=edit.start;}return source;
}
export function remapBindings(source,before,after){
  const ast=parseJS(source),scope=scopes(ast,{ecmaVersion:2025,sourceType:'module'});
  const reverse=new Map(Object.entries(after.bindingIds).map(([name,id])=>[id,name])),edits=[];
  const localNames=new Set(scope.scopes.flatMap(s=>s.variables).map(v=>v.name));
  for(const ref of scope.globalScope.through){
    const ident=ref.identifier,id=before.bindingIds[ident.name];if(id===undefined)continue;
    const name=reverse.get(id);assert.ok(name,'Missing binding '+ident.name);
    assert.ok(!localNames.has(name),'Native rename would be captured by an injected local: '+name);
    edits.push({...ident,value:name});
  }return replaceNodes(source,edits);
}
export function updateLoader(source,profile,before,after){
  const reverse=new Map(Object.entries(after.bindingIds).map(([name,id])=>[id,name]));
  const mapped=name=>{const value=reverse.get(before.bindingIds[name]);assert.ok(value,'Missing reviewed binding '+name);return value;};
  const updatedBindings=remapBindings(profile.bindings,before,after);
  const bootName=profile.boot.match(/^([$\w]+)\(\)\.catch\($/)?.[1];assert.ok(bootName);
  const boot=mapped(bootName)+'().catch(';
  const current={...profile,entryURL:after.entryURL,hash:after.entrySHA256,boot,bindings:updatedBindings,
    names:Object.fromEntries(Object.entries(profile.names).map(([role,name])=>[role,mapped(name)]))};
  const edits=[];const ast=parseJS(source);
  for(const statement of ast.body){
    const declaration=statement.type==='ExportNamedDeclaration'?statement.declaration:statement;
    for(const item of declaration?.declarations||[]){
      const values={entryURL:current.entryURL,reviewedHash:current.hash,currentNames:current.names,bindings:current.bindings};
      if(Object.hasOwn(values,item.id.name))edits.push({...item.init,value:JSON.stringify(values[item.id.name])});
      if(item.id.name==='clientProfiles'){
        const first=item.init.arguments[0].elements[0];
        // Preserve all prior reviewed profiles verbatim for cached old clients.
        edits.push({...first,value:'Object.freeze('+JSON.stringify(current)+'),\n  Object.freeze('+JSON.stringify({...profile,id:'reviewed-'+profile.hash.slice(0,12)})+')'});
      }
    }
  }
  assert.equal(edits.length,5);return {source:replaceNodes(source,edits),profile:current};
}
export function updateReadme(text,oldVersion,newVersion){
  const oldName=`Speaki_rpg_mine_patch-${oldVersion}.zip`,oldLink=`https://github.com/Lupe-hazukino/speaki_rpg_mine_patch/releases/tag/v${oldVersion}`;
  assert.equal(text.split(oldName).length,2,'Expected one latest ZIP filename');
  assert.equal(text.split(oldLink).length,2,'Expected one latest download link');
  return text.replace(oldName,`Speaki_rpg_mine_patch-${newVersion}.zip`).replace(oldLink,oldLink.replace('/v'+oldVersion,'/v'+newVersion));
}
export function makeCandidate(repo,out,before,after,profile){
  const extension=path.join(repo,'public/extension'),destination=path.join(out,'public/extension');fs.mkdirSync(destination,{recursive:true});
  fs.cpSync(extension,destination,{recursive:true,filter:file=>!path.relative(extension,file).split(path.sep).includes('_metadata')});
  const manifest=JSON.parse(fs.readFileSync(path.join(destination,'manifest.json'))),old=manifest.version;
  assert.match(old,/^\d+\.\d+\.\d+$/);const parts=old.split('.').map(Number);parts[2]++;assert.ok(parts.every(n=>n<65536));const version=parts.join('.');
  manifest.version=version;fs.writeFileSync(path.join(destination,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
  for(const [name,from,to]of [['main.js',`version:"${old}"`,`version:"${version}"`],['README.txt',` ${old} `,` ${version} `]]){
    const file=path.join(destination,name),text=fs.readFileSync(file,'utf8');assert.equal(text.split(from).length,2);fs.writeFileSync(file,text.replace(from,to));
  }
  const loader=path.join(destination,'client/loader.mjs'),updated=updateLoader(fs.readFileSync(loader,'utf8'),profile,before,after);
  fs.writeFileSync(loader,updated.source);
  const rulesFile=path.join(destination,'rules.json'),rules=JSON.parse(fs.readFileSync(rulesFile));
  if(!rules.some(rule=>rule.condition.urlFilter==='|'+after.entryURL+'|'))rules.unshift({...rules[0],condition:{...rules[0].condition,urlFilter:'|'+after.entryURL+'|'}});
  rules.forEach((rule,i)=>rule.id=i+1);fs.writeFileSync(rulesFile,JSON.stringify(rules,null,2));
  fs.mkdirSync(path.join(out,'public/automation'),{recursive:true});
  const baseline={schema:1,reviewedVersion:version,...after};fs.writeFileSync(path.join(out,'public/automation/baseline.json'),JSON.stringify(baseline,null,2)+'\n');
  fs.writeFileSync(path.join(out,'README.md'),updateReadme(fs.readFileSync(path.join(repo,'README.md'),'utf8'),old,version));
  return {version,oldVersion:old,profile:updated.profile};
}
