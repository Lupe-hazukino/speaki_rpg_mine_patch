import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import * as T from '../../research/three.core-wy5OwqqC.js';
import {waterCells,voxelWater} from './voxel-water.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const source=fs.readFileSync(path.join(root,'public/extension/realistic-water.js'),'utf8');
vm.runInThisContext(source,{filename:'realistic-water.js'});
const results=[];
function test(name,fn){try{const details=fn();results.push({name,passed:true,details})}catch(error){results.push({name,passed:false,error:error.stack})}}
function geometry(height=0){
 const g=new T.v();
 g.setAttribute('position',new T._(new Float32Array([-2,height,2,2,height,2,2,height,-2,-2,height,-2]),3));
 g.setAttribute('color',new T._(new Uint8Array(12).fill(230),3,true));
 g.setIndex(new T._(new Uint16Array([0,1,2,0,2,3]),1));return g;
}
function mockRenderer(){
 const initialTarget=new T.Vr(256,256),r={target:initialTarget,cube:2,mip:1,viewport:new T.Rr(3,4,640,360),scissor:new T.Rr(9,10,320,200),scissorTest:true,
  autoClear:false,xr:{enabled:true},shadowMap:{autoUpdate:true,needsUpdate:true},calls:[],clears:0,failAt:0,
  domElement:{listeners:new Map(),addEventListener(k,v){this.listeners.set(k,v)},removeEventListener(k,v){if(this.listeners.get(k)===v)this.listeners.delete(k)}},
  getDrawingBufferSize(out){return out.set(1280,720)},getRenderTarget(){return this.target},getActiveCubeFace(){return this.cube},getActiveMipmapLevel(){return this.mip},
  getViewport(out){return out.copy(this.viewport)},getScissor(out){return out.copy(this.scissor)},getScissorTest(){return this.scissorTest},
  setViewport(v){this.viewport.copy(v)},setScissor(v){this.scissor.copy(v)},setScissorTest(v){this.scissorTest=v},
  setRenderTarget(v,cube=0,mip=0){this.target=v;this.cube=cube;this.mip=mip;if(v){this.viewport.copy(v.viewport);this.scissor.copy(v.scissor);this.scissorTest=v.scissorTest}},
  clear(){this.clears++},render(scene,camera){
   this.calls.push({camera:camera.clone(),target:this.target,waterVisible:[...scene.children[0].children].filter(m=>m.isMesh).map(m=>m.visible),captureFlag:scene.userData.miningLocalWaterCapture});
   this.onRender?.(scene,camera);
   if(this.failAt===this.calls.length)throw Error('Synthetic GPU failure '+this.failAt);
  }};return r;
}
function fixture({heights=[0],foreign=false,core=T}={}){
 const scene=new T.sr(),world=new T.tt();world.name='voxelWorld';scene.add(world);
 const waterMaterial=new T.Rt({color:1854040,vertexColors:true,transparent:true,opacity:.6,depthWrite:false});
 const native={group:world,waterMaterial,renders:new Map()},owner={world:native},meshes=[];
 for(let i=0;i<heights.length;i++){const mesh=new T.Lt(geometry(heights[i]),waterMaterial);mesh.position.x=i*5;mesh.matrixAutoUpdate=false;mesh.updateMatrix();world.add(mesh);native.renders.set(i,{waterMesh:mesh});meshes.push(mesh)}
 if(foreign){const unrelated=new T.Lt(geometry(),waterMaterial);unrelated.position.z=-6;world.add(unrelated);meshes.push(unrelated)}
 const camera=new T.tn(60,1280/720,.1,200);camera.position.set(3,9,17);camera.lookAt(2,0,0);camera.updateMatrixWorld(true);scene.updateMatrixWorld(true);
 const renderer=mockRenderer(),api=globalThis.__MINING_LOCAL_WATER_FACTORY__(core);
 const run=(extra={})=>api.beforeWorld(scene,world,camera,renderer,{enabled:true,owner,now:12345,...extra});
 return {scene,world,waterMaterial,native,owner,meshes,camera,renderer,api,run};
}
function snapshot(f){const r=f.renderer;return {target:r.target,cube:r.cube,mip:r.mip,viewport:r.viewport.toArray(),scissor:r.scissor.toArray(),scissorTest:r.scissorTest,autoClear:r.autoClear,xr:r.xr.enabled,shadowAuto:r.shadowMap.autoUpdate,shadowDirty:r.shadowMap.needsUpdate,flag:f.scene.userData.miningLocalWaterCapture,visible:f.meshes.map(m=>m.visible)}}
function assertRestored(f,before){const after=snapshot(f);assert.equal(after.target,before.target);assert.deepEqual({...after,target:null},{...before,target:null})}

