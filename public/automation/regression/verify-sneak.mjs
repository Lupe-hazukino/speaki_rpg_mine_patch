import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as native from '../../work/evidence/current/current-native.mjs';
import * as T from '../../research/three.core-wy5OwqqC.js';

const window = new EventTarget(),document = new EventTarget();
document.activeElement=null;document.hidden=false;
const saved = new Map();
const browser = {window,document,HTMLElement:class{},localStorage:{getItem:k=>saved.get(k),setItem:(k,v)=>saved.set(k,v)},console};
vm.createContext(browser);
vm.runInContext(fs.readFileSync(new URL('../extension/sneak.js',import.meta.url),'utf8'),browser);
const api=browser.__MINING_LOCAL_SNEAK__;
let status,mode=0,menu=false,visible=true,queries=0,nativeCalls=0;
api.subscribe(value=>{status=value});
assert.equal(api.enabled,true);assert.equal(api.supported,false);
const root={host:{isConnected:true,getClientRects:()=>visible?[{}]:[]},querySelector:()=>({}),activeElement:null};
class WorldClass {
  group={};blocks=new Map();metas=new Map();
  query=(x,y,z)=>{queries++;return this.blocks.get(`${x},${y},${z}`)??0};
  metaQuery=(x,y,z)=>this.metas.get(`${x},${y},${z}`)??0;
  put(x,y,z,id=2,meta=0){this.blocks.set(`${x},${y},${z}`,id);this.metas.set(`${x},${y},${z}`,meta);return this}
  stepPhysics(body,input,dt){nativeCalls++;native.worldStep.call(this,body,input,dt)}
}
browser.__MINING_LOCAL_BIND_PHYSICS__({...native,WorldClass});
assert.equal(api.supported,true);
assert.equal(browser.__MINING_LOCAL_BIND_PHYSICS__,undefined);
function key(type,code='ShiftLeft',extra={}){
  const event=new Event(type);Object.assign(event,{code,composedPath:()=>[],...extra});window.dispatchEvent(event);
}
const camera = new T.tn(70,16/9,.04,240),target=new T.tt();target.position.set(.5,1,.5);
const nativeCamera = new native.CameraClass({camera,target});
function use(world){api.setContext({root,worldGroup:world.group,camera,getPerspective:()=>mode,isMenuOpen:()=>menu})}
function body(x=.5,y=1,z=.5){return {...native.createBody(x,y,z),grounded:true,riseAnchorY:y}}
function motion(x,z,jump=false){return {moveVx:x,moveVz:z,jump}}
function slow(input){return {...input,moveVx:input.moveVx*.3,moveVz:input.moveVz*.3}}
const frame=1/60;
function run(world,b,input,count=120,dt=frame){for(let i=0;i<count;i++)world.stepPhysics(b,input,dt);return b}
const tested=[];
let measuredMovement=null;
function check(name,fn){fn();tested.push(name)}

