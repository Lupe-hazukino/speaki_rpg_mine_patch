// Direction checks use native HUD methods and the MOD's actual perspective camera.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {parse} from '../../tools/vendor/acorn.mjs';
import * as T from '../../research/three.core-wy5OwqqC.js';
import {clientProfiles} from '../extension/client/loader.mjs';
import '../extension/camera.js';
const workspace=new URL('../../',import.meta.url),moduleSource=fs.readFileSync(new URL('../extension/shop-compass.js',import.meta.url),'utf8');
class Element {
 constructor(){this.children=[];this.style={};this.attributes={};this.classes=new Set();this.classList={add:name=>this.classes.add(name)};this.ownerDocument={createElement:()=>new Element()}}
 set textContent(text){this.text=text;this.children=[]}get textContent(){return this.text}
 append(node){node.parentNode=this;this.children.push(node)}setAttribute(name,value){this.attributes[name]=value}
}
const results=[];
for(const profile of clientProfiles.slice(0,1)){
 const source=fs.readFileSync(new URL('research/'+new URL(profile.entryURL).pathname.split('/').at(-1),workspace),'utf8');
 const declarations=new Map();for(const node of parse(source,{ecmaVersion:'latest',sourceType:'module'}).body)if(node.type==='VariableDeclaration')for(const d of node.declarations)declarations.set(d.id.name,d.init);
 function method(owner,name){const node=declarations.get(owner).body.body.find(n=>n.key?.name===name);assert.ok(node,name);return source.slice(node.start,node.end)}
 const NativeHUD=new Function(`return class {${method(profile.names.jPe,'setShopHint')}${method(profile.names.jPe,'setShopArrowAngle')}}`)();
 const NativeScene=new Function(`return class {
  frame(value){this.frames=(this.frames||0)+1;return value}exit(){this.active=false;return 'exited'}
  ${method(profile.names.sLe,'shopArrowAngle')}
 }`)();
 const nativeHint=NativeHUD.prototype.setShopHint,nativeAngle=NativeHUD.prototype.setShopArrowAngle;
 vm.runInThisContext(moduleSource,{filename:'shop-compass-'+profile.id+'.js'});
 globalThis.__MINING_LOCAL_BIND_COMPASS__({SceneClass:NativeScene});const compass=globalThis.__MINING_LOCAL_COMPASS_FACTORY__();
 let hud;const root={querySelector:name=>name==='.mhud'?hud.root:null};
 function createHud(){const value=new NativeHUD();Object.assign(value,{root:new Element(),shopArrow:new Element(),shopHint:new Element(),shopHintText:new Element()});value.shopArrow.textContent='▶';return value}
 hud=createHud();const native=new NativeScene();Object.assign(native,{shadow:root,hud,active:true,ready:true,body:{x:13,y:-45,z:-9},merchantX:13,merchantZ:-109});
 assert.equal(native.frame(123),123);assert.equal(native.frames,1);
 const scene=new T.sr(),world=new T.tt();scene.add(world);
 const avatars={skinCodeFromModel:()=>null,create:()=>({avatar:{group:new T.tt(),current:true,swingClock:{weightValue:0},setPickaxeTier(){},setMoving(){},setRiding(){},update(){}},dispose(){}})};
 const views=globalThis.__MINING_LOCAL_CAMERA_FACTORY__({Group:T.tt,Vector3:T.Lr,Raycaster:T.Yn},()=>{},avatars);
 const camera=new T.tn(70,16/9,.04,240);camera.rotation.order='YXZ';
 let directions=0;
 for(const target of [[0,-100],[100,0],[0,100],[-100,0],[70,-30],[-45,60]])for(const yaw of [-Math.PI,-2,-.01,0,.01,1.5,Math.PI])for(const pitch of [-Math.PI/2,-.9,0,.9,Math.PI/2])for(const mode of [0,1,2]){
  native.merchantX=native.body.x+target[0];native.merchantZ=native.body.z+target[1];
  camera.position.set(native.body.x,native.body.y+1.5,native.body.z);camera.rotation.set(pitch,yaw,0);camera.updateMatrixWorld(true);
  const position=camera.position.toArray(),rotation=camera.quaternion.toArray();
  hud.setShopHint('Shop 100m',true);hud.setShopArrowAngle(native.shopArrowAngle(yaw));
  views.beforeWorld(scene,world,camera,mode,root);compass.update(root,camera);
  assert.equal(hud.shopArrow.children.length,1);const needle=hud.shopArrow.children[0];
  const angle=Number(needle.style.transform.match(/^rotate\((.+)rad\)$/)[1]);assert.ok(Number.isFinite(angle));
  const q=camera.getWorldQuaternion(new T.cn()),right=new T.Lr(1,0,0).applyQuaternion(q);right.y=0;right.normalize();
  const forward=new T.Lr(right.z,0,-right.x),red=forward.multiplyScalar(Math.cos(angle)).addScaledVector(right,Math.sin(angle));
  assert.ok(red.dot(new T.Lr(...[target[0],0,target[1]]).normalize())>1-1e-10,'Red tip must point toward the shop in every rendered view');
  const nativeAngle=native.shopArrowAngle(yaw)+(mode===2?Math.PI:0);assert.ok(Math.cos(angle-nativeAngle)>1-1e-10);
  views.afterWorld(scene,camera);assert.deepEqual(camera.position.toArray(),position);assert.deepEqual(camera.quaternion.toArray(),rotation);
  assert.equal(hud.shopHintText.textContent,'Shop 100m');assert.equal(hud.shopHint.style.display,'flex');assert.equal(hud.shopArrow.style.display,'inline-block');directions++;
 }
 for(const [text,show]of [[null,false],['Riding',false],['商店 5m',true],['상점 5m',true],['商店 5米',true],['商店 5公尺',true]]){
  hud.setShopHint(text,show);const before=JSON.stringify([hud.shopHint.style,hud.shopHintText.textContent,hud.shopArrow.style.display]);compass.update(root,camera);
  assert.equal(JSON.stringify([hud.shopHint.style,hud.shopHintText.textContent,hud.shopArrow.style.display]),before);
 }
 const arrow=hud.shopArrow,needle=arrow.children[0];
 native.body.x=native.merchantX;native.body.z=native.merchantZ;compass.update(root,camera);assert.equal(arrow.children[0],needle);
 native.merchantX=NaN;compass.update(root,camera);assert.equal(arrow.children[0],needle);
 const untouched=createHud(),otherRoot={querySelector:()=>untouched.root};compass.update(otherRoot,camera);assert.equal(untouched.shopArrow.textContent,'▶');
 hud=createHud();native.hud=hud;native.merchantX=native.body.x+20;compass.update(root,camera);assert.equal(hud.shopArrow.children.length,1);
 assert.equal(native.exit(),'exited');hud=createHud();native.hud=hud;compass.update(root,camera);assert.equal(hud.shopArrow.textContent,'▶');
 native.active=true;native.frame(456);compass.update(root,camera);assert.equal(hud.shopArrow.children.length,1);
 assert.equal(NativeHUD.prototype.setShopHint,nativeHint);assert.equal(NativeHUD.prototype.setShopArrowAngle,nativeAngle);
 results.push({profile:profile.id,directions,frontRearFirstPerson:true,verticalLookStable:true,distanceAndVisibilityUnchanged:true,noDuplicateNeedles:true,invalidCoordinatesIgnored:true,hudReplacementAndReentry:true,unrelatedRootsUnchanged:true,nativeCameraRestored:true});
}
const manifest=JSON.parse(fs.readFileSync(new URL('../extension/manifest.json',import.meta.url),'utf8'));
const main=fs.readFileSync(new URL('../extension/main.js',import.meta.url),'utf8');assert.ok(main.indexOf('shopCompass?.update(root,camera)')>main.indexOf('cameraViews.beforeWorld(this, world, camera, perspective, root)'));
const css=fs.readFileSync(new URL('../src/mining.css',import.meta.url),'utf8');assert.ok(css.includes('transform:none!important;transition:none!important'));
const report={version:manifest.version,results,realGameVerified:false};const path=new URL(`work/evidence/public-${manifest.version}/shop-compass.json`,workspace);fs.mkdirSync(new URL('./',path),{recursive:true});fs.writeFileSync(path,JSON.stringify(report,null,2));console.log(JSON.stringify(report));
