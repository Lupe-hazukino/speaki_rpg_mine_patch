import fs from 'node:fs';import assert from 'node:assert/strict';
import {parseJS,analyzeEntry} from './analyze.mjs';
export function physicsFixture(source,profile,snapshot){
 const config=JSON.parse(fs.readFileSync(new URL('./physics.json',import.meta.url)));
 const analysis=analyzeEntry(source,profile.entryURL,snapshot.assets),ast=analysis.ast;
 assert.equal(analysis.normalizedSHA256,config.normalizedSHA256,'Physics extraction requires unchanged whole-entry structure');
 const top=new Map(ast.body.flatMap(n=>n.declarations||[]).map(n=>[n.id.name,n]));
 const math=ast.body.flatMap(n=>n.specifiers||[]).find(s=>s.imported?.name==='Pt').local.name;
 const reverse=new Map(Object.entries(analysis.bindingIds).map(([name,id])=>[id,name]));
 let code=`import {Pt as ${math}} from '../../../research/three.core-wy5OwqqC.js';\n`;
 for(const part of config.parts){
  if(part.kind==='statement'){const n=ast.body[part.index];code+=source.slice(n.start,n.end)+'\n';}
  else if(part.kind==='variables')code+='var '+part.selections.map(([i,j])=>{const n=ast.body[i].declarations[j];return source.slice(n.start,n.end)}).join(',')+';\n';
  else {const n=top.get(profile.names.pAe).init.body.body.find(n=>n.key.name==='stepPhysics').value;code+='const worldStep=function'+source.slice(n.start,n.end)+';\n';}
 }
 code+='export {'+Object.entries(config.exports).map(([alias,id])=>(id==='worldStep'?'worldStep':reverse.get(id))+' as '+alias).join(',')+'};';
 parseJS(code);return code;
}
