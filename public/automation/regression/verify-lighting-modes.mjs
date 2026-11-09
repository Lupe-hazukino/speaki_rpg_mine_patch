import {clientProfiles} from '../extension/client/loader.mjs';
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import * as T from '../../research/three.core-wy5OwqqC.js';
const root=new URL('../../',import.meta.url),extension=new URL('../extension/',import.meta.url);
const scope={globalThis:{},performance:{now:()=>now}};let now=1000;
for(const name of ['realistic-lighting.js','local-shadows.js'])vm.runInNewContext(fs.readFileSync(new URL(name,extension),'utf8'),scope);
const native=fs.readFileSync(new URL('research/'+new URL(clientProfiles[0].entryURL).pathname.split('/').at(-1),root),'utf8');
const chunks=Object.fromEntries([...native.matchAll(/\b([A-Za-z0-9_]+):`([^`]+)`/g)].map(match=>[match[1],match[2]]));
scope.globalThis.__MINING_LOCAL_NATIVE_API__={occludesBlock:id=>id===2};
let status;const control=scope.globalThis.__MINING_LOCAL_SHADOWS_FACTORY__(T,value=>{status=value;assert.ok(!(value.enabled&&value.realistic))},{realismFactory:scope.globalThis.__MINING_LOCAL_REALISM_FACTORY__});
const scene=new T.sr(),world=new T.tt(),camera=new T.tn(70,1,.04,240),eye=new T.Lr(4,3,4);
const geometry=new T.g(16,1,16),material=new T.Rt(),floor=new T.Lt(geometry,material),originalShadowSide=material.shadowSide;world.add(floor);scene.add(world);scene.fog={near:90,far:200};
const originalMap={enabled:false,type:0,autoUpdate:true,needsUpdate:false},renderer={shadowMap:{...originalMap},capabilities:{maxTextureSize:1024}};
const chunk={cx:0,cz:0,blocks:new Uint8Array(25600),skyTop:new Int16Array(256),torchLight:new Uint8Array(25600),torches:[]};
class NativeScene{frame(){now+=101;camera.position.copy(eye);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);scene.updateMatrixWorld(true);control.beforeWorld(scene,world,camera,renderer,eye)}}
control.bindSceneClass(NativeScene);const owner=new NativeScene();Object.assign(owner,{active:true,scene,world:{group:world,torchRadius:14,store:{values:()=>[chunk].values()}},fogMix:0});
const draw=()=>{owner.frame();assert.equal(status.error,null);assert.equal(camera.far,240);assert.equal(scene.fog.near,90);assert.equal(scene.fog.far,200)};
function current(mode,time,range){
 draw();assert.equal(status.mode,mode);assert.equal(status.effectiveTimeOfDay,time);assert.equal(status.effectiveRange,range);
 assert.equal(scene.children.filter(child=>child.name==='MiningLocalShadowSun').length,1);
 assert.equal(scene.children.filter(child=>child.name==='MiningLocalShadowCasters').length,1);
 const overlays=floor.children.filter(child=>child.userData.miningLocalShadowOverlay);assert.equal(overlays.length,1);
 const shader={uniforms:{},vertexShader:chunks.shadow_vert,fragmentShader:chunks.shadow_frag};overlays[0].material.onBeforeCompile(shader);
 assert.equal(shader.uniforms.realEnabled.value,mode==='realistic'?1:0);assert.equal(shader.uniforms.localShadowsEnabled.value,1);
 assert.equal(renderer.shadowMap.enabled,true);assert.equal(floor.castShadow,true);
 return {overlay:overlays[0],light:scene.getObjectByName('MiningLocalShadowSun')};
}
function off(){
 draw();assert.equal(status.mode,'off');assert.equal(control.rendering,false);assert.equal(floor.children.length,0);assert.equal(scene.children.length,1);
 assert.equal(floor.castShadow,false);assert.equal(material.shadowSide,originalShadowSide);assert.deepEqual(renderer.shadowMap,originalMap);assert.equal(floor.material,material);assert.equal(floor.geometry,geometry);
}
off();let modes=0,rejected=0;
for(const time of ['morning','day','evening'])for(const range of ['small','medium','high','ultra']){
 control.setTimeOfDay(time);control.setRange(range);assert.equal(control.setEnabled(true),true);
 const shadow=current('shadows',time,range);assert.equal(control.setRealistic(true),false);rejected++;
 assert.equal(control.enabled,true);assert.equal(control.realistic,false);control.setRealistic(false);
 const unchanged=current('shadows',time,range);assert.equal(shadow.overlay,unchanged.overlay);assert.equal(shadow.light,unchanged.light);
 control.setEnabled(false);off();assert.equal(control.setRealistic(true),true);
 const real=current('realistic','day','ultra');assert.equal(control.setEnabled(true),false);rejected++;
 assert.equal(control.enabled,false);assert.equal(control.realistic,true);control.setEnabled(false);
 const unchangedReal=current('realistic','day','ultra');assert.equal(real.overlay,unchangedReal.overlay);assert.equal(real.light,unchangedReal.light);
 assert.equal(control.timeOfDay,time);assert.equal(control.range,range);
 control.setRealistic(false);off();modes+=2;
}
control.dispose();off();
const report={version:JSON.parse(fs.readFileSync(new URL('manifest.json',extension),'utf8')).version,modeActivations:modes,rejectedConcurrentActivations:rejected,
 mutuallyExclusiveModes:true,realismOwnDayUltraShading:true,shadowModePresetsPreserved:true,noCrossModeEffects:true,oneActiveLightAndReceiver:true,allResourcesRestoredOnOff:true,noNetworkChanges:true};
fs.writeFileSync(new URL('work/evidence/public-'+report.version+'/lighting-modes.json',root),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
