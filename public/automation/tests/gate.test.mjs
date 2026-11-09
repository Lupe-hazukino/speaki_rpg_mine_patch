import {test} from 'node:test';
import assert from 'node:assert/strict';
import {fingerprint,equivalent,ORIGIN,sha} from '../analyze.mjs';
import {findEntry,snapshot} from '../snapshot.mjs';
import {remapBindings,updateReadme} from '../prepare.mjs';
const url=ORIGIN+'/assets/index-demo.js';
const fp=source=>fingerprint(source,url,{[ORIGIN+'/assets/x.js']:{sha256:sha('dependency'),bytes:10}});
test('lexical renaming and formatting allowed, with bindings mapped',()=>{
  const a=fp('const a=128; function b(c){return c+a} b(2);'),b=fp('const height = 128; function add(value) { return value+height; } add(2);');
  assert.ok(equivalent(a,b));
  assert.equal(remapBindings('globalThis.bind({World:a,advance:b,text:"a",prop:obj.a});',a,b),'globalThis.bind({World:height,advance:add,text:"a",prop:obj.a});');
});
for(const [label,source]of [
  ['world height','const a=128;function b(c){return c+a}b(2);'],
  ['operator','const a=100;function b(c){return c-a}b(2);'],
  ['argument','const a=100;function b(c){return c+a}b(3);'],
  ['rewired reference','const a=100;function b(c){return c+c}b(2);'],
])test('reject '+label,()=>assert.ok(!equivalent(fp('const a=100;function b(c){return c+a}b(2);'),fp(source))));
test('properties and shorthand names are not lexical renames',()=>{
  assert.ok(!equivalent(fp('let a=1; use({a});'),fp('let b=1; use({b});')));
  assert.ok(!equivalent(fp('let a={height:100};use(a.height);'),fp('let b={depth:100};use(b.depth);')));
  assert.ok(!equivalent(fp('import {a as b} from "./x.js";'),fp('import {c as b} from "./x.js";')));
});
test('nested scope capture changes rejected',()=>assert.ok(!equivalent(fp('let a=1;function b(c){return ()=>a+c}'),fp('let z=1;function f(x){return ()=>x+x}'))));
test('native rename cannot capture an injected local',()=>{
  const before=fp('function nativeCall(){}'),after=fp('function api(){}');
  assert.throws(()=>remapBindings('const api={call:nativeCall};globalThis.api=api;',before,after),/captured/);
});
test('eval requires review',()=>assert.throws(()=>fp('let a=1; eval("a")'),/eval/));
test('unresolved global names remain significant',()=>assert.ok(!equivalent(fp('a(1)'),fp('b(1)'))));
test('dependency drift is rejected even if entry stays the same',()=>{
  const before={...fp('let a=1;'),assets:{[url+'x']:{sha256:sha('a'),bytes:1}}};
  assert.ok(!equivalent(before,{...before,assets:{[url+'x']:{sha256:sha('b'),bytes:1}}}));
});
test('README updates exactly filename and link',()=>{
  const text='User text\nhttps://github.com/Lupe-hazukino/speaki_rpg_mine_patch/releases/tag/v1.2.2\nSpeaki_rpg_mine_patch-1.2.2.zip\n1.2.2 preserved';
  assert.equal(updateReadme(text,'1.2.2','1.2.3'),text.replace('/v1.2.2','/v1.2.3').replace('-1.2.2.zip','-1.2.3.zip'));
  assert.throws(()=>updateReadme(text+' Speaki_rpg_mine_patch-1.2.2.zip','1.2.2','1.2.3'));
});
test('entry selection rejects missing, duplicate or foreign URLs',()=>{
  assert.equal(findEntry('<script type="module" src="/assets/index-demo.js"></script>'),url);
  for(const html of ['','<script type="module" src="https://evil.example/assets/index-demo.js"></script>','<script type="module" src="/assets/index-a.js"></script><script type="module" src="/assets/index-b.js"></script>'])assert.throws(()=>findEntry(html));
});
