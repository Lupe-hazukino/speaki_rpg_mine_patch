// Exercise the new vertical range, retaining the old client fallback. No server calls.
import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';import {createHash} from 'node:crypto';
import * as T from '../../research/three.core-wy5OwqqC.js';
import {clientProfiles} from '../extension/client/loader.mjs';
const root=new URL('../../',import.meta.url),extension=new URL('../extension/',import.meta.url),profile=clientProfiles.find(p=>p.id==='current');
assert.ok(profile.bindings.includes('worldHeight:128'));
const native=fs.readFileSync(new URL('research/'+new URL(profile.entryURL).pathname.split('/').at(-1),root),'utf8');
const chunks=Object.fromEntries([...native.matchAll(/\b([A-Za-z0-9_]+):`([^`]+)`/g)].map(m=>[m[1],m[2]]));
const checks=[];
for(const height of [100,128])for(const mode of ['shadows','realistic']){
 let now=1000,status;const scope={globalThis:{},performance:{now:()=>now}};
 for(const name of ['realistic-lighting.js','local-shadows.js'])vm.runInNewContext(fs.readFileSync(new URL(name,extension),'utf8'),scope);
 scope.globalThis.__MINING_LOCAL_NATIVE_API__={occludesBlock:id=>id===2,...(height===128?{worldHeight:128}:{})};
 const scene=new T.sr(),world=new T.tt(),camera=new T.tn(70,1,.04,240),eye=new T.Lr(4,height-9,4),floor=new T.Lt(new T.g(16,1,16),new T.Rt());
 floor.position.set(8,height-12,8);world.add(floor);scene.add(world);scene.fog={near:90,far:200};
 const chunk={cx:0,cz:0,blocks:new Uint8Array(height*256),skyTop:new Int16Array(256),torchLight:new Uint8Array(height*256),torches:[]};
 const block=(x,y,z)=>(y*16+z)*16+x,roof=height-1,torch=height-8,torchIndex=block(3,torch,3),radius=14;
 chunk.blocks[block(2,roof,2)]=2;chunk.skyTop[2*16+2]=height;chunk.torchLight[block(4,torch,3)]=radius-1;chunk.torches=[torchIndex];
 const hash=()=>createHash('sha256').update(chunk.blocks).update(new Uint8Array(chunk.skyTop.buffer)).update(chunk.torchLight).digest('hex'),originalHash=hash();
 let loaded=[chunk];const renderer={shadowMap:{enabled:false,type:0,autoUpdate:true,needsUpdate:false},capabilities:{maxTextureSize:1024}};
 const control=scope.globalThis.__MINING_LOCAL_SHADOWS_FACTORY__(T,v=>status=v,{realismFactory:scope.globalThis.__MINING_LOCAL_REALISM_FACTORY__});
 class Mine{frame(){camera.position.copy(eye);camera.lookAt(8,height-12,8);camera.updateMatrixWorld(true);scene.updateMatrixWorld(true);control.beforeWorld(scene,world,camera,renderer,eye)}}
 control.bindSceneClass(Mine);const owner=new Mine();Object.assign(owner,{active:true,scene,fogMix:0,world:{group:world,torchRadius:radius,store:{values:()=>loaded.values()},brightnessAt(){throw Error('Native flood fill must not be invoked')},skyExposureAt(){throw Error('Native sky fill must not be invoked')}}});
 const draw=()=>{now+=101;owner.frame();assert.equal(status.error,null)};
 mode==='shadows'?control.setEnabled(true):control.setRealistic(true);draw();
 const shader={uniforms:{},vertexShader:chunks.shadow_vert,fragmentShader:chunks.shadow_frag};floor.children[0].material.onBeforeCompile(shader);
 const u=shader.uniforms,torchField=u.localTorchField.value,torchOrigin=u.localTorchOrigin.value;
 assert.equal(torchField.image.depth,height);
 const sampleTorch=(x,y,z)=>u.localTorchField.value.image.data[(y*torchField.image.height+z-torchOrigin.z)*torchField.image.width+x-torchOrigin.x];
 assert.equal(sampleTorch(3,torch,3),radius);assert.equal(sampleTorch(4,torch,3),radius-1);assert.equal(u.localTorchLevel.value,radius);
 if(mode==='realistic'){
  const field=u.realField.value,origin=u.realOrigin.value;assert.equal(field.image.depth,height);assert.equal(u.realShape.value.y,height);
  assert.equal(field.image.data[(roof*96+2-origin.z)*96+2-origin.x],255);
  assert.equal(u.realKnownField.value.image.data[(roof*96+2-origin.z)*96+2-origin.x],255);
  assert.equal(u.realSkyField.value.image.data[2*16+2],height+1);assert.equal(u.realSkyMaxField.value.image.data[0],height+1);
  assert.ok(shader.fragmentShader.includes('if(p.y>=realShape.y)return 1.0'));
  assert.ok(!shader.fragmentShader.includes('p.y>=100.0'));
  const version=field.version;draw();assert.equal(field.version,version);
  owner.caveMix=.8;owner.fogMix=.1;draw();assert.equal(u.realCave.value,.8,'Current native cave mix takes precedence');
  delete owner.caveMix;draw();assert.equal(u.realCave.value,.1,'Older reviewed clients retain fog mix fallback');
  owner.fogMix=0;draw();
 }
 assert.equal(hash(),originalHash);
 if(height===128){owner.world.torchRadius=28;draw();assert.equal(sampleTorch(3,torch,3),28);assert.equal(u.localTorchLevel.value,28);assert.equal(hash(),originalHash);}
 chunk.torchLight[block(4,torch,3)]=0;chunk.torches=[];draw();assert.equal(sampleTorch(3,torch,3),0);assert.equal(sampleTorch(4,torch,3),0);
 loaded=[];draw();assert.equal(sampleTorch(4,torch,3),0);if(mode==='realistic')assert.equal(u.realSkyField.value.image.data[0],0);
 control.dispose();assert.equal(floor.children.length,0);assert.equal(renderer.shadowMap.enabled,false);
 checks.push({height,mode,roofY:roof,torchY:torch,upperWorldLighting:true,nativeCachesReadOnly:true,editsAndUnloadHandled:true});
}
const version=JSON.parse(fs.readFileSync(new URL('manifest.json',extension),'utf8')).version,report={version,checks,noAdditionalNetwork:true};
fs.writeFileSync(new URL('work/evidence/public-'+version+'/current-lighting.json',root),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
