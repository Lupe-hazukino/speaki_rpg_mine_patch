// Verify semantic interfaces whose exported/minified names can shift independently.
import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
import {parse} from '../../tools/vendor/acorn.mjs';import {clientProfiles} from '../extension/client/loader.mjs';
const root=new URL('../../',import.meta.url),profile=clientProfiles[0];
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
console.log(JSON.stringify({localeGetterLanguages:5,currentNativeMethods:true,newItemInNativeRegistry:true}));