test('Only native renders.waterMesh identities are replaced',()=>{
 const f=fixture({foreign:true});const [water,foreign]=f.meshes,originalGeometry=water.geometry;let disposed=0;
 f.waterMaterial.addEventListener('dispose',()=>disposed++);originalGeometry.addEventListener('dispose',()=>disposed++);
 f.run();assert.equal(f.api.getStatus().meshes,1);assert.equal(foreign.material,f.waterMaterial);assert.notEqual(water.geometry,originalGeometry);assert.equal(water.geometry.userData.miningLocalWaterSurface,true);assert.notEqual(water.material,f.waterMaterial);
 assert.ok(water.material.isShaderMaterial);assert.equal(water.material.transparent,true);assert.equal(water.material.depthWrite,false);assert.equal(water.material.side,f.waterMaterial.side);
 f.run({enabled:false});assert.equal(water.material,f.waterMaterial);assert.notEqual(water.geometry,originalGeometry);assert.equal(disposed,0);assert.equal(f.api.getStatus().active,false);assert.equal(f.api.getStatus().surfaceActive,true);f.api.dispose();assert.equal(water.geometry,originalGeometry);return {nativeDisposed:disposed};
});
test('Mode off then on restores every native reference without duplicate material application',()=>{
 const f=fixture();const mesh=f.meshes[0],g=mesh.geometry;f.run();const replacement=mesh.material;let disposed=0;replacement.addEventListener('dispose',()=>disposed++);
 f.run();assert.equal(mesh.material,replacement);f.run({enabled:false});assert.equal(mesh.material,f.waterMaterial);assert.equal(disposed,1);f.run({enabled:false});assert.equal(disposed,1);
 f.run();assert.notEqual(mesh.material,replacement);assert.notEqual(mesh.geometry,g);assert.equal(f.api.getStatus().meshes,1);f.api.dispose();assert.equal(mesh.geometry,g);assert.equal(mesh.material,f.waterMaterial);assert.equal(f.renderer.domElement.listeners.size,0);
});
test('Native chunk rebuild and unload restore removed meshes and track new identity',()=>{
 const f=fixture();const old=f.meshes[0],oldGeometry=old.geometry;f.run();f.world.remove(old);
 const fresh=new T.Lt(geometry(1),f.waterMaterial);f.world.add(fresh);f.native.renders.set(0,{waterMesh:fresh});f.run();
 assert.equal(old.material,f.waterMaterial);assert.equal(old.geometry,oldGeometry);assert.ok(fresh.material.isShaderMaterial);assert.equal(f.api.getStatus().meshes,1);
 f.native.renders.delete(0);f.world.remove(fresh);f.run();assert.equal(fresh.material,f.waterMaterial);assert.equal(f.api.getStatus().active,false);return {rebuildTracked:true};
});
test('Two visible water elevations receive separate reflection captures',()=>{
 const f=fixture({heights:[0,2]});const before=snapshot(f);f.run();const status=f.api.getStatus();assert.equal(status.meshes,2);assert.deepEqual([...status.planes].sort(),[-.125,1.875]);assert.equal(f.renderer.calls.length,3);
 assert.equal(f.renderer.calls[0].camera.position.y,9);assert.deepEqual(f.renderer.calls.slice(1).map(c=>c.camera.position.y).sort((a,b)=>a-b),[-9.25,-5.25]);assertRestored(f,before);f.api.dispose();return {planes:status.planes,captures:3};
});
test('Offscreen water does not trigger refraction or reflection captures',()=>{
 const f=fixture();f.camera.lookAt(3,9,100);f.camera.updateMatrixWorld(true);f.run();assert.equal(f.renderer.calls.length,0);f.api.dispose();return {captures:0};
});
test('Invisible native chunks do not capture and retain visibility',()=>{
 const f=fixture();f.meshes[0].visible=false;f.run();assert.equal(f.renderer.calls.length,0);assert.equal(f.meshes[0].visible,false);f.api.dispose();assert.equal(f.meshes[0].visible,false);
});
test('Nested render callback is guarded without extra captures',()=>{
 const f=fixture();let nested=0;f.renderer.onRender=()=>{nested++;f.run()};f.run();assert.equal(nested,2);assert.equal(f.api.getStatus().captures,2);assert.equal(f.scene.userData.miningLocalWaterCapture,undefined);f.api.dispose();return {captures:2};
});
for(const failAt of [1,2,3])test('Render failure '+failAt+' restores render state, sky and native materials',()=>{
 const f=fixture({heights:[0,2]});const sky=new T.tt();sky.userData.miningLocalSky=true;sky.position.set(10,15,20);f.scene.add(sky);const sun=new T.tt();sun.userData.miningLocalSun=true;sun.position.set(-4,10,12);f.scene.add(sun);f.scene.updateMatrixWorld(true);
 const skyPosition=sky.position.clone(),sunPosition=sun.position.clone(),before=snapshot(f);f.renderer.failAt=failAt;
 assert.throws(()=>f.run(),new RegExp('Synthetic GPU failure '+failAt));assertRestored(f,before);assert.deepEqual(sky.position.toArray(),skyPosition.toArray());assert.deepEqual(sun.position.toArray(),sunPosition.toArray());
 assert.equal(f.api.getStatus().active,false);for(const mesh of f.meshes)assert.equal(mesh.material,f.waterMaterial);assert.equal(f.renderer.domElement.listeners.size,0);return {rendererStateRestored:true};
});
test('Context loss restores original material and unregisters callback',()=>{
 const f=fixture();f.run();assert.equal(f.renderer.domElement.listeners.size,1);f.renderer.domElement.listeners.get('webglcontextlost')();assert.equal(f.api.getStatus().active,false);assert.equal(f.meshes[0].material,f.waterMaterial);assert.equal(f.renderer.domElement.listeners.size,0);
});
test('Wrong owner cannot affect lookalike water or trigger captures',()=>{
 const f=fixture();f.run({owner:{world:{...f.native,group:new T.tt()}}});assert.equal(f.renderer.calls.length,0);assert.equal(f.meshes[0].material,f.waterMaterial);assert.equal(f.api.getStatus().active,false);f.api.dispose();
});
test('Losing native owner after activation restores water and stops captures',()=>{
 const f=fixture();f.run();const previous=f.renderer.calls.length;f.run({owner:null});assert.equal(f.renderer.calls.length,previous);assert.equal(f.meshes[0].material,f.waterMaterial);assert.equal(f.api.getStatus().active,false);f.api.dispose();
});
test('No water allocates no targets or textures',()=>{
 let allocations=0;const core={...T};for(const key of ['Vr','F','L','B'])core[key]=class extends T[key]{constructor(...args){super(...args);allocations++}};
 const f=fixture({heights:[],core});for(let n=0;n<10;n++)f.run({now:n*16});assert.equal(allocations,0);assert.equal(f.renderer.calls.length,0);assert.equal(f.renderer.domElement.listeners.size,0);assert.equal(f.api.getStatus().active,false);return {allocations};
});
test('Changing native world owner restores old material and uses new native water',()=>{
 const f=fixture();f.run();const old=f.meshes[0],oldReplacement=old.material;let oldDisposed=0;oldReplacement.addEventListener('dispose',()=>oldDisposed++);
 const source=new T.Rt({color:1854040,vertexColors:true,transparent:true,opacity:.6,depthWrite:false}),fresh=new T.Lt(geometry(1),source);f.world.add(fresh);f.world.remove(old);
 const replacementOwner={world:{group:f.world,waterMaterial:source,renders:new Map([[100,{waterMesh:fresh}]])}};f.run({owner:replacementOwner});
 assert.equal(old.material,f.waterMaterial);assert.equal(oldDisposed,1);assert.notEqual(fresh.material,source);assert.equal(f.api.getStatus().meshes,1);f.api.dispose();assert.equal(fresh.material,source);return {oldResourcesDisposed:oldDisposed};
});

