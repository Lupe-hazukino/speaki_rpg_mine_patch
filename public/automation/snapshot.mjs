import fs from 'node:fs';
import path from 'node:path';
import {ORIGIN,dependencies,sha,fingerprint} from './analyze.mjs';
export async function get(url,limit=8*1024*1024){
  const parsed=new URL(url);if(parsed.origin!==ORIGIN||parsed.username||parsed.password)throw Error('Disallowed origin');
  const response=await fetch(url,{redirect:'error',signal:AbortSignal.timeout(30000),headers:{'User-Agent':'Speaki-rpg-mine-patch-compatibility-monitor','Cache-Control':'no-cache'}});
  if(!response.ok)throw Error('Public file HTTP '+response.status);
  const chunks=[];let size=0;for await(const chunk of response.body){size+=chunk.length;if(size>limit)throw Error('Public file exceeds size limit');chunks.push(chunk);}
  return Buffer.concat(chunks).toString('utf8');
}
export function findEntry(html){
  const scripts=[...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)]
    .filter(m=>/\btype=["']module["']/i.test(m[0])).map(m=>new URL(m[1],ORIGIN+'/'))
    .filter(url=>url.origin===ORIGIN&&/^\/assets\/index-[\w-]+\.js$/.test(url.pathname));
  if(scripts.length!==1)throw Error('Expected exactly one native module entry');return scripts[0].href;
}
export async function snapshot(entryURL, directory, read=get){
  fs.mkdirSync(directory,{recursive:true});const sources={},assets={};let bytes=0;
  const queue=[entryURL];for(let index=0;index<queue.length;index++){
    if(queue.length>100)throw Error('Dependency count exceeds limit');const url=queue[index];
    const source=await read(url);bytes+=Buffer.byteLength(source);if(bytes>32*1024*1024)throw Error('Snapshot exceeds size limit');
    sources[url]=source;fs.writeFileSync(path.join(directory,new URL(url).pathname.split('/').at(-1)),source);
    if(url!==entryURL)assets[url]={sha256:sha(source),bytes:Buffer.byteLength(source)};
    for(const link of dependencies(source,url))if(!queue.includes(link))queue.push(link);
  }
  const result=fingerprint(sources[entryURL],entryURL,assets);
  fs.writeFileSync(path.join(directory,'snapshot.json'),JSON.stringify(result,null,2)+'\n');return {result,sources};
}
