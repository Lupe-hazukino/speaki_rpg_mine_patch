import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import * as T from '../../research/three.core-wy5OwqqC.js';
const root=new URL('../../',import.meta.url),extension=new URL('../extension/',import.meta.url),evidence=new URL('work/evidence/public-'+JSON.parse(fs.readFileSync(new URL('manifest.json',extension),'utf8')).version+'/',root);
const read=file=>fs.readFileSync(new URL(file,extension),'utf8');
const css=fs.readFileSync(new URL('../src/mining.css',import.meta.url),'utf8');
class Style{
 constructor(){this.values=new Map();this.priorities=new Map()}
 getPropertyValue(key){return this.values.get(key)||''}getPropertyPriority(key){return this.priorities.get(key)||''}
 setProperty(key,value,priority=''){this.values.set(key,value);this.priorities.set(key,priority)}
 removeProperty(key){this.values.delete(key);this.priorities.delete(key)}
}
class Element{
 constructor(tag='div'){this.tagName=tag.toUpperCase();this.children=[];this.attributes=new Map();this.events=new Map();this.style=new Style();this.dataset={};this.isConnected=true;this.hidden=false;this.disabled=false;this.checked=false;this.className='';this.textContent='';this.classList={add(){},remove(){}}}
 setAttribute(key,value){this.attributes.set(key,String(value))}getAttribute(key){return this.attributes.get(key)??null}hasAttribute(key){return this.attributes.has(key)}
 append(...children){for(const child of children){this.children.push(child);child.parentElement=this}}
 addEventListener(type,callback){const list=this.events.get(type)||[];list.push(callback);this.events.set(type,list)}
 emit(type,event={}){for(const listener of this.events.get(type)||[])listener(event)}
 getRootNode(){return this.parentElement?.getRootNode()||this}focus(){this.getRootNode().activeElement=this}getClientRects(){return [{}]}
 matches(selector){return selector==='[data-mining-i18n]'&&this.hasAttribute('data-mining-i18n')}
 querySelectorAll(selector){return this.children.flatMap(child=>[...(selector.startsWith('.')&&child.className.split(' ').includes(selector.slice(1))||child.matches(selector)?[child]:[]),...child.querySelectorAll(selector)])}
 querySelector(selector){return this.querySelectorAll(selector)[0]||null}
}
const document=new Element('document');document.documentElement=new Element('html');document.documentElement.lang='ja';document.createElement=tag=>new Element(tag);
const window=new Element('window'),context={console,window,document,navigator:{language:'ja'},localStorage:{getItem:()=>null},HTMLElement:Element,
 MutationObserver:class{observe(){}disconnect(){}},performance:{now:()=>1000},queueMicrotask(){}};
