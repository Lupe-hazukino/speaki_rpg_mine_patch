// Verify semantic interfaces whose exported/minified names can shift independently.
import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
import {parse} from '../../tools/vendor/acorn.mjs';import {clientProfiles} from '../extension/client/loader.mjs';
const root=new URL('../../',import.meta.url),profile=clientProfiles[0];
const injectedApi=parse(profile.bindings,{ecmaVersion:'latest',sourceType:'module'}).body.flatMap(n=>n.block?.body||[]).flatMap(n=>n.declarations||[]).find(n=>n.id.name==='api').init;
const injectedField=name=>injectedApi.properties.find(n=>n.key.name===name).value;
assert.ok(injectedField('avatarAssetsURL').value.endsWith('/'+profile.avatarAssets));
assert.deepEqual(Object.fromEntries(injectedField('avatarAssetExports').properties.map(n=>[n.key.name,n.value.value])),profile.avatarAssetExports);
const read=url=>fs.readFileSync(new URL('research/'+new URL(url).pathname.split('/').at(-1),root),'utf8');
const source=read(profile.entryURL),ast=parse(source,{ecmaVersion:'latest',sourceType:'module'});
const imports=ast.body.filter(n=>n.type==='ImportDeclaration'),localeImport=imports.find(n=>n.specifiers.some(s=>s.local.name===profile.names.Sr));
assert.ok(localeImport.source.value.includes('i18n-'));
const localeExport=localeImport.specifiers.find(s=>s.local.name===profile.names.Sr).imported.name;
const localeSource=read(new URL(localeImport.source.value,profile.entryURL)),localeAst=parse(localeSource,{ecmaVersion:'latest',sourceType:'module'});
const getterName=localeAst.body.find(n=>n.type==='ExportNamedDeclaration').specifiers.find(s=>s.exported.name===localeExport).local.name;
const getter=localeAst.body.find(n=>n.type==='FunctionDeclaration'&&n.id.name===getterName);
assert.equal(getter.params.length,0);assert.equal(getter.body.body.length,1);const returned=getter.body.body[0].argument;assert.equal(returned.type,'Identifier');
for(const locale of ['ja','ko','en','zh-CN','zh-TW'])assert.equal(vm.runInNewContext('const '+returned.name+'='+JSON.stringify(locale)+';'+localeSource.slice(getter.start,getter.end)+';'+getterName+'()'),locale);
const declarations=new Map(ast.body.flatMap(n=>n.declarations||[]).map(n=>[n.id.name,n.init]));
const kinds=declarations.get(profile.names.LH).elements.filter(n=>n.type==='Literal').map(n=>n.value);assert.ok(kinds.includes(31)&&kinds.includes(34));
const tile=ast.body.find(n=>n.type==='FunctionDeclaration'&&n.id.name===profile.names.YH);
// The native item-to-tile function keeps the newly added item branch.
assert.ok(source.slice(tile.start,tile.end).includes('===34?'),'New native item must retain its tile mapping');
const physics=declarations.get(profile.names.pAe),input=declarations.get(profile.names.VAe),mine=declarations.get(profile.names.sLe);
for(const [node,methods]of [[physics,['stepPhysics','setTorchRadius','rebuild']],[input,['sampleMove','onKeyDown','setHudHidden']],[mine,['frame','tryPlace','applyAnimState','applyPlayerSpawn','animationControllerOf','updateCaveMix','restoreHud']]])for(const method of methods)assert.ok(node.body.body.some(n=>n.key?.name===method),method);
// Load native modules without downloading models or connecting to the game.
// Export names can change while the entry point still exposes valid bindings.
const assets=await import(new URL('research/'+profile.avatarAssets,root));
const T=await import(new URL('research/three.core-wy5OwqqC.js',root));
const names=profile.avatarAssetExports;
assert.equal(assets[names.defaultExpression],'open_smile');
const model=new T.tt(),material=new T.Gt();material.name='Face';
const mesh=new T.Lt(new T.g(.2,.2,.2),material);model.add(mesh);
const materials=assets[names.faceMaterials](model);assert.deepEqual(materials,[material]);
const texture={isTexture:true},face=new assets[names.faceExpression](materials,new Map([['open_smile',texture]]));
face.setExpression(assets[names.defaultExpression]);assert.equal(material.map,texture);
assert.ok(assets._(model) instanceof Float32Array);
const controller=new assets.y(new T.a(model),new Map([['idle',new T.i('idle',1,[])],['run',new T.i('run',1,[])]]),face);
controller.update(1/60);controller.setLocomotion(true);controller.update(1/60);controller.reset();
assert.equal(controller.sourceClips.size,2);assert.equal(controller.mixer.getRoot(),model);
controller.mixer.stopAllAction();controller.mixer.uncacheRoot(model);mesh.geometry.dispose();material.dispose();
console.log(JSON.stringify({localeGetterLanguages:5,currentNativeMethods:true,newItemInNativeRegistry:true,nativeAvatarFaceAndAnimation:true}));