check('four edges and diagonal hold, 60 Hz and 10 Hz',()=>{
 for(const dt of [frame,.1,.5])for(const [x,z] of [[4,0],[-4,0],[0,4],[0,-4],[2.828,2.828],[-2.828,2.828],[2.828,-2.828],[-2.828,-2.828]]){
  const world=new WorldClass().put(0,0,0);use(world);key('keydown');const b=run(world,body(),motion(x,z),180,dt);
  assert.ok(b.grounded&&Math.abs(b.y-1)<1e-9,JSON.stringify({dt,x,z,b}));
  assert.ok(b.x>-.35&&b.x<1.35&&b.z>-.35&&b.z<1.35);
 }
});
check('release Shift resumes falling',()=>{
 const world=new WorldClass().put(0,0,0);use(world);key('keydown');const b=run(world,body(),motion(4,0));
 key('keyup');run(world,b,motion(4,0),60);assert.ok(b.y<0&&!b.grounded);
});
check('Shift-up frames preserve every native body field',()=>{
 key('keyup');const world=new WorldClass();for(let x=-3;x<8;x++)for(let z=-3;z<8;z++)world.put(x,0,z);
 world.put(2,1,2);use(world);const a=body(),b=body();
 for(let i=0;i<240;i++){const input=motion(Math.sin(i*.09)*4,Math.cos(i*.07)*4,i===35);world.stepPhysics(a,input,frame);native.advance(world.query,b,input,frame,world.metaQuery);assert.deepEqual(a,b)}
});
check('Shift uses 30 percent horizontal speed and does not mutate input',()=>{
 const world=new WorldClass();for(let x=-4;x<25;x++)for(let z=-4;z<4;z++)world.put(x,0,z);
 use(world);key('keydown');const a=body(),b=body(),normal=body();
 for(let i=0;i<180;i++){const input=motion(4,0);world.stepPhysics(a,input,frame);native.advance(world.query,b,slow(input),frame,world.metaQuery);native.advance(world.query,normal,input,frame,world.metaQuery);assert.deepEqual(a,b);assert.equal(input.moveVx,4)}
 assert.ok(Math.abs((a.x-.5)/(4*180*frame)-.3)<1e-9);assert.equal(status.speedMultiplier,.3);
 measuredMovement={seconds:3,normalDistance:normal.x-.5,shiftDistance:a.x-.5,ratio:(a.x-.5)/(normal.x-.5)};
});
check('jump may leave the edge, preserving native jump and fall',()=>{
 const world=new WorldClass().put(0,0,0);use(world);key('keydown');const a=body(),b=body();
 for(let i=0;i<80;i++){const input=motion(4,0,i===0);world.stepPhysics(a,input,frame);native.advance(world.query,b,slow(input),frame,world.metaQuery);assert.deepEqual(a,b)}
 assert.ok(a.y<0);
});
check('removed support and already-airborne player fall normally',()=>{
 const world=new WorldClass().put(0,0,0);use(world);key('keydown');const b=body();world.blocks.clear();run(world,b,motion(0,0),30);assert.ok(b.y<0);
 const a={...body(.5,3,.5),grounded:false},copy={...a};for(let i=0;i<40;i++){world.stepPhysics(a,motion(2,0),frame);native.advance(world.query,copy,slow(motion(2,0)),frame,world.metaQuery);assert.deepEqual(a,copy)}
});
check('native wall slide and upward full-block step are preserved',()=>{
 const world=new WorldClass();for(let x=-2;x<7;x++)for(let z=-2;z<7;z++)world.put(x,0,z);
 for(let x=2;x<7;x++)for(let z=-2;z<7;z++)world.put(x,1,z);use(world);key('keydown');const a=body(),b=body();
 for(let i=0;i<150;i++){const input=motion(4,1);world.stepPhysics(a,input,frame);native.advance(world.query,b,slow(input),frame,world.metaQuery);assert.deepEqual(a,b)}
 assert.ok(a.y>=1&&a.x>2);
});
check('half slab edge is protected using the native shape',()=>{
 const world=new WorldClass().put(0,0,0,128);use(world);key('keydown');const b=run(world,body(.5,.5,.5),motion(4,0));assert.equal(b.y,.5);assert.ok(b.grounded&&b.x<1.35);
});
check('tall wall sliding and low ceiling preserve native collision response',()=>{
 for(const ceiling of [false,true]){
  const world=new WorldClass();for(let x=-3;x<8;x++)for(let z=-3;z<8;z++)world.put(x,0,z);
  for(let z=-3;z<8;z++)for(let y=ceiling?2:1;y<5;y++)world.put(2,y,z);
  use(world);key('keydown');const a=body(),b=body();
  for(let i=0;i<240;i++){const input=motion(3,2);world.stepPhysics(a,input,frame);native.advance(world.query,b,slow(input),frame,world.metaQuery);assert.deepEqual(a,b)}
  assert.ok(a.x<2&&a.z>2);
 }
});
check('descending half slab is allowed; one-block cliff is stopped',()=>{
 const slab=new WorldClass().put(0,0,0).put(1,0,0,128).put(2,0,0,128);use(slab);key('keydown');const b=run(slab,body(),motion(4,0),90);assert.ok(b.x>1.5&&b.y>=.5&&b.y<1);
 const cliff=new WorldClass().put(0,1,0).put(1,0,0).put(2,0,0);use(cliff);const c=run(cliff,body(.5,2,.5),motion(4,0),120);assert.ok(c.x<1.35&&c.y===2);
});
check('one-block gap cannot be crossed at a long frame interval',()=>{
 const world=new WorldClass().put(0,0,0).put(2,0,0);use(world);key('keydown');const b=run(world,body(1.3,1,.5),motion(12,0),30,.1);assert.ok(b.x<1.35&&b.y===1);
});
check('native stairs and fence tops use their exact boxes',()=>{
 const stair=new WorldClass().put(0,0,0,129,0);use(stair);key('keydown');const b=run(stair,body(.5,.5,.15),motion(-4,0));assert.ok(b.grounded&&b.y===.5&&b.x>-.35,JSON.stringify(b));
 const fence=new WorldClass().put(0,0,0,130);use(fence);const c=run(fence,body(.5,1.5,.5),motion(4,0));assert.ok(c.grounded&&c.y===1.5&&c.x<.975);
});
check('menu, hidden root, other world and setting off delegate unchanged',()=>{
 for(const kind of ['menu','hidden','other','disabled']){
  const w=new WorldClass().put(0,0,0);use(w);key('keydown');menu=kind==='menu';visible=kind!=='hidden';if(kind==='other')use(new WorldClass());if(kind==='disabled')api.setEnabled(false);
  const a=body(),b=body();for(let i=0;i<40;i++){w.stepPhysics(a,motion(4,0),frame);native.advance(w.query,b,motion(4,0),frame,w.metaQuery);assert.deepEqual(a,b)}
  menu=false;visible=true;api.setEnabled(true);
 }
});
check('left and right Shift, blur, focus and storage lifecycle',()=>{
 key('keydown','ShiftLeft');key('keydown','ShiftRight');key('keyup','ShiftLeft');assert.ok(status.held);
 window.dispatchEvent(new Event('blur'));assert.equal(status.held,false);
 key('keydown','ShiftLeft',{isComposing:true});assert.equal(status.held,false);
 key('keydown','ShiftLeft',{ctrlKey:true});assert.equal(status.held,false);
 key('keydown');const focus=new Event('focusin');Object.assign(focus,{composedPath:()=>[{isContentEditable:true,matches:()=>false,__proto__:browser.HTMLElement.prototype}]});window.dispatchEvent(focus);assert.equal(status.held,false);
 api.setEnabled(false);assert.equal([...saved.values()].includes('false'),true);api.setEnabled(true);
});
check('first-person alone drops .35, without accumulation or target changes',()=>{
 const world=new WorldClass().put(0,0,0);use(world);key('keydown');mode=0;
 for(let i=0;i<20;i++){nativeCamera.update();assert.ok(Math.abs(camera.position.y-2.15)<1e-10)}
 assert.deepEqual(target.position.toArray(),[.5,1,.5]);
 for(const value of [1,2]){mode=value;nativeCamera.update();assert.equal(camera.position.y,2.5);assert.deepEqual(target.position.toArray(),[.5,1,.5])}
 mode=0;nativeCamera.setSeated(true);assert.equal(camera.position.y,1.9);nativeCamera.setSeated(false);assert.ok(Math.abs(camera.position.y-2.15)<1e-10);
 key('keyup');nativeCamera.update();assert.equal(camera.position.y,2.5);
});
check('only one committed native body update per guarded frame',()=>{
 const world=new WorldClass().put(0,0,0);use(world);key('keydown');nativeCalls=0;run(world,body(),motion(4,0),120);assert.equal(nativeCalls,120);
});
const benchWorld=new WorldClass().put(0,0,0);use(benchWorld);key('keydown');const benchBody=body(1.32,1,.5);queries=0;
const start=performance.now();run(benchWorld,benchBody,motion(4,0),1000);const ms=performance.now()-start;
const result={version:JSON.parse(fs.readFileSync(new URL('../extension/manifest.json',import.meta.url),'utf8')).version,nativePhysics:'reviewed current client fHe/cHe/voxel shapes',tests:tested.length,passed:tested,edgeBenchmarkMsPerFrame:ms/1000,edgeBenchmarkQueriesPerFrame:queries/1000,blockedSteps:status.blockedSteps,eyeDrop:.35,shiftSpeedMultiplier:.3,measuredMovement,realGameVerified:false};
fs.mkdirSync(new URL('../../work/evidence/current/',import.meta.url),{recursive:true});
fs.writeFileSync(new URL('../../work/evidence/current/native-physics.json',import.meta.url),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