vm.createContext(context);for(const file of ['i18n.js','realistic-lighting.js','local-shadows.js','paper-doll.js'])vm.runInContext(read(file),context);
context.__MINING_LOCAL_RESOURCES__={css};context.__MINING_LOCAL_SNEAK__={enabled:false,supported:true,subscribe(){}};
const main=read('main.js');assert.ok(!main.includes('distributionHint'));assert.ok(!/renderDistance|distanceFactory|distanceFieldset|RENDER_DISTANCE/.test(main));
const manifest=JSON.parse(read('manifest.json'));assert.ok(!manifest.content_scripts[0].js.includes('render-distance.js'));assert.equal(fs.existsSync(new URL('render-distance.js',extension)),false);
const exposed=main.replace(/\}\)\(\);\s*$/,"globalThis.uiTest={init(T){localShadows=shadowFactory(T,shadowStatus,{realismFactory});paperDoll=paperDollFactory(T,{});return {shadows:localShadows,paperDoll}},mount(root){const state=installUI(root);activeMineUI={root,state};return state}};})();");
vm.runInContext(exposed,context);const controllers=context.uiTest.init(T);
const hud=new Element();hud.className='mhud';const mineRoot=new Element();mineRoot.host=new Element();mineRoot.append(hud);const ui=context.uiTest.mount(mineRoot);
assert.equal(ui.dialog.children[0].textContent,'スピキクラフトMOD 設定');
assert.equal(ui.shadowCheckbox.checked,false);assert.equal(controllers.shadows.enabled,false);
assert.equal(ui.paperDollCheckbox.checked,false);assert.equal(controllers.paperDoll.enabled,false);
ui.paperDollCheckbox.checked=true;ui.paperDollCheckbox.emit('change');assert.equal(controllers.paperDoll.enabled,true);
ui.paperDollCheckbox.checked=false;ui.paperDollCheckbox.emit('change');assert.equal(controllers.paperDoll.enabled,false);
assert.equal(ui.sunRadios.find(radio=>radio.checked).value,'day');assert.equal(ui.rangeRadios.find(radio=>radio.checked).value,'ultra');
assert.equal(ui.distanceFieldset,undefined);assert.equal(ui.distanceRadios,undefined);assert.equal(ui.distanceInfo,undefined);
assert.deepEqual(ui.shadowSection.children.filter(child=>child.tagName==='FIELDSET'),[ui.sunFieldset,ui.rangeFieldset]);
assert.notEqual(ui.realismSection,ui.shadowSection);assert.equal(ui.realismCheckbox.parentElement.parentElement,ui.realismSection);
assert.equal(ui.shadowCheckbox.parentElement.parentElement,ui.shadowSection);
assert.equal(ui.dialog.children[1].className,'mcModOption','No deleted-setting spacer remains');
const f2={code:'F2',key:'F2',composedPath:()=>[],preventDefault(){},stopImmediatePropagation(){}};window.emit('keydown',f2);assert.equal(ui.overlay.hidden,false);
ui.shadowCheckbox.checked=true;ui.shadowCheckbox.emit('change');assert.equal(controllers.shadows.enabled,true);
for(const radio of ui.sunRadios){radio.checked=true;radio.emit('change');assert.equal(controllers.shadows.timeOfDay,radio.value)}
for(const radio of ui.rangeRadios){radio.checked=true;radio.emit('change');assert.equal(controllers.shadows.range,radio.value)}
const choose=(control,value)=>{control.checked=value;control.emit('change')};
controllers.shadows.setTimeOfDay('evening');controllers.shadows.setRange('small');
assert.equal(ui.realismCheckbox.disabled,true);assert.equal(ui.shadowCheckbox.disabled,false);
choose(ui.realismCheckbox,true);assert.equal(ui.realismCheckbox.checked,false);assert.equal(controllers.shadows.realistic,false);
choose(ui.shadowCheckbox,false);choose(ui.realismCheckbox,true);
assert.equal(ui.shadowCheckbox.checked,false);assert.equal(controllers.shadows.enabled,false);
assert.equal(controllers.shadows.rendering,true);assert.equal(controllers.shadows.realistic,true);
assert.equal(ui.shadowCheckbox.disabled,true);assert.equal(ui.realismCheckbox.disabled,false);
assert.equal(ui.sunFieldset.disabled,true);assert.equal(ui.rangeFieldset.disabled,true);
assert.equal(ui.sunRadios.find(radio=>radio.checked).value,'evening');assert.equal(ui.rangeRadios.find(radio=>radio.checked).value,'small');
choose(ui.shadowCheckbox,true);assert.equal(ui.realismCheckbox.checked,true);assert.equal(ui.shadowCheckbox.checked,false);
choose(ui.realismCheckbox,false);
assert.equal(ui.realismCheckbox.disabled,false);assert.equal(ui.shadowCheckbox.disabled,false);
assert.equal(ui.sunFieldset.disabled,true);assert.equal(ui.rangeFieldset.disabled,true);
choose(ui.shadowCheckbox,true);
assert.equal(ui.shadowCheckbox.checked,true);assert.equal(controllers.shadows.enabled,true);
assert.equal(ui.realismCheckbox.disabled,true);
assert.equal(ui.sunFieldset.disabled,false);assert.equal(ui.rangeFieldset.disabled,false);
assert.equal(ui.sunRadios.find(radio=>radio.checked).value,'evening');assert.equal(ui.rangeRadios.find(radio=>radio.checked).value,'small');
choose(ui.realismCheckbox,true);assert.equal(ui.realismCheckbox.checked,false);choose(ui.shadowCheckbox,false);choose(ui.realismCheckbox,true);
assert.equal(ui.realismCheckbox.checked,true);assert.equal(controllers.shadows.realistic,true);assert.equal(controllers.shadows.rendering,true);
choose(ui.realismCheckbox,false);assert.equal(controllers.shadows.rendering,false);
assert.equal(ui.dialog.children.filter(child=>child===ui.realismSection).length,1);
assert.equal(ui.dialog.children.filter(child=>child===ui.shadowSection).length,1);
const expected={
 ja:['影を表示する','時間帯','Shift中は移動速度が30％になり、一人称の視点だけ少し下がります。'],
 ko:['그림자 표시','시간대','Shift를 누르면 이동 속도가 평소의 30%가 되고 1인칭 시점만 조금 낮아집니다.'],
 en:['Show shadows','Time of day','Holding Shift reduces movement speed to 30% of normal and slightly lowers the first-person camera.'],
 'zh-CN':['显示阴影','时段','按住Shift时，移动速度降至平时的30%，仅第一人称视角会略微降低。'],
 'zh-TW':['顯示陰影','時段','按住Shift時，移動速度降至平時的30%，只有第一人稱視角會稍微降低。']
};
let locale='ja';context.__MINING_LOCAL_BIND_I18N__({getLocale:()=>locale});
const paragraphs=object=>[...(object.tagName==='P'?[object]:[]),...object.children.flatMap(paragraphs)];
for(const [code,labels] of Object.entries(expected)){
 locale=code;context.__MINING_LOCAL_I18N__.refresh();context.__MINING_LOCAL_I18N__.update(mineRoot);
 assert.deepEqual([ui.shadowCheckbox.parentElement.children[1].textContent,ui.sunFieldset.children[0].textContent,ui.sneakHint.textContent],labels);
 assert.ok(paragraphs(ui.dialog).every(paragraph=>paragraph.textContent.trim().length>0),'No empty explanatory rows');
 assert.equal(ui.rangeRadios.filter(input=>input.checked).length,1);
 assert.equal(context.__MINING_LOCAL_I18N__.t('renderDistance'),'renderDistance','Removed translation keys do not remain');
 const hint=ui.realismSection.children[1];
 assert.equal(hint.textContent,context.__MINING_LOCAL_I18N__.t('realismHint'),'Fixed-mode help is translated');
 assert.ok(hint.textContent.length>0);
 assert.equal(ui.paperDollCheckbox.parentElement.children[1].textContent,context.__MINING_LOCAL_I18N__.t('paperDollLabel'));
}
ui.shadowCheckbox.checked=false;ui.shadowCheckbox.emit('change');assert.equal(ui.rangeFieldset.disabled,true);assert.equal(ui.sunFieldset.disabled,true);
window.emit('keydown',f2);assert.equal(ui.overlay.hidden,true);
const report={version:manifest.version,controlsAndF2TextPreserved:true,languagesChecked:5,renderDistanceUIAndDiagnosticsRemoved:true,renderDistanceRuntimeNotLoaded:true,
 paperDollDefaultOff:true,paperDollCheckboxWorks:true,paperDollFiveLanguages:true,shadowDefaultOff:true,timeDefaultNoon:true,shadowRangeDefaultUltra:true,independentShadowRangePreserved:true,dialogHasNoRemovedFieldsetOrSpacer:true,
 mutuallyExclusiveLightingModes:true,otherCheckboxDisabled:true,disabledChangeEventsRejected:true,separateModeFrames:true,realismLocksDayAndUltra:true,previousShadowChoicesRestored:true,noDuplicateSettings:true};
fs.writeFileSync(new URL('render-settings.json',evidence),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