function voxelFixture(cells){const f=fixture(),data=waterCells(cells);f.native.blockAt=data.blockAt;f.meshes[0].geometry.dispose();f.meshes[0].geometry=voxelWater(T,data);return {...f,data};}
function ys(g){const p=g.attributes.position;return [...new Set(Array.from({length:p.count},(_,i)=>p.getY(i)))].sort((a,b)=>a-b);}
test('Normal mode lowers stacked water without allocating optical resources or rendering extra views',()=>{
 let allocations=0;const core={...T};for(const key of ['Vr','F','L','B','cr'])core[key]=class extends T[key]{constructor(...args){super(...args);allocations++}};
 const f=fixture({core}),data=waterCells([[0,1,0],[0,2,0],[1,1,0]]),mesh=f.meshes[0];f.native.blockAt=data.blockAt;mesh.geometry.dispose();mesh.geometry=voxelWater(T,data);const source=mesh.geometry,original=Array.from(source.attributes.position.array);
 f.run({enabled:false});const lowered=mesh.geometry;assert.deepEqual(ys(lowered),[1,1.875,2,2.875]);
 for(let i=0;i<60;i++)f.run({enabled:false,now:i*16});assert.equal(mesh.geometry,lowered);assert.equal(mesh.material,f.waterMaterial);assert.equal(allocations,0);assert.equal(f.renderer.calls.length,0);assert.deepEqual(Array.from(source.attributes.position.array),original);
 f.api.dispose();assert.equal(mesh.geometry,source);return {opticalAllocations:allocations,extraRenders:f.renderer.calls.length};
});
test('Normal and realistic modes share one lowered geometry without cumulative lowering',()=>{
 const f=voxelFixture([[0,1,0],[0,2,0]]),mesh=f.meshes[0],source=mesh.geometry;f.run({enabled:false});const lowered=mesh.geometry;
 for(let n=0;n<5;n++){f.run();assert.equal(mesh.geometry,lowered);assert.ok(mesh.material.isShaderMaterial);f.api.disableOptics();f.run({enabled:false});assert.equal(mesh.material,f.waterMaterial);assert.equal(mesh.geometry,lowered);assert.deepEqual(ys(lowered),[1,2,2.875])}
 f.api.dispose();assert.equal(mesh.geometry,source);assert.equal(f.renderer.domElement.listeners.size,0);
});
test('Normal-mode native chunk disposal releases source and copy once',()=>{
 const f=voxelFixture([[0,1,0]]),mesh=f.meshes[0],source=mesh.geometry;let nativeCount=0,copyCount=0;source.addEventListener('dispose',()=>nativeCount++);f.run({enabled:false});mesh.geometry.addEventListener('dispose',()=>copyCount++);mesh.geometry.dispose();mesh.removeFromParent();f.native.renders.clear();f.run({enabled:false});assert.equal(nativeCount,1);assert.equal(copyCount,1);assert.equal(f.api.getStatus().surfaceActive,false);assert.equal(f.renderer.calls.length,0);
});
test('A single cell is 7/8 high with the floor and native buffers preserved',()=>{
 const f=voxelFixture([[0,1,0]]),mesh=f.meshes[0],source=mesh.geometry,bytes=Array.from(source.attributes.position.array);f.run();
 assert.deepEqual(ys(mesh.geometry),[1,1.875]);assert.deepEqual(f.api.getStatus().planes,[1.875]);assert.deepEqual(Array.from(source.attributes.position.array),bytes);
 f.api.dispose();assert.equal(mesh.geometry,source);return {surface:1.875,bottom:1};
});
test('Two and three vertically stacked cells retain exact full-height joins',()=>{
 for(const count of [2,3]){const f=voxelFixture(Array.from({length:count},(_,y)=>[0,y+1,0]));f.run();assert.deepEqual(ys(f.meshes[0].geometry),[...Array.from({length:count},(_,y)=>y+1),count+.875]);f.api.dispose()}
});
test('A taller adjacent column closes the newly exposed 1/8-height strip',()=>{
 const f=voxelFixture([[0,1,0],[1,1,0],[1,2,0]]),mesh=f.meshes[0],source=mesh.geometry;f.run();
 assert.equal(mesh.geometry.attributes.position.count,source.attributes.position.count+4);
 const p=mesh.geometry.attributes.position;assert.deepEqual(Array.from({length:4},(_,i)=>[p.getX(source.attributes.position.count+i),p.getY(source.attributes.position.count+i)]).sort(),[[1,1.875],[1,1.875],[1,2],[1,2]].sort());f.api.dispose();
});
test('Level and stepped connections also remain closed across a chunk border',()=>{
 for(const tall of [false,true]){const f=voxelFixture([[15,1,0],[16,1,0],...(tall?[[16,2,0]]:[])]),left=f.meshes[0];left.geometry=voxelWater(T,f.data,x=>x<16);
  const right=new T.Lt(voxelWater(T,f.data,x=>x>=16,[16,0,0]),f.waterMaterial);right.position.x=16;right.updateMatrix();f.world.add(right);f.native.renders.set(1,{waterMesh:right});const n=left.geometry.attributes.position.count;f.run();
  assert.equal(left.geometry.attributes.position.count,n+(tall?4:0));assert.deepEqual(ys(left.geometry),tall?[1,1.875,2]:[1,1.875]);assert.deepEqual(ys(right.geometry),tall?[1,2,2.875]:[1,1.875]);f.api.dispose();
 }
});
test('Stepped side strips face outward in all four horizontal directions',()=>{
 for(const [dx,dz]of [[1,0],[-1,0],[0,1],[0,-1]]){const f=voxelFixture([[-1,1,-1],[-1+dx,1,-1+dz],[-1+dx,2,-1+dz]]),mesh=f.meshes[0],count=mesh.geometry.index.count;f.run();
  const g=mesh.geometry,p=g.attributes.position,ix=g.index;let area=0;
  assert.equal(ix.count,count+6);for(let i=count;i<ix.count;i+=3){const a=new T.Lr().fromBufferAttribute(p,ix.getX(i)),b=new T.Lr().fromBufferAttribute(p,ix.getX(i+1)),c=new T.Lr().fromBufferAttribute(p,ix.getX(i+2));const n=b.sub(a).cross(c.sub(a));assert.ok(n.dot(new T.Lr(-dx,0,-dz))>0);area+=n.length()/2}
  assert.equal(area,.125);f.api.dispose();
 }
});
test('Native chunk disposal retires the original and render copy exactly once',()=>{
 const f=voxelFixture([[0,1,0]]),mesh=f.meshes[0],source=mesh.geometry;let nativeCount=0,copyCount=0;source.addEventListener('dispose',()=>nativeCount++);f.run();const copy=mesh.geometry;copy.addEventListener('dispose',()=>copyCount++);
 mesh.geometry.dispose();mesh.removeFromParent();f.native.renders.clear();f.run();assert.equal(nativeCount,1);assert.equal(copyCount,1);assert.equal(f.api.getStatus().active,false);return {nativeCount,copyCount};
});
test('A source disposal releases the render copy without recursion',()=>{
 const f=voxelFixture([[0,1,0]]),mesh=f.meshes[0],source=mesh.geometry;let nativeCount=0,copyCount=0;source.addEventListener('dispose',()=>nativeCount++);f.run();mesh.geometry.addEventListener('dispose',()=>copyCount++);source.dispose();f.api.dispose();assert.equal(nativeCount,1);assert.equal(copyCount,1);
});
test('Adding and removing upper water recomputes the surface on the native rebuild',()=>{
 const f=voxelFixture([[0,1,0]]);for(const cells of [[[0,1,0]],[[0,1,0],[0,2,0]],[[0,1,0]]]){
  const data=waterCells(cells);f.native.blockAt=data.blockAt;const fresh=new T.Lt(voxelWater(T,data),f.waterMaterial);f.world.add(fresh);for(const [key,r]of f.native.renders){r.waterMesh.geometry.dispose();r.waterMesh.removeFromParent();f.native.renders.delete(key)}f.native.renders.set(0,{waterMesh:fresh});f.run();assert.equal(Math.max(...ys(fresh.geometry)),cells.length+.875);
 }f.api.dispose();
});
const out={kind:'offline behavior with actual native Three core and instrumented renderer',tests:results.length,passed:results.filter(r=>r.passed).length,failed:results.filter(r=>!r.passed).length,results};
fs.mkdirSync(path.join(root,'work/evidence/current'),{recursive:true});fs.writeFileSync(path.join(root,'work/evidence/current/state.json'),JSON.stringify(out,null,2));console.log(JSON.stringify(out,null,2));if(out.failed)process.exitCode=1;
