// Strict gate: only lexical renaming/formatting in the entry is automatic.
// Dependencies must remain byte-identical. Never execute downloaded code here.
import {parse} from 'acorn';
import {analyze as scopes} from 'eslint-scope';
import {createHash} from 'node:crypto';
export const ORIGIN='https://speakirpg.overture.io.kr';
export const sha=value=>createHash('sha256').update(value).digest('hex');
export function walk(node, visit, parent=null, key='') {
  if(!node||typeof node!=='object')return;
  if(Array.isArray(node)){for(const child of node)walk(child,visit,parent,key);return;}
  if(node.type)visit(node,parent,key);
  for(const [name,value] of Object.entries(node))if(value&&typeof value==='object')walk(value,visit,node,name);
}
export const parseJS=source=>parse(source,{ecmaVersion:2025,sourceType:'module',ranges:true});
const stringValue=node=>node?.type==='Literal'?node.value:node?.type==='TemplateLiteral'&&!node.expressions.length?node.quasis[0].value.cooked:null;
export function assetURL(value,base) {
  if(typeof value!=='string'||! /^(?:\.\/|\/assets\/|assets\/)[\w./-]+\.(?:js|css)$/.test(value))return null;
  const url=new URL(value.startsWith('assets/')?'/'+value:value,base);
  if(url.origin!==ORIGIN||!/^\/assets\/[\w.-]+\.(js|css)$/.test(url.pathname))throw Error('Unexpected asset URL');
  return url.href;
}
export function dependencies(source,url) {
  if(url.endsWith('.css'))return [];
  const links=new Set();walk(parseJS(source),node=>{
    const link=assetURL(stringValue(node),url);if(link)links.add(link);
    if(node.type==='ImportDeclaration'||node.type==='ImportExpression'){
      if(!assetURL(stringValue(node.source),url))throw Error('Non-static or external import requires review');
    }
  });return [...links].sort();
}
export function analyzeEntry(source,url,assets) {
  const ast=parseJS(source),manager=scopes(ast,{ecmaVersion:2025,sourceType:'module',optimistic:false,ignoreEval:false});
  // Direct eval can give identifier names runtime meaning. Never rename it blindly.
  if(manager.scopes.some(scope=>scope.directCallToEvalScope))throw Error('Direct eval requires review');
  const variables=manager.scopes.flatMap(scope=>scope.variables).filter(v=>v.identifiers.length)
    .sort((a,b)=>a.identifiers[0].start-b.identifiers[0].start);
  const positions=new Map(),identities=new Map(),nodeIds=new WeakMap();let sequence=0;
  for(const variable of variables){
    const start=variable.identifiers[0].start,id=positions.has(start)?positions.get(start):sequence++;
    positions.set(start,id);identities.set(variable,id);
    for(const ident of variable.identifiers)nodeIds.set(ident,id);
    for(const ref of variable.references)nodeIds.set(ref.identifier,id);
  }
  const top=manager.scopes.find(scope=>scope.type==='module');
  const bindingIds=Object.fromEntries(top.variables.filter(v=>identities.has(v)).map(v=>[v.name,identities.get(v)]));
  function canonical(node,parent=null,key=''){
    if(!node||typeof node!=='object')return typeof node==='bigint'?String(node):node;
    if(Array.isArray(node))return node.map(v=>canonical(v,parent,key));
    const fixedName=parent&&(
      key==='property'&&parent.type==='MemberExpression'&&!parent.computed ||
      key==='key'&&['Property','MethodDefinition','PropertyDefinition'].includes(parent.type)&&!parent.computed ||
      key==='imported'&&parent.type==='ImportSpecifier'||key==='exported'&&parent.type==='ExportSpecifier');
    if(node.type==='Identifier'&&nodeIds.has(node)&&!fixedName)return {type:'LexicalIdentifier',binding:nodeIds.get(node)};
    const templateLink=node.type==='TemplateLiteral'?assetURL(stringValue(node),url):null;
    if(templateLink){if(!assets[templateLink])throw Error('Dependency missing from snapshot');return {type:'TemplateLiteralAsset',sha256:assets[templateLink].sha256};}
    const result={};for(const [name,value]of Object.entries(node)){
      if(['start','end','range','raw'].includes(name))continue;
      const link=node.type==='Literal'&&name==='value'?assetURL(value,url):null;
      if(link){if(!assets[link])throw Error('Dependency missing from snapshot: '+link);result[name]={assetSHA256:assets[link].sha256};}
      else result[name]=canonical(value,node,name);
    }return result;
  }
  return {normalizedSHA256:sha(JSON.stringify(canonical(ast))),bindingIds,ast,manager};
}
export function fingerprint(source,url,assets){
  const {normalizedSHA256,bindingIds}=analyzeEntry(source,url,assets);
  return {entryURL:url,entrySHA256:sha(source),normalizedSHA256,bindingIds,
    assets:Object.fromEntries(Object.entries(assets).sort(([a],[b])=>a.localeCompare(b)).map(([url,a])=>[url,{sha256:a.sha256,bytes:a.bytes}]))};
}
export function equivalent(before,after){
  if(before.normalizedSHA256!==after.normalizedSHA256)return false;
  // Require the whole dependency set, including dynamically imported modules.
  return JSON.stringify(before.assets)===JSON.stringify(after.assets);
}
