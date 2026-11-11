// F9 restore events must reach the native input before MOD shortcuts or hold-placement.
import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
import {parse} from '../../tools/vendor/acorn.mjs';
import {clientProfiles} from '../extension/client/loader.mjs';
const root=new URL('../../',import.meta.url),profile=clientProfiles[0];
const source=fs.readFileSync(new URL('research/'+new URL(profile.entryURL).pathname.split('/').at(-1),root),'utf8');
const ast=parse(source,{ecmaVersion:'latest',sourceType:'module'});
const klass=ast.body.flatMap(n=>n.declarations||[]).find(n=>n.id.name===profile.names.VAe).init;
const method=name=>{const n=klass.body.body.find(n=>n.key?.name===name);return source.slice(n.start,n.end)};
const key=method('onKeyDown'),allowed=key.match(/if\(([$\w]+)\.has\(/)[1],hide=key.match(/e\.code===([$\w]+)\?this\.callbacks\.onToggleHudHidden/)[1];
class Element{constructor(){this.isConnected=true;this.style={};this.classList={toggle(){}}}getClientRects(){return[{}]}querySelector(){return null}querySelectorAll(){return[]}toggleAttribute(){}setAttribute(){}matches(){return false}}
const window=new EventTarget(),document=Object.assign(new EventTarget(),{activeElement:null,pointerLockElement:null,hidden:false,getElementById:()=>({})});
const scope={window,document,HTMLElement:Element,localStorage:{getItem:()=>null,setItem(){}},performance:{now:()=>1000},console};vm.createContext(scope);
vm.runInContext(`const ${allowed}=new Set(['Shift','Control','Alt','Meta']),${hide}='F9';
class Input {sampleMove(){return {x:0,z:0}}clear(){} ${key}}
class HUD {rebuildHotbar(){}}
class Scene {frame(){}tryPlace(){this.placements++}}
globalThis.api={InputClass:Input,HUDClass:HUD,SceneClass:Scene,keyHints:{},actionHints:{}};`,scope);
vm.runInContext(fs.readFileSync(new URL('public/extension/controls.js',root),'utf8'),scope);
let status;const control=scope.__MINING_LOCAL_CONTROLS_FACTORY__(v=>status=v);scope.__MINING_LOCAL_BIND_CONTROLS__(scope.api);
const {InputClass:Input,HUDClass:HUD,SceneClass:Scene}=scope.api,host=new Element(),hud=new HUD(),input=new Input(),scene=new Scene(),hudRoot=new Element();
const shadow={host,activeElement:null,querySelector:s=>s==='.mhud'?hudRoot:null,querySelectorAll:()=>[]};
input.canvas={getRootNode:()=>shadow};input.lock='locked';input.panelOpen=false;input.keys=new Set();input.sampleMove();
Object.assign(hud,{root:hudRoot,anyPanelOpen:false,isPickaxeMode:()=>false,selectedPlaceKind:()=>11,selectedPlaceCount:()=>64,selectedBrush:()=>({kind:11}),brushEnabled:()=>true});hud.rebuildHotbar();
Object.assign(scene,{shadow,input,hud,active:true,ready:true,riding:null,placements:0});scene.frame();control.setContext({root:shadow,isMenuOpen:()=>false});
let restored=0,toggled=0;input.callbacks={onRestoreHud(){restored++;input.hudHidden=false},onToggleHudHidden(){toggled++;input.hudHidden=false}};
for(const code of ['KeyE','KeyT','F1','F9']){
 input.hudHidden=true;let consumed=false;const event={code,key:code,preventDefault(){},stopImmediatePropagation(){consumed=true},composedPath:()=>[]};
 assert.equal(control.handleKey(event),false,'Restore key must pass to native: '+code);input.onKeyDown(event);assert.ok(consumed);assert.equal(input.hudHidden,false);
}
assert.equal(restored,3);assert.equal(toggled,1);assert.equal(status.hudHidden,false,'Native photo restore must not toggle MOD F1');
input.hudHidden=true;control.startPlaceHold(input,{button:2,pointerType:'mouse'});assert.equal(status.placeHeld,false);
input.hudHidden=false;control.startPlaceHold(input,{button:2,pointerType:'mouse'});assert.equal(status.placeHeld,true);
input.hudHidden=true;control.repeatPlace(scene);assert.equal(status.placeHeld,false);assert.equal(scene.placements,0);
console.log(JSON.stringify({nativePhotoRestore:true,shortcutsPreserved:true,hiddenPlacementBlocked:true}));
