// Native lit/dark terrain splitting must coexist with both MOD lighting modes.
// Execute reviewed native mesh construction/culling with a local mesher fixture.
import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
import {parse}from '../../tools/vendor/acorn.mjs';import {analyze}from 'eslint-scope';
import * as T from '../../research/three.core-wy5OwqqC.js';import {clientProfiles}from '../extension/client/loader.mjs';
const root=new URL('../../',import.meta.url),profile=clientProfiles[0],source=fs.readFileSync(new URL('research/'+new URL(profile.entryURL).pathname.split('/').at(-1),root),'utf8');
const ast=parse(source,{ecmaVersion:'latest',sourceType:'module',ranges:true}),declarations=new Map();
for(const n of ast.body){if(n.type==='FunctionDeclaration')declarations.set(n.id.name,n);for(const d of n.declarations||[])declarations.set(d.id.name,d.init);}
const worldClass=declarations.get(profile.names.pAe),method=name=>worldClass.body.body.find(n=>n.key?.name===name),slice=n=>source.slice(n.start,n.end);
const rebuild=method('rebuild'),calls=[];const walk=n=>{if(!n||typeof n!=='object')return;if(n.type==='CallExpression')calls.push(n);for(const[k,v]of Object.entries(n))if(!['range','start','end'].includes(k)){if(Array.isArray(v))v.forEach(walk);else if(v&&typeof v==='object')walk(v);}};walk(rebuild);
const mesher=calls.find(n=>n.arguments[0]?.type==='MemberExpression'&&n.arguments[0].object.type==='ThisExpression'&&n.arguments[0].property.name==='store').callee.name;assert.ok(mesher);
const methods=['rebuild','cullBeyondFog','disposeRender'].map(name=>slice(method(name))).join('\n');
const program='class NativeWorld{'+methods+'}\nglobalThis.NativeWorld=NativeWorld;',helpers=new Map(),externals=new Set();
const refs=code=>analyze(parse(code,{ecmaVersion:'latest',sourceType:'module',ranges:true}),{ecmaVersion:2025,sourceType:'module'}).globalScope.through.map(r=>r.identifier.name);
const collect=code=>{for(const name of refs(code)){if(name===mesher||helpers.has(name)||externals.has(name))continue;const n=declarations.get(name);if(!n){externals.add(name);continue;}assert.ok(helpers.size<100,'Unexpected native dependency expansion');const s=n.type==='FunctionDeclaration'?slice(n):'const '+name+'='+slice(n)+';';helpers.set(name,s);collect(s);}};collect(program);
const imports={};for(const n of ast.body.filter(n=>n.type==='ImportDeclaration'&&n.source.value.includes('three.core-')))for(const s of n.specifiers)imports[s.local.name]=T[s.imported.name];
const scope=vm.createContext({...imports,performance:{now:()=>1000},[mesher]:()=>scope.meshFixture});
// Functions can refer forward to constants, but constant initializers need dependency order.
vm.runInContext([...helpers].sort(([a],[b])=>declarations.get(a).start-declarations.get(b).start).map(([,s])=>s).join('\n')+'\n'+program,scope);
const checks=[];
function fixture(){
 const positions=new Float32Array([0,20,0,0,20,4,4,20,4,4,20,0, 0,0,0,0,0,4,4,0,4,4,0,0]);
 return{positions,uvs:new Float32Array(16),colors:new Uint8Array(24).fill(255),lights:new Uint8Array([255,255,255,255,0,0,0,0]),indices:new Uint32Array([0,1,2,0,2,3,4,5,6,4,6,7]),vertexCount:8,minY:0,maxY:26,
 waterPositions:new Float32Array([0,25,0,0,25,4,4,25,4,4,25,0]),waterColors:new Uint8Array(12).fill(255),waterLights:new Uint8Array(4).fill(255),waterIndices:new Uint32Array([0,1,2,0,2,3]),waterVertexCount:4,torchGlow:[],cargoPiles:[],cargoLights:[],protectedCargoPiles:[],protectedCargoLights:[]};
}
for(const split of [false,true])for(const mode of ['shadows','realistic']){
 const native=new scope.NativeWorld(),scene=new T.sr(),group=new T.tt(),camera=new T.tn(70,1,.04,240),materials=Array.from({length:5},()=>new T.Rt());scene.add(group);scene.fog={near:90,far:200};
 Object.assign(native,{group,store:{get:()=>({}),values:()=>[].values()},renders:new Map(),material:materials[0],waterMaterial:materials[1],glowMaterial:materials[2],cargoMaterial:materials[3],protectedCargoMaterial:materials[4],lightCull:split,torchRadius:14,rebuildCount:0});
 scope.meshFixture=fixture();const key=32768*65536+32768,before=Array.from(scope.meshFixture.positions);native.rebuild(key);const chunk=native.renders.get(key);assert.ok(chunk.mesh&&chunk.waterMesh);assert.equal(!!chunk.darkMesh,split);assert.deepEqual(Array.from(scope.meshFixture.positions),before);
 assert.equal(chunk.mesh.geometry.attributes.position.count,split?4:8);if(split){assert.equal(chunk.darkMesh.geometry.attributes.position.count,4);assert.equal(chunk.litMaxY,25,'Water extends lit terrain bounds');}
 const lightScope={globalThis:{},performance:{now:()=>1000}};for(const file of ['realistic-lighting.js','local-shadows.js'])vm.runInNewContext(fs.readFileSync(new URL('../extension/'+file,import.meta.url),'utf8'),lightScope);
 lightScope.globalThis.__MINING_LOCAL_NATIVE_API__={worldHeight:128,occludesBlock:id=>id===2};let status;
 const control=lightScope.globalThis.__MINING_LOCAL_SHADOWS_FACTORY__(T,s=>status=s,{realismFactory:lightScope.globalThis.__MINING_LOCAL_REALISM_FACTORY__}),renderer={shadowMap:{enabled:false,type:0,autoUpdate:true,needsUpdate:false},capabilities:{maxTextureSize:1024}};
 class Mine{frame(){scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);control.beforeWorld(scene,group,camera,renderer,camera.position);}}
 control.bindSceneClass(Mine);const owner=new Mine();Object.assign(owner,{active:true,scene,world:native,caveMix:0});mode==='shadows'?control.setEnabled(true):control.setRealistic(true);
 native.cullBeyondFog(0,10,0,200);camera.position.set(2,23,10);camera.lookAt(2,20,2);owner.frame();assert.equal(status.error,null);assert.ok(chunk.mesh.children.length);if(split)assert.ok(chunk.darkMesh.children.length);
 const cull=method('cullBeyondFog'),squares=[];const find=n=>{if(!n||typeof n!=='object')return;if(n.type==='BinaryExpression'&&n.operator==='*'&&n.left.type==='Identifier'&&n.right.name===n.left.name&&declarations.has(n.left.name))squares.push(n.left.name);for(const v of Object.values(n)){if(Array.isArray(v))v.forEach(find);else if(v&&typeof v==='object')find(v);}};find(cull);
 assert.equal(squares.length,1);const darkRange=vm.runInContext(squares[0],scope);assert.ok(darkRange>0&&darkRange<190);
 native.cullBeyondFog(17+darkRange,0,0,200);assert.ok(chunk.mesh.visible&&chunk.waterMesh.visible);if(split)assert.equal(chunk.darkMesh.visible,false);owner.frame();if(split)assert.equal(chunk.darkMesh.visible,false,'MOD keeps native dark culling');
 native.cullBeyondFog(10000,0,0,200);assert.equal(chunk.mesh.visible,false);assert.equal(chunk.waterMesh.visible,false);if(split)assert.equal(chunk.darkMesh.visible,false);owner.frame();assert.equal(status.error,null);
 control.dispose();assert.equal(chunk.mesh.children.length,0);if(split)assert.equal(chunk.darkMesh.children.length,0);
 const meshes=[chunk.mesh,chunk.darkMesh,chunk.waterMesh].filter(Boolean),disposed=new Set();for(const mesh of meshes)mesh.geometry.addEventListener('dispose',()=>disposed.add(mesh));native.disposeRender(key);assert.equal(disposed.size,meshes.length);assert.equal(native.renders.size,0);assert.equal(group.children.length,0);materials.forEach(m=>m.dispose());
 checks.push({split,mode,nativeVisibilityRetained:true,allGeometryDisposed:true});
}
console.log(JSON.stringify({nativeLightCulling:checks,gameLogin:false,networkRequests:0}));
