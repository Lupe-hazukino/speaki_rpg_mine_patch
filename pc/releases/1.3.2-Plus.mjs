/* Bind to the site's own client in memory. No game client is bundled here. */
const legacyEntryURL='https://speakirpg.overture.io.kr/assets/index-CAInRo03.js';
const legacyHash='662009e038ed2888eab925b7ec6b7448dd80ffc31bc7fafd8b619cd700a3edef';
const legacyBindings=`
// Speaki_rpg_mine_patch (スピキクラフトMOD): expose native interfaces before the game's normal boot.
try { globalThis.__MINING_LOCAL_BIND_I18N__?.({getLocale:Sr,translate:I}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] Language binding',e)}
try { globalThis.__MINING_LOCAL_BIND_PHYSICS__?.({WorldClass:pAe,CameraClass:jAe,advance:Rke,moveY:Pke,collides:jV,unknown:AV,fixedStep:jke,maxStep:Mke}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] Shift接続',e)}
try { globalThis.__MINING_LOCAL_BIND_HOTBAR__?.({HUDClass:jPe,BuildClass:zNe,normalizeBrush:oW,saveBrushes:SNe,itemIcons:qH,itemName:$H,shapeName:dW,colorName:uW,canColor:nW,farHint:()=>I('ui.mining.target.far')}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] ホットバー接続',e)}
try { globalThis.__MINING_LOCAL_BIND_ICONS__?.({itemIcons:qH,itemKinds:LH,iconForKind:QH,itemTile:YH,tileFor:wB,blockShape:qz,blockForItem:kind=>{const ore=PH.indexOf(kind);return ore>=0?uB.ORE_1+ore:kind===11?uB.STONE:kind===12?uB.DIRT:tW(kind,0)},createCartIconSource:()=>{const view=new YPe(()=>0),cart=view.createCart(0);return{root:cart.root,dispose:()=>{cart.root.removeFromParent();view.dispose()}}}}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] アイコン接続',e)}
try { globalThis.__MINING_LOCAL_BIND_CONTROLS__?.({HUDClass:jPe,InputClass:VAe,SceneClass:sLe,ChatClass:pue,keyHints:hH,actionHints:mH,placeIntervalMs:DIe}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] 操作接続',e)}
try { globalThis.__MINING_LOCAL_BIND_COMPASS__?.({SceneClass:sLe}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] ショップ方角接続',e)}
try {
 const api={GameWorldClass:q5e,SceneClass:sLe,AvatarClass:_Fe,PickaxeKit:gFe,cloneAvatar:_a,colorForTier:lFe,tierFromColor:color=>[1,2,3,4].find(tier=>lFe(tier)===color)||1};
 globalThis.__MINING_LOCAL_NATIVE_API__=api;globalThis.__MINING_LOCAL_BIND_AVATAR__?.(api);
} catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] 全身表示接続',e)}
`;
const previousEntryURL='https://speakirpg.overture.io.kr/assets/index-DSJD43y8.js';
const previousHash='88f7275378189e6429ed077816f1da971dca2f87c6554cf0bec850d097f9f2d8';
const priorEntryURL='https://speakirpg.overture.io.kr/assets/index-DV-raoHJ.js';
const nov5EntryURL='https://speakirpg.overture.io.kr/assets/index-CRU_92JX.js';
const priorHash='07a9b1126c09e23265902951bf82c196bd9d559dbbabf5d9880f1e74d46bb6a8';
const nov5Hash='712e900375b52aec332caf66a16b8730614928dd0f072939a87881b0ac6e58dd';
// Names are resolved from the reviewed client's declarations, not guessed at run time.
const previousNames={pAe:'rje',jAe:'xje',Rke:'OAe',Pke:'wAe',jV:'EV',AV:'TV',jke:'xAe',Mke:'SAe',jPe:'SFe',zNe:'APe',oW:'nW',SNe:'pPe',qH:'UH',QH:'JH',YH:'GH',$H:'YH',dW:'sW',uW:'oW',nW:'QU',Sr:'wr',wB:'yB',qz:'Hz',PH:'AH',LH:'NH',uB:'aB',tW:'ZU',YPe:'BFe',VAe:'jje',sLe:'QLe',pue:'Jle',hH:'dH',mH:'uH',q5e:'$7e',_Fe:'cIe',gFe:'sIe',_a:'io',lFe:'eIe',DIe:'vLe'};
const priorNames={"pAe":"KLe","jAe":"uRe","Rke":"_Le","Pke":"pLe","jV":"pV","AV":"fV","jke":"uLe","Mke":"dLe","jPe":"dHe","zNe":"yVe","oW":"UU","SNe":"nVe","qH":"AH","QH":"FH","YH":"MH","$H":"IH","dW":"JU","uW":"qU","nW":"zU","Sr":"xr","wB":"oB","qz":"kz","PH":"_H","LH":"bH","uB":"Kz","tW":"RU","YPe":"kHe","VAe":"bRe","sLe":"VWe","pue":"Xpe","hH":"QV","mH":"ZV","q5e":"not","_Fe":"ZHe","gFe":"XHe","_a":"Sa","lFe":"UHe","DIe":"sWe"};
const nov5Names={"pAe":"hRe","jAe":"NRe","Rke":"FLe","Pke":"jLe","jV":"aV","AV":"iV","jke":"OLe","Mke":"kLe","jPe":"HHe","zNe":"YVe","oW":"HU","SNe":"MVe","qH":"OH","QH":"NH","YH":"AH","$H":"PH","dW":"qU","uW":"KU","nW":"RU","Sr":"xr","wB":"Xz","qz":"vz","PH":"hH","LH":"vH","uB":"Iz","tW":"LU","YPe":"oUe","VAe":"URe","sLe":"_Ge","pue":"e_","hH":"YV","mH":"JV","q5e":"Not","_Fe":"OUe","gFe":"DUe","_a":"va","lFe":"bUe","DIe":"LWe"};
const previousBindings=legacyBindings.replace(/[$A-Z_a-z][$\w]*/g,name=>previousNames[name]||name)
  .replace('const api={','const api={occludesBlock:sB,avatarAssetsURL:"https://speakirpg.overture.io.kr/assets/speakiAssets-BMwsYJWu.js",');
const priorBindings=legacyBindings.replace(/[$A-Z_a-z][$\w]*/g,name=>priorNames[name]||name)
  .replace('const api={','const api={occludesBlock:Jz,avatarAssetsURL:"https://speakirpg.overture.io.kr/assets/speakiAssets-Ch__-ois.js",avatarAssetExports:{faceMaterials:"R",faceExpression:"I",defaultExpression:"F"},');
const nov5Bindings=legacyBindings.replace(/[$A-Z_a-z][$\w]*/g,name=>nov5Names[name]||name)
  .replace('const api={','const api={occludesBlock:Rz,avatarAssetsURL:"https://speakirpg.overture.io.kr/assets/speakiAssets-Ch__-ois.js",avatarAssetExports:{faceMaterials:"R",faceExpression:"I",defaultExpression:"F"},');
const nov8EntryURL="https://speakirpg.overture.io.kr/assets/index-BwwETeXW.js";
const nov8Hash="3321046e05f24d7905bc2e958c1c1489e0c40a471db93872b0fe5e179576b91e";
const nov8Names={"pAe":"SRe","jAe":"BRe","Rke":"HLe","Pke":"RLe","jV":"nV","AV":"tV","jke":"FLe","Mke":"ILe","jPe":"JHe","zNe":"tHe","oW":"BU","SNe":"RVe","qH":"TH","QH":"AH","YH":"DH","$H":"jH","dW":"GU","uW":"WU","nW":"IU","Sr":"br","wB":"qz","qz":"hz","PH":"fH","LH":"hH","uB":"Nz","tW":"FU","YPe":"fUe","VAe":"XRe","sLe":"CGe","pue":"ome","hH":"KV","mH":"GV","q5e":"Yot","_Fe":"PUe","gFe":"NUe","_a":"xa","lFe":"EUe","DIe":"UWe"};
const nov8Bindings=legacyBindings.replace(/[$A-Z_a-z][$\w]*/g,name=>nov8Names[name]||name)
  .replace('const api={','const api={occludesBlock:Fz,avatarAssetsURL:"https://speakirpg.overture.io.kr/assets/speakiAssets-Ch__-ois.js",avatarAssetExports:{faceMaterials:"R",faceExpression:"I",defaultExpression:"F"},');
export const entryURL="https://speakirpg.overture.io.kr/assets/index-CJ4C0HRf.js";
export const reviewedHash="c07166a14bf73e5b2b059b5131b2c71cf4a542f64fd28a013f4249c62eacd4a1";
const currentNames={"pAe":"bot","jAe":"Hot","Rke":"uat","Pke":"oat","jV":"EY","AV":"rat","jke":"Lit","Mke":"Rit","jPe":"Tft","zNe":"Fdt","oW":"ZX","SNe":"Gut","qH":"TX","QH":"EX","YH":"nct","$H":"DX","dW":"Zut","uW":"QX","nW":"But","Sr":"vr","wB":"gJ","qz":"Iq","PH":"sX","LH":"uX","uB":"rJ","tW":"zut","YPe":"Kft","VAe":"ost","sLe":"Jht","pue":"zPe","hH":"tX","mH":"eX","q5e":"x7t","_Fe":"Tpt","gFe":"Cpt","_a":"ea","lFe":"gpt","DIe":"oht"};
export const bindings="\n// Speaki_rpg_mine_patch (スピキクラフトMOD): expose native interfaces before the game's normal boot.\ntry { globalThis.__MINING_LOCAL_BIND_I18N__?.({getLocale:vr,translate:F}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] Language binding',e)}\ntry { globalThis.__MINING_LOCAL_BIND_PHYSICS__?.({WorldClass:bot,CameraClass:Hot,advance:uat,moveY:oat,collides:EY,unknown:rat,fixedStep:Lit,maxStep:Rit}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] Shift接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_HOTBAR__?.({HUDClass:Tft,BuildClass:Fdt,normalizeBrush:ZX,saveBrushes:Gut,itemIcons:TX,itemName:DX,shapeName:Zut,colorName:QX,canColor:But,farHint:()=>F('ui.mining.target.far')}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] ホットバー接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_ICONS__?.({itemIcons:TX,itemKinds:uX,iconForKind:EX,itemTile:nct,tileFor:gJ,blockShape:Iq,blockForItem:kind=>{const ore=sX.indexOf(kind);return ore>=0?rJ.ORE_1+ore:kind===11?rJ.STONE:kind===12?rJ.DIRT:zut(kind,0)},createCartIconSource:()=>{const view=new Kft(()=>0),cart=view.createCart(0);return{root:cart.root,dispose:()=>{cart.root.removeFromParent();view.dispose()}}}}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] アイコン接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_CONTROLS__?.({HUDClass:Tft,InputClass:ost,SceneClass:Jht,ChatClass:zPe,keyHints:tX,actionHints:eX,placeIntervalMs:oht}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] 操作接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_COMPASS__?.({SceneClass:Jht}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] ショップ方角接続',e)}\ntry {\n const api={occludesBlock:aJ,worldHeight:128,avatarAssetsURL:\"https://speakirpg.overture.io.kr/assets/speakiAssets-DwRXdv5B.js\",avatarAssetExports:{faceMaterials:\"B\",faceExpression:\"R\",defaultExpression:\"L\"},GameWorldClass:x7t,SceneClass:Jht,AvatarClass:Tpt,PickaxeKit:Cpt,cloneAvatar:ea,colorForTier:gpt,tierFromColor:color=>[1,2,3,4].find(tier=>gpt(tier)===color)||1};\n globalThis.__MINING_LOCAL_NATIVE_API__=api;globalThis.__MINING_LOCAL_BIND_AVATAR__?.(api);\n} catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] 全身表示接続',e)}\n";
export const clientProfiles=Object.freeze([
  Object.freeze({"id":"current","entryURL":"https://speakirpg.overture.io.kr/assets/index-CJ4C0HRf.js","hash":"c07166a14bf73e5b2b059b5131b2c71cf4a542f64fd28a013f4249c62eacd4a1","boot":"Rrn().catch(","imports":23,"bindings":"\n// Speaki_rpg_mine_patch (スピキクラフトMOD): expose native interfaces before the game's normal boot.\ntry { globalThis.__MINING_LOCAL_BIND_I18N__?.({getLocale:vr,translate:F}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] Language binding',e)}\ntry { globalThis.__MINING_LOCAL_BIND_PHYSICS__?.({WorldClass:bot,CameraClass:Hot,advance:uat,moveY:oat,collides:EY,unknown:rat,fixedStep:Lit,maxStep:Rit}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] Shift接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_HOTBAR__?.({HUDClass:Tft,BuildClass:Fdt,normalizeBrush:ZX,saveBrushes:Gut,itemIcons:TX,itemName:DX,shapeName:Zut,colorName:QX,canColor:But,farHint:()=>F('ui.mining.target.far')}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] ホットバー接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_ICONS__?.({itemIcons:TX,itemKinds:uX,iconForKind:EX,itemTile:nct,tileFor:gJ,blockShape:Iq,blockForItem:kind=>{const ore=sX.indexOf(kind);return ore>=0?rJ.ORE_1+ore:kind===11?rJ.STONE:kind===12?rJ.DIRT:zut(kind,0)},createCartIconSource:()=>{const view=new Kft(()=>0),cart=view.createCart(0);return{root:cart.root,dispose:()=>{cart.root.removeFromParent();view.dispose()}}}}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] アイコン接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_CONTROLS__?.({HUDClass:Tft,InputClass:ost,SceneClass:Jht,ChatClass:zPe,keyHints:tX,actionHints:eX,placeIntervalMs:oht}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] 操作接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_COMPASS__?.({SceneClass:Jht}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] ショップ方角接続',e)}\ntry {\n const api={occludesBlock:aJ,worldHeight:128,avatarAssetsURL:\"https://speakirpg.overture.io.kr/assets/speakiAssets-DwRXdv5B.js\",avatarAssetExports:{faceMaterials:\"B\",faceExpression:\"R\",defaultExpression:\"L\"},GameWorldClass:x7t,SceneClass:Jht,AvatarClass:Tpt,PickaxeKit:Cpt,cloneAvatar:ea,colorForTier:gpt,tierFromColor:color=>[1,2,3,4].find(tier=>gpt(tier)===color)||1};\n globalThis.__MINING_LOCAL_NATIVE_API__=api;globalThis.__MINING_LOCAL_BIND_AVATAR__?.(api);\n} catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] 全身表示接続',e)}\n","names":{"pAe":"bot","jAe":"Hot","Rke":"uat","Pke":"oat","jV":"EY","AV":"rat","jke":"Lit","Mke":"Rit","jPe":"Tft","zNe":"Fdt","oW":"ZX","SNe":"Gut","qH":"TX","QH":"EX","YH":"nct","$H":"DX","dW":"Zut","uW":"QX","nW":"But","Sr":"vr","wB":"gJ","qz":"Iq","PH":"sX","LH":"uX","uB":"rJ","tW":"zut","YPe":"Kft","VAe":"ost","sLe":"Jht","pue":"zPe","hH":"tX","mH":"eX","q5e":"x7t","_Fe":"Tpt","gFe":"Cpt","_a":"ea","lFe":"gpt","DIe":"oht"},"avatarAssets":"speakiAssets-DwRXdv5B.js","avatarAssetExports":{"faceMaterials":"B","faceExpression":"R","defaultExpression":"L"}}),
  Object.freeze({"id":"reviewed-b107885b59d8","entryURL":"https://speakirpg.overture.io.kr/assets/index-CkbjjFGe.js","hash":"b107885b59d8d927bf8653741c6ac9f592d3500872befb1ab67243c208ffcadd","boot":"T3t().catch(","imports":23,"bindings":"\n// Speaki_rpg_mine_patch (スピキクラフトMOD): expose native interfaces before the game's normal boot.\ntry { globalThis.__MINING_LOCAL_BIND_I18N__?.({getLocale:br,translate:I}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] Language binding',e)}\ntry { globalThis.__MINING_LOCAL_BIND_PHYSICS__?.({WorldClass:Pat,CameraClass:Qat,advance:Kit,moveY:Hit,collides:pG,unknown:fG,fixedStep:Ait,maxStep:jit}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] Shift接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_HOTBAR__?.({HUDClass:fut,BuildClass:Olt,normalizeBrush:_J,saveBrushes:Yct,itemIcons:lq,itemName:hq,shapeName:SJ,colorName:xJ,canColor:pJ,farHint:()=>I('ui.mining.target.far')}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] ホットバー接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_ICONS__?.({itemIcons:lq,itemKinds:RK,iconForKind:mq,itemTile:dq,tileFor:hU,blockShape:CH,blockForItem:kind=>{const ore=FK.indexOf(kind);return ore>=0?$H.ORE_1+ore:kind===11?$H.STONE:kind===12?$H.DIRT:fJ(kind,0)},createCartIconSource:()=>{const view=new Aut(()=>0),cart=view.createCart(0);return{root:cart.root,dispose:()=>{cart.root.removeFromParent();view.dispose()}}}}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] アイコン接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_CONTROLS__?.({HUDClass:fut,InputClass:lot,SceneClass:Gft,ChatClass:HNe,keyHints:gK,actionHints:hK,placeIntervalMs:bX}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] 操作接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_COMPASS__?.({SceneClass:Gft}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] ショップ方角接続',e)}\ntry {\n const api={occludesBlock:nU,worldHeight:128,avatarAssetsURL:\"https://speakirpg.overture.io.kr/assets/speakiAssets-BpKZGeIj.js\",avatarAssetExports:{faceMaterials:\"B\",faceExpression:\"R\",defaultExpression:\"L\"},GameWorldClass:s$t,SceneClass:Gft,AvatarClass:Qut,PickaxeKit:Zut,cloneAvatar:Zi,colorForTier:Wut,tierFromColor:color=>[1,2,3,4].find(tier=>Wut(tier)===color)||1};\n globalThis.__MINING_LOCAL_NATIVE_API__=api;globalThis.__MINING_LOCAL_BIND_AVATAR__?.(api);\n} catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] 全身表示接続',e)}\n","names":{"pAe":"Pat","jAe":"Qat","Rke":"Kit","Pke":"Hit","jV":"pG","AV":"fG","jke":"Ait","Mke":"jit","jPe":"fut","zNe":"Olt","oW":"_J","SNe":"Yct","qH":"lq","QH":"mq","YH":"dq","$H":"hq","dW":"SJ","uW":"xJ","nW":"pJ","Sr":"br","wB":"hU","qz":"CH","PH":"FK","LH":"RK","uB":"$H","tW":"fJ","YPe":"Aut","VAe":"lot","sLe":"Gft","pue":"HNe","hH":"gK","mH":"hK","q5e":"s$t","_Fe":"Qut","gFe":"Zut","_a":"Zi","lFe":"Wut","DIe":"bX"},"avatarAssets":"speakiAssets-BpKZGeIj.js","avatarAssetExports":{"faceMaterials":"B","faceExpression":"R","defaultExpression":"L"}}),
  Object.freeze({"id":"reviewed-8f17deb9dd2c","entryURL":"https://speakirpg.overture.io.kr/assets/index-BCjwuGOg.js","hash":"8f17deb9dd2c9ccfef5b1bb2bb639654c7f164243e7d7af328f01a661ec8d2c1","boot":"aqt().catch(","imports":23,"bindings":"\n// Speaki_rpg_mine_patch (スピキクラフトMOD): expose native interfaces before the game's normal boot.\ntry { globalThis.__MINING_LOCAL_BIND_I18N__?.({getLocale:Tr,translate:I}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] Language binding',e)}\ntry { globalThis.__MINING_LOCAL_BIND_PHYSICS__?.({WorldClass:u7e,CameraClass:O7e,advance:w5e,moveY:b5e,collides:DH,unknown:EH,fixedStep:_5e,maxStep:v5e}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] Shift接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_HOTBAR__?.({HUDClass:Jnt,BuildClass:tnt,normalizeBrush:wG,saveBrushes:Rtt,itemIcons:sW,itemName:pW,shapeName:kG,colorName:OG,canColor:bG,farHint:()=>I('ui.mining.target.far')}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] ホットバー接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_ICONS__?.({itemIcons:sW,itemKinds:ZU,iconForKind:fW,itemTile:lW,tileFor:iV,blockShape:wB,blockForItem:kind=>{const ore=JU.indexOf(kind);return ore>=0?UB.ORE_1+ore:kind===11?UB.STONE:kind===12?UB.DIRT:yG(kind,0)},createCartIconSource:()=>{const view=new frt(()=>0),cart=view.createCart(0);return{root:cart.root,dispose:()=>{cart.root.removeFromParent();view.dispose()}}}}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] アイコン接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_CONTROLS__?.({HUDClass:Jnt,InputClass:z7e,SceneClass:Sat,ChatClass:RDe,keyHints:kU,actionHints:OU,placeIntervalMs:Uit}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] 操作接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_COMPASS__?.({SceneClass:Sat}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] ショップ方角接続',e)}\ntry {\n const api={occludesBlock:GB,worldHeight:128,avatarAssetsURL:\"https://speakirpg.overture.io.kr/assets/speakiAssets-BpKZGeIj.js\",avatarAssetExports:{faceMaterials:\"B\",faceExpression:\"R\",defaultExpression:\"L\"},GameWorldClass:YVt,SceneClass:Sat,AvatarClass:Prt,PickaxeKit:Nrt,cloneAvatar:Xi,colorForTier:Ert,tierFromColor:color=>[1,2,3,4].find(tier=>Ert(tier)===color)||1};\n globalThis.__MINING_LOCAL_NATIVE_API__=api;globalThis.__MINING_LOCAL_BIND_AVATAR__?.(api);\n} catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] 全身表示接続',e)}\n","names":{"pAe":"u7e","jAe":"O7e","Rke":"w5e","Pke":"b5e","jV":"DH","AV":"EH","jke":"_5e","Mke":"v5e","jPe":"Jnt","zNe":"tnt","oW":"wG","SNe":"Rtt","qH":"sW","QH":"fW","YH":"lW","$H":"pW","dW":"kG","uW":"OG","nW":"bG","Sr":"Tr","wB":"iV","qz":"wB","PH":"JU","LH":"ZU","uB":"UB","tW":"yG","YPe":"frt","VAe":"z7e","sLe":"Sat","pue":"RDe","hH":"kU","mH":"OU","q5e":"YVt","_Fe":"Prt","gFe":"Nrt","_a":"Xi","lFe":"Ert","DIe":"Uit"},"avatarAssets":"speakiAssets-BpKZGeIj.js","avatarAssetExports":{"faceMaterials":"B","faceExpression":"R","defaultExpression":"L"}}),
  Object.freeze({"id":"reviewed-380ee8e75508","entryURL":"https://speakirpg.overture.io.kr/assets/index-BF3zaDwR.js","hash":"380ee8e75508774863d4cd967bebaa671643a748cfccb6e9a9c63f9c6bfc06c7","boot":"wHt().catch(","imports":22,"bindings":"\n// Speaki_rpg_mine_patch (スピキクラフトMOD): expose native interfaces before the game's normal boot.\ntry { globalThis.__MINING_LOCAL_BIND_I18N__?.({getLocale:Ar,translate:I}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] Language binding',e)}\ntry { globalThis.__MINING_LOCAL_BIND_PHYSICS__?.({WorldClass:q0e,CameraClass:d2e,advance:o0e,moveY:n0e,collides:kW,unknown:OW,fixedStep:$1e,maxStep:e0e}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] Shift接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_HOTBAR__?.({HUDClass:D8e,BuildClass:P6e,normalizeBrush:_q,saveBrushes:_6e,itemIcons:eK,itemName:oK,shapeName:Sq,colorName:xq,canColor:pq,farHint:()=>I('ui.mining.target.far')}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] ホットバー接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_ICONS__?.({itemIcons:eK,itemKinds:WG,iconForKind:aK,itemTile:nK,tileFor:oU,blockShape:EH,blockForItem:kind=>{const ore=VG.indexOf(kind);return ore>=0?GH.ORE_1+ore:kind===11?GH.STONE:kind===12?GH.DIRT:fq(kind,0)},createCartIconSource:()=>{const view=new G8e(()=>0),cart=view.createCart(0);return{root:cart.root,dispose:()=>{cart.root.removeFromParent();view.dispose()}}}}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] アイコン接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_CONTROLS__?.({HUDClass:D8e,InputClass:S2e,SceneClass:e9e,ChatClass:Twe,keyHints:SG,actionHints:xG,placeIntervalMs:S7e}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] 操作接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_COMPASS__?.({SceneClass:e9e}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] ショップ方角接続',e)}\ntry {\n const api={occludesBlock:qH,worldHeight:128,avatarAssetsURL:\"https://speakirpg.overture.io.kr/assets/speakiAssets-BCZX4Jqg.js\",avatarAssetExports:{faceMaterials:\"z\",faceExpression:\"L\",defaultExpression:\"I\"},GameWorldClass:_Lt,SceneClass:e9e,AvatarClass:p5e,PickaxeKit:f5e,cloneAvatar:la,colorForTier:a5e,tierFromColor:color=>[1,2,3,4].find(tier=>a5e(tier)===color)||1};\n globalThis.__MINING_LOCAL_NATIVE_API__=api;globalThis.__MINING_LOCAL_BIND_AVATAR__?.(api);\n} catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] 全身表示接続',e)}\n","names":{"pAe":"q0e","jAe":"d2e","Rke":"o0e","Pke":"n0e","jV":"kW","AV":"OW","jke":"$1e","Mke":"e0e","jPe":"D8e","zNe":"P6e","oW":"_q","SNe":"_6e","qH":"eK","QH":"aK","YH":"nK","$H":"oK","dW":"Sq","uW":"xq","nW":"pq","Sr":"Ar","wB":"oU","qz":"EH","PH":"VG","LH":"WG","uB":"GH","tW":"fq","YPe":"G8e","VAe":"S2e","sLe":"e9e","pue":"Twe","hH":"SG","mH":"xG","q5e":"_Lt","_Fe":"p5e","gFe":"f5e","_a":"la","lFe":"a5e","DIe":"S7e"},"avatarAssets":"speakiAssets-BCZX4Jqg.js","avatarAssetExports":{"faceMaterials":"z","faceExpression":"L","defaultExpression":"I"}}),
  Object.freeze({"id":"reviewed-d8dcb79d815c","entryURL":"https://speakirpg.overture.io.kr/assets/index-CC9OTDPo.js","hash":"d8dcb79d815cbd8dc78d19f0e88cd775aa51fd378d690f569d64f97fc0b0dbfe","boot":"d_t().catch(","imports":22,"bindings":"\n// Speaki_rpg_mine_patch (スピキクラフトMOD): expose native interfaces before the game's normal boot.\ntry { globalThis.__MINING_LOCAL_BIND_I18N__?.({getLocale:kr,translate:I}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] Language binding',e)}\ntry { globalThis.__MINING_LOCAL_BIND_PHYSICS__?.({WorldClass:cWe,CameraClass:EWe,advance:xUe,moveY:_Ue,collides:cB,unknown:sB,fixedStep:mUe,maxStep:hUe}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] Shift接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_HOTBAR__?.({HUDClass:IJe,BuildClass:Uqe,normalizeBrush:qH,saveBrushes:Eqe,itemIcons:NV,itemName:zV,shapeName:QH,colorName:ZH,canColor:UH,farHint:()=>I('ui.mining.target.far')}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] ホットバー接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_ICONS__?.({itemIcons:NV,itemKinds:CV,iconForKind:RV,itemTile:FV,tileFor:UR,blockShape:lR,blockForItem:kind=>{const ore=bV.indexOf(kind);return ore>=0?OR.ORE_1+ore:kind===11?OR.STONE:kind===12?OR.DIRT:HH(kind,0)},createCartIconSource:()=>{const view=new eYe(()=>0),cart=view.createCart(0);return{root:cart.root,dispose:()=>{cart.root.removeFromParent();view.dispose()}}}}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] アイコン接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_CONTROLS__?.({HUDClass:IJe,InputClass:LWe,SceneClass:lZe,ChatClass:fhe,keyHints:tV,actionHints:eV,placeIntervalMs:jXe}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] 操作接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_COMPASS__?.({SceneClass:lZe}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] ショップ方角接続',e)}\ntry {\n const api={occludesBlock:AR,worldHeight:128,avatarAssetsURL:\"https://speakirpg.overture.io.kr/assets/speakiAssets-Ch__-ois.js\",avatarAssetExports:{faceMaterials:\"R\",faceExpression:\"I\",defaultExpression:\"F\"},GameWorldClass:Mpt,SceneClass:lZe,AvatarClass:SYe,PickaxeKit:xYe,cloneAvatar:_a,colorForTier:mYe,tierFromColor:color=>[1,2,3,4].find(tier=>mYe(tier)===color)||1};\n globalThis.__MINING_LOCAL_NATIVE_API__=api;globalThis.__MINING_LOCAL_BIND_AVATAR__?.(api);\n} catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] 全身表示接続',e)}\n","names":{"pAe":"cWe","jAe":"EWe","Rke":"xUe","Pke":"_Ue","jV":"cB","AV":"sB","jke":"mUe","Mke":"hUe","jPe":"IJe","zNe":"Uqe","oW":"qH","SNe":"Eqe","qH":"NV","QH":"RV","YH":"FV","$H":"zV","dW":"QH","uW":"ZH","nW":"UH","Sr":"kr","wB":"UR","qz":"lR","PH":"bV","LH":"CV","uB":"OR","tW":"HH","YPe":"eYe","VAe":"LWe","sLe":"lZe","pue":"fhe","hH":"tV","mH":"eV","q5e":"Mpt","_Fe":"SYe","gFe":"xYe","_a":"_a","lFe":"mYe","DIe":"jXe"},"avatarAssets":"speakiAssets-Ch__-ois.js","avatarAssetExports":{"faceMaterials":"R","faceExpression":"I","defaultExpression":"F"}}),
  Object.freeze({"id":"reviewed-fe170c367864","entryURL":"https://speakirpg.overture.io.kr/assets/index-CnyXd923.js","hash":"fe170c3678647395e2cf8f7a3b3fc84a9ca095e699a34a89a4ace88431807937","boot":"oht().catch(","imports":22,"bindings":"\n// Speaki_rpg_mine_patch (スピキクラフトMOD): expose native interfaces before the game's normal boot.\ntry { globalThis.__MINING_LOCAL_BIND_I18N__?.({getLocale:jr,translate:I}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] Language binding',e)}\ntry { globalThis.__MINING_LOCAL_BIND_PHYSICS__?.({WorldClass:KHe,CameraClass:uUe,advance:fHe,moveY:cHe,collides:JB,unknown:qB,fixedStep:aHe,maxStep:oHe}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] Shift接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_HOTBAR__?.({HUDClass:yqe,BuildClass:EKe,normalizeBrush:kU,saveBrushes:lKe,itemIcons:hH,itemName:xH,shapeName:PU,colorName:NU,canColor:TU,farHint:()=>I('ui.mining.target.far')}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] ホットバー接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_ICONS__?.({itemIcons:hH,itemKinds:aH,iconForKind:bH,itemTile:_H,tileFor:Az,blockShape:XR,blockForItem:kind=>{const ore=nH.indexOf(kind);return ore>=0?hz.ORE_1+ore:kind===11?hz.STONE:kind===12?hz.DIRT:wU(kind,0)},createCartIconSource:()=>{const view=new Lqe(()=>0),cart=view.createCart(0);return{root:cart.root,dispose:()=>{cart.root.removeFromParent();view.dispose()}}}}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] アイコン接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_CONTROLS__?.({HUDClass:yqe,InputClass:bUe,SceneClass:JYe,ChatClass:Fme,keyHints:RV,actionHints:LV,placeIntervalMs:mYe}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] 操作接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_COMPASS__?.({SceneClass:JYe}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] ショップ方角接続',e)}\ntry {\n const api={occludesBlock:_z,worldHeight:128,avatarAssetsURL:\"https://speakirpg.overture.io.kr/assets/speakiAssets-Ch__-ois.js\",avatarAssetExports:{faceMaterials:\"R\",faceExpression:\"I\",defaultExpression:\"F\"},GameWorldClass:jdt,SceneClass:JYe,AvatarClass:aJe,PickaxeKit:iJe,cloneAvatar:Ea,colorForTier:Zqe,tierFromColor:color=>[1,2,3,4].find(tier=>Zqe(tier)===color)||1};\n globalThis.__MINING_LOCAL_NATIVE_API__=api;globalThis.__MINING_LOCAL_BIND_AVATAR__?.(api);\n} catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] 全身表示接続',e)}\n","names":{"pAe":"KHe","jAe":"uUe","Rke":"fHe","Pke":"cHe","jV":"JB","AV":"qB","jke":"aHe","Mke":"oHe","jPe":"yqe","zNe":"EKe","oW":"kU","SNe":"lKe","qH":"hH","QH":"bH","YH":"_H","$H":"xH","dW":"PU","uW":"NU","nW":"TU","Sr":"jr","wB":"Az","qz":"XR","PH":"nH","LH":"aH","uB":"hz","tW":"wU","YPe":"Lqe","VAe":"bUe","sLe":"JYe","pue":"Fme","hH":"RV","mH":"LV","q5e":"jdt","_Fe":"aJe","gFe":"iJe","_a":"Ea","lFe":"Zqe","DIe":"mYe"},"avatarAssets":"speakiAssets-Ch__-ois.js","avatarAssetExports":{"faceMaterials":"R","faceExpression":"I","defaultExpression":"F"}}),
  Object.freeze({id:'nov8',entryURL:nov8EntryURL,hash:nov8Hash,boot:'wut().catch(',imports:22,bindings:nov8Bindings,names:nov8Names,avatarAssets:'speakiAssets-Ch__-ois.js',avatarAssetExports:{faceMaterials:'R',faceExpression:'I',defaultExpression:'F'}}),
  Object.freeze({id:'nov5',entryURL:nov5EntryURL,hash:nov5Hash,boot:'cut().catch(',imports:21,bindings:nov5Bindings,names:nov5Names,avatarAssets:'speakiAssets-Ch__-ois.js',avatarAssetExports:{faceMaterials:'R',faceExpression:'I',defaultExpression:'F'}}),
  Object.freeze({id:'prior',entryURL:priorEntryURL,hash:priorHash,boot:'Alt().catch(',imports:21,bindings:priorBindings,names:priorNames,avatarAssets:'speakiAssets-Ch__-ois.js',avatarAssetExports:{faceMaterials:'R',faceExpression:'I',defaultExpression:'F'}}),
  Object.freeze({id:'previous',entryURL:previousEntryURL,hash:previousHash,boot:'Ont().catch(',imports:21,bindings:previousBindings,names:previousNames,avatarAssets:'speakiAssets-BMwsYJWu.js'}),
  Object.freeze({id:'legacy',entryURL:legacyEntryURL,hash:legacyHash,boot:'Ttt().catch(',imports:19,bindings:legacyBindings,names:Object.fromEntries(Object.keys(previousNames).map(name=>[name,name])),avatarAssets:'speakiAssets-0gVUOblX.js'})
]);
const compatibilitySymbols=["pAe","jAe","Rke","Pke","jV","AV","jke","Mke","jPe","zNe","oW","SNe","qH","QH","YH","$H","dW","uW","nW","Sr","wB","qz","PH","LH","uB","tW","YPe","VAe","sLe","pue","hH","mH","q5e","_Fe","gFe","_a","lFe","DIe","occludesBlock","translate","boot"];
const compatibilityLocalNames=["e","kind","ore","view","cart","api","color","tier"];
const compatibilityBindings="\n// Speaki_rpg_mine_patch (スピキクラフトMOD): expose native interfaces before the game's normal boot.\ntry { globalThis.__MINING_LOCAL_BIND_I18N__?.({getLocale:__MINING_SYMBOL_19__,translate:__MINING_SYMBOL_39__}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] Language binding',e)}\ntry { globalThis.__MINING_LOCAL_BIND_PHYSICS__?.({WorldClass:__MINING_SYMBOL_0__,CameraClass:__MINING_SYMBOL_1__,advance:__MINING_SYMBOL_2__,moveY:__MINING_SYMBOL_3__,collides:__MINING_SYMBOL_4__,unknown:__MINING_SYMBOL_5__,fixedStep:__MINING_SYMBOL_6__,maxStep:__MINING_SYMBOL_7__}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] Shift接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_HOTBAR__?.({HUDClass:__MINING_SYMBOL_8__,BuildClass:__MINING_SYMBOL_9__,normalizeBrush:__MINING_SYMBOL_10__,saveBrushes:__MINING_SYMBOL_11__,itemIcons:__MINING_SYMBOL_12__,itemName:__MINING_SYMBOL_15__,shapeName:__MINING_SYMBOL_16__,colorName:__MINING_SYMBOL_17__,canColor:__MINING_SYMBOL_18__,farHint:()=>__MINING_SYMBOL_39__('ui.mining.target.far')}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] ホットバー接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_ICONS__?.({itemIcons:__MINING_SYMBOL_12__,itemKinds:__MINING_SYMBOL_23__,iconForKind:__MINING_SYMBOL_13__,itemTile:__MINING_SYMBOL_14__,tileFor:__MINING_SYMBOL_20__,blockShape:__MINING_SYMBOL_21__,blockForItem:kind=>{const ore=__MINING_SYMBOL_22__.indexOf(kind);return ore>=0?__MINING_SYMBOL_24__.ORE_1+ore:kind===11?__MINING_SYMBOL_24__.STONE:kind===12?__MINING_SYMBOL_24__.DIRT:__MINING_SYMBOL_25__(kind,0)},createCartIconSource:()=>{const view=new __MINING_SYMBOL_26__(()=>0),cart=view.createCart(0);return{root:cart.root,dispose:()=>{cart.root.removeFromParent();view.dispose()}}}}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] アイコン接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_CONTROLS__?.({HUDClass:__MINING_SYMBOL_8__,InputClass:__MINING_SYMBOL_27__,SceneClass:__MINING_SYMBOL_28__,ChatClass:__MINING_SYMBOL_29__,keyHints:__MINING_SYMBOL_30__,actionHints:__MINING_SYMBOL_31__,placeIntervalMs:__MINING_SYMBOL_37__}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] 操作接続',e)}\ntry { globalThis.__MINING_LOCAL_BIND_COMPASS__?.({SceneClass:__MINING_SYMBOL_28__}); } catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] ショップ方角接続',e)}\ntry {\n const api={occludesBlock:__MINING_SYMBOL_38__,worldHeight:128,avatarAssetsURL:\"https://speakirpg.overture.io.kr/assets/speakiAssets-DwRXdv5B.js\",avatarAssetExports:{faceMaterials:\"B\",faceExpression:\"R\",defaultExpression:\"L\"},GameWorldClass:__MINING_SYMBOL_32__,SceneClass:__MINING_SYMBOL_28__,AvatarClass:__MINING_SYMBOL_33__,PickaxeKit:__MINING_SYMBOL_34__,cloneAvatar:__MINING_SYMBOL_35__,colorForTier:__MINING_SYMBOL_36__,tierFromColor:color=>[1,2,3,4].find(tier=>__MINING_SYMBOL_36__(tier)===color)||1};\n globalThis.__MINING_LOCAL_NATIVE_API__=api;globalThis.__MINING_LOCAL_BIND_AVATAR__?.(api);\n} catch(e){console.error('['+(globalThis.__MINING_LOCAL_I18N__?.t('modName')||'Speaki_rpg_mine_patch')+'] 全身表示接続',e)}\n";
const gameEntryPattern=/^https:\/\/speakirpg\.overture\.io\.kr\/assets\/index-[\w-]+\.js$/;
const identifierPattern=/^[$A-Z_a-z][$\w]*$/;
const reserved=new Set('await break case catch class const continue debugger default delete do else enum export extends false finally for function if implements import in instanceof interface let new null package private protected public return static super switch this throw true try typeof var void while with yield arguments eval globalThis console'.split(' '));
const registry='https://raw.githubusercontent.com/Lupe-hazukino/speaki_rpg_mine_patch/main/compatibility/v1/';

// The registry only supplies identifier names and an exact reviewed upstream hash.
// The code that connects them to MOD features is installed with the extension.
export function profileFromMetadata(metadata,requestedURL,hash){
  if(!metadata||metadata.schema!==1||metadata.entryURL!==requestedURL||
      !gameEntryPattern.test(requestedURL)||metadata.hash!==hash||!/^[a-f0-9]{64}$/.test(hash)||
      !Number.isInteger(metadata.imports)||metadata.imports<1||metadata.imports>100||
      !metadata.symbols||typeof metadata.symbols!=='object'||Array.isArray(metadata.symbols))return null;
  const names=compatibilitySymbols;
  if(Object.keys(metadata.symbols).length!==names.length)return null;
  const symbols=names.map(name=>Object.hasOwn(metadata.symbols,name)?metadata.symbols[name]:null);
  if(new Set(symbols).size!==names.length||symbols.some(name=>typeof name!=='string'||name.length>80||
      !identifierPattern.test(name)||reserved.has(name)||compatibilityLocalNames.includes(name)))return null;
  const template=clientProfiles[0];
  return {...template,id:'registry',entryURL:requestedURL,hash,imports:metadata.imports,
    boot:metadata.symbols.boot+'().catch(',
    bindings:compatibilityBindings.replace(/__MINING_SYMBOL_(\d+)__/g,(_,index)=>symbols[Number(index)]),
    names:Object.fromEntries(Object.keys(template.names).map(name=>[name,metadata.symbols[name]]))};
}
export function selectEntry(scripts){
  const candidates=[...new Set(Array.from(scripts,script=>script.src).filter(url=>gameEntryPattern.test(url)))];
  return candidates.length===1?candidates[0]:null;
}
export async function lookupMetadata(url,hash){
  try{
    const filename=new URL(url).pathname.split('/').at(-1);
    const response=await fetch(registry+hash+'/'+filename+'.json',{
      credentials:'omit',referrerPolicy:'no-referrer',redirect:'error',signal:AbortSignal.timeout(2500),cache:'no-cache'
    });
    if(!response.ok)return null;
    const reader=response.body.getReader(),decoder=new TextDecoder();
    let length=0,json='';
    try{
      for(;;){
        const {done,value}=await reader.read();
        if(done)break;
        length+=value.length;
        if(length>8192)return null;
        json+=decoder.decode(value,{stream:true});
      }
      return JSON.parse(json+decoder.decode());
    }finally{await reader.cancel();}
  }catch{return null;}
}
export async function prepareClient(source,requestedURL=entryURL,lookup){
  const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(source));
  const hash=Array.from(new Uint8Array(digest),byte=>byte.toString(16).padStart(2,'0')).join('');
  let profile=clientProfiles.find(value=>value.hash===hash&&value.entryURL===requestedURL);
  if(!profile&&lookup)profile=profileFromMetadata(await lookup(requestedURL,hash),requestedURL,hash);
  let imports=0;
  let code=source.replace(/(\bfrom\s*|\bimport\s*(?:\(\s*)?)(["'`])(\.[^"'`]+)\2/g,(_,prefix,quote,path)=>{
    imports++;return prefix+quote+new URL(path,requestedURL).href+quote;
  });
  if(profile){
    if(profile.id==='registry'&&(imports!==profile.imports||source.split(profile.boot).length!==2||source.includes('import.meta')))
      profile=null;
  }
  if(profile){
    if(imports!==profile.imports||source.split(profile.boot).length!==2||source.includes('import.meta'))throw Error(localText('clientStructureChanged','The game client structure has changed.'));
    code=code.replace(profile.boot,profile.bindings+profile.boot);
  }
  return {code,reviewed:!!profile,hash,imports,profile:profile?.id || null};
}

function localText(key,fallback,params){return globalThis.__MINING_LOCAL_I18N__?.t(key,params)||fallback}

function installFeatures(){
/* SpeakiMod+ owns F2 and its F4 camera. Chrome does not install this adapter. */
(() => {
const appearances=new WeakMap(),cameraAvatars=new WeakMap();
const displayAvatars=new Set(),patchedControllers=new WeakSet(),effectScenes=new Map();
const widthFrames=new Map();
let avatarWorld=null,forwarding=false,lastFrame=null;
let photoStage=1;
const hideRightHud=':is([data-speakicraft-photo="3"],[data-speakicraft-photo="4"])';
const hideHotbar='[data-speakicraft-photo="4"]';
function installPhotoMode(){
  const root=document.documentElement,style=document.createElement('style');
  style.textContent=`
    [data-speakicraft-photo] #spkmod-hud,
    ${hideRightHud} :is(#spkmod-pq,.sr-minimap-frame),
    ${hideHotbar} .sr-skill-hotbar { display:none!important }
  `;
  document.head.append(style);
  // Handle F9 before the game's town and mining photo shortcuts.
  window.addEventListener('keydown',event=>{
    if(event.code!=='F9'||event.isComposing||event.ctrlKey||event.altKey||event.metaKey||
       event.composedPath().some(node=>node.isContentEditable||node.matches?.('input,textarea,select')))return;
    event.preventDefault();event.stopImmediatePropagation();
    if(event.repeat)return;
    photoStage=photoStage%4+1;
    if(photoStage===1)root.removeAttribute('data-speakicraft-photo');
    else root.setAttribute('data-speakicraft-photo',String(photoStage));
  },true);
}
const commands=['playEmote','playJump','playAffectionEmote','playFallDownEmote','playFreeDance',
  'enterAffectionHold','exitAffectionHold','enterEmoteIdle','exitEmoteIdle','exitFreeDance',
  'enterFallDownHold','exitFallDown','forceReleasePoseHold','playStageDance'];
function inMine(){return !!avatarWorld?.miningHost?.isActive?.()}
function localController(){return avatarWorld?.localAnimationController||avatarWorld?.localAvatar?.animationController}
function visibleScene(group){
  for(let node=group;node;node=node.parent){if(!node.visible)return null;if(node.isScene)return node}
  return null;
}
function bindController(){
  const controller=localController();if(!controller||patchedControllers.has(controller))return controller;
  patchedControllers.add(controller);
  for(const name of commands){
    const original=controller[name];if(typeof original!=='function')continue;
    controller[name]=function(...args){
      if(forwarding)return original.apply(this,args);
      forwarding=true;
      try{
        const result=original.apply(this,args);
        if(inMine())for(const avatar of displayAvatars){
          avatar.current?.syncClips?.();
          avatar.animationController?.[name]?.(...args);
        }
        return result;
      }finally{forwarding=false}
    };
  }
  return controller;
}
function effectsFor(scene){
  let effects=effectScenes.get(scene);
  if(!effects){effects=new avatarWorld.bloomEffects.constructor(scene);effectScenes.set(scene,effects)}
  return effects;
}
function clearEffects(){
  for(const scene of [...widthFrames.keys()])restoreBodyWidth(scene);
  for(const effects of effectScenes.values()){
    // Advance the native finite effects to their end, which also frees materials.
    effects.update(60);
  }
  effectScenes.clear();lastFrame=null;
}
function restoreBodyWidth(scene){
  const frames=widthFrames.get(scene);if(!frames)return;
  widthFrames.delete(scene);
  for(const frame of frames){
    frame.pel.scale.copy(frame.scale);frame.pel.updateMatrix();
    for(const entry of frame.rigid){
      entry.object.matrix.copy(entry.matrix);entry.object.matrixAutoUpdate=entry.auto;
    }
    frame.root.updateMatrixWorld(true);
  }
}
function applyBodyWidth(scene){
  restoreBodyWidth(scene);
  if(!inMine()||globalThis.spkmodSkinsSystemEnabled===false)return;
  // SpeakiMod+ deforms bones only during its town render, then restores them.
  // Read its actual target and axes instead of scaling the whole mining model.
  const source=globalThis.spkmodPlayerFat?.entries?.get('local_self');
  if(!source||!Number.isFinite(source.scale)||source.scale<=1.001)return;
  const frames=[];widthFrames.set(scene,frames);
  for(const avatar of displayAvatars){
    if(visibleScene(avatar.group)!==scene)continue;
    const root=avatar.current?.root;if(!root)continue;
    let pel,head;const bones=[];
    root.traverse(node=>{
      if(!node.isBone)return;bones.push(node);
      if(node.name===source.pel?.name)pel=node;
      if(node.name===source.head?.name)head=node;
    });
    if(!pel||!head?.parent||pel===head)continue;
    const axes=source.ap;
    if(!['x','y','z'].includes(axes?.x)||!['x','y','z'].includes(axes?.z)||axes.x===axes.z)continue;
    root.updateWorldMatrix(true,true);
    const rigidObjects=new Set([head]);
    for(const bone of bones)for(const child of bone.children){
      if(!child.isBone&&(child===avatar.pickaxe||child.userData?.lunchPropHolder||child.userData?.speakiMagicStaff||
        child.userData?.spkmodCookingProp||child.userData?.spkmodSkinAttachment||child.userData?.spkmodSkinHandProp||child.name==='speakov-weapon'))rigidObjects.add(child);
    }
    const rigid=[...rigidObjects].map(object=>({object,auto:object.matrixAutoUpdate,matrix:object.matrix.clone(),world:object.matrixWorld.clone()}));
    const frame={root,pel,scale:pel.scale.clone(),rigid};frames.push(frame);
    pel.scale[axes.x]*=source.scale;pel.scale[axes.z]*=source.scale;
    pel.updateMatrix();pel.updateMatrixWorld(true);
    for(const entry of rigid){
      const object=entry.object,parent=object.parent;
      if(!parent||Math.abs(parent.matrixWorld.determinant())<1e-10)continue;
      // Preserve size, following the new attachment point on the widened body.
      const position=object.matrixWorld.elements,world=entry.world.elements;
      world[12]=position[12];world[13]=position[13];world[14]=position[14];
      object.matrix.copy(parent.matrixWorld).invert().multiply(entry.world);
      object.matrixAutoUpdate=false;object.updateMatrixWorld(true);
    }
  }
}
function bindAvatarWorld(world){
  if(avatarWorld===world){bindController();return}
  clearEffects();avatarWorld=world;bindController();
  const bloom=world.bloomEffects;if(!bloom?.spawnHearts)return;
  const spawn=bloom.spawnHearts;
  bloom.spawnHearts=function(target,...args){
    if(avatarWorld!==world||!inMine()||target!==world.playerContainer)return spawn.call(this,target,...args);
    // Reuse the real effect at the displayed mining model, rather than town coordinates.
    const scenes=new Set();
    for(const avatar of displayAvatars){
      const scene=visibleScene(avatar.group);
      if(scene&&!scenes.has(scene)){scenes.add(scene);avatar.group.updateWorldMatrix(true,true);effectsFor(scene).spawnHearts(avatar.group,...args)}
    }
  };
}
function appearanceKey(root){
  if(!root)return null;
  const now=globalThis.performance?.now?.()??Date.now(),cached=appearances.get(root);
  if(cached&&now-cached.time<100)return cached.key;
  const settings=globalThis.spkmodSkinSettings;
  const parts=[root.uuid,settings?.enabled,globalThis.spkmodSkinsSystemEnabled,settings?.equippedId];
  root.traverse(object=>{
    // Attachment identities change after asynchronous costume construction, even
    // when the avatar root and selected skin ID stay the same.
    if(object.userData?.spkmodSkinAttachment&&!object.parent?.userData?.spkmodSkinAttachment)
      parts.push(object.uuid,object.parent?.uuid);
    if(object.isMesh&&!object.userData?.spkmodSkinAttachment){
      for(const material of Array.isArray(object.material)?object.material:[object.material]){
        // Exclude animated face textures and rainbow color values.
        if(/body/i.test(material?.name||''))parts.push(object.uuid,material.uuid,material.map?.uuid);
      }
    }
  });
  const key=JSON.stringify(parts);appearances.set(root,{time:now,key});return key;
}
globalThis.__MINING_LOCAL_HOST_ADAPTER__ = Object.freeze({
  settingsKey: false,
  settingsInNativePanel: true,
  installPhotoMode,
  photoModeCSS:`
    :host-context(${hideRightHud}) .mhud .topBar,
    :host-context(${hideHotbar}) .mhud .hotbar { display:none!important }
  `,
  get photoHandHidden(){return photoStage===4},
  appearanceKey,
  bindAvatarWorld,
  applyBodyWidth,restoreBodyWidth,
  releaseAvatarEffects:clearEffects,
  miningAnimationController(){return inMine()?bindController():null},
  registerAvatar(avatar){
    displayAvatars.add(avatar);bindController();
    const controller=avatar.animationController,source=localController();
    if(!controller)return;
    const locomotion=controller.setLocomotion;
    if(locomotion)controller.setLocomotion=function(moving){return locomotion.call(this,globalThis.AutoMopActive?false:moving)};
    // Carry held poses into a newly rebuilt skin or a newly opened camera.
    if(source?.oneShotPlaying&&source.oneShotClip==='jump')controller.playJump?.();
    else if(source?.fallDownPlaying)controller.playFallDownEmote?.();
    else if(source?.freeDancePlaying)controller.playFreeDance?.();
    else if(source?.affectionExpressionHeld)controller.playAffectionEmote?.();
    else if(source?.emoteIdlePlaying||globalThis.AutoMopActive)controller.playEmote?.();
  },
  releaseAvatar(avatar){
    for(const scene of [...widthFrames.keys()])restoreBodyWidth(scene);
    displayAvatars.delete(avatar);
  },
  syncAvatarEffects(scene){
    if(!inMine()){clearEffects();return}
    const now=globalThis.performance?.now?.()??Date.now(),dt=lastFrame===null?0:Math.min(.1,Math.max(0,(now-lastFrame)/1000));lastFrame=now;
    bindController();
    // Town's update exits early while the mining shell is mounted. Keep only
    // its source avatar animation running so repeated one-shots can finish.
    avatarWorld.localAvatar?.update?.(dt);
    for(const [owner,effects] of effectScenes){
      effects.update(dt);
      if(![...displayAvatars].some(avatar=>visibleScene(avatar.group)===owner)){
        effects.update(60);effectScenes.delete(owner);
      }
    }
    // Match MOD rotation effects relative to the camera without moving mining physics.
    if(globalThis.ShakeActive||globalThis.SuperShakeActive||globalThis.BeyBladeActive||globalThis.ReverseBeyBladeActive){
      const yaw=avatarWorld.playerContainer?.rotation.y,base=avatarWorld.cameraController?.cameraYaw;
      if(Number.isFinite(yaw)&&Number.isFinite(base))for(const avatar of displayAvatars){
        if(visibleScene(avatar.group)===scene&&avatar.current?.root)avatar.current.root.rotation.y=yaw-base;
      }
    }else for(const avatar of displayAvatars)if(avatar.current?.root)avatar.current.root.rotation.y=0;
  },
  prepareCameraAvatar(avatars) {
    const camera=globalThis.spkmodMiningFreeCam;
    if(!camera?.isActive?.())return;
    let avatar=camera.state?.localAvatar;
    if(!avatar||avatar.disposed)return;
    if(avatars?.create&&avatar.group?.parent){
      const key=avatars.skinCodeFromModel(avatars.getOwnModel());
      if(key!=null&&cameraAvatars.get(avatar)!==key){
        const parent=avatar.group.parent,previous=avatar;
        const lease=avatars.create();avatar=lease.avatar;
        avatar.group.name='__spkmodMiningFreeCamLocalAvatar';
        avatar.group.position.copy(previous.group.position);avatar.group.quaternion.copy(previous.group.quaternion);
        avatar.group.scale.copy(previous.group.scale);avatar.group.visible=previous.group.visible;
        previous.dispose();parent.add(avatar.group);camera.state.localAvatar=avatar;cameraAvatars.set(avatar,key);
      }
    }
    globalThis.__MINING_LOCAL_HIDE_SKIN_HAND_PROPS__?.(avatar.current?.root);
  },
  cameraActive() {
    return !!globalThis.spkmodMiningFreeCam?.isActive?.() ||
      !!document.body?.classList.contains('spkmod-mining-freecam-active');
  }
});
})();

;
globalThis.__MINING_LOCAL_RESOURCES__ = {"edition":"native-distribution","css":":host{--mc-scale:1;--mc-font:\"Yu Gothic UI\",\"Meiryo\",sans-serif}\n.mhud{font-family:var(--mc-font)!important;font-size:16px!important;color:#fff!important;text-shadow:2px 2px #3f3f3f}\n.mhud .btn,.mhud input,.mhud select,.mhud .slot,.mhud .oreChip,.mhud .addChip{font-family:var(--mc-font)!important}\n.mhud .btn{border:2px solid #000!important;border-radius:0!important;color:#fff!important;background:#999 none center/100% 100%!important;box-shadow:none!important;text-shadow:2px 2px #3f3f3f!important;font-weight:400!important;min-height:34px;padding:5px 10px!important}\n.mhud .btn:hover:not(:disabled){background-image:none!important;color:#ffffa0!important}\n.mhud .btn:disabled{background-image:none!important;color:#aaa!important;opacity:1!important}\n.mhud .keyChip{border-radius:0!important;background:#0004!important;color:inherit!important;font-family:var(--mc-font)!important}\n.mhud .bottomStack{bottom:calc(2px * var(--mc-scale))!important;gap:8px!important;align-items:center!important}\n.mhud .hotbar{position:relative!important;box-sizing:border-box!important;width:364px!important;height:44px!important;min-height:44px!important;max-width:none!important;padding:0 2px!important;gap:0!important;border:0!important;border-radius:0!important;background:transparent none center/100% 100% no-repeat!important;box-shadow:none!important;align-items:center!important;flex:none!important;image-rendering:pixelated;overflow:visible!important;transform:scale(var(--mc-scale))!important;transform-origin:center bottom!important;margin-top:44px}\n.mhud .hotSlots{display:flex!important;gap:0!important;width:360px!important;height:40px!important;flex:none!important;align-items:center!important}\n.mhud .slot{position:relative!important;box-sizing:border-box!important;flex:0 0 40px!important;min-width:40px!important;width:40px!important;height:40px!important;min-height:0!important;padding:4px!important;display:flex!important;justify-content:center!important;align-items:center!important;border:0!important;border-radius:0!important;background:none!important;opacity:1!important;color:#fff!important;box-shadow:none!important;cursor:pointer}\n.mhud .slot.selected::before{content:\"\";position:absolute;inset:-4px;z-index:0;background:transparent none center/100% 100%;image-rendering:pixelated;pointer-events:none}\n.mhud .slot.selected{border:0!important;background:none!important;box-shadow:none!important}\n.mhud .slot.selected,.mhud .pickaxeBox.selected{z-index:3!important}\n.mhud .slot.locked{opacity:.4!important}\n.mhud .slot.empty .ivIcon{opacity:.28}\n.mhud .slot .ivIcon{position:relative;z-index:1;width:32px!important;height:32px!important;border:0!important;border-radius:0!important;background-color:transparent!important;image-rendering:pixelated}\n.mhud .slotKey{display:none!important}\n.mhud .slotCount{position:absolute!important;bottom:1px!important;right:1px!important;z-index:2!important;font-family:var(--mc-font)!important;font-size:16px!important;line-height:1!important;color:#fff!important;text-shadow:2px 2px #3f3f3f!important}\n.mhud .slot.empty .slotCount{visibility:hidden}\n.mhud .mcSelectedItemName{position:absolute;left:50%;bottom:calc(100% + 8px);z-index:5;box-sizing:border-box;width:max-content;max-width:calc(100% - 16px);padding:3px 8px;border-radius:3px;background:#000;transform:translateX(-50%);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#fff;font:500 16px/1.4 var(--mc-font);text-shadow:1px 1px 2px #000;pointer-events:none;opacity:1;transition:opacity .25s linear}\n.mhud .mcSelectedItemName.mcFading{opacity:0}\n.mhud .mcSelectedItemName[hidden]{display:none!important}\n.mhud .pickaxeBox{position:absolute!important;right:calc(100% + 20px)!important;bottom:2px!important;width:40px!important;height:40px!important;min-width:40px!important;box-sizing:border-box!important;padding:4px!important;border:0!important;border-radius:0!important;background:transparent none -2px -2px/364px 44px no-repeat!important;box-shadow:none!important;display:block!important;image-rendering:pixelated}\n.mhud .pickaxeBox::before{content:\"\";position:absolute;inset:4px;background-image:var(--mc-pickaxe);background-size:100% 100%;image-rendering:pixelated}\n.mhud .pickaxeBox.selected::after{content:\"\";position:absolute;inset:-4px;background:transparent none center/100% 100%;pointer-events:none;image-rendering:pixelated}\n.mhud .pickaxeTag{position:absolute!important;bottom:50px!important;left:0!important;width:max-content!important;font-size:11px!important;font-weight:400!important;opacity:.85}\n.mhud .durabilitySlot{position:absolute;bottom:4px;left:5px;right:5px;min-height:0!important}\n.mhud .durBar{height:3px!important;border:0!important;border-radius:0!important;background:#000!important}\n.mhud .durFill{height:2px!important;border-radius:0!important;background:#50c600}\n.mhud .addChip{position:absolute!important;left:calc(100% + 12px)!important;bottom:0!important;width:28px!important;height:30px!important;min-width:0!important;min-height:0!important;padding:0!important;background:#26354ddd!important;border:1.5px solid #6b7890!important;border-radius:7px!important;box-shadow:inset 0 0 0 1px #ffffff24!important;font-size:20px!important;line-height:1!important;text-shadow:none!important;color:#fff!important;display:grid!important;place-items:center;cursor:pointer}\n.mhud .addChip:hover{background:#26354ddd!important;border-color:#fff0a6!important}\n.mhud .addChip:focus-visible{outline:2px solid #ffd990;outline-offset:3px}\n.mhud .oreChip{position:absolute!important;left:calc(100% + 10px)!important;bottom:34px!important;background:#0008!important;padding:3px 5px!important;border:0!important;border-radius:0!important;font-size:11px!important;white-space:nowrap}\n.mhud .worldTag,.mhud .shopHint,.mhud .depthRow,.mhud .finderRow,.mhud .sessionTimer,.mhud .lockHint{border-radius:0!important;background:#0006!important;box-shadow:none!important;color:#fff!important}\n.mhud .topButtons{gap:4px!important}\n.mhud .topLeft{top:calc(var(--m-top,12px) + 46px)!important}\n.mhud .topLeft:has(>.mcPaperDoll){width:200px}\n.mhud .topLeft:has(>.mcPaperDoll)>:not(.mcPaperDoll){box-sizing:border-box;max-width:100%;overflow-wrap:anywhere}\n.mhud .topLeft:has(>.mcPaperDoll)>.depthRow{flex-wrap:wrap;white-space:normal}\n.mhud .mcPaperDoll{position:absolute;left:calc(100% + 8px);top:0;width:78px;height:116px;pointer-events:none}\n.mhud .mcPaperDoll[hidden]{display:none}\n@media(max-width:800px){.mhud .mcPaperDoll{width:56px;height:84px;left:calc(100% + 5px)}}\n.mhud .mcModOpen{position:absolute;top:var(--m-top,12px);left:var(--m-left,12px);z-index:10;pointer-events:auto;font-size:13px!important}\n:host([data-mining-local-settings=\"embedded\"]) .mhud .topLeft{top:var(--m-top,12px)!important}\n:host([data-mining-local-settings=\"embedded\"]) .panelSettings{box-sizing:border-box;max-height:calc(100% - 24px)!important;overflow-y:auto!important;overscroll-behavior:contain}\n.mcModEmbedded{box-sizing:border-box;min-width:0;margin-top:16px;padding-top:16px;border-top:1px solid #ffffff40;pointer-events:auto;text-shadow:none}\n.mcModEmbedded .mcModTitle{font-size:18px;text-align:left;margin:0 0 16px}\n.mcModEmbedded .mcModHint,.mcModEmbedded .mcModViewHint{color:inherit;opacity:.85}\n.mcModEmbedded .mcModSunChoice{color:#303030}\n.mcModUi{position:absolute;inset:0;z-index:2147483000;pointer-events:none;font-family:var(--mc-font);color:#fff;font-size:16px}\n.mcModOverlay{position:absolute;inset:0;display:grid;place-items:center;pointer-events:auto;background:#0008;padding:16px;box-sizing:border-box}\n.mcModOverlay[hidden]{display:none!important}\n.mcModDialog{box-sizing:border-box;width:min(520px,100%);max-height:100%;overflow:auto;padding:26px 28px 22px;border:3px solid #111;background:#c6c6c6;color:#303030;box-shadow:inset 3px 3px #fff,inset -3px -3px #555;text-shadow:none}\n.mcModTitle{margin:0 0 28px;text-align:center;font-size:22px;line-height:1.4;font-weight:400}\n.mcModOption{display:flex;align-items:center;gap:12px;cursor:pointer;line-height:1.7}\n.mcModCheckbox{appearance:none;box-sizing:border-box;position:relative;flex:0 0 24px;width:24px;height:24px;margin:0;border:2px solid #222;background:#777;box-shadow:inset 2px 2px #444,inset -2px -2px #ddd;cursor:pointer}\n.mcModCheckbox:checked::after{content:\"\";position:absolute;left:6px;top:1px;width:6px;height:12px;border:solid #fff;border-width:0 3px 3px 0;transform:rotate(45deg)}\n.mcModCheckbox:focus-visible,.mcModButton:focus-visible{outline:3px solid #174ba0;outline-offset:3px}\n.mcModHint{margin:12px 0 26px;font-size:13px;line-height:1.7;color:#4b4b4b}\n.mcModSun{min-width:0;margin:0 0 24px;padding:12px;border:1px solid #a1adbf;border-radius:6px}\n.mcModSun legend{padding:0 6px;font-size:14px}\n.mcModSunChoices{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}\n.mcModRangeChoices{grid-template-columns:repeat(2,minmax(0,1fr))}\n.mcModSunChoice{display:flex;align-items:center;justify-content:center;gap:6px;min-width:0;padding:8px 4px;border:1px solid #a1adbf;border-radius:5px;background:#f3f6fa;font-size:14px;overflow-wrap:anywhere;cursor:pointer}\n.mcModSunChoice:has(input:checked){border-color:#405f8d;background:#d2e1f5}\n.mcModSunChoice input{flex:0 0 auto;margin:0;accent-color:#405f8d}\n.mcModSunChoice input:focus-visible{outline:2px solid #174ba0;outline-offset:3px}\n.mcModSun:disabled{opacity:.55}\n.mcModSun:disabled .mcModSunChoice{cursor:default}\n.mcModSunHint{margin:10px 0 0;font-size:12px;line-height:1.7;color:#4b4b4b}\n.mcModButton{display:block;box-sizing:border-box;width:180px;max-width:100%;min-height:36px;margin:0 auto;padding:7px 16px;border:2px solid #000;border-radius:0;background:#999 none center/100% 100%;color:#fff;font:inherit;text-shadow:2px 2px #3f3f3f;cursor:pointer}\n.mcModButton:hover{background-image:none;color:#ffffa0}\n.mcModKeys{margin:14px 0 0;text-align:center;font-size:12px;color:#555}\n.mcModViewHint{margin:0 0 22px;text-align:center;font-size:13px;line-height:1.6;color:#444}\n.mhud .mcModShiftWarning{position:absolute;top:70px;left:50%;transform:translateX(-50%);max-width:80%;padding:10px;background:#531e14e6;color:#fff;font-size:14px;line-height:1.6;pointer-events:none}\n.mhud .mcModShiftWarning[hidden]{display:none!important}\n.mhud .topButtons .btn{font-size:13px!important}\n.mhud .panel,.mhud .modal,.mhud .sheet,.mhud .bpPanel,.mhud .merPanel,.mhud .setPanel{border-radius:0!important;border:3px solid #111!important;background:#c6c6c6!important;color:#404040!important;text-shadow:none!important;box-shadow:inset 3px 3px #fff,inset -3px -3px #555!important}\n.mhud .panelTitle,.mhud .bpTitle,.mhud .merTitle,.mhud .setTitle{color:#404040!important;text-shadow:none!important}\n.mhud .ivIcon{border-radius:0!important;border-color:#373737!important;background-color:#8b8b8b!important}\n.mhud .bpCard,.mhud .craftCard,.mhud .merCard,.mhud .ivMat,.mhud .bvTab{border-radius:0!important}\n/* Compact 9-column inventory; decorations below are CSS, not image assets. */\n.mhud .panelBackpack.mcCreativeInventory{--mc-inv-px:3px;box-sizing:border-box!important;width:calc(195 * var(--mc-inv-px))!important;height:calc(136 * var(--mc-inv-px))!important;min-height:0!important;max-height:none!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important;font-weight:400!important;color:#404040!important}\n.mcCreativeInventory::before{content:\"\";position:absolute;inset:0;background:none 0 0/100% 100%;image-rendering:pixelated;pointer-events:none}\n.mcCreativeInventory .bpContent{position:static!important;padding:0!important}\n.mcCreativeInventory .bpContent>.panelTitle{position:absolute;top:calc(6 * var(--mc-inv-px));left:calc(8 * var(--mc-inv-px));margin:0!important;padding:0!important;font-size:calc(6 * var(--mc-inv-px))!important;line-height:1;font-weight:400!important;white-space:nowrap}\n.mcCreativeInventory .panelTitle .guideProgress{margin-left:calc(4 * var(--mc-inv-px));font-size:calc(4 * var(--mc-inv-px));color:#666!important}\n.mcCreativeInventory .bpContent>.panelSub{position:absolute;top:calc(6 * var(--mc-inv-px));right:calc(23 * var(--mc-inv-px));margin:0!important;font-size:calc(5 * var(--mc-inv-px))!important;line-height:1;font-weight:400;color:#404040!important}\n.mcCreativeInventory .bpContent>.panelSub~.panelSub{display:none!important}\n.mcCreativeInventory .bpContent>.bvTabs{position:absolute;left:0;top:calc(-28 * var(--mc-inv-px));display:flex;flex-wrap:nowrap;gap:calc(1 * var(--mc-inv-px));margin:0!important;z-index:1}\n.mcCreativeInventory .bpContent>.bvTabs>.bvTab{position:relative;box-sizing:border-box;width:calc(28 * var(--mc-inv-px));height:calc(32 * var(--mc-inv-px));min-height:0!important;padding:0!important;border:0!important;background:transparent none center/100% 100%!important;image-rendering:pixelated;font-size:0!important;box-shadow:none!important}\n.mcCreativeInventory .bpContent>.bvTabs>.bvTab.active{background-image:none!important}\n.mcCreativeInventory .bpContent>.bvTabs>.bvTab::before{content:\"\";position:absolute;left:calc(6 * var(--mc-inv-px));top:calc(7 * var(--mc-inv-px));width:calc(16 * var(--mc-inv-px));height:calc(16 * var(--mc-inv-px));background:center/100% 100% no-repeat}\n.mcCreativeInventory .bvTab[data-tab=pack]::before{background-image:var(--mc-native-chest-icon,none)!important}\n.mcCreativeInventory .bvTab[data-tab=build]::before{background-image:none!important}\n.mcCreativeInventory .dismissClose{top:calc(3 * var(--mc-inv-px))!important;right:calc(4 * var(--mc-inv-px))!important;width:calc(11 * var(--mc-inv-px))!important;height:calc(11 * var(--mc-inv-px))!important;padding:0!important;border:calc(.5 * var(--mc-inv-px)) solid #8197b9!important;border-radius:calc(2 * var(--mc-inv-px))!important;background:#d5dee9!important;color:#40506b!important;font:0/1 var(--mc-font)!important;box-shadow:none!important}\n.mcCreativeInventory .dismissClose::before,.mcCreativeInventory .dismissClose::after{content:\"\";position:absolute;left:50%;top:50%;width:calc(6 * var(--mc-inv-px));height:calc(2 / 3 * var(--mc-inv-px));border-radius:calc(1 / 3 * var(--mc-inv-px));background:currentColor;transform:translate(-50%,-50%) rotate(45deg);pointer-events:none}\n.mcCreativeInventory .dismissClose::after{transform:translate(-50%,-50%) rotate(-45deg)}\n.mcCreativeInventory .dismissClose:hover{background:#bdc9d9!important;border-color:#40506b!important;color:#24324a!important}\n.mcCreativeInventory .dismissClose:focus-visible{outline:2px solid #405b84;outline-offset:2px}\n.mcCreativeInventory .dismissClose:active{background:#aebed1!important}\n.mcCreativeGrid,.mcCreativeHotbar{position:absolute;left:calc(8 * var(--mc-inv-px));width:calc(162 * var(--mc-inv-px));display:grid;grid-template-columns:repeat(9,calc(18 * var(--mc-inv-px)));grid-auto-rows:calc(18 * var(--mc-inv-px));gap:0;box-sizing:border-box}\n.mcCreativeGrid{top:calc(18 * var(--mc-inv-px));height:calc(90 * var(--mc-inv-px));overflow-x:hidden;overflow-y:auto;scrollbar-width:none;overscroll-behavior:contain}\n.mcCreativeGrid::-webkit-scrollbar{display:none}\n.mcCreativeHotbar{top:calc(112 * var(--mc-inv-px));height:calc(18 * var(--mc-inv-px))}\n.mcCreativeInventory .bpCard,.mcCreativeInventory .mcCreativeHotSlot{position:relative!important;display:flex!important;justify-content:center;align-items:center;box-sizing:border-box!important;width:calc(18 * var(--mc-inv-px))!important;height:calc(18 * var(--mc-inv-px))!important;min-width:0!important;min-height:0!important;margin:0!important;padding:calc(1 * var(--mc-inv-px))!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;opacity:1!important;font:inherit;cursor:default}\n.mcCreativeInventory .bpCard.pick,.mcCreativeInventory .mcCreativeHotSlot{cursor:pointer}\n.mcCreativeInventory .bpCard:hover,.mcCreativeInventory .bpCard:focus-visible,.mcCreativeInventory .mcCreativeHotSlot:hover,.mcCreativeInventory .mcCreativeHotSlot:focus-visible{background:#ffffff70!important;outline:0}\n.mcCreativeInventory .bpCard.guideCard{outline:calc(1 * var(--mc-inv-px)) solid #fff0a6!important;outline-offset:calc(-1 * var(--mc-inv-px))}\n.mcCreativeInventory .mcCreativeHotSlot.selected{outline:calc(1 * var(--mc-inv-px)) solid #fff!important;outline-offset:calc(-1 * var(--mc-inv-px))}\n.mcCreativeInventory .bpCard .ivIcon,.mcCreativeInventory .mcCreativeHotSlot .ivIcon,.mcCreativeInventory .bvPick .ivIcon{position:relative;display:block!important;box-sizing:border-box!important;width:calc(16 * var(--mc-inv-px))!important;height:calc(16 * var(--mc-inv-px))!important;margin:0!important;border:0!important;border-radius:0!important;background-color:transparent!important;image-rendering:pixelated}\n.mcCreativeInventory .bpCard[data-mc-empty=true] .ivIcon{opacity:.5}\n.mcCreativeInventory .bpName,.mcCreativeInventory .bvCardName{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;overflow:hidden!important;clip-path:inset(50%);white-space:nowrap}\n.mcCreativeInventory .bpCount,.mcCreativeInventory .slotCount,.mcCreativeInventory .bvCardCount{position:absolute!important;right:calc(1 * var(--mc-inv-px))!important;bottom:calc(1 * var(--mc-inv-px))!important;z-index:1;color:#fff!important;font:400 calc(6 * var(--mc-inv-px))/1 var(--mc-font)!important;text-shadow:calc(1 * var(--mc-inv-px)) calc(1 * var(--mc-inv-px)) #3f3f3f!important;pointer-events:none}\n.mcCreativeInventory .bpCount{font-size:0!important}\n.mcCreativeInventory .bpCount::after{content:attr(data-mc-count);font-size:calc(6 * var(--mc-inv-px))}\n.mcCreativeInventory .bpCount[data-mc-count=\"0\"]::after{content:\"\"}\n.mcCreativeInventory .slotKey{display:none!important}\n.mcCreativeInventory .mcCreativeScroll{position:absolute;left:calc(175 * var(--mc-inv-px));top:calc(18 * var(--mc-inv-px));box-sizing:border-box;appearance:none;writing-mode:vertical-lr;direction:ltr;width:calc(12 * var(--mc-inv-px));height:calc(90 * var(--mc-inv-px));padding:0;margin:0;border:0;background:transparent;cursor:pointer}\n.mcCreativeScroll::-webkit-slider-runnable-track{background:transparent;width:100%;height:100%}\n.mcCreativeScroll::-webkit-slider-thumb{appearance:none;width:calc(12 * var(--mc-inv-px));height:calc(15 * var(--mc-inv-px));border:0;background:none center/100% 100%;image-rendering:pixelated}\n.mcCreativeScroll:disabled::-webkit-slider-thumb{background-image:none}\n.mcCreativeInventory .buildView{position:absolute;left:calc(8 * var(--mc-inv-px));top:calc(18 * var(--mc-inv-px));box-sizing:border-box;width:calc(180 * var(--mc-inv-px));height:calc(90 * var(--mc-inv-px));overflow:auto;background:#c6c6c6!important;color:#404040!important;gap:calc(2 * var(--mc-inv-px));scrollbar-color:#8b8b8b #444}\n.mcCreativeInventory .buildView .bvTabs{gap:calc(2 * var(--mc-inv-px));margin:0 0 calc(2 * var(--mc-inv-px))}\n.mcCreativeInventory .buildView>*{flex-shrink:0}\n.mcCreativeInventory .buildView>.bvTabs{position:sticky;top:0;z-index:3;background:#c6c6c6}\n.mcCreativeInventory .buildView .bvTab,.mcCreativeInventory .bvChip{font-family:var(--mc-font);font-size:calc(5 * var(--mc-inv-px));font-weight:400;color:#404040;background:#aaa;border-radius:0;min-height:calc(12 * var(--mc-inv-px));padding:calc(2 * var(--mc-inv-px)) calc(4 * var(--mc-inv-px))}\n.mcCreativeInventory .buildView .bvTab.active,.mcCreativeInventory .bvChip.active{background:#eee}\n.mcCreativeInventory .bvCards{grid-template-columns:repeat(9,calc(18 * var(--mc-inv-px)));gap:0}\n.mcCreativeInventory .bvCard{box-sizing:border-box;width:calc(18 * var(--mc-inv-px));height:calc(18 * var(--mc-inv-px));border:calc(1 * var(--mc-inv-px)) solid;border-color:#373737 #fff #fff #373737;border-radius:0;background:#8b8b8b}\n.mcCreativeInventory .bvCard.active{outline:calc(1 * var(--mc-inv-px)) solid #fff;outline-offset:calc(-1 * var(--mc-inv-px));background:#aaa}\n.mcCreativeInventory .bvPick{position:relative;width:100%;height:100%;min-height:0;padding:0;border:0;justify-content:center}\n.mcCreativeInventory .buildView .panelSub{margin:calc(3 * var(--mc-inv-px)) 0 calc(1 * var(--mc-inv-px));color:#404040;font-size:calc(5 * var(--mc-inv-px))}\n.mcCreativeInventory .bvSwatches{grid-template-columns:repeat(16,1fr);gap:calc(1 * var(--mc-inv-px))}\n.mcCreativeInventory .bvSwatch{min-height:calc(9 * var(--mc-inv-px));border-radius:0}\n.mcCreativeInventory .bvCurrent,.mcCreativeInventory .bvNote{color:#404040;font-size:calc(5 * var(--mc-inv-px))}\n.mcCreativeTooltip{position:absolute;z-index:100;box-sizing:border-box;width:max-content;max-width:calc(120 * var(--mc-inv-px));padding:calc(3 * var(--mc-inv-px));border:calc(1 * var(--mc-inv-px)) solid #250063;background:#100010f5;color:#fff;box-shadow:0 0 0 calc(1 * var(--mc-inv-px)) #100010;font:400 calc(5 * var(--mc-inv-px))/1.55 var(--mc-font);text-shadow:calc(.5 * var(--mc-inv-px)) calc(.5 * var(--mc-inv-px)) #333;pointer-events:none;overflow-wrap:anywhere}\n.mcCreativeTooltip[hidden]{display:none!important}\n.mcCreativeTooltipCount{color:#aaa}\n.mcInventoryHelp,.mcInventoryNotice{position:absolute;top:calc(139 * var(--mc-inv-px));left:0;box-sizing:border-box;width:100%;margin:0;padding:calc(2 * var(--mc-inv-px));background:#0009;color:#fff;font:400 calc(5 * var(--mc-inv-px))/1.6 var(--mc-font);text-align:center;text-shadow:1px 1px #333;pointer-events:none}\n.mcInventoryNotice{top:calc(152 * var(--mc-inv-px));background:#17321de6}\n.mcInventoryNotice[data-error=true]{background:#541b17e6}\n.mcInventoryNotice[hidden]{display:none!important}\n.mcCreativeInventory .mcCreativeHotSlot.mcDropReady{outline:calc(.5 * var(--mc-inv-px)) dashed #ffffffa0;outline-offset:calc(-1 * var(--mc-inv-px))}\n.mcCreativeInventory .mcCreativeHotSlot.mcDropTarget,.hotSlots>.slot.mcDropTarget{background:#fff9!important;outline:calc(1 * var(--mc-inv-px,2px)) solid #ffffa0!important;outline-offset:calc(-1 * var(--mc-inv-px,2px))}\n.mcCreativeInventory .mcDragging .ivIcon{opacity:.3!important}\n.mcCreativeInventory .bpCard,.mcCreativeInventory .bvCard,.mcCreativeHotSlot{user-select:none;touch-action:none}\n.mcInventoryDragGhost{position:fixed;left:-2000px;top:-2000px;display:block;width:48px;height:48px;background:center/100% 100% no-repeat;image-rendering:pixelated;pointer-events:none}\n.mhud .tip,.mhud .notice,.mhud .toast,.mhud .actionPrompt,.mhud .targetHint,.mhud .clickHint{border-radius:0!important;background-color:#0009!important;font-family:var(--mc-font)!important;font-weight:400!important}\n.mhud .toast,.mhud .actionPrompt{margin-bottom:46px}\n::slotted(.sr-chatbox){font-family:var(--mc-font)!important;border-radius:0!important;background:#0005!important;box-shadow:none!important;text-shadow:1px 1px #333}\n@media(min-width:1600px){:host{--mc-scale:1.5}}\n@media(min-width:2400px){:host{--mc-scale:2}}\n@media(max-width:1200px){.mhud .topButtons .btn{font-size:11px!important;padding:4px 7px!important}}\n@media(max-width:800px){:host{--mc-scale:1}.mhud .topButtons .btn{font-size:10px!important}.mhud .hotbar{margin-top:0}}\n/* Hide the in-world HUD while retaining inventory, emote and F2 dialogs. */\n.mhud.mcControlsHudHidden{visibility:hidden!important}\n.mhud.mcControlsHudHidden>.panel,.mhud.mcControlsHudHidden>.emotePalette{visibility:visible!important}\n:host([data-mc-hud-hidden]) .mobile{visibility:hidden!important}\n\n/* Distribution skin: CSS only; no Minecraft images or fonts. */\n.mhud{font-family:var(--mc-font)!important;text-shadow:1px 1px #0008}\n.mhud .btn,.mcModButton{background:#53627c!important;border:2px solid #27354e!important;border-radius:5px!important;color:#fff!important}\n.mhud .btn:hover:not(:disabled),.mcModButton:hover{background:#687d9d!important}\n.mhud .hotbar{background:none!important}\n.mhud .slot,.mhud .pickaxeBox{border:2px solid #6b7890!important;background:#26354ddd!important;box-shadow:inset 0 0 0 1px #ffffff24!important}\n.mhud .slot.selected::before,.mhud .pickaxeBox.selected::after{box-sizing:border-box;border:3px solid #fff0a6;background:none!important}\n.mhud .pickaxeBox::before{content:\"⛏\";display:grid;place-items:center;background:none!important;font:28px/1 sans-serif}\n.mhud .pickaxeTag{bottom:50px!important}\n.mhud .panelBackpack.mcCreativeInventory{isolation:isolate;background:transparent!important;border:2px solid transparent!important;border-radius:8px!important;box-shadow:none!important}\n.mhud .panelBackpack.mcCreativeInventory:has(>.bpContent>.bvTabs>.bvTab:first-child.active){border-top-left-radius:0!important}\n/* The panel face covers the inactive bookmark's lower edge. */\n.mcCreativeInventory::before{display:block;inset:-2px;z-index:1;box-sizing:border-box;background:#e2e7ee;border:2px solid #40506b;border-radius:inherit;box-shadow:0 6px 24px #0006}\n.mcCreativeInventory .bpContent>.bvTabs{left:-2px;top:calc(-28 * var(--mc-inv-px) - 2px);z-index:auto}\n.mcCreativeInventory .bpContent>:not(.bvTabs){z-index:2}\n.mcCreativeInventory .dismissClose{z-index:3}\n.mcCreativeInventory .bpContent>.bvTabs>.bvTab{height:calc(28 * var(--mc-inv-px) + 2px);z-index:0;transform:translateY(calc(4 * var(--mc-inv-px)));background:#bdc9d9!important;border:2px solid #40506b!important;border-radius:7px 7px 0 0!important;font-size:calc(4 * var(--mc-inv-px))!important;color:#24324a!important}\n.mcCreativeInventory .bpContent>.bvTabs>.bvTab.active{z-index:2;transform:none;background:#e2e7ee!important;border-bottom:0!important}\n.mcCreativeInventory .bpContent>.bvTabs>.bvTab:not(.active){clip-path:inset(0 0 calc(4 * var(--mc-inv-px) + 2px) 0)}\n.mcCreativeInventory .bpContent>.bvTabs>.bvTab:focus-visible{outline:2px solid #405b84;outline-offset:-5px}\n.mcCreativeInventory .bpContent>.bvTabs>.bvTab::before{display:none!important}\n.mcCreativeInventory .bpCard,.mcCreativeInventory .mcCreativeEmpty,.mcCreativeInventory .mcCreativeHotSlot{box-sizing:border-box;border:1px solid #9aa8bd!important;background:#ccd5e2!important}\n.mcCreativeInventory .mcCreativeHotSlot.selected{outline-color:#405b84!important}\n.mcCreativeInventory .buildView,.mcCreativeInventory .buildView>.bvTabs{background:#e2e7ee!important}\n.mcCreativeScroll::-webkit-slider-runnable-track{background:#bdc9d9;border-radius:4px}\n.mcCreativeScroll::-webkit-slider-thumb{background:#6b7e9b;border:1px solid #40506b;border-radius:4px}\n.mcCreativeScroll:disabled::-webkit-slider-thumb{background:#a7b4c6}\n.mcCreativeTooltip{background:#25334af5;border-color:#8197b9;box-shadow:none}\n.mcModDialog{background:#e2e7ee;border-color:#40506b;box-shadow:0 6px 24px #0006;border-radius:8px}\n/* Localized text can wrap without crossing frames or overlapping notices. */\n.mcModDialog,.mcModOption>span,.mcModHint,.mcModViewHint{min-width:0;overflow-wrap:anywhere}\n.mcInventoryFooter{position:absolute;top:calc(139 * var(--mc-inv-px));left:0;width:100%;display:flex;flex-direction:column;gap:calc(2 * var(--mc-inv-px));pointer-events:none}\n.mcInventoryFooter>.mcInventoryHelp,.mcInventoryFooter>.mcInventoryNotice{position:static;inset:auto;overflow-wrap:anywhere}\n.mhud .mcSelectedItemName{white-space:normal;overflow-wrap:anywhere;text-align:center;text-overflow:clip}\n.mcCreativeInventory .bpContent>.bvTabs>.bvTab{overflow-wrap:anywhere;line-height:1.25}\n.mhud .topButtons{max-width:calc(100% - 180px)!important;flex-wrap:wrap!important;justify-content:flex-end}\n.mcModDialog:lang(ko){word-break:keep-all}\n.mcModVisualMode{min-width:0;margin:0 0 22px;padding:14px 12px;border:1px solid #a1adbf;border-radius:6px}\n.mcModVisualMode>.mcModHint:last-child,.mcModVisualMode>.mcModSun:last-child{margin-bottom:0}\n.mcModOption:has(input:disabled){opacity:.55;cursor:not-allowed}\n.mcModCheckbox:disabled{cursor:not-allowed}\n/* A fixed compass rim with a red shop-facing tip and a pale counterweight. */\n.mhud .shopArrow.mcShopCompass{position:relative;box-sizing:border-box;flex:0 0 18px;width:18px;height:18px;min-width:18px;overflow:visible;border:1px solid #9aa8bd;border-radius:50%;background:radial-gradient(circle,#26354d 0 64%,#d6dfeb 66% 69%,#26354d 71%);vertical-align:middle;transform:none!important;transition:none!important;font-size:0!important;text-shadow:none!important}\n.mcShopCompassNeedle{position:absolute;inset:1px;transform-origin:50% 50%;pointer-events:none}\n.mcShopCompassNeedle::before,.mcShopCompassNeedle::after{content:\"\";position:absolute;left:50%;width:6px;height:8px;transform:translateX(-50%);clip-path:polygon(50% 0,100% 100%,0 100%)}\n.mcShopCompassNeedle::before{bottom:50%;background:linear-gradient(90deg,#ff9a91 0 50%,#ed4b43 50%)}\n.mcShopCompassNeedle::after{top:50%;transform:translateX(-50%) rotate(180deg);background:linear-gradient(90deg,#f3f6fb 0 50%,#aebbd0 50%)}\n","waterItemIcon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEVMaXH61I4WdORPJA+xfj7cqV2UTyqibjXjs2fPmk9MIw5SJRAAR6lmt/rKrHtoMhrJHkfXAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAD6AAAA+gBtXtSawAAAGJJREFUCNdjYMAGdltDaCtBwcUgmrGkcrq7MJCxvEZJ6XghAwOXzN1LSkrqBgxcgkpAIGjAwGA5UVBQ0hOoxiylRbQtE8iwCGlpDQWLgBhuQAZrWFpZqjPIRJMWiWYDLDYDAKjRFPv6V0XHAAAAAElFTkSuQmCC"};

;
/* MOD text only. Item, shape and color names come from the game's own translator. */
(() => {
  'use strict';
  const messages = {
    ja: {
      paperDollLabel: 'ペーパードールを表示する', paperDollHint: '一人称のとき、左上に自分のキャラクターを表示します。', paperDollPortrait: '自分のキャラクター',
      modName: 'Speaki_rpg_mine_patch（スピキクラフトMOD）', ready: '準備完了',
      realismLabel: '写実的な光', realismHint: '柔らかい光を追加して、リアルな描写にします。「影を表示する」よりも負荷が高くなります。',
      shadowsLabel: "影を表示する",
      shadowsHint: "簡易的な影を表示します。",
      shadowsUnavailable: "影の描画を停止しました。再読み込みすると元の表示で起動します。",
      sunPosition: '時間帯', sunMorning: '朝', sunDay: '昼', sunEvening: '夕方',
      shadowRange: '影の範囲', rangeSmall: '小（32ブロック）', rangeMedium: '中（64ブロック）', rangeHigh: '高（128ブロック）', rangeUltra: '極高（表示中すべて）',
      sunHint: '朝・夕方は影が長くなり、夕方は画面に赤みが加わります。',

      settingsButton: 'MOD設定 [F2]', settingsTitle: 'スピキクラフトMOD 設定',
      viewHint: '視点：{view}　[M]で切り替え',
      perspective0: '一人称', perspective1: '三人称（後方）', perspective2: '二人称（正面）',
      sneakLabel: 'Shift中の落下防止',
      sneakHint: 'Shift中は移動速度が30％になり、一人称の視点だけ少し下がります。',
      sneakUnavailable: '落下防止は未接続です。拡張機能とゲームを再読み込みしてください。ゲーム更新後はMODの更新が必要です。',
      sneakWarning: 'Shift落下防止が未接続です。拡張機能とゲームを再読み込みしてください。',
      controlsLabel: '某ゲーム風の操作',
      controlsHint: 'F1：HUD切替／T：チャット／E：インベントリ／Ctrl単独：エモート。Esc：チャットを閉じる／Shift：降車／右クリック長押し：連続配置。',
      done: '完了', closeKeys: 'F2 / Esc で閉じる',
      inventoryHelp: 'アイテムを下の枠へドラッグして登録。枠どうしのドラッグで入れ替え。',
      owned: '所持数：{count}', cardLabel: '{item}、所持数 {count}',
      hotbar: 'ホットバー', hotbarSlot: 'ホットバー {slot}', inventoryItems: 'リュックのアイテム', inventoryScroll: 'リュックのスクロール',
      cannotAssign: 'このアイテムは鉱山のホットバーに登録できません。',
      hotbarDisconnected: 'ホットバーが未接続です。拡張機能とゲームを再読み込みしてください。',
      permissionDenied: 'この鉱山で使用する権限がないアイテムです。',
      assigned: 'ホットバー {slot} に登録しました。', chooseSlot: '登録先の枠を選んでください。',
      unsupportedItems: '対応していないアイテムが含まれています。', swapped: 'ホットバー {from} と {to} を入れ替えました。',
      dropOnHotbar: 'ホットバーの枠にドロップしてください。', itemWithShape: '{item}（{shape}）', itemDetailsSeparator: '・', buildOpen: '建築アイテム',
      renderModuleChanged: 'ゲーム更新により描画モジュールの構成が変わっています。MODを更新してください。',
      cameraModuleMissing: '視点変更モジュールを読み込めません。拡張機能を更新してください。',
      nativeAvatarMissing: '鉱山のキャラクター描画を読み込めません。', canvasMissing: 'アイテム表示用Canvasを作成できません。',
      clientStructureChanged: '確認済みクライアントの構造が一致しません。', clientFetchFailed: 'ゲームクライアントを取得できません：{status}',
      clientUpdated: 'ゲームが更新されたためMODを接続せず、元ゲームを起動します。',
      clientBootFailed: 'MODの接続に失敗しました。拡張機能を無効にしてゲームを再読み込みできます。'
    },
    ko: {
      paperDollLabel: '페이퍼 돌 표시', paperDollHint: '1인칭 시점에서 화면 왼쪽 위에 내 캐릭터를 표시합니다.', paperDollPortrait: '내 캐릭터',
      modName: 'Speaki_rpg_mine_patch', ready: '준비 완료',
      realismLabel: '사실적인 조명', realismHint: '부드러운 빛을 추가해 사실적인 화면을 만듭니다. ‘그림자 표시’보다 시스템 부하가 높습니다.',
      shadowsLabel: "그림자 표시",
      shadowsHint: "간단한 그림자를 표시합니다.",
      shadowsUnavailable: "그림자 렌더링을 중지했습니다. 새로고침하면 원래 화면으로 시작합니다.",
      sunPosition: '시간대', sunMorning: '아침', sunDay: '낮', sunEvening: '저녁',
      shadowRange: '그림자 범위', rangeSmall: '낮음 (32블록)', rangeMedium: '중간 (64블록)', rangeHigh: '높음 (128블록)', rangeUltra: '매우 높음 (표시 중인 지형 전체)',
      sunHint: '아침과 저녁에는 그림자가 길어지고, 저녁에는 화면에 붉은 기운이 더해집니다.',

      settingsButton: 'MOD 설정 [F2]', settingsTitle: 'MOD 설정',
      viewHint: '시점: {view} · [M]으로 전환',
      perspective0: '1인칭', perspective1: '3인칭 (후방)', perspective2: '2인칭 (정면)',
      sneakLabel: 'Shift를 누르는 동안 추락 방지',
      sneakHint: 'Shift를 누르면 이동 속도가 평소의 30%가 되고 1인칭 시점만 조금 낮아집니다.',
      sneakUnavailable: '추락 방지 기능이 연결되지 않았습니다. 확장 프로그램과 게임을 새로고침하세요. 게임이 업데이트되면 MOD도 업데이트해야 합니다.',
      sneakWarning: 'Shift 추락 방지 기능이 연결되지 않았습니다. 확장 프로그램과 게임을 새로고침하세요.',
      controlsLabel: '다른 게임 스타일 조작',
      controlsHint: 'F1: HUD 표시 전환 / T: 채팅 / E: 인벤토리 / Ctrl만 눌렀다 떼기: 이모트. Esc: 채팅 닫기 / Shift: 하차 / 오른쪽 버튼 길게 누르기: 연속 배치.',
      done: '완료', closeKeys: 'F2 / Esc로 닫기',
      inventoryHelp: '아이템을 아래 슬롯으로 드래그해 등록하세요. 슬롯끼리 드래그하면 서로 바뀝니다.',
      owned: '보유 수량: {count}', cardLabel: '{item}, 보유 수량 {count}',
      hotbar: '핫바', hotbarSlot: '핫바 {slot}', inventoryItems: '배낭 아이템', inventoryScroll: '배낭 스크롤',
      cannotAssign: '이 아이템은 광산 핫바에 등록할 수 없습니다.',
      hotbarDisconnected: '핫바가 연결되지 않았습니다. 확장 프로그램과 게임을 새로고침하세요.',
      permissionDenied: '이 광산에서 사용할 권한이 없는 아이템입니다.',
      assigned: '핫바 {slot}번에 등록했습니다.', chooseSlot: '등록할 슬롯을 선택하세요.',
      unsupportedItems: '지원하지 않는 아이템이 포함되어 있습니다.', swapped: '핫바 {from}번과 {to}번을 서로 바꿨습니다.',
      dropOnHotbar: '핫바 슬롯에 놓으세요.', itemWithShape: '{item} ({shape})', itemDetailsSeparator: ' · ', buildOpen: '건축 아이템',
      renderModuleChanged: '게임 업데이트로 렌더링 모듈 구조가 변경되었습니다. MOD를 업데이트하세요.',
      cameraModuleMissing: '시점 전환 모듈을 불러올 수 없습니다. 확장 프로그램을 업데이트하세요.',
      nativeAvatarMissing: '광산 캐릭터 렌더러를 불러올 수 없습니다.', canvasMissing: '아이템 표시용 Canvas를 만들 수 없습니다.',
      clientStructureChanged: '확인된 게임 클라이언트 구조와 일치하지 않습니다.', clientFetchFailed: '게임 클라이언트를 가져올 수 없습니다: {status}',
      clientUpdated: '게임이 업데이트되어 MOD를 연결하지 않고 원래 게임을 실행합니다.',
      clientBootFailed: 'MOD 연결에 실패했습니다. 확장 프로그램을 끄고 게임을 새로고침할 수 있습니다.'
    },
    en: {
      paperDollLabel: 'Show paper doll', paperDollHint: 'Display your character in the upper-left corner in first-person view.', paperDollPortrait: 'Your character',
      modName: 'Speaki_rpg_mine_patch', ready: 'Ready',
      realismLabel: 'Realistic lighting', realismHint: 'Adds soft light for more realistic visuals. Uses more processing power than “Show shadows”.',
      shadowsLabel: "Show shadows",
      shadowsHint: "Displays simple shadows.",
      shadowsUnavailable: "Shadow rendering has stopped. Reload to start with the original appearance.",
      sunPosition: 'Time of day', sunMorning: 'Morning', sunDay: 'Noon', sunEvening: 'Evening',
      shadowRange: 'Shadow range', rangeSmall: 'Low (32 blocks)', rangeMedium: 'Medium (64 blocks)', rangeHigh: 'High (128 blocks)', rangeUltra: 'Ultra (all visible terrain)',
      sunHint: 'Morning and evening cast longer shadows; evening adds a reddish tint.',

      settingsButton: 'MOD settings [F2]', settingsTitle: 'MOD settings',
      viewHint: 'View: {view} · Press [M] to switch',
      perspective0: 'First person', perspective1: 'Third person (rear)', perspective2: 'Second person (front)',
      sneakLabel: 'Prevent falling off edges while holding Shift',
      sneakHint: 'Holding Shift reduces movement speed to 30% of normal and slightly lowers the first-person camera.',
      sneakUnavailable: 'Edge protection is not connected. Reload the extension and game. The MOD needs an update after game updates.',
      sneakWarning: 'Shift edge protection is not connected. Reload the extension and game.',
      controlsLabel: 'Controls inspired by another game',
      controlsHint: 'F1: toggle HUD / T: chat / E: inventory / press and release Ctrl alone: emotes. Esc: close chat / Shift: dismount / hold right-click: place blocks repeatedly.',
      done: 'Done', closeKeys: 'F2 / Esc to close',
      inventoryHelp: 'Drag items to the slots below to assign them. Drag between slots to swap.',
      owned: 'Owned: {count}', cardLabel: '{item}, owned {count}',
      hotbar: 'Hotbar', hotbarSlot: 'Hotbar slot {slot}', inventoryItems: 'Backpack items', inventoryScroll: 'Scroll backpack',
      cannotAssign: 'This item cannot be assigned to the Mining hotbar.',
      hotbarDisconnected: 'The hotbar is not connected. Reload the extension and game.',
      permissionDenied: 'You do not have permission to use this item in this mine.',
      assigned: 'Assigned to hotbar slot {slot}.', chooseSlot: 'Choose a destination slot.',
      unsupportedItems: 'The selection contains unsupported items.', swapped: 'Swapped hotbar slots {from} and {to}.',
      dropOnHotbar: 'Drop the item onto a hotbar slot.', itemWithShape: '{item} ({shape})', itemDetailsSeparator: ', ', buildOpen: 'Building items',
      renderModuleChanged: 'A game update changed the rendering module. Update the MOD.',
      cameraModuleMissing: 'The camera mode module could not be loaded. Update the extension.',
      nativeAvatarMissing: 'The Mining character renderer could not be loaded.', canvasMissing: 'The item display Canvas could not be created.',
      clientStructureChanged: 'The game client does not match the reviewed structure.', clientFetchFailed: 'Could not fetch the game client: {status}',
      clientUpdated: 'The game has updated. Starting the original game without connecting the MOD.',
      clientBootFailed: 'The MOD could not connect. You can disable the extension and reload the game.'
    },
    'zh-CN': {
      paperDollLabel: '显示纸娃娃', paperDollHint: '在第一人称视角下，于左上角显示自己的角色。', paperDollPortrait: '自己的角色',
      modName: 'Speaki_rpg_mine_patch', ready: '准备就绪',
      realismLabel: '写实光照', realismHint: '添加柔和的光线，使画面更加真实。比“显示阴影”消耗更多性能。',
      shadowsLabel: "显示阴影",
      shadowsHint: "显示简单的阴影。",
      shadowsUnavailable: "已停止阴影渲染。重新加载后将使用原有画面。",
      sunPosition: '时段', sunMorning: '早晨', sunDay: '中午', sunEvening: '傍晚',
      shadowRange: '阴影范围', rangeSmall: '低（32格）', rangeMedium: '中（64格）', rangeHigh: '高（128格）', rangeUltra: '极高（全部可见地形）',
      sunHint: '早晨和傍晚的影子更长，傍晚的画面会偏红。',

      settingsButton: 'MOD设置 [F2]', settingsTitle: 'MOD设置',
      viewHint: '视角：{view} · 按 [M] 切换',
      perspective0: '第一人称', perspective1: '第三人称（背面）', perspective2: '第二人称（正面）',
      sneakLabel: '按住Shift时防止从边缘掉落',
      sneakHint: '按住Shift时，移动速度降至平时的30%，仅第一人称视角会略微降低。',
      sneakUnavailable: '防跌落功能尚未连接。请重新加载扩展程序和游戏。游戏更新后，MOD也需要更新。',
      sneakWarning: 'Shift防跌落功能尚未连接。请重新加载扩展程序和游戏。',
      controlsLabel: '参考另一款游戏的操作',
      controlsHint: 'F1：切换HUD显示／T：聊天／E：物品栏／单独按下并松开Ctrl：表情动作。Esc：关闭聊天／Shift：下车／按住右键：连续放置方块。',
      done: '完成', closeKeys: '按F2 / Esc关闭',
      inventoryHelp: '将物品拖到下方快捷栏中进行设置。在格子之间拖动可交换物品。',
      owned: '持有数量：{count}', cardLabel: '{item}，持有数量 {count}',
      hotbar: '快捷栏', hotbarSlot: '快捷栏第{slot}格', inventoryItems: '背包物品', inventoryScroll: '滚动背包',
      cannotAssign: '无法将此物品设置到矿山快捷栏。',
      hotbarDisconnected: '快捷栏尚未连接。请重新加载扩展程序和游戏。',
      permissionDenied: '你没有在此矿山使用该物品的权限。',
      assigned: '已设置到快捷栏第{slot}格。', chooseSlot: '请选择目标格子。',
      unsupportedItems: '所选物品中包含不支持的物品。', swapped: '已交换快捷栏第{from}格与第{to}格。',
      dropOnHotbar: '请将物品放到快捷栏的格子中。', itemWithShape: '{item}（{shape}）', itemDetailsSeparator: '、', buildOpen: '建筑物品',
      renderModuleChanged: '游戏更新导致渲染模块结构发生变化。请更新MOD。',
      cameraModuleMissing: '无法加载视角切换模块。请更新扩展程序。',
      nativeAvatarMissing: '无法加载矿山角色渲染器。', canvasMissing: '无法创建用于显示物品的Canvas。',
      clientStructureChanged: '游戏客户端与已检查的结构不一致。', clientFetchFailed: '无法获取游戏客户端：{status}',
      clientUpdated: '游戏已更新。将不连接MOD，直接启动原游戏。',
      clientBootFailed: 'MOD连接失败。你可以停用扩展程序后重新加载游戏。'
    },
    'zh-TW': {
      paperDollLabel: '顯示紙娃娃', paperDollHint: '在第一人稱視角下，於左上角顯示自己的角色。', paperDollPortrait: '自己的角色',
      modName: 'Speaki_rpg_mine_patch', ready: '準備就緒',
      realismLabel: '寫實光照', realismHint: '加入柔和的光線，讓畫面更加真實。比「顯示陰影」消耗更多效能。',
      shadowsLabel: "顯示陰影",
      shadowsHint: "顯示簡易陰影。",
      shadowsUnavailable: "已停止陰影繪製。重新載入後將使用原有畫面。",
      sunPosition: '時段', sunMorning: '早晨', sunDay: '中午', sunEvening: '傍晚',
      shadowRange: '陰影範圍', rangeSmall: '低（32格）', rangeMedium: '中（64格）', rangeHigh: '高（128格）', rangeUltra: '極高（全部可見地形）',
      sunHint: '早晨和傍晚的影子更長，傍晚的畫面會偏紅。',

      settingsButton: 'MOD設定 [F2]', settingsTitle: 'MOD設定',
      viewHint: '視角：{view} · 按 [M] 切換',
      perspective0: '第一人稱', perspective1: '第三人稱（背面）', perspective2: '第二人稱（正面）',
      sneakLabel: '按住Shift時防止從邊緣掉落',
      sneakHint: '按住Shift時，移動速度降至平時的30%，只有第一人稱視角會稍微降低。',
      sneakUnavailable: '防墜落功能尚未連接。請重新載入擴充功能與遊戲。遊戲更新後，MOD也需要更新。',
      sneakWarning: 'Shift防墜落功能尚未連接。請重新載入擴充功能與遊戲。',
      controlsLabel: '參考另一款遊戲的操作',
      controlsHint: 'F1：切換HUD顯示／T：聊天／E：物品欄／單獨按下並放開Ctrl：表情動作。Esc：關閉聊天／Shift：下車／按住右鍵：連續放置方塊。',
      done: '完成', closeKeys: '按F2 / Esc關閉',
      inventoryHelp: '將物品拖到下方快捷列中進行設定。在格子之間拖曳可交換物品。',
      owned: '持有數量：{count}', cardLabel: '{item}，持有數量 {count}',
      hotbar: '快捷列', hotbarSlot: '快捷列第{slot}格', inventoryItems: '背包物品', inventoryScroll: '捲動背包',
      cannotAssign: '無法將此物品設定到礦山快捷列。',
      hotbarDisconnected: '快捷列尚未連接。請重新載入擴充功能與遊戲。',
      permissionDenied: '你沒有在此礦山使用該物品的權限。',
      assigned: '已設定到快捷列第{slot}格。', chooseSlot: '請選擇目標格子。',
      unsupportedItems: '所選物品中包含不支援的物品。', swapped: '已交換快捷列第{from}格與第{to}格。',
      dropOnHotbar: '請將物品放到快捷列的格子中。', itemWithShape: '{item}（{shape}）', itemDetailsSeparator: '、', buildOpen: '建築物品',
      renderModuleChanged: '遊戲更新導致算繪模組結構改變。請更新MOD。',
      cameraModuleMissing: '無法載入視角切換模組。請更新擴充功能。',
      nativeAvatarMissing: '無法載入礦山角色算繪器。', canvasMissing: '無法建立用於顯示物品的Canvas。',
      clientStructureChanged: '遊戲用戶端與已檢查的結構不一致。', clientFetchFailed: '無法取得遊戲用戶端：{status}',
      clientUpdated: '遊戲已更新。將不連接MOD，直接啟動原遊戲。',
      clientBootFailed: 'MOD連接失敗。你可以停用擴充功能後重新載入遊戲。'
    }
  };
  const supported = Object.freeze(Object.keys(messages)), listeners = new Set(), bindings = new WeakMap();
  let native = null, locale;
  function normalize(value) {
    const tag = String(value || '').replaceAll('_', '-').toLowerCase();
    if (/^zh(?:-(?:tw|hk|mo|hant)(?:-|$))/.test(tag)) return 'zh-TW';
    if (/^zh(?:-|$)/.test(tag)) return 'zh-CN';
    return ['ja','ko','en'].find(code => tag === code || tag.startsWith(code + '-')) || null;
  }
  function detect() {
    try { const value = normalize(native?.getLocale()); if (value) return value; } catch { /* Use the persisted game setting. */ }
    try { const value = normalize(JSON.parse(localStorage.getItem('sr1_settings') || '{}')?.locale); if (value) return value; } catch { /* Storage can be disabled. */ }
    return normalize(document.documentElement?.lang) || normalize(navigator.language) || 'en';
  }
  function t(key, params = {}) {
    let value = messages[locale]?.[key] ?? messages.en[key] ?? key;
    if (globalThis.__MINING_LOCAL_HOST_ADAPTER__?.settingsKey === false) {
      if (key === 'settingsButton') value = value.replace(/\s*\[F2\]/g, '');
      if (key === 'closeKeys') value = value.replace(/F2\s*\/\s*/g, '');
    }
    return value.replace(/\{(\w+)\}/g, (placeholder, name) => params[name] === undefined ? placeholder : String(params[name]));
  }
  function nativeText(key, fallback) {
    try { const value = native?.translate(key); if (typeof value === 'string' && value && value !== key) return value; } catch { /* MOD fallback is still localized. */ }
    return t(fallback);
  }
  function render(element, attribute, rule) {
    const value = rule.nativeKey ? nativeText(rule.nativeKey, rule.key) : t(rule.key, typeof rule.params === 'function' ? rule.params() : rule.params);
    if (attribute === 'textContent') { if (element.textContent !== value) element.textContent = value; }
    else if (element.getAttribute(attribute) !== value) element.setAttribute(attribute, value);
  }
  function bind(element, key, params = {}, attribute = 'textContent', nativeKey = null) {
    let rules = bindings.get(element);
    if (!rules) { bindings.set(element, rules = new Map()); element.setAttribute('data-mining-i18n', ''); }
    const rule = {key, params, nativeKey}; rules.set(attribute, rule); render(element, attribute, rule); return element;
  }
  function update(root) {
    const nodes = [...root.querySelectorAll('[data-mining-i18n]')];
    if (root.matches?.('[data-mining-i18n]')) nodes.unshift(root);
    for (const element of nodes) for (const [attribute, rule] of bindings.get(element) || []) render(element, attribute, rule);
  }
  function refresh() {
    const next = detect(); if (next === locale) return;
    locale = next; for (const listener of listeners) listener(locale);
  }
  locale = detect();
  globalThis.__MINING_LOCAL_I18N__ = Object.freeze({t, bind, update, refresh, nativeText, supported, get locale() { return locale; }, subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); }});
  globalThis.__MINING_LOCAL_BIND_I18N__ = api => { native = api; refresh(); };
  new MutationObserver(refresh).observe(document.documentElement || document, {attributes: true, attributeFilter: ['lang'], childList: !document.documentElement});
  window.addEventListener('storage', event => { if (!event.key || event.key === 'sr1_settings') refresh(); });
})();

;
/* Shift edge protection uses the game's own voxel collision and fixed-step physics. */
(() => {
  "use strict";
  const settingKey = "speaki-mining-local:shift-edge-guard:v1";
  const held = new Set();
  let enabled = true, native = null, context = null, listener = null, lastStatus = "";
  try { enabled = localStorage.getItem(settingKey) !== "false"; } catch { /* Session setting. */ }
  const sneakSpeed = .3;
  const status = { supported: false, enabled, held: false, active: false, blockedSteps: 0, eyeDrop: 0, speedMultiplier: 1 };
  const typing = event => event.composedPath().some(element => element instanceof HTMLElement &&
    (element.isContentEditable || element.matches("input,textarea,select")));
  function publish() {
    status.enabled = enabled; status.held = held.size > 0;
    const key = JSON.stringify(status);
    if (key !== lastStatus) { lastStatus = key; listener?.({ ...status }); }
  }
  function available() {
    if (!context?.root.host.isConnected || !context.root.host.getClientRects().length ||
        !context.root.querySelector(".mhud") || context.isMenuOpen()) return false;
    const focus = context.root.activeElement || document.activeElement;
    return !focus || !(focus.isContentEditable || focus.matches?.("input,textarea,select"));
  }
  const active = () => !!native && enabled && held.size > 0 && available();
  function clear() { held.clear(); status.active = false; status.eyeDrop = 0; status.speedMultiplier=1; publish(); }
  window.addEventListener("keydown", event => {
    if (event.code !== "ShiftLeft" && event.code !== "ShiftRight") return;
    if (typing(event) || event.isComposing || event.ctrlKey || event.altKey || event.metaKey) return;
    held.add(event.code); publish();
  }, true);
  window.addEventListener("keyup", event => {
    if (held.delete(event.code)) publish();
  }, true);
  window.addEventListener("blur", clear);
  document.addEventListener("visibilitychange", () => { if (document.hidden) clear(); });
  window.addEventListener("focusin", event => { if (typing(event)) clear(); }, true);

  function supportedAt(world, body, descent = .6) {
    // A downward test against native collision boxes also handles slabs, stairs and fences.
    // Allow a half-block descent, but stop at a one-block cliff. Never manufacture support.
    const probe = { ...body, grounded: false, vy: 0 };
    native.moveY(world.query, world.metaQuery, probe, -descent);
    return probe.grounded && probe.y <= body.y + .0001 && probe.y >= body.y - descent - .0001;
  }
  function guardedInput(world, body, input, dt) {
    const elapsed = Math.min(dt, native.maxStep);
    if (!(elapsed > 0) || !Number.isFinite(elapsed) || input.jump ||
        body.embedded || native.collides(world.query, world.metaQuery, body.x, body.y, body.z) ||
        native.unknown(world.query, body.x, body.y, body.z) || !supportedAt(world, body)) return input;
    // Very short native steps can clear grounded before gravity has moved the
    // feet beyond the collision epsilon. Keep guarding actual contact, without
    // treating a jump or an already airborne descent as grounded.
    if (!body.grounded && (body.vy > 0 || !supportedAt(world, body, .002))) return input;
    let dx = input.moveVx * elapsed, dz = input.moveVz * elapsed;
    if ((!dx && !dz) || !Number.isFinite(dx + dz)) return input;
    const canMove = (x, z) => {
      const probe = { ...body };
      const motion = { ...input, moveVx: x / elapsed, moveVz: z / elapsed, jump: false };
      let left = elapsed;
      while (left > .000001) {
        const step = Math.min(native.fixedStep, left);
        native.advance(world.query, probe, motion, step, world.metaQuery);
        if (probe.embedded || !supportedAt(world, probe)) return false;
        left -= step;
      }
      return true;
    };
    if (canMove(dx, dz)) return input;
    const backOff = distance => Math.abs(distance) <= .05 ? 0 : distance - Math.sign(distance) * .05;
    while (dx && !canMove(dx, 0)) dx = backOff(dx);
    while (dz && !canMove(0, dz)) dz = backOff(dz);
    while (dx && dz && !canMove(dx, dz)) { dx = backOff(dx); dz = backOff(dz); }
    status.blockedSteps++;
    return { ...input, moveVx: dx / elapsed, moveVz: dz / elapsed };
  }
  globalThis.__MINING_LOCAL_BIND_PHYSICS__ = api => {
    if (native) return;
    const worldStep = api.WorldClass?.prototype.stepPhysics, cameraUpdate = api.CameraClass?.prototype.update;
    if (typeof worldStep !== "function" || typeof cameraUpdate !== "function" ||
        ![api.advance, api.moveY, api.collides, api.unknown].every(fn => typeof fn === "function")) return;
    native = api;
    api.WorldClass.prototype.stepPhysics = function(body, input, dt) {
      const engaged = active() && this.group === context.worldGroup && !body.climbing;
      status.active = engaged;
      status.speedMultiplier=engaged?sneakSpeed:1;
      const slowed=engaged?{...input,moveVx:input.moveVx*sneakSpeed,moveVz:input.moveVz*sneakSpeed}:input;
      const result = worldStep.call(this, body, engaged ? guardedInput(this, body, slowed, dt) : input, dt);
      publish(); return result;
    };
    api.CameraClass.prototype.update = function() {
      const result = cameraUpdate.apply(this, arguments);
      const drop = active() && this.camera === context.camera && context.getPerspective() === 0 && !this.seated && !context.isClimbing?.() ? .35 : 0;
      this.camera.position.y -= drop;
      status.eyeDrop = drop; publish(); return result;
    };
    status.supported = true; publish();
    delete globalThis.__MINING_LOCAL_BIND_PHYSICS__;
  };
  globalThis.__MINING_LOCAL_SNEAK__ = {
    get enabled() { return enabled; },
    get supported() { return !!native; },
    setEnabled(value) {
      enabled = !!value;
      try { localStorage.setItem(settingKey, String(enabled)); } catch { /* Session setting. */ }
      if (!enabled) { status.active = false; status.eyeDrop = 0; status.speedMultiplier=1; }
      publish();
    },
    setContext(value) { context = value; },
    subscribe(callback) { listener = callback; lastStatus = ""; publish(); }
  };
})();

;
/* Bind layout edits to the original client's local brush settings. */
(() => {
  "use strict";
  const i18n=globalThis.__MINING_LOCAL_I18N__,t=i18n.t;
  const huds = new WeakMap();
  let native = null, minecartIcon = null;
  globalThis.__MINING_LOCAL_BIND_HOTBAR__ = api => {
    if (native || !api.HUDClass?.prototype.rebuildHotbar || !api.normalizeBrush || !api.saveBrushes) return;
    native = api;
    if (minecartIcon) api.itemIcons?.set(14,minecartIcon);
    const rebuild = api.HUDClass.prototype.rebuildHotbar;
    api.HUDClass.prototype.rebuildHotbar = function() {
      const result = rebuild.apply(this, arguments);
      huds.set(this.root, this);
      this.root.dataset.miningVanillaHotbarConnected = 'true';
      this.slots.forEach((slot, index) => { slot.root.dataset.mcHotbarIndex = String(index); });
      return result;
    };
    const setTargetHint = api.HUDClass.prototype.setTargetHint;
    if (setTargetHint && api.farHint) {
      api.HUDClass.prototype.setTargetHint = function(text) {
        return setTargetHint.call(this, text === api.farHint() ? null : text);
      };
    }
    if (api.BuildClass) {
      const materialCard = api.BuildClass.prototype.materialCard;
      api.BuildClass.prototype.materialCard = function(kind) {
        const card = materialCard.apply(this, arguments); card.dataset.kind = String(kind); return card;
      };
    }
    delete globalThis.__MINING_LOCAL_BIND_HOTBAR__;
  };
  globalThis.__MINING_LOCAL_HOTBAR_FACTORY__ = resources => {
    minecartIcon = resources.minecartItem;
    if (native && minecartIcon) native.itemIcons?.set(14,minecartIcon);
    let context = null, accumulator = 0, lastWheel = 0;
    const labels = new WeakMap();
    const hud = root => huds.get(root?.querySelector('.mhud'));
    function selectionName(current) {
      if (current.pickaxeMode) return '';
      const brush = current.activeBrush;
      if (!brush || !native.itemName) return '';
      const name = native.itemName(brush.kind);
      const details = [];
      if (brush.shape) details.push(native.shapeName(brush.shape));
      if (Number.isInteger(brush.color) && brush.color > 0 && brush.color < 16 &&
          native.canColor?.(brush.kind,brush.shape || 0) && native.colorName)
        details.push(native.colorName(brush.color));
      return details.length ? t('itemWithShape',{item:name,shape:details.join(t('itemDetailsSeparator'))}) : name;
    }
    function positionSelectionName(current,state,bar) {
      const bounds = bar.getBoundingClientRect();
      if (!bounds.width || !bar.offsetWidth) return;
      const scale = bounds.width / bar.offsetWidth;
      const labelBounds = state.label.getBoundingClientRect();
      let top = bounds.top;
      for (const obstacle of current.root.querySelectorAll('.pickaxeTag,.oreChip,.targetHint,.toast,.actionPrompt')) {
        const rect = obstacle.getBoundingClientRect();
        if (rect.width && rect.height && rect.left < labelBounds.right && rect.right > labelBounds.left &&
            getComputedStyle(obstacle).visibility !== 'hidden') top = Math.min(top,rect.top);
      }
      const bottom = `${Math.ceil((bounds.bottom - top) / scale + 8)}px`;
      if (state.label.style.bottom !== bottom) state.label.style.bottom = bottom;
    }
    function syncSelectionName(current) {
      const bar = current.hotbarRoot || current.root.querySelector('.hotbar');
      if (!bar) return;
      const brush = current.activeBrush;
      const key = [i18n.locale,current.pickaxeMode ? 'pickaxe' : [current.placeIndex,brush?.kind,brush?.shape,brush?.color,brush?.axis].join(':')].join(':');
      let state = labels.get(current);
      if (!state) {
        const label = document.createElement('div'); label.className = 'mcSelectedItemName'; label.hidden = true;
        label.setAttribute('role','status'); label.setAttribute('aria-live','polite'); label.setAttribute('aria-atomic','true');
        state = {key,label,pending:false,fadeTimer:null,hideTimer:null}; labels.set(current,state); bar.append(label);
        return;
      }
      if (state.key !== key) { state.key = key; state.pending = true; }
      if (current.anyPanelOpen || context?.isMenuOpen()) {
        if (!state.label.hidden) {
          clearTimeout(state.fadeTimer); clearTimeout(state.hideTimer); state.label.hidden = true;
        }
        return;
      }
      if (state.pending) {
        state.pending = false;
        clearTimeout(state.fadeTimer); clearTimeout(state.hideTimer);
        const text = selectionName(current);
        state.label.textContent = text; state.label.hidden = !text; state.label.classList.remove('mcFading');
        if (text) state.fadeTimer = setTimeout(() => {
          state.label.classList.add('mcFading');
          state.hideTimer = setTimeout(() => { state.label.hidden = true; },250);
        },1750);
      }
      if (!state.label.hidden) positionSelectionName(current,state,bar);
    }
    function capture(root) {
      const current = hud(root);
      if (current && native.itemIcons && resources.minecartItem) native.itemIcons.set(14, resources.minecartItem);
      if (current) syncSelectionName(current);
      return current;
    }
    const result = (ok,messageKey,messageParams={}) => ({ok,messageKey,messageParams,message:t(messageKey,messageParams)});
    const failure = key => result(false,key);
    function payload(root, kind, build = false) {
      const current = capture(root);
      if (!current) return null;
      const brush = build ? native.normalizeBrush({...current.backpackPanel.buildView.brush,kind}) : current.defaultBrushOf(kind);
      return brush && current.brushEnabled(brush) ? { origin: 'inventory', brush: {...brush} } : null;
    }
    function assign(root, index, data) {
      const current = capture(root), brush = native?.normalizeBrush(data?.brush || {});
      if (!current) return failure('hotbarDisconnected');
      if (!Number.isInteger(index) || index < 0 || index >= 9 || !brush) return failure('cannotAssign');
      if (!current.brushEnabled(brush)) return failure('permissionDenied');
      current.assignBrush(index, brush, performance.now());
      return result(true,'assigned',{slot:index+1});
    }
    function swap(root, from, to) {
      const current = capture(root);
      if (!current) return failure('hotbarDisconnected');
      if (![from,to].every(index => Number.isInteger(index) && index >= 0 && index < 9)) return failure('chooseSlot');
      if (from === to) return {ok:true,message:''};
      const brushes = current.brushes.map(brush => ({...brush}));
      [brushes[from],brushes[to]] = [brushes[to],brushes[from]];
      if (!brushes.every(brush => native.normalizeBrush(brush))) return failure('unsupportedItems');
      current.brushes = brushes; native.saveBrushes(brushes);
      if (!current.pickaxeMode && current.placeIndex >= 0) {
        if (current.brushEnabled(brushes[current.placeIndex])) {
          current.activeBrush = brushes[current.placeIndex];
          current.backpackPanel.buildView.setBrush(current.activeBrush);
        } else { current.pickaxeMode = true; current.placeIndex = -1; }
      }
      current.rebuildHotbar(); current.callbacks.placeSelectionChanged();
      return result(true,'swapped',{from:from+1,to:to+1});
    }
    function select(root, index) {
      const current = capture(root);
      if (!current || !Number.isInteger(index) || index < 0 || index >= 9 || !current.brushEnabled(current.brushes[index])) return false;
      current.selectPlace(index); current.callbacks.placeSelectionChanged(); return true;
    }
    function cycle(root, direction) {
      const current = capture(root); if (!current) return false;
      let index = current.pickaxeMode || current.placeIndex < 0 ? (direction > 0 ? -1 : 0) : current.placeIndex;
      for (let i = 0; i < 9; i++) { index = (index + direction + 9) % 9; if (select(root,index)) return true; }
      return false;
    }
    function wheel(event) {
      const root = context?.root, current = capture(root);
      if (!root?.host.isConnected || !root.host.getClientRects().length || !current || context.isMenuOpen() || current.anyPanelOpen ||
          event.ctrlKey || event.altKey || event.metaKey || !event.deltaY) return;
      const focus=root.activeElement || document.activeElement;
      if(focus && (focus.isContentEditable || focus.matches?.('input,textarea,select')))return;
      const path = event.composedPath();
      if (!path.some(element => element === root.host) || path.some(element => element instanceof HTMLElement &&
          (element.isContentEditable || element.matches('input,textarea,select')))) return;
      const now = performance.now(), pixels = event.deltaY * (event.deltaMode === 1 ? 40 : event.deltaMode === 2 ? 120 : 1);
      if (now - lastWheel > 250 || Math.sign(accumulator) !== Math.sign(pixels)) accumulator = 0;
      lastWheel = now;
      let steps;
      if (Math.abs(pixels) >= 40) { steps = Math.sign(pixels) * Math.max(1,Math.round(Math.abs(pixels) / 100)); accumulator = 0; }
      else { accumulator += pixels; steps = Math.trunc(accumulator / 40); accumulator -= steps * 40; }
      event.preventDefault(); event.stopImmediatePropagation();
      const available=current.brushes.filter(brush=>current.brushEnabled(brush)).length;
      if(!steps || !available)return;
      const count=current.pickaxeMode || current.placeIndex<0 ? (Math.abs(steps)-1)%available+1 : Math.abs(steps)%available;
      for (let i = 0; i < count; i++) cycle(root,Math.sign(steps));
    }
    window.addEventListener('wheel',wheel,{capture:true,passive:false});
    window.addEventListener('blur',() => { accumulator = 0; });
    return {
      capture, payload, assign, swap, select, cycle,
      setContext(value) { context = value; capture(value.root); },
      connected(root) { return !!capture(root); },
      slotPayload(root,index) {
        const current = capture(root), brush = current?.brushes[index];
        return brush ? {origin:'hotbar',index,brush:{...brush}} : null;
      }
    };
  };
})();

;
/* Creative-style layout around the original backpack cards and callbacks. */
globalThis.__MINING_LOCAL_INVENTORY_FACTORY__ = (resources, hotbar) => {
  "use strict";
  const i18n=globalThis.__MINING_LOCAL_I18N__,text=i18n.bind;
  const failure=messageKey=>({ok:false,messageKey,message:i18n.t(messageKey)});
  const panels = new WeakMap(), contents = new WeakMap(), roots = new WeakSet();
  let dragging = null, pendingDrag = null, suppressClickUntil = 0;
  const attribute = (element, name, value) => { if (element.getAttribute(name) !== value) element.setAttribute(name, value); };
  const node = (tag, name) => { const element = document.createElement(tag); element.className = name; return element; };
  function scale(root, panel) {
    const bounds = root.host.getBoundingClientRect();
    const hudScale = parseFloat(getComputedStyle(root.querySelector('.mhud')).getPropertyValue('--ui-scale')) || 1;
    const pixels = Math.max(1, Math.min(3, Math.floor(Math.min((bounds.width - 24) / 195, (bounds.height - 48) / 208)))) / hudScale;
    const value = `${pixels}px`;
    if (panel.style.getPropertyValue('--mc-inv-px') !== value) panel.style.setProperty('--mc-inv-px', value);
  }
  function initialize(panel) {
    const tooltip = node('div', 'mcCreativeTooltip'); tooltip.hidden = true; tooltip.setAttribute('role', 'tooltip');
    const name = node('div', 'mcCreativeTooltipName'), count = node('div', 'mcCreativeTooltipCount');
    const help = node('p','mcInventoryHelp'); text(help,'inventoryHelp');
    const notice = node('p','mcInventoryNotice'); notice.hidden = true; notice.setAttribute('role','status');
    const footer=node('div','mcInventoryFooter');footer.append(help,notice);
    tooltip.append(name, count); panel.append(tooltip,footer);
    const state = { tooltip, name, count, notice, current: null, hotbarSignature: null, noticeTimer: null };
    panels.set(panel, state); panel.classList.add('mcCreativeInventory');
    const show = card => {
      if (!card) { tooltip.hidden = true; state.current = null; return; }
      const label = card.dataset.mcItemName;
      if (!label) return;
      if (name.textContent !== label) name.textContent = label;
      tooltip.hidden = false; state.current = card;
      text(count,'owned',()=>({count:state.current?.dataset.mcFullCount || '0'}));
    };
    const position = (x, y) => {
      const bounds = panel.getBoundingClientRect(), factor = bounds.width / panel.offsetWidth;
      const tip = tooltip.getBoundingClientRect();
      const left = x + tip.width + 16 > innerWidth ? x - tip.width - 12 : x + 12;
      const top = y + tip.height + 16 > innerHeight ? y - tip.height - 12 : y + 12;
      const px = `${(Math.max(4, left) - bounds.left) / factor}px`, py = `${(Math.max(4, top) - bounds.top) / factor}px`;
      if (tooltip.style.left !== px) tooltip.style.left = px;
      if (tooltip.style.top !== py) tooltip.style.top = py;
    };
    panel.addEventListener('pointermove', event => {
      if(dragging){tooltip.hidden=true;return;}
      const card = event.target.closest('.bpCard,.bvCard');
      if (state.current !== card) show(card);
      if (card) position(event.clientX, event.clientY);
    });
    panel.addEventListener('pointerleave', () => show(null));
    panel.addEventListener('focusin', event => {
      const card = event.target.closest('.bpCard,.bvCard'); show(card);
      if (card) { const bounds = card.getBoundingClientRect(); position(bounds.right, bounds.top); }
    });
    panel.addEventListener('focusout', () => show(null));
    return state;
  }
  function notify(root, result) {
    const panel = root.querySelector('.panelBackpack'), state = panel && panels.get(panel);
    if (!state || !result.message) return;
    clearTimeout(state.noticeTimer);
    if(result.messageKey)text(state.notice,result.messageKey,result.messageParams || {});else state.notice.textContent=result.message;
    state.notice.hidden = false;
    state.notice.dataset.error = String(!result.ok);
    state.noticeTimer = setTimeout(() => { state.notice.hidden = true; },3500);
  }
  function cancelDrag() {
    const previous=dragging || pendingDrag; pendingDrag=null;
    if (!previous) return;
    for (const element of previous.root.querySelectorAll('.mcDragging,.mcDropReady,.mcDropTarget')) element.classList.remove('mcDragging','mcDropReady','mcDropTarget');
    const state=panels.get(previous.root.querySelector('.panelBackpack'));if(state){state.tooltip.hidden=true;state.current=null;}
    try { if(previous.source.hasPointerCapture(previous.pointerId))previous.source.releasePointerCapture(previous.pointerId); } catch { /* Source may have been rerendered. */ }
    previous.ghost?.remove(); dragging = null; suppressClickUntil = performance.now()+250;
  }
  function connectDragging(root) {
    root.addEventListener('pointerdown',event => {
      const source = event.composedPath().find(element => element instanceof HTMLElement && element.matches('.bpCard,.bvCard,.mcCreativeHotSlot,.hotSlots>.slot'));
      if (!source || event.button!==0 || event.isPrimary===false) return;
      if(dragging)cancelDrag();
      pendingDrag={root,source,pointerId:event.pointerId,x:event.clientX,y:event.clientY};
    });
    root.addEventListener('click',event => {
      if(performance.now()<suppressClickUntil && event.composedPath().some(element => element instanceof HTMLElement && element.matches('.bpCard,.bvCard,.mcCreativeHotSlot,.hotSlots>.slot'))) {
        event.preventDefault(); event.stopImmediatePropagation();
      }
    },true);
  }
  const dropTarget = (root,x,y) => root.elementFromPoint(x,y)?.closest('.mcCreativeHotSlot,.hotSlots>.slot');
  window.addEventListener('pointermove',event => {
    if(pendingDrag && pendingDrag.pointerId===event.pointerId && Math.hypot(event.clientX-pendingDrag.x,event.clientY-pendingDrag.y)>=6) {
      const {root,source}=pendingDrag,slot=source.matches('.mcCreativeHotSlot,.hotSlots>.slot');
      const data=slot ? hotbar?.slotPayload(root,Number(source.dataset.mcHotbarIndex)) : hotbar?.payload(root,Number(source.dataset.kind),source.matches('.bvCard'));
      if(!data) { cancelDrag(); notify(root,failure(hotbar?.connected(root)?'cannotAssign':'hotbarDisconnected')); return; }
      const ghost=node('span','mcInventoryDragGhost');ghost.setAttribute('aria-hidden','true');ghost.style.backgroundImage=source.querySelector('.ivIcon')?.style.backgroundImage || '';
      root.append(ghost);dragging={...pendingDrag,data,ghost};pendingDrag=null;source.classList.add('mcDragging');
      try {source.setPointerCapture(event.pointerId);}catch{/* Global pointer listeners also handle a replaced source. */}
      for(const target of root.querySelectorAll('.mcCreativeHotSlot'))target.classList.add('mcDropReady');
      const state=panels.get(root.querySelector('.panelBackpack'));if(state)state.tooltip.hidden=true;
    }
    if(!dragging || dragging.pointerId!==event.pointerId)return;
    event.preventDefault();
    const {root,ghost}=dragging,target=dropTarget(root,event.clientX,event.clientY);
    ghost.style.left=`${event.clientX-24}px`;ghost.style.top=`${event.clientY-24}px`;
    for(const old of root.querySelectorAll('.mcDropTarget'))if(old!==target)old.classList.remove('mcDropTarget');
    if(target)target.classList.add('mcDropTarget');
  },{capture:true,passive:false});
  window.addEventListener('pointerup',event => {
    if(!dragging) {pendingDrag=null;return;}
    if(dragging.pointerId!==event.pointerId)return;
    event.preventDefault();
    const {root,data}=dragging,target=dropTarget(root,event.clientX,event.clientY);
    const result=root.host.isConnected && target ? (data.origin==='hotbar'?hotbar.swap(root,data.index,Number(target.dataset.mcHotbarIndex)):hotbar.assign(root,Number(target.dataset.mcHotbarIndex),data))
      : failure('dropOnHotbar');
    cancelDrag();notify(root,result);
  },true);
  window.addEventListener('pointercancel',cancelDrag,true);
  window.addEventListener('blur',cancelDrag);
  window.addEventListener('keydown',event => { if(event.code==='Escape')cancelDrag(); },true);
  document.addEventListener('visibilitychange',() => { if(document.hidden)cancelDrag(); });
  function enhanceCard(card, build = false) {
    const name = card.querySelector(build ? '.bvCardName' : '.bpName');
    const count = card.querySelector(build ? '.bvCardCount' : '.bpCount');
    if (!name || !count) return;
    const label = name.textContent.trim(), full = count.textContent.trim(), amount = full.split('/')[0].trim();
    card.dataset.mcItemName = label; card.dataset.mcFullCount = full;
    count.dataset.mcCount = amount; card.dataset.mcEmpty = String(amount === '0');
    card.draggable = false;
    if (!build) {
      text(card,'cardLabel',{item:label,count:full},'aria-label');
      attribute(card, 'role', card.classList.contains('pick') ? 'button' : 'group');
      card.tabIndex = 0;
    }
  }
  function arrange(content, panel, state) {
    if (!content.isConnected) return;
    let layout = contents.get(content);
    if (!layout) {
      layout = { hotbar: node('div', 'mcCreativeHotbar') };
      attribute(layout.hotbar, 'role', 'group'); text(layout.hotbar,'hotbar',{},'aria-label');
      content.append(layout.hotbar); contents.set(content, layout); state.hotbarSignature = null;
    }
    for (const button of content.querySelectorAll(':scope > .bvTabs > .bvTab')) {
      attribute(button, 'aria-label', button.textContent.trim()); attribute(button, 'title', button.textContent.trim());
      attribute(button, 'aria-pressed', String(button.classList.contains('active')));
    }
    if (!panel.classList.contains('buildMode') && !layout.grid) {
      const grids = [...content.querySelectorAll(':scope > .bpGrid')];
      if (grids.length) {
        const grid = node('div', 'mcCreativeGrid'); text(grid,'inventoryItems',{},'aria-label');
        const cards = grids.flatMap(group => [...group.querySelectorAll(':scope > .bpCard')]);
        grid.append(...cards);
        const rows = Math.max(5, Math.ceil(cards.length / 9));
        for (let i = cards.length; i < rows * 9; i++) { const empty = node('span', 'mcCreativeEmpty'); empty.setAttribute('aria-hidden', 'true'); grid.append(empty); }
        content.append(grid); for (const original of grids) original.remove();
        const scrollbar = node('input', 'mcCreativeScroll'); scrollbar.type = 'range'; scrollbar.min = '0';
        scrollbar.max = String(rows - 5); scrollbar.step = '1'; scrollbar.value = '0'; scrollbar.disabled = rows === 5;
        text(scrollbar,'inventoryScroll',{},'aria-label'); attribute(scrollbar, 'aria-orientation', 'vertical');
        scrollbar.addEventListener('input', () => { grid.scrollTop = Number(scrollbar.value) * grid.clientHeight / 5; });
        grid.addEventListener('scroll', () => { scrollbar.value = String(Math.round(grid.scrollTop / (grid.clientHeight / 5))); });
        content.append(scrollbar); layout.grid = grid;
      }
    }
    for (const card of content.querySelectorAll('.bpCard')) enhanceCard(card);
    for (const card of content.querySelectorAll('.bvCard')) enhanceCard(card, true);
    if (state.current && !state.current.isConnected) { state.current = null; state.tooltip.hidden = true; }
    else if (state.current) {
      if (state.name.textContent !== state.current.dataset.mcItemName) state.name.textContent = state.current.dataset.mcItemName;
      text(state.count,'owned',()=>({count:state.current?.dataset.mcFullCount || '0'}));
    }
    return layout;
  }
  function syncHotbar(root, layout, state) {
    const slots = [...root.querySelectorAll('.hotbar .hotSlots > .slot')].slice(0, 9);
    const signature = i18n.locale + slots.map(slot => [slot.className, slot.title, slot.getAttribute('aria-label'), slot.textContent,
      slot.querySelector('.ivIcon')?.style.backgroundImage].join('|')).join('\n');
    if (signature === state.hotbarSignature) return;
    state.hotbarSignature = signature;
    const children = slots.map((source, index) => {
      const proxy = source.cloneNode(true); proxy.removeAttribute('id'); proxy.classList.remove('slot'); proxy.classList.add('mcCreativeHotSlot');
      proxy.dataset.mcHotbarIndex = String(index); proxy.draggable = false;
      for (const child of proxy.querySelectorAll('[id]')) child.removeAttribute('id');
      const label=source.getAttribute('aria-label') || source.title;
      if(label)attribute(proxy,'aria-label',label);else text(proxy,'hotbarSlot',{slot:index+1},'aria-label');
      proxy.addEventListener('click', event => {
        event.stopPropagation();
        const live=root.querySelectorAll('.hotbar .hotSlots>.slot')[index];
        if(live?.isConnected)live.click();
      });
      return proxy;
    });
    while (children.length < 9) children.push(node('span', 'mcCreativeEmpty'));
    layout.hotbar.replaceChildren(...children);
  }
  function update(root) {
    if (!roots.has(root)) {
      roots.add(root);
      connectDragging(root);
      const resize = new ResizeObserver(() => update(root));
      resize.observe(root.host);
      const hud = root.querySelector('.mhud'); if (hud) resize.observe(hud);
    }
    hotbar?.capture(root);
    for(const [index,slot] of [...root.querySelectorAll('.hotbar .hotSlots>.slot')].entries()) {
      slot.dataset.mcHotbarIndex=String(index); slot.draggable=false;
    }
    for (const panel of root.querySelectorAll('.panelBackpack')) {
      if (getComputedStyle(panel).display === 'none') { const old = panels.get(panel); if (old) old.tooltip.hidden = true; continue; }
      const state = panels.get(panel) || initialize(panel); scale(root, panel);
      panel.dataset.mcDragConnected=String(hotbar?.connected(root) || false);
      const content = panel.querySelector(':scope > .bpContent');
      if (!content) continue;
      const layout = arrange(content, panel, state); if (layout) syncHotbar(root, layout, state);
    }
    i18n.update(root);
  }
  function handleKey(event) {
    const card = event.composedPath().find(element => element instanceof HTMLElement && element.matches('.mcCreativeGrid > .bpCard,.mcCreativeHotbar > .mcCreativeHotSlot'));
    if (!card || event.altKey || event.ctrlKey || event.metaKey || event.isComposing) return false;
    const arrows = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -9, ArrowDown: 9 };
    if (/^Digit[1-9]$/.test(event.code) && card.matches('.bpCard')) {
      event.preventDefault(); event.stopImmediatePropagation();
      const root=card.getRootNode(), data=hotbar?.payload(root,Number(card.dataset.kind));
      notify(root,data ? hotbar.assign(root,Number(event.code.slice(-1))-1,data) : failure('cannotAssign'));
      return true;
    }
    if (event.code in arrows) {
      event.preventDefault(); event.stopImmediatePropagation();
      const mirror = card.classList.contains('mcCreativeHotSlot');
      const cards = [...card.parentElement.querySelectorAll(mirror ? '.mcCreativeHotSlot' : '.bpCard')];
      const distance = mirror ? Math.sign(arrows[event.code]) : arrows[event.code];
      const index = Math.max(0, Math.min(cards.length - 1, cards.indexOf(card) + distance));
      cards[index].focus({preventScroll:true}); return true;
    }
    if ((event.code === 'Enter' || event.code === 'Space') && (card.classList.contains('pick') || card.classList.contains('mcCreativeHotSlot'))) {
      event.preventDefault(); event.stopImmediatePropagation(); if (!event.repeat) card.click(); return true;
    }
    return false;
  }
  return { update, handleKey };
};

;
/* Native-atlas inventory views, with a small original water-item sprite. */
(() => {
  const waterItemIcon=globalThis.__MINING_LOCAL_RESOURCES__?.waterItemIcon;
  let native=null,controller=null;
  globalThis.__MINING_LOCAL_BIND_ICONS__=api=>{native=api;controller?.connect();delete globalThis.__MINING_LOCAL_BIND_ICONS__};
  globalThis.__MINING_LOCAL_ICONS_FACTORY__=onStatus=>{
    const replacements=new Map(),generated=new Map();
    let world=null,atlas=null,cartIcon=null,cartInfo=null,doorInfo=null,branchRailInfo=null;
    const canvas=(size)=>{const image=document.createElement('canvas');image.width=image.height=size;const context=image.getContext('2d',{willReadFrequently:true});if(!context)throw Error(globalThis.__MINING_LOCAL_I18N__.t('canvasMissing'));context.imageSmoothingEnabled=false;return {image,context}};
    function tile(index,shade=1){
      const result=canvas(16);
      result.context.drawImage(atlas,index%8*16,Math.floor(index/8)*16,16,16,0,0,16,16);
      if(shade<1){result.context.globalCompositeOperation='source-atop';result.context.fillStyle=`rgba(0,0,0,${1-shade})`;result.context.fillRect(0,0,16,16)}
      return result.image;
    }
    function cube(faces){
      const result=canvas(32);
      // Independently constructed orthographic cube; the texture comes from the game.
      for(const [index,origin,u,v,shade] of [
        [faces.top,[16,1],[30,8],[2,8],1],
        [faces.front,[2,8],[16,15],[2,24],.82],
        [faces.side,[16,15],[30,8],[16,31],.66]
      ]){
        result.context.setTransform((u[0]-origin[0])/16,(u[1]-origin[1])/16,(v[0]-origin[0])/16,(v[1]-origin[1])/16,...origin);
        result.context.drawImage(tile(index,shade),0,0);
      }
      return result.image.toDataURL();
    }
    function torch(){
      const result=canvas(32);
      result.context.drawImage(tile(native.itemTile(9)),13,3,6,26);
      return result.image.toDataURL();
    }
    function door(){
      const result=canvas(32),lower=native.blockForItem(17);
      // Native closed doors store their upper half two block IDs after the lower half.
      const topTile=native.tileFor(lower+2,4),bottomTile=native.tileFor(lower,4);
      result.context.drawImage(tile(topTile),9,2,14,14);
      result.context.drawImage(tile(bottomTile),9,16,14,14);
      doorInfo={width:14,height:28,canvas:32,topTile,bottomTile};
      return result.image.toDataURL();
    }
    function branchRail(){
      const result=canvas(32);
      const sourceTile=native.itemTile(10);
      result.context.setTransform(0,1,-1,0,32,0);
      result.context.drawImage(tile(sourceTile),0,0,32,32);
      branchRailInfo={style:'native-straight-rail-rotated',direction:'horizontal',rotation:90,tile:sourceTile,canvas:32};
      return result.image.toDataURL();
    }
    function cart(){
      if(cartIcon)return cartIcon;
      if(!native.createCartIconSource)return null;
      const source=native.createCartIconSource(),triangles=[],points=[];let meshes=0;
      // Project the game's own unmodified cart meshes onto a small orthographic icon.
      const project=p=>[(p[0]-p[2])*Math.SQRT1_2,(p[0]+p[2])*.3535533906-p[1]*.8660254038,(p[0]+p[2])*.6123724357+p[1]*.5];
      try {
        source.root.updateWorldMatrix(true,true);
        source.root.traverse(object=>{
          if(!object.isMesh||!object.geometry?.attributes.position)return;
          for(let parent=object;parent;parent=parent.parent)if(!parent.visible)return;
          const geometry=object.geometry,position=geometry.attributes.position,m=object.matrixWorld.elements;
          const material=Array.isArray(object.material)?object.material[0]:object.material;
          if(!material?.color)return;
          meshes++;
          const vertices=Array.from({length:position.count},(_,i)=>{
            const x=position.getX(i),y=position.getY(i),z=position.getZ(i);
            const p=[m[0]*x+m[4]*y+m[8]*z+m[12],m[1]*x+m[5]*y+m[9]*z+m[13],m[2]*x+m[6]*y+m[10]*z+m[14]];
            const q=project(p);points.push(q);return {p,q};
          });
          const count=geometry.index?.count||position.count;
          for(let i=0;i<count;i+=3){
            const v=[0,1,2].map(j=>vertices[geometry.index?geometry.index.getX(i+j):i+j]);
            const a=v[1].p.map((n,k)=>n-v[0].p[k]),b=v[2].p.map((n,k)=>n-v[0].p[k]);
            const n=[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],length=Math.hypot(...n);
            if(length<1e-10)continue;
            for(let k=0;k<3;k++)n[k]/=length;
            if((n[0]+n[2])*.6123724357+n[1]*.5<=0)continue;
            const shade=.66+.16*Math.max(0,n[2])+.34*Math.max(0,n[1]);
            triangles.push({vertices:v.map(vertex=>vertex.q),depth:v.reduce((sum,vertex)=>sum+vertex.q[2],0)/3,color:'#'+material.color.clone().multiplyScalar(shade).getHexString()});
          }
        });
      } finally {source.dispose()}
      if(!triangles.length)return null;
      const low=[0,1].map(axis=>Math.min(...points.map(point=>point[axis]))),high=[0,1].map(axis=>Math.max(...points.map(point=>point[axis])));
      const scale=28/Math.max(high[0]-low[0],high[1]-low[1]),center=low.map((n,i)=>(n+high[i])/2);
      const result=canvas(32),ctx=result.context;
      triangles.sort((a,b)=>a.depth-b.depth);
      for(const triangle of triangles){
        ctx.beginPath();triangle.vertices.forEach((p,i)=>{const x=16+(p[0]-center[0])*scale,y=16+(p[1]-center[1])*scale;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.closePath();
        ctx.fillStyle=ctx.strokeStyle=triangle.color;ctx.lineWidth=.4;ctx.fill();ctx.stroke();
      }
      cartInfo={style:'native-mesh-quarter-view',meshes,visibleTriangles:triangles.length,canvas:32};
      cartIcon=result.image.toDataURL();return cartIcon;
    }
    function connect(){
      if(!native||!atlas)return;
      generated.clear();
      const recipes=[];
      let waterInfo=null;
      for(const kind of native.itemKinds){
        let image,faces;
        if(kind===9)image=torch();
        else if(kind===13)image=branchRail();
        else if(kind===14){image=cart();if(!image)continue;}
        else if(kind===17)image=door();
        else {
          const block=native.blockForItem(kind);
          if(block===79&&waterItemIcon){
            image=waterItemIcon;waterInfo={kind,block,style:'wooden-water-tub',width:16,height:16};
          }else{
            if(block===null||block===undefined||![0,2].includes(native.blockShape(block))||kind===17)continue;
            faces={top:native.tileFor(block,2),front:native.tileFor(block,4),side:native.tileFor(block,0)};
            image=cube(faces);recipes.push({kind,block,faces});
          }
        }
        const original=native.iconForKind(kind);
        if(original!==image)replacements.set(original,image);
        generated.set(kind,image);
      }
      for(const [kind,image] of generated)native.itemIcons.set(kind,image);
      onStatus?.({ready:true,style:'quarter-view-native-textures',cubes:recipes,torch:{width:6,height:26,canvas:32},cart:cartInfo,door:doorInfo,branchRail:branchRailInfo,water:waterInfo,generated:generated.size});
    }
    function capture(group){
      if(group===world&&atlas)return false;
      let source=null;
      group.traverse(object=>{
        if(source)return;
        for(const material of Array.isArray(object.material)?object.material:[object.material]){
          const image=material?.map?.image;if(image?.width===128&&image?.height===128){source=image;break}
        }
      });
      if(!source)return false;
      world=group;atlas=source;connect();return true;
    }
    function update(root){
      if(!generated.size)return;
      for(const icon of root.querySelectorAll('.ivIcon,.icon,.placeIcon')){
        const match=/^url\(["']?(.*?)["']?\)$/.exec(icon.style.backgroundImage);
        const replacement=match&&replacements.get(match[1]);
        if(replacement&&replacement!==match[1])icon.style.backgroundImage=`url("${replacement}")`;
      }
    }
    controller={capture,update,connect};return controller;
  };
})();

;
/* Adapt the game's runtime avatar interfaces; no model or game renderer is copied. */
(() => {
  let api,resolveAPI,ownWorld=null;
  const localAnimations=new WeakMap(),localViews=new WeakMap();
  const nativeReady=new Promise(resolve=>{resolveAPI=resolve});
  // The native outfits and Plus costumes use different markers for hand-held props.
  function hideSkinHandProps(root){
    root?.traverse(object=>{
      if(object.isBone)return;
      const data=object.userData;
      if(data?.spkmodSkinHandProp===true||data?.tunableWeapon===true||data?.lunchPropHolder===true||
         data?.spkmodCookingProp===true||object.name==='speakov-weapon')object.visible=false;
    });
  }
  globalThis.__MINING_LOCAL_HIDE_SKIN_HAND_PROPS__=hideSkinHandProps;
  function ownModel(){
    return ownWorld?.localAvatarPose?.children.find(child=>child.userData.skinAvatarRoot)||ownWorld?.localAvatar?.root||null;
  }
  globalThis.__MINING_LOCAL_BIND_AVATAR__=value=>{
    if(api)return;api=value;
    // Capture the actual owner even when mining starts before the town is rendered.
    for(const name of ['setLocalAvatar','replaceLocalAvatar']){
      const original=value.GameWorldClass?.prototype[name];
      if(!original)continue;
      value.GameWorldClass.prototype[name]=function(){
        const result=original.apply(this,arguments);ownWorld=this;
        globalThis.__MINING_LOCAL_HOST_ADAPTER__?.bindAvatarWorld?.(this);return result;
      };
    }
    const scene=value.SceneClass?.prototype;
    if(scene?.applyAnimState){
      const apply=scene.applyAnimState;
      scene.applyAnimState=function(playerId,state){
        const result=apply.apply(this,arguments);
        if(this.active&&playerId===this.myObjectId&&this.shadow)localAnimations.set(this.shadow,{scene:this,state:state??0});
        return result;
      };
    }
    if(scene?.applyPlayerSpawn){
      const spawn=scene.applyPlayerSpawn;
      scene.applyPlayerSpawn=function(players){
        const result=spawn.apply(this,arguments);
        if(this.active&&this.shadow){
          const own=players.find(player=>player.playerId===this.myObjectId);
          if(own)localAnimations.set(this.shadow,{scene:this,state:own.animState??0});
        }
        return result;
      };
    }
    if(scene?.animationControllerOf){
      const animation=scene.animationControllerOf;
      scene.animationControllerOf=function(playerId){
        const original=animation.apply(this,arguments),view=localViews.get(this.shadow);
        if(this.active&&playerId===this.myObjectId){
          const synced=globalThis.__MINING_LOCAL_HOST_ADAPTER__?.miningAnimationController?.();
          if(synced)return synced;
        }
        if(original||!this.active||playerId!==this.myObjectId||!view?.enabled)return original;
        return view.avatar?.animationController??original;
      };
    }
    if(scene?.exit){
      const exit=scene.exit;
      scene.exit=function(){
        globalThis.__MINING_LOCAL_HOST_ADAPTER__?.releaseAvatarEffects?.();
        localAnimations.delete(this.shadow);localViews.delete(this.shadow);
        return exit.apply(this,arguments);
      };
    }
    resolveAPI(value);delete globalThis.__MINING_LOCAL_BIND_AVATAR__;
  };
  globalThis.__MINING_LOCAL_AVATAR_FACTORY__=(module,options={})=>{
    const controllers=new WeakMap();let assets;
    const ready=nativeReady.then(value=>import(value.avatarAssetsURL || new URL('speakiAssets-0gVUOblX.js',options.baseURL).href)).then(loaded=>{
      const names=api.avatarAssetExports||{};
      assets={...loaded,D:loaded[names.faceMaterials||'D'],T:loaded[names.faceExpression||'T'],w:loaded[names.defaultExpression||'w']};
      for(const name of ['update','setLocomotion']){
        const original=assets.y.prototype[name];
        assets.y.prototype[name]=function(){controllers.set(this.mixer.getRoot(),this);return original.apply(this,arguments)};
      }
    });
    async function cloneOwnAvatar(isDisposed){
      if(options.loadAvatar)return options.loadAvatar();
      const selected=await new Promise(resolve=>{
        function inspect(){
          if(isDisposed()){resolve(null);return}
          const root=options.getOwnModel?.()||ownModel(),direct=ownWorld?.localAvatar?.animationController;
          let source=null,controller=null,hasMesh=false;
          root?.traverse(object=>{
            if(object.isMesh&&object.geometry?.attributes.position?.count)hasMesh=true;
            const candidate=controllers.get(object)||(direct?.mixer.getRoot()===object?direct:null);
            if(candidate&&!controller){source=object;controller=candidate}
          });
          // A loaded native fallback model may have no animation controller.
          if(!controller&&(root===ownWorld?.localAvatar?.root||root?.userData.skinAvatarRoot))source=root;
          if(source&&hasMesh)resolve({root,source,controller});
          else requestAnimationFrame(inspect);
        }
        inspect();
      });
      if(!selected)return null;
      const {root:sourceRoot,source,controller}=selected;
      const instance=api.cloneAvatar(source,{faceIsolation:{enabled:true,restPositions:assets._(source)}});
      const model=instance.root,mixer=controller?new module.a(model):null,faceMaterials=assets.D(model);
      hideSkinHandProps(model);
      const isMaid=sourceRoot===ownWorld?.localAvatar?.root&&ownWorld.localSkinInstalledCode==='SKIN_SPEAKI_MAID';
      // Extra emote clips arrive after the base model. addClips keeps them in
      // actions, not sourceClips; copying sourceClips alone loses jump/dance.
      let clips=controller?new Map(controller.sourceClips):null;
      if(controller?.actions)for(const [name,action] of controller.actions)clips.set(name,action.getClip());
      if(isMaid){
        // The skin adds its vacuum as a separate hand attachment. Hide it on the mining copy.
        model.traverse(object=>{
          if(object.userData.tunableWeapon===true)object.visible=false;
        });
        const runWithoutVacuum=controller?.weaponRunFallback?.fallbackRun;
        if(runWithoutVacuum){
          clips=new Map(clips);
          clips.set('run',runWithoutVacuum);
        }
      }
      const textures=controller?.faceExpression?.textures;
      const face=textures&&faceMaterials.length?new assets.T(faceMaterials,textures):null;
      face?.setExpression(assets.w);
      const animation=controller?new assets.y(mixer,clips,face):null,root=new module.tt(),visual=new module.tt();
      const syncClips=()=>{
        if(!animation||!controller?.actions)return;
        const late=new Map();
        for(const [name,action] of controller.actions)if(!animation.actions.has(name))late.set(name,action.getClip());
        if(late.size)animation.addClips(late);
      };
      visual.add(model);root.add(visual);
      if(sourceRoot.userData.skinAvatarRoot)root.userData.skinAvatarRoot=true;
      return {root,animationController:animation,faceExpression:face,syncClips,update:dt=>{
        syncClips();
        animation?.update(dt);
        // A visibility animation must not bring skin props back over the pickaxe.
        hideSkinHandProps(model);
      },dispose:()=>{mixer?.stopAllAction();mixer?.uncacheRoot(model);instance.dispose()}};
    }
    function create(){
      class LocalAvatar extends api.AvatarClass {
        buildPlaceholder(){}
        async load(){
          let instance;
          try {instance=await cloneOwnAvatar(()=>this.disposed)}catch(error){options.onError?.(error);return}
          if(!instance)return;
          if(this.disposed){instance.dispose();return}
          this.current=instance;this.group.add(instance.root);this.disposePlaceholder();
          this.hideStaff(instance.root);hideSkinHandProps(instance.root);
          this.buildSwingBones(instance.root);this.attachPickaxe(instance.root);
          this.collectTintEntries(instance.root);this.syncAnimState();
          globalThis.__MINING_LOCAL_HOST_ADAPTER__?.registerAvatar?.(this);
        }
        attachPickaxe(root){super.attachPickaxe(root);this.setPickaxeTier(this.pickaxeTier||1);if(this.pickaxe)this.pickaxe.visible=true}
        updateSwing(dt){super.updateSwing(dt);if(this.pickaxe)this.pickaxe.visible=true}
        setPickaxeTier(value){
          this.pickaxeTier=Math.min(4,Math.max(1,Math.round(value)||1));
          const head=this.pickaxeMaterials[1];if(!head)return;
          head.color.setHex(api.colorForTier(this.pickaxeTier));
          const tint=this.tintEntries.find(entry=>entry.material===head);if(tint)tint.base.copy(head.color);
          this.appliedBrightness=-1;
        }
      }
      const kit=new api.PickaxeKit(),avatar=new LocalAvatar({skinCode:null,labelText:null,placeholderColor:0x694579,kit,onImpact:()=>{}});
      const dispose=avatar.dispose.bind(avatar);let released=false;
      // F4's owner disposes the avatar directly; release its private kit there too.
      avatar.dispose=()=>{if(released)return;released=true;
        globalThis.__MINING_LOCAL_HOST_ADAPTER__?.releaseAvatar?.(avatar);dispose();kit.dispose()};
      return {avatar,dispose:()=>avatar.dispose()};
    }
    return {ready,create,getOwnModel:ownModel,skinCodeFromModel:root=>root?
      globalThis.__MINING_LOCAL_HOST_ADAPTER__?.appearanceKey?.(root)??root.uuid:null,renderer:'native-mining-multiplayer',
      getAnimState(root){const value=localAnimations.get(root);return value?.scene.active?value.state:0},
      setLocalViewAvatar(root,avatar,enabled){localViews.set(root,{avatar,enabled})},
      releaseLocalViewAvatar(root,avatar){if(localViews.get(root)?.avatar===avatar)localViews.delete(root)}
    };
  };
})();

;
/* Render-only perspective changes. The native camera is restored after each draw. */
globalThis.__MINING_LOCAL_CAMERA_FACTORY__ = (three, onStatus, avatars) => {
  "use strict";
  const states = new WeakMap(), controls = new WeakMap(), localPoses = new WeakMap();
  if (!avatars) throw new Error(globalThis.__MINING_LOCAL_I18N__.t('nativeAvatarMissing'));
  let primaryHeld = null;
  let townPlayer = null;
  function localPose(container) {
    return container?.children.find(child => child.type === "Object3D" && !child.isGroup);
  }
  function captureTown(scene, renderer) {
    if (!renderer.domElement?.classList.contains("sr-game-canvas")) return;
    // In the inspected client the stage creates this container before other actors:
    // Group(playerContainer) -> Object3D(localAvatarPose) -> Group(avatar.root).
    if (townPlayer?.parent !== scene) {
      townPlayer = scene.children.find(child => child.isGroup && localPose(child)) || null;
    }
  }
  function nativeModel() {
    return avatars.getOwnModel?.() || localPose(townPlayer)?.children.find(child => child.isGroup) || null;
  }
  function disposeModel(state) {
    avatars.releaseLocalViewAvatar?.(state.root,state.body);localPoses.delete(state.root);
    state.bodyLease?.dispose(); state.bodyLease=null; state.body=null; state.skinCode=undefined; state.sourceModel=null; state.mining=false;
  }
  function createState(scene, world, camera, root) {
    const player = new three.Group(); player.name = "VanillaLocalPlayer"; player.visible = false; scene.add(player);
    const state = { world, root, player, bodyLease:null, body:null, skinCode:undefined, mining:false,
      eye: new three.Vector3(), direction: new three.Vector3(), offset: new three.Vector3(), rayOrigin: new three.Vector3(),
      lastEye: new three.Vector3(), lastTime: 0, reportTime: 0,
      raycaster: new three.Raycaster(), hits: [], meshes: [], snapshot: null,
      position: camera.position.clone(), quaternion: camera.quaternion.clone(), halfTurn: camera.quaternion.clone().setFromAxisAngle(new three.Vector3(0, 1, 0), Math.PI) };
    let sharedMaterial = null;
    world.traverse(object => { if (!sharedMaterial && object.isMesh) sharedMaterial = Array.isArray(object.material) ? object.material[0] : object.material; });
    const cleanup = () => { sharedMaterial?.removeEventListener("dispose", cleanup); disposeModel(state); player.removeFromParent(); states.delete(scene); };
    state.cleanup = cleanup;
    sharedMaterial?.addEventListener("dispose", cleanup);
    states.set(scene, state); return state;
  }
  function collisionDistance(state, distance) {
    state.meshes.length = 0;
    state.world.traverse(object => {
      if (!object.isMesh || !object.visible || !object.geometry?.attributes.position ||
          object.userData.miningLocalShadowOverlay || object.userData.miningLocalShadowProxy) return;
      if (!object.geometry.boundingBox) object.geometry.computeBoundingBox();
      state.meshes.push(object);
    });
    let limit = distance;
    // Minecraft-style corner rays keep both the camera and its near plane outside walls.
    for (let i = 0; i < 8; i++) {
      state.rayOrigin.copy(state.eye).add(state.offset.set(i & 1 ? .1 : -.1, i & 2 ? .1 : -.1, i & 4 ? .1 : -.1));
      state.raycaster.set(state.rayOrigin, state.direction); state.raycaster.near = 0; state.raycaster.far = limit + .18;
      state.hits.length = 0; state.raycaster.intersectObjects(state.meshes, false, state.hits);
      if (state.hits.length) limit = Math.min(limit, Math.max(.12, state.hits[0].distance - .18));
    }
    return limit;
  }
  function beforeWorld(scene, world, camera, mode, root) {
    let state = states.get(scene);
    if (state?.snapshot) afterWorld(scene, camera);
    if (state && state.world !== world) { state.cleanup(); state = null; }
    if (!state) state = createState(scene, world, camera, root);
    state.eye.copy(camera.position);
    const now=performance.now(),dt=state.lastTime?Math.min(.1,(now-state.lastTime)/1000):0;
    const moved=dt>0?Math.hypot(state.eye.x-state.lastEye.x,state.eye.z-state.lastEye.z)/dt:0;
    state.lastTime=now;state.lastEye.copy(state.eye);
    const control=controls.get(root),riding=!!control?.rig&&!control.rig.visible;
    const source=nativeModel(),skinCode=avatars.skinCodeFromModel(source);
    if(mode!==0&&(!state.body||state.skinCode!==skinCode||(source&&state.sourceModel!==source))) {
      disposeModel(state);state.skinCode=skinCode;state.sourceModel=source;state.bodyLease=avatars.create(skinCode);state.body=state.bodyLease.avatar;
      state.player.add(state.body.group);
    }
    avatars.setLocalViewAvatar?.(root,state.body,mode!==0);
    const animationState=avatars.getAnimState?.(root)??0;
    state.direction.set(0,0,-1).applyQuaternion(camera.quaternion).normalize();
    state.player.position.copy(state.eye);state.player.position.y-=riding ? .9 : 1.5;
    state.player.rotation.y=Math.atan2(state.direction.x,state.direction.z);
    const poseActive=!!control?.rig&&Math.abs(control.rig.rotation.x+15*Math.PI/180)>.0001;
    localPoses.set(root,{dt,moving:moved>.03&&!riding,riding,mining:poseActive&&primaryHeld!==false&&!riding,tier:control?.tier||1});
    if(state.body) {
      state.body.setPickaxeTier(control?.tier||1);
      state.body.setMoving(moved>.03&&!riding);state.body.setRiding(riding);
      state.body.applyAnimState?.(animationState);
      const mining=poseActive&&primaryHeld!==false&&!riding;
      if(mining&&!state.mining){state.body.startMining();state.mining=true}
      else if(!mining&&state.mining){state.body.stopMining();state.mining=false}
      if(!poseActive)state.body.swingClock.weightValue=0;
      const brightness=control?.ambient?Math.min(1,Math.max(0,(control.ambient.intensity/2.4-.55)/.45)):1;
      // Both native first-person and multiplayer tint filters have the same cadence.
      // Reuse that measured level without applying a second brightness filter.
      state.body.brightness=brightness;state.body.update(dt,()=>brightness);
    }
    let distance=0;state.player.visible=mode!==0;
    if(mode!==0) {
      state.position.copy(camera.position);state.quaternion.copy(camera.quaternion);state.snapshot=true;
      if(mode===1)state.direction.negate();distance=collisionDistance(state,4);
      camera.position.copy(state.eye).addScaledVector(state.direction,distance);
      if(mode===2)camera.quaternion.multiply(state.halfTurn);
      camera.updateMatrixWorld(true);state.player.visible=!!state.body?.current&&distance>.35;
    }
    state.player.updateMatrixWorld(true);
    const visualKey=`${mode}|${!!state.body?.current}|${state.mining}|${riding}|${state.body?.pickaxeTier}|${animationState}`;
    if(now-state.reportTime>250||state.lastVisualKey!==visualKey) {
      state.reportTime=now;state.lastVisualKey=visualKey;
      onStatus({mode,distance,nativePosition:state.eye.toArray(),renderPosition:camera.position.toArray(),
        avatar:state.body?.current?"native-mining-multiplayer":state.body?"waiting-for-own-model":"not-created",avatarVisible:state.player.visible,
        mining:state.mining,riding,moving:moved>.03&&!riding,animationState,skinCode:state.skinCode??null,nativePickaxeAttached:!!state.body?.pickaxe,nativePickaxeVisible:!!state.body?.pickaxe?.visible,pickaxeStyle:state.body?.pickaxe?'native':null,pickaxeTier:state.body?.pickaxeTier??null,brightness:state.body?.brightness??null});
    }
  }
  function afterWorld(scene, camera) {
    const state = states.get(scene);
    if (!state?.snapshot) return;
    camera.position.copy(state.position); camera.quaternion.copy(state.quaternion); camera.updateMatrixWorld(true); state.snapshot = null;
  }
  function setViewmodelSource(root,source){controls.set(root,source)}
  function suspend(scene,camera,root){
    afterWorld(scene,camera);
    const state=states.get(scene);
    if(state){state.player.visible=false;state.lastTime=0;}
    avatars.setLocalViewAvatar?.(root,null,false);
  }
  if(typeof window!=="undefined") {
    window.addEventListener("pointerdown",event=>{
      if(event.button===0&&event.composedPath().some(element=>element instanceof HTMLElement&&element.tagName==="CANVAS"))primaryHeld=true;
    },true);
    window.addEventListener("pointerup",event=>{if(event.button===0)primaryHeld=false},true);
    window.addEventListener("blur",()=>{primaryHeld=false});
    document.addEventListener("pointerlockchange",()=>{if(!document.pointerLockElement)primaryHeld=false});
  }
  return {captureTown,beforeWorld,afterWorld,suspend,setViewmodelSource,getOwnModel:nativeModel,getLocalPose:root=>localPoses.get(root)};
};

;
/* Local HUD portrait, rendered with the existing game renderer and loaded skin. */
globalThis.__MINING_LOCAL_PAPER_DOLL_FACTORY__=(T,avatars,onStatus)=>{
  'use strict';
  const states=new Map(),boundClasses=new WeakSet();let enabled=true,drawing=false,lastReport='';
  const report=()=>{const active=states.size>0,key=enabled+'|'+active;if(key!==lastReport){lastReport=key;onStatus?.({enabled,active})}};
  function dispose(state){
    state.material?.removeEventListener('dispose',state.cleanup);
    state.lease?.dispose();state.anchor.remove();states.delete(state.root);
  }
  function release(root){const state=states.get(root);if(state){dispose(state);report()}}
  function setEnabled(value){
    enabled=!!value;if(!enabled)for(const state of [...states.values()])dispose(state);
    report();return enabled;
  }
  function bindSceneClass(SceneClass){
    const prototype=SceneClass?.prototype;if(!prototype?.exit||boundClasses.has(prototype))return;
    const exit=prototype.exit;boundClasses.add(prototype);
    prototype.exit=function(){try{return exit.apply(this,arguments)}finally{release(this.shadow)}};
  }
  function create(root,hud,world){
    const panel=hud.querySelector('.topLeft');if(!panel)return null;
    const anchor=document.createElement('div');anchor.className='mcPaperDoll';anchor.setAttribute('role','img');
    globalThis.__MINING_LOCAL_I18N__?.bind(anchor,'paperDollPortrait',{},'aria-label');panel.append(anchor);
    const scene=new T.sr();scene.userData.miningLocalPaperDoll=true;
    const camera=new T.$t(-1,1,1,-1,.01,50),ambient=new T.r(0xffffff,2.1),light=new T.V(0xffffff,1.4);
    light.position.set(-3,5,6);scene.add(ambient,light);
    const state={root,hud,world,anchor,scene,camera,lease:null,source:null,mining:false,ready:false,
      viewport:new T.Rr(),scissor:new T.Rr(),bounds:new T.h(),part:new T.h(),center:new T.Lr(),size:new T.Lr(),aspect:0};
    state.cleanup=()=>release(root);
    world.traverse(object=>{if(!state.material&&object.isMesh)state.material=Array.isArray(object.material)?object.material[0]:object.material});
    state.material?.addEventListener('dispose',state.cleanup);states.set(root,state);return state;
  }
  function beforeWorld(root,hud,world,pose,perspective=0){
    if(!enabled)return;
    let state=states.get(root);
    if(state&&(state.hud!==hud||state.world!==world)){dispose(state);state=null}
    const hidden=perspective!==0||hud.classList.contains('mcControlsHudHidden')||root.host.hasAttribute('data-mc-hud-hidden');
    if(hidden){if(state){state.hidden=true;state.anchor.hidden=true}return}
    if(!state)state=create(root,hud,world);if(!state)return;
    state.hidden=false;state.anchor.hidden=false;
    const source=avatars.getOwnModel();if(!source){state.hidden=true;return}
    const skinKey=avatars.skinCodeFromModel?.(source)??source.uuid;
    if(!state.lease||state.source!==source||state.skinKey!==skinKey){
      state.lease?.dispose();state.source=source;state.lease=avatars.create();state.scene.add(state.lease.avatar.group);
      state.skinKey=skinKey;state.ready=false;state.mining=false;state.aspect=0;
    }
    const avatar=state.lease.avatar;if(!avatar.current)return;
    // Fit idle dimensions so enabling this while fallen does not crop standing.
    if(!state.ready){
      avatar.update(0,()=>1);avatar.group.updateMatrixWorld(true);state.bounds.makeEmpty();
      avatar.group.traverseVisible(mesh=>{
        if(!mesh.isMesh)return;
        if(mesh.isSkinnedMesh)mesh.computeBoundingBox();else if(!mesh.geometry.boundingBox)mesh.geometry.computeBoundingBox();
        const bounds=mesh.isSkinnedMesh?mesh.boundingBox:mesh.geometry.boundingBox;
        if(bounds)state.bounds.union(state.part.copy(bounds).applyMatrix4(mesh.matrixWorld));
      });
      if(state.bounds.isEmpty())state.bounds.set(new T.Lr(-.4,0,-.4),new T.Lr(.4,1.7,.4));
      state.bounds.getCenter(state.center);state.bounds.getSize(state.size);state.ready=true;
    }
    avatar.setPickaxeTier(pose?.tier||1);avatar.setMoving(!!pose?.moving);avatar.setRiding(!!pose?.riding);
    avatar.applyAnimState(avatars.getAnimState(root));
    const mining=!!pose?.mining;
    if(mining&&!state.mining)avatar.startMining();else if(!mining&&state.mining)avatar.stopMining();state.mining=mining;
    avatar.brightness=1;avatar.update(pose?.dt??0,()=>1);
    report();
  }
  function render(root,renderer){
    const state=states.get(root);
    if(!enabled||drawing||!state?.ready||state.hidden||!state.anchor.isConnected||renderer.getRenderTarget())return;
    const rect=state.anchor.getBoundingClientRect(),canvas=renderer.domElement.getBoundingClientRect();
    if(!rect.width||!rect.height||rect.left<canvas.left||rect.right>canvas.right||rect.top<canvas.top||rect.bottom>canvas.bottom)return;
    const aspect=rect.width/rect.height,camera=state.camera;
    if(aspect!==state.aspect){
      const height=Math.max(1.8,state.size.y*1.2,state.size.x/aspect*1.2,state.size.z/aspect*1.2);
      camera.left=-height*aspect/2;camera.right=height*aspect/2;camera.top=height/2;camera.bottom=-height/2;
      camera.position.copy(state.center).add(new T.Lr(2.6,.7,6));camera.lookAt(state.center);camera.updateProjectionMatrix();state.aspect=aspect;
    }
    renderer.getViewport(state.viewport);renderer.getScissor(state.scissor);
    const scissorTest=renderer.getScissorTest(),autoClear=renderer.autoClear,shadowEnabled=renderer.shadowMap?.enabled,autoReset=renderer.info?.autoReset;
    const ratio=renderer.getPixelRatio(),sx=renderer.domElement.width/ratio/canvas.width,sy=renderer.domElement.height/ratio/canvas.height;
    drawing=true;
    try{
      renderer.autoClear=false;if(renderer.shadowMap)renderer.shadowMap.enabled=false;if(renderer.info)renderer.info.autoReset=false;
      renderer.setViewport((rect.left-canvas.left)*sx,(canvas.bottom-rect.bottom)*sy,rect.width*sx,rect.height*sy);
      renderer.setScissor((rect.left-canvas.left)*sx,(canvas.bottom-rect.bottom)*sy,rect.width*sx,rect.height*sy);
      renderer.setScissorTest(true);renderer.clearDepth();renderer.render(state.scene,camera);
    }finally{
      renderer.setViewport(state.viewport);renderer.setScissor(state.scissor);renderer.setScissorTest(scissorTest);renderer.autoClear=autoClear;
      if(renderer.shadowMap)renderer.shadowMap.enabled=shadowEnabled;if(renderer.info)renderer.info.autoReset=autoReset;drawing=false;
    }
  }
  if(typeof window!=='undefined')window.addEventListener('pagehide',()=>setEnabled(false));
  return {get enabled(){return enabled},setEnabled,beforeWorld,render,release,bindSceneClass};
};

;
/* The red half of this local HUD needle points from the player toward the shop. */
(() => {
  const scenes=new WeakMap(),needles=new WeakMap();
  globalThis.__MINING_LOCAL_BIND_COMPASS__=({SceneClass})=>{
    const prototype=SceneClass?.prototype;if(!prototype?.frame)return;
    const frame=prototype.frame;
    prototype.frame=function(){
      if(this.shadow)scenes.set(this.shadow,this);
      return frame.apply(this,arguments);
    };
    if(prototype.exit){
      const exit=prototype.exit;
      prototype.exit=function(){scenes.delete(this.shadow);return exit.apply(this,arguments)};
    }
    delete globalThis.__MINING_LOCAL_BIND_COMPASS__;
  };
  globalThis.__MINING_LOCAL_COMPASS_FACTORY__=()=>({
    update(root,camera){
      const scene=scenes.get(root),arrow=scene?.hud?.shopArrow;
      if(!scene?.active||!scene.ready||!arrow||scene.hud.root!==root.querySelector('.mhud'))return;
      const dx=scene.merchantX-scene.body?.x,dz=scene.merchantZ-scene.body?.z;
      if(!Number.isFinite(dx)||!Number.isFinite(dz)||Math.hypot(dx,dz)<1e-8)return;
      // Use the rendered camera, including the front view's half turn. Its
      // horizontal right axis remains defined when looking straight up/down.
      camera.updateWorldMatrix(true,false);
      const matrix=camera.matrixWorld.elements,rightX=matrix[0],rightZ=matrix[2];
      if(Math.hypot(rightX,rightZ)<1e-8)return;
      const angle=Math.atan2(dx*rightX+dz*rightZ,dx*rightZ-dz*rightX);
      let needle=needles.get(arrow);
      if(!needle||needle.parentNode!==arrow){
        needle=arrow.ownerDocument.createElement('span');needle.className='mcShopCompassNeedle';
        arrow.textContent='';arrow.append(needle);arrow.classList.add('mcShopCompass');arrow.setAttribute('aria-hidden','true');
        needles.set(arrow,needle);
      }
      const transform=`rotate(${angle}rad)`;
      if(needle.style.transform!==transform)needle.style.transform=transform;
    }
  });
})();

;
/* Minecraft-style local shortcuts, using native mining UI and input callbacks. */
(() => {
  "use strict";
  const huds=new WeakMap(),inputs=new WeakMap(),scenes=new WeakMap();
  let native=null,controller=null;
  globalThis.__MINING_LOCAL_BIND_CONTROLS__=api=>{
    if(native||!api.HUDClass?.prototype.rebuildHotbar||!api.InputClass?.prototype.sampleMove)return;
    native=api;
    const rebuild=api.HUDClass.prototype.rebuildHotbar;
    api.HUDClass.prototype.rebuildHotbar=function(){
      const result=rebuild.apply(this,arguments);huds.set(this.root,this);return result;
    };
    const prompts=api.HUDClass.prototype.setActionPrompts;
    if(prompts)api.HUDClass.prototype.setActionPrompts=function(values){
      return prompts.call(this,controller?.filterActionPrompts(this.root,values)||values);
    };
    const sample=api.InputClass.prototype.sampleMove;
    api.InputClass.prototype.sampleMove=function(){
      const root=this.canvas?.getRootNode();if(root)inputs.set(root,this);
      return sample.apply(this,arguments);
    };
    const pointerDown=api.InputClass.prototype.onPointerDown,clear=api.InputClass.prototype.clear;
    if(pointerDown)api.InputClass.prototype.onPointerDown=function(canvas,event){
      controller?.startPlaceHold(this,event);return pointerDown.apply(this,arguments);
    };
    if(clear)api.InputClass.prototype.clear=function(){controller?.stopPlaceHold(this);return clear.apply(this,arguments)};
    if(api.ChatClass?.prototype.focusInput){
      const focus=api.ChatClass.prototype.focusInput;
      api.ChatClass.prototype.focusInput=function(){controller?.prepareChatFocus(this.rootEl);return focus.apply(this,arguments)};
    }
    if(api.SceneClass?.prototype.frame&&api.SceneClass.prototype.tryPlace){
      const frame=api.SceneClass.prototype.frame;
      api.SceneClass.prototype.frame=function(){
        scenes.set(this.shadow,this);const result=frame.apply(this,arguments);controller?.repeatPlace(this);return result;
      };
    }
    controller?.syncHints();
    delete globalThis.__MINING_LOCAL_BIND_CONTROLS__;
  };
  globalThis.__MINING_LOCAL_CONTROLS_FACTORY__=onStatus=>{
    const settingKey='speaki-mining-local:minecraft-controls:v1';
    let enabled=true,hidden=false,context=null,controlPending=null,lastStatus='',placeHold=null;
    const chips=new WeakMap();
    try{enabled=localStorage.getItem(settingKey)!=='false'}catch{/* Session setting. */}
    const focus=()=>context?.root.activeElement||document.activeElement;
    const editable=el=>!!el&&(el.isContentEditable||el.matches?.('input,textarea,select'));
    const typing=event=>event.composedPath().some(editable);
    const available=()=>!!context?.root.host.isConnected&&!!context.root.host.getClientRects().length&&!!context.root.querySelector('.mhud');
    const hud=()=>huds.get(context?.root.querySelector('.mhud'));
    const input=()=>inputs.get(context?.root);
    const chat=()=>context?.root.host.querySelector('.sr-chatbox__input')||context?.root.querySelector('.sr-chatbox__input');
    const chatFocused=()=>!!chat()&&focus()===chat();
    function publish(){
      const status={enabled,hudHidden:hidden,connected:!!native,chatOpen:chatFocused(),placeHeld:!!placeHold};
      const key=JSON.stringify(status);if(key!==lastStatus){lastStatus=key;onStatus?.(status)}
    }
    function syncHints(){
      if(native?.keyHints){native.keyHints.backpack=enabled?'E':'B';native.keyHints.emote=enabled?'Ctrl':'T'}
      if(native?.actionHints)native.actionHints.ride=enabled?'Shift':'E';
      if(!context)return;
      for(const chip of context.root.querySelectorAll('.topButtons .keyChip')){
        let key=chips.get(chip);if(!key){key=chip.textContent.trim();chips.set(chip,key)}
        const next=key==='B'||key==='E'?(enabled?'E':'B'):key==='T'||key==='Ctrl'?(enabled?'Ctrl':'T'):key;
        if(chip.textContent!==next)chip.textContent=next;
      }
    }
    function filterActionPrompts(source,values){
      if(!enabled||source!==context?.root.querySelector('.mhud')||scenes.get(context?.root)?.riding)return values;
      const key=native?.actionHints?.ride;
      return key?values.filter(value=>!value.startsWith(`[${key}] `)):values;
    }
    function sync(){
      if(!context)return;
      if(placeHold&&(!enabled||!available()||context.isMenuOpen()||hud()?.anyPanelOpen||editable(focus())))stopPlaceHold();
      const host=context.root.host;
      host.toggleAttribute('data-mc-controls',enabled);
      host.toggleAttribute('data-mc-hud-hidden',enabled&&hidden);
      host.toggleAttribute('data-mc-chat-open',enabled&&chatFocused());
      context.root.querySelector('.mhud')?.classList.toggle('mcControlsHudHidden',enabled&&hidden);
      syncHints();publish();
    }
    function clearMovement(){
      input()?.clear();
      if(document.pointerLockElement)document.exitPointerLock();
    }
    function consume(event){event.preventDefault();event.stopImmediatePropagation();return true}
    function stopPlaceHold(source){
      if(!placeHold||source&&placeHold.input!==source)return;
      placeHold=null;publish();
    }
    function startPlaceHold(source,event){
      if(event.button!==2||event.pointerType!=='mouse'||!enabled||!available()||context.isMenuOpen()||
          hud()?.anyPanelOpen||editable(focus())||source.panelOpen||source.hudHidden||!['locked','unlocked'].includes(source.lock))return;
      const scene=scenes.get(context.root);
      if(!scene?.active||!scene.ready||scene.riding||source.canvas?.getRootNode()!==context.root)return;
      placeHold={input:source,scene,lastAttempt:performance.now(),locked:source.lock==='locked'};publish();
    }
    function repeatPlace(scene){
      const held=placeHold;if(!held||held.scene!==scene)return;
      if(!enabled||!available()||context.root!==scene.shadow||context.isMenuOpen()||hud()?.anyPanelOpen||
          editable(focus())||held.input.panelOpen||held.input.hudHidden||!scene.active||!scene.ready||scene.riding||document.hidden){stopPlaceHold();return}
      if(held.input.lock!=='locked'){
        if(!held.locked&&held.input.lock==='unlocked')return;
        stopPlaceHold();return;
      }
      held.locked=true;
      const current=scene.hud;
      if(!current||current.isPickaxeMode()||current.selectedPlaceKind()===14||current.selectedPlaceCount()<=0||
          !current.brushEnabled(current.selectedBrush()))return;
      const now=performance.now();
      if(now-held.lastAttempt<(native.placeIntervalMs||200))return;
      held.lastAttempt=now;scene.tryPlace();
    }
    function openChat(){
      if(!chat())return;
      clearMovement();hud()?.closePanels();
      context.root.host.setAttribute('data-mc-chat-open','');
      input()?.callbacks.onChatFocus?.();
      chat()?.focus({preventScroll:true});sync();
    }
    function setEnabled(value){
      if(enabled===!!value)return;
      enabled=!!value;hidden=false;controlPending=null;stopPlaceHold();
      try{localStorage.setItem(settingKey,String(enabled))}catch{/* Session setting. */}
      sync();
    }
    function handleKey(event){
      if(event.code!=='ControlLeft'&&event.code!=='ControlRight')controlPending=null;
      if(!enabled||!available()||context.isMenuOpen())return false;
      // The game's F9 photo mode owns the next key so it can restore its HUD.
      if(input()?.hudHidden){controlPending=null;stopPlaceHold();return false;}
      if(chatFocused()&&(event.isComposing||event.keyCode===229)&&['Enter','NumpadEnter','Escape'].includes(event.code)){
        // Let the IME commit/cancel, but keep the native chat from sending/blurring.
        event.stopImmediatePropagation();return true;
      }
      if(event.isComposing)return false;
      if(event.code==='ControlLeft'||event.code==='ControlRight'){
        if(!event.repeat&&!typing(event)&&!event.altKey&&!event.metaKey&&!event.shiftKey)
          controlPending={code:event.code,root:context.root};
        return false;
      }
      if(event.ctrlKey||event.altKey||event.metaKey)return false;
      if(event.code==='F1'){
        consume(event);if(!event.repeat){hidden=!hidden;sync()}return true;
      }
      // T/E inside the chat are text, including Japanese IME romaji.
      if(typing(event))return false;
      if((event.code==='ShiftLeft'||event.code==='ShiftRight')&&scenes.get(context.root)?.riding){
        consume(event);if(!event.repeat)scenes.get(context.root).performAction('ride');return true;
      }
      if(event.code==='KeyT'){
        consume(event);if(!event.repeat)openChat();return true;
      }
      if(event.code==='KeyE'){
        consume(event);
        if(!event.repeat){
          clearMovement();hud()?.toggleBackpack();
        }
        return true;
      }
      if(event.code==='KeyB')return consume(event);
      return false;
    }
    function handleKeyUp(event){
      if(event.code!=='ControlLeft'&&event.code!=='ControlRight')return;
      const pending=controlPending;controlPending=null;
      if(pending?.code!==event.code||pending.root!==context?.root||!enabled||!available()||
        context.isMenuOpen()||typing(event)||event.isComposing||event.altKey||event.metaKey||event.shiftKey)return;
      consume(event);clearMovement();hud()?.toggleEmotePalette();
    }
    window.addEventListener('keyup',handleKeyUp,true);
    window.addEventListener('blur',()=>{controlPending=null;stopPlaceHold()});
    window.addEventListener('pointerdown',event=>{controlPending=null;if(placeHold&&!event.composedPath().includes(placeHold.input.canvas))stopPlaceHold()},true);
    window.addEventListener('pointerup',event=>{if(event.button===2)stopPlaceHold()},true);
    window.addEventListener('pointercancel',()=>stopPlaceHold(),true);
    window.addEventListener('lostpointercapture',()=>stopPlaceHold(),true);
    window.addEventListener('pointermove',event=>{if(placeHold&&event.pointerType==='mouse'&&!(event.buttons&2))stopPlaceHold()},true);
    document.addEventListener('visibilitychange',()=>{if(document.hidden)stopPlaceHold()});
    document.addEventListener('pointerlockchange',()=>{if(!document.pointerLockElement)stopPlaceHold()});
    window.addEventListener('wheel',event=>{if(event.ctrlKey)controlPending=null},{capture:true,passive:true});
    window.addEventListener('focusin',event=>{if(typing(event))stopPlaceHold();if(available())sync()},true);
    window.addEventListener('focusout',()=>queueMicrotask(()=>{if(available())sync()}),true);
    if(!document.getElementById('mining-vanilla-controls-style')){
      const style=document.createElement('style');style.id='mining-vanilla-controls-style';
      style.textContent=`[data-mc-controls]:not([data-mc-chat-open]) .sr-chatbox__input-row{display:none!important}
        [data-mc-controls][data-mc-hud-hidden]:not([data-mc-chat-open]) .sr-chatbox{visibility:hidden!important}
        [data-mc-controls][data-mc-hud-hidden]>[slot="mining-waypoint"]{visibility:hidden!important}`;
      (document.head||document.documentElement).append(style);
    }
    controller={setEnabled,handleKey,syncHints,filterActionPrompts,update:sync,startPlaceHold,stopPlaceHold,repeatPlace,
      prepareChatFocus(element){
        if(enabled&&available()&&(context.root.host.contains(element)||context.root.contains(element)))context.root.host.setAttribute('data-mc-chat-open','');
      },
      get enabled(){return enabled},get hudHidden(){return enabled&&hidden},get nativeHudHidden(){return !!input()?.hudHidden},
      setContext(value){
        if(context?.root!==value.root){
          stopPlaceHold();
          if(context){for(const name of ['data-mc-controls','data-mc-hud-hidden','data-mc-chat-open'])context.root.host.removeAttribute(name)}
          hidden=false;controlPending=null;
        }
        context=value;sync();
      }};
    syncHints();publish();return controller;
  };
})();

;
/* Optional local lighting. Reads loaded block caches; never requests game data. */
globalThis.__MINING_LOCAL_REALISM_FACTORY__=T=>{
  'use strict';
  const SIZE=96;
  const SKY_GLSL=`
    float realHash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
    float realNoise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(realHash(i),realHash(i+vec2(1,0)),f.x),mix(realHash(i+vec2(0,1)),realHash(i+vec2(1)),f.x),f.y);}
    vec3 realAir(vec3 direction,vec3 sun,float time){
      float height=clamp(direction.y,0.0,1.0),evening=step(1.5,time),morning=1.0-step(.5,time);
      vec3 horizon=mix(vec3(.46,.61,.76),vec3(.87,.23,.075),evening);
      vec3 zenith=mix(vec3(.055,.19,.48),vec3(.035,.045,.12),evening);
      horizon=mix(horizon,vec3(.72,.45,.29),morning*.5);
      vec3 sky=mix(horizon,zenith,pow(height,.48));
      float forward=pow(max(dot(direction,sun),0.0),16.0);
      sky+=vec3(1.0,.58,.22)*forward*exp(-height*1.8)*mix(.12,.45,max(evening,morning));
      return sky;
    }
    vec3 realSky(vec3 direction,vec3 sun,float time,vec3 eye){
      vec3 sky=realAir(direction,sun,time);
      if(direction.y>.025){
        vec2 cloud=(eye.xz+direction.xz/max(direction.y,.06)*150.0)*.013;
        float noise=realNoise(cloud)*.56+realNoise(cloud*2.03)*.28+realNoise(cloud*4.11)*.16;
        float cover=smoothstep(.53,.76,noise)*smoothstep(.025,.16,direction.y)*.72;
        vec3 lit=mix(vec3(.84,.88,.94),vec3(.92,.48,.24),step(1.5,time));
        sky=mix(sky,lit,cover);
      }
      return sky;
    }`;
  function createState(){
    const data=new Uint8Array(1),texture=new T.F(data,1,1,1);texture.format=T.Xn;texture.magFilter=T.Ct;texture.minFilter=T.Ct;texture.needsUpdate=true;
    const skyData=new Uint8Array(1),skyTexture=new T.L(skyData,1,1);skyTexture.format=T.Xn;skyTexture.needsUpdate=true;
    const knownData=new Uint8Array(1),knownTexture=new T.F(knownData,1,1,1);knownTexture.format=T.Xn;knownTexture.needsUpdate=true;
    const maxData=new Uint8Array(1),maxTexture=new T.L(maxData,1,1);maxTexture.format=T.Xn;maxTexture.needsUpdate=true;
    return {texture,data,knownData,knownTexture,knownField:{value:knownTexture},chunks:new Map(),skyData,skyTexture,maxData,maxTexture,maxField:{value:maxTexture},skyChunks:new Map(),skyOwner:null,lastUpdate:-Infinity,owner:null,
      skyOrigin:{value:new T.Lr()},skyShape:{value:new T.Lr(1,1,1)},skyField:{value:skyTexture},
      enabled:{value:0},time:{value:1},softness:{value:1},cave:{value:0},origin:{value:new T.Lr()},shape:{value:new T.Lr(1,1,1)},field:{value:texture},
      sunColor:{value:new T.Lr(1.13,1.01,.84)},skyColor:{value:new T.Lr(.50,.67,1)},groundColor:{value:new T.Lr(.34,.30,.23)}};
  }
  function update(s,owner,world,eye,camera,light,time,enabled,now,dirty){
    s.enabled.value=enabled?1:0;s.time.value=time==='morning'?0:time==='evening'?2:1;
    if(!enabled)return;
    s.cave.value=Math.max(0,Math.min(1,Number(owner?.caveMix??owner?.fogMix)||0));
    const texel=(light.shadow.camera.right-light.shadow.camera.left)/light.shadow.mapSize.x;
    s.softness.value=Math.max(.75,Math.min(3,(time==='day'?.10:.17)/texel));
    s.sunColor.value.set(...(time==='evening'?[1.40,.69,.32]:time==='morning'?[1.25,.91,.64]:[1.13,1.04,.91]));
    s.skyColor.value.set(...(time==='evening'?[.36,.38,.66]:time==='morning'?[.50,.56,.78]:[.48,.68,1]));
    const native=owner?.world,api=globalThis.__MINING_LOCAL_NATIVE_API__,opaque=api?.occludesBlock;
    const height=api?.worldHeight||100;
    if(native?.group!==world||typeof native.store?.values!=='function'||typeof opaque!=='function')return;
    if(!dirty&&s.owner===native&&now-s.lastUpdate<100)return;
    s.owner=native;s.lastUpdate=now;
    const x=(Math.floor(eye.x/16)-3)*16,z=(Math.floor(eye.z/16)-3)*16;let upload=false;
    if(s.shape.value.x!==SIZE||s.shape.value.y!==height){
      s.texture.dispose();s.data=new Uint8Array(SIZE*SIZE*height);s.texture=new T.F(s.data,SIZE,SIZE,height);
      s.texture.format=T.Xn;s.texture.magFilter=T.Ct;s.texture.minFilter=T.Ct;s.field.value=s.texture;s.shape.value.set(SIZE,height,SIZE);upload=true;
      s.knownTexture.dispose();s.knownData=new Uint8Array(s.data.length);s.knownTexture=new T.F(s.knownData,SIZE,SIZE,height);s.knownTexture.format=T.Xn;s.knownField.value=s.knownTexture;
    }
    if(upload||s.origin.value.x!==x||s.origin.value.z!==z){s.origin.value.set(x,0,z);s.data.fill(0);s.knownData.fill(0);s.chunks.clear();upload=true}
    const seen=new Set();
    for(const chunk of native.store.values()){
      const ox=chunk.cx*16-x,oz=chunk.cz*16-z,blocks=chunk.blocks;
      if(ox<0||oz<0||ox+16>SIZE||oz+16>SIZE||blocks?.length!==height*256)continue;
      const key=chunk.cx+','+chunk.cz,previous=s.chunks.get(key);seen.add(key);
      let changed=!previous;
      if(previous)for(let i=0;i<blocks.length;i++)if(previous.blocks[i]!==blocks[i]){changed=true;break}
      if(!changed)continue;
      writeChunk(s,ox,oz,blocks,opaque);s.chunks.set(key,{cx:chunk.cx,cz:chunk.cz,blocks:blocks.slice()});upload=true;
    }
    for(const [key,chunk] of s.chunks)if(!seen.has(key)){writeChunk(s,chunk.cx*16-x,chunk.cz*16-z,null,opaque);s.chunks.delete(key);upload=true}
    if(upload){s.texture.needsUpdate=true;s.knownTexture.needsUpdate=true}
    updateSky(s,native,eye,opaque,dirty||upload);
  }
  function writeChunk(s,x,z,blocks,opaque){
    for(let y=0;y<s.shape.value.y;y++)for(let row=0;row<16;row++)for(let col=0;col<16;col++){
      const id=blocks?.[(y*16+row)*16+col]||0;
      const index=(y*SIZE+z+row)*SIZE+x+col;
      s.data[index]=id!==255&&opaque(id)?255:0;s.knownData[index]=blocks&&id!==255?255:0;
    }
  }
  function updateSky(s,native,eye,opaque,dirty){
    // skyTop is already maintained by the game. Copy its column heights, never
    // invoke brightnessAt(), rebuildColumn(), or the native lighting flood fill.
    const chunks=[];let minX=Infinity,minZ=Infinity,maxX=-Infinity,maxZ=-Infinity;
    for(const chunk of native.store.values())if(chunk.skyTop?.length===256){
      chunks.push(chunk);minX=Math.min(minX,chunk.cx*16);minZ=Math.min(minZ,chunk.cz*16);
      maxX=Math.max(maxX,chunk.cx*16+16);maxZ=Math.max(maxZ,chunk.cz*16+16);
    }
    if(!chunks.length){minX=minZ=0;maxX=maxZ=1}
    if(maxX-minX>1024){minX=(Math.floor(eye.x/16)-32)*16;maxX=minX+1024}
    if(maxZ-minZ>1024){minZ=(Math.floor(eye.z/16)-32)*16;maxZ=minZ+1024}
    const width=maxX-minX,depth=maxZ-minZ;let upload=false;
    if(s.skyOwner!==native||s.skyShape.value.x!==width||s.skyShape.value.z!==depth||s.skyOrigin.value.x!==minX||s.skyOrigin.value.z!==minZ){
      s.skyOwner=native;s.skyTexture.dispose();s.skyData=new Uint8Array(width*depth);
      s.skyTexture=new T.L(s.skyData,width,depth);s.skyTexture.format=T.Xn;s.skyField.value=s.skyTexture;
      s.skyShape.value.set(width,1,depth);s.skyOrigin.value.set(minX,0,minZ);s.skyChunks.clear();upload=true;
      s.maxTexture.dispose();s.maxData=new Uint8Array(Math.ceil(width/16)*Math.ceil(depth/16));
      s.maxTexture=new T.L(s.maxData,Math.ceil(width/16),Math.ceil(depth/16));s.maxTexture.format=T.Xn;s.maxField.value=s.maxTexture;
    }
    const seen=new Set();
    for(const chunk of chunks){
      const x=chunk.cx*16-minX,z=chunk.cz*16-minZ;if(x<0||z<0||x+16>width||z+16>depth)continue;
      const key=chunk.cx+','+chunk.cz,previous=s.skyChunks.get(key),height=chunk.skyTop;seen.add(key);
      const changed=!previous||!height.every((value,index)=>value===previous[index]);
      if(changed){
        for(let row=0;row<16;row++)for(let col=0;col<16;col++)s.skyData[(z+row)*width+x+col]=1+Math.max(0,Math.min(s.shape.value.y,height[row*16+col]));
        s.skyChunks.set(key,height.slice());upload=true;
      }
      if(changed||dirty){
        let top=Math.max(0,...height);
        // Some opaque blocks (for example foliage) do not raise native skyTop.
        // Include those too before skipping empty space toward the sun.
        if(chunk.blocks?.length===s.shape.value.y*256)scan:for(let y=s.shape.value.y-1;y>=top;y--)for(let i=0;i<256;i++)if(chunk.blocks[y*256+i]!==255&&opaque(chunk.blocks[y*256+i])){top=y+1;break scan}
        const index=(z/16)*Math.ceil(width/16)+x/16,value=1+Math.min(s.shape.value.y,top);
        if(s.maxData[index]!==value){s.maxData[index]=value;upload=true}
      }
    }
    for(const key of s.skyChunks.keys())if(!seen.has(key)){
      const [cx,cz]=key.split(',').map(Number),x=cx*16-minX,z=cz*16-minZ;
      for(let row=0;row<16;row++)s.skyData.fill(0,(z+row)*width+x,(z+row)*width+x+16);
      s.maxData[(z/16)*Math.ceil(width/16)+x/16]=0;
      s.skyChunks.delete(key);upload=true;
    }
    if(upload){s.skyTexture.needsUpdate=true;s.maxTexture.needsUpdate=true}
  }
  function decorate(shader,source,s){
    Object.assign(shader.uniforms,{realEnabled:s.enabled,realTime:s.time,realSoftness:s.softness,realCave:s.cave,realOrigin:s.origin,realShape:s.shape,realField:s.field,
      realSkyOrigin:s.skyOrigin,realSkyShape:s.skyShape,realSkyField:s.skyField,
      realKnownField:s.knownField,realSkyMaxField:s.maxField,
      realRayDirection:shader.uniforms.localSunDirection||{value:new T.Lr(0,1,0)},
      realSunColor:s.sunColor,realSkyColor:s.skyColor,realGroundColor:s.groundColor,realSourceColor:{value:source.color}});
    const vertexColor=!!source.vertexColors,opaque=!source.transparent&&source.opacity===1;
    shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vRealNativeColor;'+(vertexColor?'\nattribute vec3 color;':''))
      .replace('void main() {','void main() {\nvRealNativeColor='+(vertexColor?'color':'vec3(1.0)')+';');
    shader.fragmentShader=shader.fragmentShader.replace('#include <common>',`#include <common>
      uniform float realEnabled,realTime,realSoftness,realCave;uniform vec3 realOrigin,realShape,realSunColor,realSkyColor,realGroundColor,realSourceColor;
      uniform highp sampler3D realField;varying vec3 vRealNativeColor;
      uniform vec3 realSkyOrigin,realSkyShape;uniform highp sampler2D realSkyField;
      uniform highp sampler3D realKnownField;uniform highp sampler2D realSkyMaxField;uniform vec3 realRayDirection;
      ${SKY_GLSL}
      float realOccupied(vec3 p){vec3 q=p-realOrigin;if(any(lessThan(q,vec3(0)))||any(greaterThanEqual(q,realShape)))return 0.0;return texture(realField,q.xzy/realShape.xzy).r;}
      vec2 realSkyColumn(vec2 p){
        vec2 q=floor(p)-realSkyOrigin.xz;
        if(any(lessThan(q,vec2(0)))||any(greaterThanEqual(q,realSkyShape.xz)))return vec2(0);
        float encoded=texelFetch(realSkyField,ivec2(q),0).r*255.0;
        return vec2(encoded-1.0+realSkyOrigin.y,step(.5,encoded));
      }
      float realSkyAccess(vec3 p){
        vec2 column=realSkyColumn(p.xz);
        if(column.y<.5||p.y<column.x)return 0.0;
        // An open vertical column deep in a narrow shaft sees very little sky.
        // Estimate the visible hemisphere from the horizons of nearby columns.
        float sky=0.0;
        for(int ix=-1;ix<=1;ix++)for(int iz=-1;iz<=1;iz++){
          if(ix==0&&iz==0)continue;
          vec2 direction=normalize(vec2(float(ix),float(iz)));float horizon=0.0;
          for(int stepIndex=0;stepIndex<3;stepIndex++){
            float distance=stepIndex==0?2.0:stepIndex==1?8.0:32.0;
            vec2 neighbor=realSkyColumn(p.xz+direction*distance);
            float height=max(neighbor.x-p.y,0.0)*neighbor.y;
            horizon=max(horizon,height*height/(distance*distance+height*height));
          }
          sky+=1.0-horizon;
        }
        return sky/8.0;
      }
      float realSunAccess(vec3 p){
        vec3 direction=normalize(realRayDirection);
        if(direction.y<=.001)return 0.0;
        // Unlike the raster shadow map, this cache also contains solid voxels
        // whose native faces have been culled. Never assume unknown cells lit.
        for(int rayStep=0;rayStep<512;rayStep++){
          if(p.y>=realShape.y)return 1.0;
          if(p.y<0.0)return 0.0;
          vec3 cell=floor(p),q=cell-realOrigin;
          bool known=false;
          if(all(greaterThanEqual(q,vec3(0)))&&all(lessThan(q,realShape))){
            known=texelFetch(realKnownField,ivec3(q.xzy),0).r>.5;
            if(known&&texelFetch(realField,ivec3(q.xzy),0).r>.5)return 0.0;
          }
          vec2 column=realSkyColumn(p.xz);
          if(!known&&(column.y<.5||p.y<column.x))return 0.0;
          vec2 chunk=floor((p.xz-realSkyOrigin.xz)/16.0);
          vec2 count=ceil(realSkyShape.xz/16.0);float maximum=0.0;
          if(all(greaterThanEqual(chunk,vec2(0)))&&all(lessThan(chunk,count)))maximum=texelFetch(realSkyMaxField,ivec2(chunk),0).r*255.0;
          float distance=1e7;
          if(maximum>.5&&p.y>=maximum-1.0+realSkyOrigin.y){
            // A whole 16x16 column is below this ascending ray: skip it safely.
            vec2 edge=realSkyOrigin.xz+(chunk+step(vec2(0),direction.xz))*16.0;
            if(abs(direction.x)>1e-6)distance=min(distance,(edge.x-p.x)/direction.x);
            if(abs(direction.z)>1e-6)distance=min(distance,(edge.y-p.z)/direction.z);
            distance=min(distance,(realShape.y-p.y)/direction.y);
          }else{
            vec3 edge=cell+step(vec3(0),direction);
            if(abs(direction.x)>1e-6)distance=min(distance,(edge.x-p.x)/direction.x);
            distance=min(distance,(edge.y-p.y)/direction.y);
            if(abs(direction.z)>1e-6)distance=min(distance,(edge.z-p.z)/direction.z);
          }
          p+=direction*(max(distance,0.0)+.001);
        }
        return 0.0;
      }
      float realAO(vec3 p,vec3 n){
        vec3 t=normalize(cross(n,abs(n.y)<.9?vec3(0,1,0):vec3(1,0,0))),b=cross(n,t),q=p+n*.56;
        float nearAO=realOccupied(q+t*.75)+realOccupied(q-t*.75)+realOccupied(q+b*.75)+realOccupied(q-b*.75);
        q=p+n*.9;
        float farAO=realOccupied(q+t*1.35+b*1.35)+realOccupied(q-t*1.35+b*1.35)+realOccupied(q+t*1.35-b*1.35)+realOccupied(q-t*1.35-b*1.35);
        vec3 volumePoint=p-realOrigin;
        float edge=clamp(min(min(volumePoint.x,volumePoint.z),min(realShape.x-volumePoint.x,realShape.z-volumePoint.z))*.5,0.0,1.0);
        return mix(1.0,clamp(1.0-nearAO*.085-farAO*.035,.52,1.0),edge);
      }
      vec3 realTone(vec3 x){x=max(x,vec3(0));return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.0,1.0);}
    `);
    // Hardware PCF compares one reference against four different depths. On a
    // sloped receiver this produces periodic self-shadows, even when the sample
    // location itself has a plane-correct reference. Compare at texel centers
    // with their own plane depths, then interpolate the four visibility values.
    shader.fragmentShader=shader.fragmentShader.replace('float getShadow(sampler2DShadow shadowMap,',`float realPlanePCF(sampler2DShadow shadowMap,vec2 size,vec3 receiver,vec2 gradient,vec2 offset,float bias){
      vec2 point=receiver.xy+offset;
      vec2 pixel=point*size-0.5,base=floor(pixel),weight=fract(pixel);
      vec2 uv00=(base+0.5)/size,uv10=uv00+vec2(1.0/size.x,0.0);
      vec2 uv01=uv00+vec2(0.0,1.0/size.y),uv11=uv00+1.0/size;
      vec2 first=0.5/size,last=vec2(1.0)-first;
      uv00=clamp(uv00,first,last);uv10=clamp(uv10,first,last);
      uv01=clamp(uv01,first,last);uv11=clamp(uv11,first,last);
      float a=texture(shadowMap,vec3(uv00,receiver.z+bias+dot(gradient,uv00-receiver.xy)));
      float b=texture(shadowMap,vec3(uv10,receiver.z+bias+dot(gradient,uv10-receiver.xy)));
      float c=texture(shadowMap,vec3(uv01,receiver.z+bias+dot(gradient,uv01-receiver.xy)));
      float d=texture(shadowMap,vec3(uv11,receiver.z+bias+dot(gradient,uv11-receiver.xy)));
      return mix(mix(a,b,weight.x),mix(c,d,weight.x),weight.y);
    }
    float getShadow(sampler2DShadow shadowMap,`);
    shader.fragmentShader=shader.fragmentShader.replace('vec2 pixel=coord.xy*shadowMapSize-0.5,base=floor(pixel),weight=fract(pixel);',`if(realEnabled>.5){
      float total=0.0;
      for(int ix=-1;ix<=1;ix++)for(int iy=-1;iy<=1;iy++){
        vec2 offset=vec2(float(ix),float(iy))*realSoftness/shadowMapSize;
        total+=realPlanePCF(shadowMap,shadowMapSize,coord,gradient,offset,shadowBias);
      }
      return mix(1.0,total/9.0,shadowIntensity);
      }
      vec2 pixel=coord.xy*shadowMapSize-0.5,base=floor(pixel),weight=fract(pixel);`);
    shader.fragmentShader=shader.fragmentShader.replace('float localLight=localSunLighting.x;',`float localVisibility=1.0;float localTorchAmount=0.0;
      float realSkyAmount=realEnabled>.5?realSkyAccess(vLocalShadowWorld+localFaceNormal*.501):1.0;
      float localLight=realEnabled>.5?.001+localSunLighting.x*realSkyAmount:localSunLighting.x;`)
      .replace('if(localFacing>0.0)localLight+=localSunLighting.y*localFacing*(localShadowsEnabled>.5?getShadowMask():1.0);',`if(localFacing>0.0){localVisibility=localShadowsEnabled>.5?getShadowMask():(realEnabled>.5?realSkyAmount:1.0);
        if(realEnabled>.5&&localShadowsEnabled>.5&&localVisibility>0.0)localVisibility=min(localVisibility,realSunAccess(vLocalShadowWorld+localFaceNormal*.002));
        localLight+=localSunLighting.y*localFacing*localVisibility;}`)
      .replace('localLight=mix(localLight,1.0,clamp(localBlockLight*1.25,0.0,1.0));','localTorchAmount=clamp(localBlockLight*1.25,0.0,1.0);localLight=mix(localLight,1.0,localTorchAmount);');
    const albedo=source.map?'texture2D(localShadowAlphaMap,vLocalShadowUV).rgb':'vec3(1.0)';
    shader.fragmentShader=shader.fragmentShader.replace('gl_FragColor=vec4(color,opacity*clamp(1.0-localLight,0.0,1.0));',`gl_FragColor=vec4(color,opacity*clamp(1.0-localLight,0.0,1.0));
      if(realEnabled>.5&&${opaque?'true':'false'}){
        vec3 albedo=${albedo}*realSourceColor*vRealNativeColor;
        float ao=realAO(vLocalShadowWorld,localFaceNormal);
        vec3 hemisphere=mix(realGroundColor,realSkyColor,localFaceNormal.y*.5+.5);
        vec3 irradiance=vec3(.0008)+hemisphere*.48*ao*realSkyAmount+realSunColor*localFacing*localVisibility*1.24;
        irradiance+=vec3(1.30,.76,.32)*localTorchAmount*1.35;
        vec3 radiance=realTone(albedo*irradiance*1.15);
        gl_FragColor=vec4(radiance,opacity);
      }`);
    shader.fragmentShader=shader.fragmentShader.replace('#include <fog_fragment>',`if(realEnabled<.5||${opaque?'false':'true'}){
        #include <fog_fragment>
      }else{
      #ifdef USE_FOG
        vec3 viewRay=normalize(vLocalShadowWorld-cameraPosition);
        float aerial=smoothstep(fogNear,fogFar,vFogDepth);
        vec3 air=realAir(viewRay,localSunDirection,realTime);
        air=mix(air,fogColor,realCave);
        // Output has already passed the native color-space conversion here.
        gl_FragColor.rgb=mix(gl_FragColor.rgb,linearToOutputTexel(vec4(air,1.0)).rgb,aerial);
      #endif
      }`);
  }
  function decorateSky(shader,s){
    Object.assign(shader.uniforms,{realEnabled:s.enabled,realTime:s.time});
    shader.fragmentShader='uniform float realEnabled,realTime;\n'+SKY_GLSL+'\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('vec3 direction=normalize(vLocalSkyDirection);',`vec3 direction=normalize(vLocalSkyDirection);
      if(realEnabled>.5){gl_FragColor=vec4(realSky(direction,localSkySun,realTime,cameraPosition),1.0);
        #include <colorspace_fragment>
        return;
      }`);
  }
  return {createState,update,decorate,decorateSky,dispose:s=>{s.texture.dispose();s.knownTexture.dispose();s.skyTexture.dispose();s.maxTexture.dispose();s.chunks.clear();s.skyChunks.clear()}};
};

;
/* Local water optics. Uses only the already-rendered scene and native water meshes. */
globalThis.__MINING_LOCAL_WATER_FACTORY__=T=>{
  'use strict';
  const states=new Map(),surfaceStates=new Map(),MAX_PLANES=2,SURFACE_DROP=1/8,WATER_ID=79;
  const vertexShader=`
    #include <common>
    #include <fog_pars_vertex>
    varying vec3 wPosition,wNative;varying float wViewDepth;
    attribute vec3 color;
    void main(){
      wPosition=(modelMatrix*vec4(position,1.0)).xyz;wNative=color;
      vec4 mvPosition=modelViewMatrix*vec4(position,1.0);
      gl_Position=projectionMatrix*mvPosition;wViewDepth=-mvPosition.z;
      #include <fog_vertex>
    }`;
  const fragmentShader=`
    #include <common>
    #include <packing>
    #include <fog_pars_fragment>
    varying vec3 wPosition,wNative;varying float wViewDepth;
    uniform float wTime,wNear,wFar,wShadowReady,wSkyReady,wTorchReady,wTorchLevel;
    uniform vec2 wResolution,wHeights,wReflectionReady;
    uniform vec3 wSun,wSkyOrigin,wSkyShape,wTorchOrigin,wTorchShape;
    uniform sampler2D wScene,wDepth,wReflect0,wReflect1,wReflectDepth0,wReflectDepth1,wSkyField;
    uniform highp sampler2DShadow wShadow;
    uniform highp sampler3D wTorch;
    uniform mat4 wMatrix0,wMatrix1,wInverse0,wInverse1,wViewProjection,wInverseViewProjection,wShadowMatrix;
    float hash21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
    float noise21(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash21(i),hash21(i+vec2(1,0)),f.x),mix(hash21(i+vec2(0,1)),hash21(i+vec2(1)),f.x),f.y);}
    // Advected world-space waves, with cross-flow phase modulation to break up
    // repeated parallel bands. Subpixel waves fade instead of temporal jitter.
    vec2 waveBand(vec2 p,vec2 d,float k,float speed,float slope,float offset,float t){
      d=normalize(d);vec2 crossFlow=vec2(-d.y,d.x);
      float bend=dot(p,crossFlow)*k*.28+t*.13+offset;
      float phase=dot(p,d)*k-t*speed+sin(bend)*.6+offset;
      float filtered=1.0-smoothstep(.45,2.3,length(fwidth(p))*k);
      return (d+crossFlow*.168*cos(bend))*cos(phase)*slope*filtered;
    }
    vec2 wave(vec2 p,float t){
      return waveBand(p,vec2(.92,.39),.9,.65,.045,0.0,t)
        +waveBand(p,vec2(-.44,.90),1.6,.91,.055,1.7,t)
        +waveBand(p,vec2(.76,-.65),2.5,1.15,.038,4.1,t)
        +waveBand(p,vec2(.32,.95),6.9,1.75,.028,2.4,t)
        +waveBand(p,vec2(-.87,.48),14.5,2.45,.018,5.6,t)
        +waveBand(p,vec2(.98,-.18),29.0,3.40,.009,3.2,t);
    }
    float skyAccess(vec3 p){
      if(wSkyReady<.5)return clamp(max(wNative.r,max(wNative.g,wNative.b)),0.0,1.0);
      vec2 q=floor(p.xz)-wSkyOrigin.xz;
      if(any(lessThan(q,vec2(0)))||any(greaterThanEqual(q,wSkyShape.xz)))return 0.0;
      float height=texelFetch(wSkyField,ivec2(q),0).r*255.0;
      return height>.5&&p.y>=height-1.04?1.0:0.0;
    }
    float sunAccess(vec3 p){
      if(wShadowReady<.5)return skyAccess(p);
      vec4 q=wShadowMatrix*vec4(p+vec3(0,.035,0),1);vec3 c=q.xyz/q.w;
      if(any(lessThan(c,vec3(0)))||any(greaterThan(c,vec3(1))))return skyAccess(p);
      return texture(wShadow,vec3(c.xy,c.z-.00015))*skyAccess(p);
    }
    float torchAt(vec3 p){
      if(wTorchReady<.5)return 0.0;
      vec3 q=(p-wTorchOrigin).xzy;
      if(any(lessThan(q,vec3(0)))||any(greaterThanEqual(q,wTorchShape)))return 0.0;
      return clamp(texture(wTorch,q/wTorchShape).r*255.0/max(wTorchLevel,1.0),0.0,1.0);
    }
    vec3 reflection(mat4 matrix,mat4 inverseMatrix,sampler2D image,sampler2D depth,vec3 ray,out float valid){
      vec4 projected=matrix*vec4(wPosition,1);
      vec2 baseUV=projected.xy/max(projected.w,.0001);
      float sceneDepth=texture2D(depth,clamp(baseUV,vec2(.001),vec2(.999))).r;
      vec4 hit=inverseMatrix*vec4(baseUV,sceneDepth,1);
      float distanceToHit=sceneDepth>.9999?64.0:clamp(length(hit.xyz/max(abs(hit.w),.0001)*sign(hit.w)-wPosition),1.0,48.0);
      // Project the reflected world ray: nearby banks bend less than distant
      // trees/sky, and the reflection follows the surface normal in every view.
      projected=matrix*vec4(wPosition+ray*distanceToHit,1);
      vec2 uv=projected.xy/max(projected.w,.0001);
      valid=step(.001,projected.w)*smoothstep(0.0,.035,min(min(uv.x,uv.y),min(1.0-uv.x,1.0-uv.y)));
      return texture2D(image,clamp(uv,vec2(.002),vec2(.998))).rgb;
    }
    void main(){
      vec3 view=normalize(cameraPosition-wPosition);
      vec3 face=normalize(cross(dFdx(wPosition),dFdy(wPosition)));
      if(dot(face,view)<0.0)face=-face;
      float top=step(.75,face.y);
      vec2 flowUV=abs(face.x)>.5?wPosition.zy:wPosition.xy;
      vec2 ripples=wave(wPosition.xz,wTime)*.65;
      vec2 falling=wave(flowUV*vec2(1.2,.65)+vec2(0,wTime*1.2),wTime);
      vec3 normal=normalize(face+(top>.5?vec3(-ripples.x,0,-ripples.y):vec3(falling.x*.8,falling.y*.35,falling.x*.8)));
      vec2 uv=gl_FragCoord.xy/wResolution;
      float surfaceDepth=-wViewDepth;
      // The capture only contains the first visible terrain surface. Full Snell
      // displacement cannot reveal hidden walls: it stretches a nearby step or
      // pulls the sky across the bank. Refract the ripple relative to a flat
      // surface, and reject crossings of depth silhouettes and the waterline.
      float originalZ=perspectiveDepthToViewZ(texture2D(wDepth,uv).r,wNear,wFar);
      float rayScale=length(cameraPosition-wPosition)/max(wViewDepth,.01);
      float pathLength=clamp((surfaceDepth-originalZ)*rayScale,0.0,24.0);
      vec3 bentRay=refract(-view,normal,.7502);
      vec3 flatRay=refract(-view,face,.7502);
      float travel=min(pathLength,2.0);
      vec4 refracted=wViewProjection*vec4(wPosition+bentRay*travel,1);
      vec4 flatProjected=wViewProjection*vec4(wPosition+flatRay*travel,1);
      vec2 offset=(refracted.xy/max(refracted.w,.0001)-flatProjected.xy/max(flatProjected.w,.0001))*.35;
      vec2 aspect=vec2(wResolution.x/wResolution.y,1.0);
      offset*=min(1.0,.006/max(length(offset*aspect),.000001))*smoothstep(.03,.4,pathLength);
      vec2 candidate=uv+offset;
      float edgeFade=smoothstep(.001,.012,min(min(candidate.x,candidate.y),min(1.0-candidate.x,1.0-candidate.y)));
      vec2 distortedUV=clamp(candidate,vec2(.001),vec2(.999));
      float sampledDepth=texture2D(wDepth,distortedUV).r;
      float z=perspectiveDepthToViewZ(sampledDepth,wNear,wFar);
      vec4 sampledWorld=wInverseViewProjection*vec4(distortedUV*2.0-1.0,sampledDepth*2.0-1.0,1);
      float sameSurface=1.0-smoothstep(.12,.55,abs(z-originalZ)*rayScale);
      float belowWater=top>.5?smoothstep(.01,.12,wPosition.y-sampledWorld.y/max(sampledWorld.w,.0001)):1.0;
      float refractionWeight=smoothstep(.015,.1,(surfaceDepth-z)*rayScale)*sameSurface*belowWater*edgeFade*step(sampledDepth,.9999);
      float thickness=mix(pathLength,clamp((surfaceDepth-z)*rayScale,0.0,32.0),refractionWeight);
      vec3 bottom=mix(texture2D(wScene,uv).rgb,texture2D(wScene,distortedUV).rgb,refractionWeight);
      float sky=skyAccess(wPosition+vec3(0,.06,0)),sun=sunAccess(wPosition),torch=torchAt(wPosition);
      float nativeLight=clamp(max(wNative.r,max(wNative.g,wNative.b)),0.0,1.0);
      vec3 transmission=exp(-vec3(.085,.035,.022)*thickness);
      vec3 tint=vec3(.008,.033,.041)*(sky*.63+nativeLight*.14)+vec3(.10,.05,.015)*torch;
      vec3 water=bottom*transmission+tint*(1.0-transmission);
      // Caustics belong to the bottom seen through a horizontal water surface.
      // Projecting this XZ pattern onto a vertical face produces luminous stripes.
      float c=sin(wPosition.x*3.7+wTime*.55+sin(wPosition.z*2.1-wTime*.3))*sin(wPosition.z*4.1-wTime*.62+sin(wPosition.x*2.3+wTime*.4));
      water+=bottom*pow(abs(c),10.0)*.10*sun*exp(-thickness*.65)*top;
      float valid0,valid1;
      vec3 reflectedRay=reflect(-view,normal);
      vec3 reflected0=reflection(wMatrix0,wInverse0,wReflect0,wReflectDepth0,reflectedRay,valid0);
      vec3 reflected1=reflection(wMatrix1,wInverse1,wReflect1,wReflectDepth1,reflectedRay,valid1);
      float first=step(abs(wPosition.y-wHeights.x),.035)*wReflectionReady.x*valid0*top;
      float second=step(abs(wPosition.y-wHeights.y),.035)*wReflectionReady.y*valid1*top*(1.0-first);
      // Uncaptured elevations use the actual scene color, never a fabricated bright sky.
      vec3 reflected=mix(water,reflected0,first);reflected=mix(reflected,reflected1,second);
      float fresnel=.0204+.9796*pow(1.0-max(dot(view,normal),0.0),5.0);
      vec3 color=mix(water,reflected,clamp(fresnel,.02,.94));
      vec3 halfVector=normalize(normalize(wSun)+view);
      float noH=max(dot(normal,halfVector),0.0),noV=max(dot(normal,view),.04),noL=max(dot(normal,normalize(wSun)),.0);
      float a2=.0025+min(dot(fwidth(normal),fwidth(normal))*.4,.015);
      float denominator=noH*noH*(a2-1.0)+1.0;
      float distribution=a2/(PI*denominator*denominator);
      float sunFresnel=.0204+.9796*pow(1.0-max(dot(view,halfVector),0.0),5.0);
      float sparkle=distribution*sunFresnel*noL/max(4.0*noV*noL,.08)*sun;
      color+=vec3(1.0,.96,.86)*min(sparkle*3.6,5.0);
      // Keep foam on the horizontal waterline. Exposed side faces are not
      // necessarily waterfalls; their motion comes from refraction, not white streaks.
      float edge=(1.0-smoothstep(.025,.20,thickness))*smoothstep(.0,.02,thickness);
      float foam=edge*smoothstep(.56,.78,noise21(wPosition.xz*3.0+vec2(wTime*.08,-wTime*.12)))*.14*top;
      color+=vec3(.6,.77,.78)*foam*(sky+torch*.5);
      gl_FragColor=vec4(color,1.0);
      #include <colorspace_fragment>
    }`;
  function makeTarget(width,height,depth=false){
    const target=new T.Vr(width,height,{depthBuffer:true,stencilBuffer:false});
    target.texture.colorSpace='srgb-linear';target.texture.generateMipmaps=false;
    if(depth)target.depthTexture=new T.B(width,height);
    return target;
  }
  function createState(scene,renderer){
    const empty3d=new T.F(new Uint8Array(1),1,1,1);empty3d.format=T.Xn;empty3d.needsUpdate=true;
    const empty2d=new T.L(new Uint8Array(1),1,1);empty2d.format=T.Xn;empty2d.needsUpdate=true;
    const emptyShadow=new T.B(1,1);emptyShadow.compareFunction=515;emptyShadow.needsUpdate=true;
    const state={scene,renderer,native:null,visibleCount:0,records:new Map(),geometryCache:new WeakMap(),materials:new Map(),refraction:makeTarget(1,1,true),reflections:[makeTarget(1,1,true),makeTarget(1,1,true)],camera:new T.tn(),empty3d,empty2d,emptyShadow,busy:false,captures:0,planes:[],error:null};
    state.uniforms={fogColor:{value:new T.D()},fogNear:{value:1},fogFar:{value:2000},fogDensity:{value:.00025},wTime:{value:0},wNear:{value:.1},wFar:{value:240},wResolution:{value:new T.Ir(1,1)},wSun:{value:new T.Lr(-24,40,20).normalize()},
      wScene:{value:state.refraction.texture},wDepth:{value:state.refraction.depthTexture},wReflect0:{value:state.reflections[0].texture},wReflect1:{value:state.reflections[1].texture},
      wReflectDepth0:{value:state.reflections[0].depthTexture},wReflectDepth1:{value:state.reflections[1].depthTexture},
      wMatrix0:{value:new T.It()},wMatrix1:{value:new T.It()},wInverse0:{value:new T.It()},wInverse1:{value:new T.It()},wViewProjection:{value:new T.It()},wInverseViewProjection:{value:new T.It()},wHeights:{value:new T.Ir(-999,-999)},wReflectionReady:{value:new T.Ir()},
      wShadow:{value:emptyShadow},wShadowReady:{value:0},wShadowMatrix:{value:new T.It()},wSkyReady:{value:0},wSkyField:{value:empty2d},wSkyOrigin:{value:new T.Lr()},wSkyShape:{value:new T.Lr(1,1,1)},
      wTorchReady:{value:0},wTorchLevel:{value:14},wTorch:{value:empty3d},wTorchOrigin:{value:new T.Lr()},wTorchShape:{value:new T.Lr(1,1,1)}};
    states.set(scene,state);return state;
  }
  // Native voxel data and geometry stay intact. Only the water render mesh uses
  // this lowered copy; collision, placement and network state use native blocks.
  function surfaceGeometry(mesh,native){
    const source=mesh.geometry,p=source.attributes.position,index=source.index;
    const positions=Array.from(p.array),colors=Array.from(source.attributes.color.array),indices=index?Array.from(index.array):Array.from({length:p.count},(_,i)=>i);
    const drop=new Set(),topCorners=new Set(),tops=[],triangles=[];
    const a=new T.Lr(),b=new T.Lr(),c=new T.Lr(),ab=new T.Lr(),ac=new T.Lr(),normal=new T.Lr(),center=new T.Lr();
    const key=(x,y,z)=>`${Math.round(x*1000)},${Math.round(y*1000)},${Math.round(z*1000)}`;
    const block=(x,y,z)=>typeof native.blockAt==='function'?native.blockAt(x,y,z):native.store?.getBlock?.(x,y,z);
    for(let i=0;i+2<indices.length;i+=3){
      const ids=indices.slice(i,i+3);a.fromBufferAttribute(p,ids[0]);b.fromBufferAttribute(p,ids[1]);c.fromBufferAttribute(p,ids[2]);
      normal.crossVectors(ab.subVectors(b,a),ac.subVectors(c,a)).normalize();
      center.copy(a).add(b).add(c).multiplyScalar(1/3);const tri={ids,n:normal.clone(),center:center.clone()};triangles.push(tri);
      if(normal.y>.99){tops.push(tri);for(const id of ids){drop.add(id);topCorners.add(key(p.getX(id),p.getY(id),p.getZ(id)))}}
    }
    for(const tri of triangles){
      if(Math.abs(tri.n.y)>.01)continue;
      const inside=tri.center.clone().addScaledVector(tri.n,-.01).applyMatrix4(mesh.matrixWorld),x=Math.floor(inside.x),y=Math.floor(inside.y),z=Math.floor(inside.z);
      const water=block(x,y,z)===WATER_ID,above=water?block(x,y+1,z):undefined;
      for(const id of tri.ids){
        if(water){
          // Never shorten the join between two vertically stacked water cells.
          const worldY=new T.Lr().fromBufferAttribute(p,id).applyMatrix4(mesh.matrixWorld).y;
          if(above!==WATER_ID&&above!==255&&above!==undefined&&Math.abs(worldY-y-1)<.001)drop.add(id);
        }else if(topCorners.has(key(p.getX(id),p.getY(id),p.getZ(id))))drop.add(id);
      }
    }
    for(const id of drop)positions[id*3+1]-=SURFACE_DROP;
    // A lower surface beside a taller water column exposes a narrow strip that
    // the full-cube native mesher culled. Close that strip, also at chunk borders.
    const edges=new Set(),color=source.attributes.color;
    for(const tri of tops){
      const cell=tri.center.clone().add(new T.Lr(0,-.01,0)).applyMatrix4(mesh.matrixWorld),cx=Math.floor(cell.x),cy=Math.floor(cell.y),cz=Math.floor(cell.z);
      if(block(cx,cy,cz)!==WATER_ID)continue;
      for(let j=0;j<3;j++){
        const ia=tri.ids[j],ib=tri.ids[(j+1)%3];a.fromBufferAttribute(p,ia);b.fromBufferAttribute(p,ib);
        const wa=a.clone().applyMatrix4(mesh.matrixWorld),wb=b.clone().applyMatrix4(mesh.matrixWorld),mid=wa.clone().add(wb).multiplyScalar(.5);
        let dx=0,dz=0;if(Math.abs(wa.x-wb.x)<.001)dx=mid.x<cx+.5?-1:1;else if(Math.abs(wa.z-wb.z)<.001)dz=mid.z<cz+.5?-1:1;else continue;
        if(block(cx+dx,cy,cz+dz)!==WATER_ID||block(cx+dx,cy+1,cz+dz)!==WATER_ID)continue;
        const edge=[key(a.x,a.y,a.z),key(b.x,b.y,b.z)].sort().join('|');if(edges.has(edge))continue;edges.add(edge);
        const first=positions.length/3;
        positions.push(a.x,a.y,a.z,b.x,b.y,b.z,b.x,b.y-SURFACE_DROP,b.z,a.x,a.y-SURFACE_DROP,a.z);
        for(const id of [ia,ib,ib,ia])for(let channel=0;channel<3;channel++)colors.push(color.array[id*3+channel]);
        normal.crossVectors(ab.subVectors(b,a),ac.set(b.x-a.x,-SURFACE_DROP,b.z-a.z));
        if(normal.dot(new T.Lr(-dx,0,-dz))>0)indices.push(first,first+1,first+2,first,first+2,first+3);
        else indices.push(first,first+2,first+1,first,first+3,first+2);
      }
    }
    const g=source.clone();g.setAttribute('position',new T._(new Float32Array(positions),3));
    g.setAttribute('color',new T._(new color.array.constructor(colors),3,color.normalized));g.setIndex(indices);g.clearGroups();g.computeBoundingBox();g.computeBoundingSphere();
    g.userData.miningLocalWaterSurface=true;return g;
  }
  function releaseGeometry(mesh,record){
    const geometry=record.visualGeometry;if(!geometry)return;
    record.sourceGeometry.removeEventListener('dispose',record.sourceDisposed);geometry.removeEventListener('dispose',record.visualDisposed);
    if(mesh.geometry===geometry)mesh.geometry=record.sourceGeometry;
    record.visualGeometry=null;geometry.dispose();
  }
  function syncGeometry(mesh,record,native){
    if(mesh.geometry===record.visualGeometry)return;
    releaseGeometry(mesh,record);
    const source=mesh.geometry;record.sourceGeometry=source;record.visualGeometry=surfaceGeometry(mesh,native);
    record.sourceDisposed=()=>{record.retired=true;releaseGeometry(mesh,record)};
    record.visualDisposed=()=>{
      // The native chunk disposer sees the render copy. Retire the saved native
      // geometry too, exactly once, instead of leaking it on every block edit.
      source.removeEventListener('dispose',record.sourceDisposed);
      record.visualGeometry.removeEventListener('dispose',record.visualDisposed);
      if(mesh.geometry===record.visualGeometry)mesh.geometry=source;
      record.visualGeometry=null;record.retired=true;source.dispose();
    };
    source.addEventListener('dispose',record.sourceDisposed);record.visualGeometry.addEventListener('dispose',record.visualDisposed);mesh.geometry=record.visualGeometry;
  }
  function disposeSurfaceState(s){
    if(!surfaceStates.delete(s.scene))return;
    for(const [mesh,record]of s.records)releaseGeometry(mesh,record);
    s.records.clear();s.native.waterMaterial?.removeEventListener('dispose',s.nativeDisposed);
    s.renderer.domElement?.removeEventListener('webglcontextlost',s.contextLost);
  }
  function beforeSurface(scene,world,renderer,owner){
    const native=owner?.world;let s=surfaceStates.get(scene);
    if(s&&(s.native!==native||s.renderer!==renderer||native?.group!==world)){disposeSurfaceState(s);s=null}
    if(native?.group!==world||typeof native.renders?.values!=='function')return;
    const keep=new Set();
    for(const chunk of native.renders.values()){
      const mesh=chunk.waterMesh;if(!mesh?.isMesh||!mesh.geometry?.attributes.position||!mesh.parent)continue;
      if(mesh.material!==native.waterMaterial&&!mesh.material?.userData?.miningLocalWater)continue;
      if(!s){
        s={scene,renderer,native,records:new Map()};surfaceStates.set(scene,s);
        s.nativeDisposed=()=>disposeSurfaceState(s);native.waterMaterial?.addEventListener('dispose',s.nativeDisposed);
        s.contextLost=()=>dispose(scene);renderer.domElement?.addEventListener('webglcontextlost',s.contextLost);
      }
      keep.add(mesh);let record=s.records.get(mesh);
      if(!record){record={};s.records.set(mesh,record)}
      if(record.retired)continue;
      mesh.updateWorldMatrix(true,false);syncGeometry(mesh,record,native);
    }
    if(!s)return;
    for(const [mesh,record]of s.records)if(!keep.has(mesh)){releaseGeometry(mesh,record);s.records.delete(mesh)}
    if(!s.records.size)disposeSurfaceState(s);
  }
  function restoreMesh(mesh,record){if(mesh.material===record.material)mesh.material=record.source}
  function disposeState(s){
    if(!states.delete(s.scene))return;
    for(const [mesh,r]of s.records)restoreMesh(mesh,r);
    for(const m of s.materials.values())m.dispose();s.records.clear();s.materials.clear();
    s.refraction.dispose();for(const target of s.reflections)target.dispose();
    s.empty3d.dispose();s.empty2d.dispose();s.emptyShadow.dispose();
    s.native?.waterMaterial?.removeEventListener('dispose',s.nativeDisposed);
  }
  function material(s,source){
    let value=s.materials.get(source);if(value)return value;
    value=new T.cr({name:'MiningLocalRealisticWater',uniforms:s.uniforms,vertexShader,fragmentShader,transparent:true,depthWrite:false,side:source.side,fog:true,toneMapped:false});
    value.userData.miningLocalWater=true;s.materials.set(source,value);return value;
  }
  function levels(s,mesh){
    const g=mesh.geometry,p=g.attributes.position,index=g.index;
    let saved=s.geometryCache.get(g);
    if(saved&&saved.position===p&&saved.version===p.version&&saved.index===index&&saved.indexVersion===index?.version)return saved.levels;
    const found=new Map(),a=new T.Lr(),b=new T.Lr(),c=new T.Lr();
    for(let i=0,count=index?index.count:p.count;i+2<count;i+=3){
      a.fromBufferAttribute(p,index?index.getX(i):i);b.fromBufferAttribute(p,index?index.getX(i+1):i+1);c.fromBufferAttribute(p,index?index.getX(i+2):i+2);
      if(Math.abs(a.y-b.y)>.001||Math.abs(a.y-c.y)>.001)continue;
      const up=(b.z-a.z)*(c.x-a.x)-(b.x-a.x)*(c.z-a.z);if(up<=.0001)continue;
      const height=Math.round(a.y*1000)/1000;let level=found.get(height);if(!level){level={height,area:0,x:0,z:0};found.set(height,level)}
      const area=up*.5;level.area+=area;level.x+=(a.x+b.x+c.x)/3*area;level.z+=(a.z+b.z+c.z)/3*area;
    }
    const result=[...found.values()];for(const level of result){level.x/=level.area;level.z/=level.area}
    s.geometryCache.set(g,{position:p,version:p.version,index,indexVersion:index?.version,levels:result});return result;
  }
  function visible(mesh){for(let p=mesh;p;p=p.parent)if(!p.visible)return false;return true}
  function sync(s,world,owner,camera){
    const native=owner?.world,keep=new Set(),elevations=new Map();
    s.visibleCount=0;
    if(native?.group!==world||typeof native.renders?.values!=='function')return [];
    const frustum=new T.$().setFromProjectionMatrix(new T.It().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse));
    for(const chunk of native.renders.values()){
      const mesh=chunk.waterMesh;if(!mesh?.isMesh||!mesh.geometry?.attributes.position||!mesh.parent)continue;
      keep.add(mesh);let record=s.records.get(mesh);
      if(record&&mesh.material!==record.material){restoreMesh(mesh,record);s.records.delete(mesh);record=null}
      if(!record){const source=mesh.material;if(source!==native.waterMaterial||!source?.isMeshBasicMaterial)continue;record={source,material:material(s,source)};s.records.set(mesh,record)}
      mesh.material=record.material;mesh.updateWorldMatrix(true,false);
      if(!visible(mesh)||!frustum.intersectsObject(mesh))continue;
      s.visibleCount++;
      for(const level of levels(s,mesh)){
        const p=new T.Lr(level.x,level.height,level.z).applyMatrix4(mesh.matrixWorld);if(p.y>camera.position.y-.03)continue;
        const h=Math.round(p.y*1000)/1000,weight=level.area/(1+p.distanceToSquared(camera.position)*.015);
        elevations.set(h,(elevations.get(h)||0)+weight);
      }
    }
    for(const [mesh,record]of s.records)if(!keep.has(mesh)){restoreMesh(mesh,record);s.records.delete(mesh)}
    return [...elevations].sort((a,b)=>b[1]-a[1]||a[0]-b[0]).slice(0,MAX_PLANES).map(([h])=>h);
  }
  function mirrorCamera(s,camera,height,matrix,inverse){
    const mirror=s.camera;mirror.copy(camera,false);
    const view=camera.getWorldDirection(new T.Lr()),target=camera.position.clone().add(view);target.y=2*height-target.y;
    mirror.position.copy(camera.position);mirror.position.y=2*height-camera.position.y;
    mirror.up.copy(camera.up).transformDirection(camera.matrixWorld);mirror.up.y*=-1;
    mirror.lookAt(target);mirror.updateMatrixWorld(true);
    // A guard band keeps ripples from falling outside the captured view.
    mirror.projectionMatrix.elements[0]*=.86;mirror.projectionMatrix.elements[5]*=.86;
    const plane=new T.nn(new T.Lr(0,1,0),-height+.025).applyMatrix4(mirror.matrixWorldInverse);
    const clip=new T.Rr(plane.normal.x,plane.normal.y,plane.normal.z,plane.constant),e=mirror.projectionMatrix.elements;
    const q=new T.Rr((Math.sign(clip.x)+e[8])/e[0],(Math.sign(clip.y)+e[9])/e[5],-1,(1+e[10])/e[14]);
    clip.multiplyScalar(2/clip.dot(q));e[2]=clip.x;e[6]=clip.y;e[10]=clip.z+1;e[14]=clip.w;
    mirror.projectionMatrixInverse.copy(mirror.projectionMatrix).invert();
    matrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1).multiply(mirror.projectionMatrix).multiply(mirror.matrixWorldInverse);
    inverse.copy(matrix).invert();return mirror;
  }
  function capture(s,camera,planes){
    const r=s.renderer,scene=s.scene,size=r.getDrawingBufferSize(new T.Ir());
    const width=Math.min(1920,size.x),height=Math.max(1,Math.round(width*size.y/size.x));
    if(s.refraction.width!==width||s.refraction.height!==height)s.refraction.setSize(width,height);
    const rw=Math.min(1280,width),rh=Math.max(1,Math.round(rw*height/width));
    for(const target of s.reflections)if(target.width!==rw||target.height!==rh)target.setSize(rw,rh);
    s.uniforms.wResolution.value.copy(size);s.uniforms.wNear.value=camera.near;s.uniforms.wFar.value=camera.far;
    s.uniforms.wViewProjection.value.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);
    s.uniforms.wInverseViewProjection.value.copy(s.uniforms.wViewProjection.value).invert();
    const target=r.getRenderTarget(),cube=r.getActiveCubeFace?.()||0,mip=r.getActiveMipmapLevel?.()||0,viewport=r.getViewport(new T.Rr()),scissor=r.getScissor(new T.Rr()),scissorTest=r.getScissorTest();
    const autoClear=r.autoClear,xr=r.xr.enabled,shadowAuto=r.shadowMap.autoUpdate,shadowDirty=r.shadowMap.needsUpdate,flag=scene.userData.miningLocalWaterCapture;
    let remainingShadowDirty=shadowDirty,completed=false;
    const hidden=[...s.records.keys()].map(mesh=>[mesh,mesh.visible]);
    const skies=scene.children.filter(o=>o.userData.miningLocalSky||o.userData.miningLocalSun).map(o=>[o,o.position.clone()]);
    try{
      s.busy=true;scene.userData.miningLocalWaterCapture=true;r.xr.enabled=false;r.autoClear=true;r.setScissorTest(false);r.shadowMap.autoUpdate=false;r.shadowMap.needsUpdate=shadowDirty||shadowAuto;
      for(const [mesh]of hidden)mesh.visible=false;
      r.setRenderTarget(s.refraction);r.clear();r.render(scene,camera);s.captures++;
      // Update a pending terrain/actor shadow once with the main camera. All
      // water views and the final draw then share that exact shadow texture.
      remainingShadowDirty=r.shadowMap.needsUpdate;r.shadowMap.needsUpdate=false;
      s.uniforms.wReflectionReady.value.set(0,0);s.uniforms.wHeights.value.set(-999,-999);
      for(let i=0;i<planes.length;i++){
        const h=planes[i],mirror=mirrorCamera(s,camera,h,s.uniforms[i?'wMatrix1':'wMatrix0'].value,s.uniforms[i?'wInverse1':'wInverse0'].value);
        for(const [object,position]of skies){object.position.copy(position).add(mirror.position).sub(camera.position);object.updateMatrixWorld(true)}
        r.setRenderTarget(s.reflections[i]);r.clear();r.render(scene,mirror);s.captures++;
        s.uniforms.wReflectionReady.value.setComponent(i,1);s.uniforms.wHeights.value.setComponent(i,h);
      }
      completed=true;
    }finally{
      for(const [mesh,value]of hidden)mesh.visible=value;
      for(const [object,position]of skies){object.position.copy(position);object.updateMatrixWorld(true)}
      if(flag===undefined)delete scene.userData.miningLocalWaterCapture;else scene.userData.miningLocalWaterCapture=flag;
      r.xr.enabled=xr;r.autoClear=autoClear;r.shadowMap.autoUpdate=shadowAuto;r.shadowMap.needsUpdate=completed?remainingShadowDirty:shadowDirty;
      r.setRenderTarget(target,cube,mip);r.setViewport(viewport);r.setScissor(scissor);r.setScissorTest(scissorTest);s.busy=false;
    }
  }
  function beforeWorld(scene,world,camera,renderer,options={}){
    if(scene.userData.miningLocalWaterCapture)return;
    try{beforeSurface(scene,world,renderer,options.owner)}catch(error){dispose(scene);throw error}
    if(!options.enabled){const old=states.get(scene);if(old)disposeState(old);return}
    let s=states.get(scene);if(s?.busy)return;
    const native=options.owner?.world;
    if(s&&(s.renderer!==renderer||s.native!==native||native?.group!==world)){disposeState(s);s=null}
    if(native?.group!==world||typeof native.renders?.values!=='function')return;
    const hasWater=[...native.renders.values()].some(chunk=>chunk.waterMesh?.isMesh&&chunk.waterMesh.parent&&chunk.waterMesh.geometry?.attributes.position);
    if(!hasWater){if(s)disposeState(s);return}
    if(!s){s=createState(scene,renderer);s.native=native;s.nativeDisposed=()=>disposeState(s);native.waterMaterial?.addEventListener('dispose',s.nativeDisposed)}
    camera.updateMatrixWorld(true);
    try{
      const planes=sync(s,world,options.owner,camera);s.planes=planes;
      if(!s.records.size){disposeState(s);return}
      const u=s.uniforms,lighting=options.lighting,real=lighting?.realState,shadow=lighting?.light?.shadow;
      u.wTime.value=(options.now??performance.now())*.001;if(options.sunDirection)u.wSun.value.copy(options.sunDirection);
      u.wShadowReady.value=shadow?.map?.depthTexture?1:0;
      if(u.wShadowReady.value){u.wShadow.value=shadow.map.depthTexture;u.wShadowMatrix.value.copy(shadow.matrix)}
      u.wSkyReady.value=real?.skyShape.value.x>1?1:0;
      if(u.wSkyReady.value){u.wSkyField.value=real.skyField.value;u.wSkyOrigin.value.copy(real.skyOrigin.value);u.wSkyShape.value.copy(real.skyShape.value)}
      u.wTorchReady.value=lighting?.torchOwner?1:0;
      if(u.wTorchReady.value){u.wTorch.value=lighting.torchUniform.value;u.wTorchOrigin.value.copy(lighting.torchOrigin.value);u.wTorchShape.value.copy(lighting.torchShape.value);u.wTorchLevel.value=lighting.torchLevel.value}
      // Do not redraw extra views when every water chunk is outside the camera.
      if(s.visibleCount>0)capture(s,camera,planes);
      if(shadow?.map?.depthTexture){u.wShadowReady.value=1;u.wShadow.value=shadow.map.depthTexture;u.wShadowMatrix.value.copy(shadow.matrix)}
    }catch(error){dispose(scene);throw error}
  }
  function disableOptics(scene){for(const s of [...states.values()])if(!scene||s.scene===scene)disposeState(s)}
  function dispose(scene){disableOptics(scene);for(const s of [...surfaceStates.values()])if(!scene||s.scene===scene)disposeSurfaceState(s)}
  function getStatus(){return {active:states.size>0,surfaceActive:surfaceStates.size>0,surfaceMeshes:[...surfaceStates.values()].reduce((n,s)=>n+s.records.size,0),meshes:[...states.values()].reduce((n,s)=>n+s.records.size,0),planes:[...states.values()].flatMap(s=>s.planes),captures:[...states.values()].reduce((n,s)=>n+s.captures,0)}}
  return {beforeWorld,disableOptics,dispose,getStatus};
};

;
/* Experimental local rendering only. No game packets, timers or asset requests. */
globalThis.__MINING_LOCAL_SHADOWS_FACTORY__=(T,onStatus,options)=>{
  'use strict';
  options??={};
  const UPDATE_MS=100,TORCH_SIZE=80,TORCH_HEIGHT=100,SHADOW_TEXEL=56/1024;
  const RANGES={small:32,medium:64,high:128,ultra:0};
  const SUN={morning:{offset:[-40,20,20],color:0xffedd0},day:{offset:[-24,40,20],color:0xfffff5},evening:{offset:[44,6,20],color:0xffe2b2}};
  const EVENING_FILTER='sepia(0.08) saturate(1.08)';
  const photometry=options.realismFactory?.(T);
  const water=options.waterFactory?.(T);
  const states=new Map(),sceneOwners=new WeakMap(),boundClasses=new WeakSet();let enabled=false,timeOfDay='day',range='ultra',realistic=false,lastReport='';
  // Alternative rendering modes: at most one may be selected. Realism owns
  // its lighting/shading preset; the shadow mode owns its adjustable presets.
  const rendering=()=>enabled||realistic;
  const effectiveTime=()=>realistic?'day':timeOfDay;
  const effectiveRange=()=>realistic?'ultra':range;
  function bindSceneClass(SceneClass){
    const prototype=SceneClass?.prototype;if(!prototype||typeof prototype.frame!=='function'||boundClasses.has(prototype))return;
    const frame=prototype.frame;boundClasses.add(prototype);
    prototype.frame=function(){
      if(this.active&&this.scene)sceneOwners.set(this.scene,this);
      else if(this.scene){water?.dispose(this.scene);sceneOwners.delete(this.scene)}
      return frame.apply(this,arguments);
    };
    const exit=prototype.exit;
    if(typeof exit==='function')prototype.exit=function(){const scene=this.scene;try{return exit.apply(this,arguments)}finally{if(scene){water?.dispose(scene);sceneOwners.delete(scene)}}};
  }
  function report(error){
    const status={enabled,timeOfDay,range,realistic,mode:realistic?'realistic':enabled?'shadows':'off',rendering:rendering(),effectiveTimeOfDay:effectiveTime(),effectiveRange:effectiveRange(),active:states.size>0,receivers:0,casters:0,mapSize:0,nativeTorchLighting:false,nativeRange:null,error:error||null};
    for(const state of states.values()){
      status.receivers+=state.terrainCount;if(rendering()){status.casters+=state.records.size;status.mapSize=state.mapSize}
      status.nativeTorchLighting||=!!state.torchOwner;
      status.nativeRange=state.nativeRange;
    }
    const key=JSON.stringify(status);if(key!==lastReport){lastReport=key;onStatus?.(status)}
  }
  function restoreRecord(mesh,record){
    mesh.castShadow=record.castShadow;
    record.overlay?.removeFromParent();
    record.proxy?.removeFromParent();
  }
  function dispose(state){
    if(!states.has(state.scene))return;
    states.delete(state.scene);
    water?.disableOptics(state.scene);
    state.watchedMaterial?.removeEventListener('dispose',state.cleanup);
    state.renderer.domElement?.removeEventListener('webglcontextlost',state.contextLost);
    for(const [mesh,record] of state.records)restoreRecord(mesh,record);
    state.records.clear();state.terrainSnapshot.clear();state.actorSnapshot.clear();state.poseSnapshot.clear();
    for(const [material,side] of state.casterSides)material.shadowSide=side;state.casterSides.clear();
    state.torchField.dispose();
    if(state.realState)photometry.dispose(state.realState);
    state.proxyGroup.removeFromParent();for(const material of state.proxyMaterials.values())material.dispose();state.proxyMaterials.clear();
    restoreCanvasTint(state);state.sun.removeFromParent();state.sun.geometry.dispose();state.sun.material.dispose();
    state.sky.removeFromParent();state.sky.geometry.dispose();state.sky.material.dispose();
    for(const material of state.materials.values())material.dispose();state.materials.clear();
    state.light.removeFromParent();state.light.target.removeFromParent();state.light.dispose();
    Object.assign(state.renderer.shadowMap,state.originalShadowMap);
    report();
  }
  function configureShadows(state){
    const cast=rendering();
    state.light.castShadow=cast;state.shadowsEnabled.value=cast?1:0;
    Object.assign(state.renderer.shadowMap,cast?{enabled:true,type:1,autoUpdate:false,needsUpdate:true}:state.originalShadowMap);
    if(!cast){
      state.light.shadow.map?.dispose();state.light.shadow.map=null;
      state.light.shadow.mapPass?.dispose();state.light.shadow.mapPass=null;
    }
  }
  function refreshModes(){
    if(!realistic)water?.disableOptics();
    for(const state of [...states.values()]){
      if(!rendering()){dispose(state);continue}
      configureShadows(state);state.lastUpdate=-Infinity;state.lastTorchUpdate=-Infinity;
    }
  }
  function setEnabled(value){
    if(value&&realistic)return enabled;
    enabled=!!value;refreshModes();
    report();return enabled;
  }
  function setTimeOfDay(value){
    if(!Object.hasOwn(SUN,value)||value===timeOfDay)return timeOfDay;
    timeOfDay=value;for(const state of states.values())state.lastUpdate=-Infinity;
    report();return timeOfDay;
  }
  function setRange(value){
    if(!Object.hasOwn(RANGES,value)||value===range)return range;
    range=value;for(const state of states.values()){state.lastUpdate=-Infinity;state.lastTorchUpdate=-Infinity}
    report();return range;
  }
  function setRealistic(value){
    if(value&&enabled)return realistic;
    realistic=!!value&&!!photometry;
    refreshModes();
    report();return realistic;
  }
  function stop(){enabled=false;realistic=false;refreshModes();report()}
  function restoreCanvasTint(state){
    const tint=state.tint;if(!tint)return;
    if(tint.style.getPropertyValue('filter')===tint.applied){
      if(tint.value)tint.style.setProperty('filter',tint.value,tint.priority);else tint.style.removeProperty('filter');
    }
    state.tint=null;
  }
  function updateCanvasTint(state){
    const canvas=state.renderer.domElement,style=canvas?.style;if(!style)return;
    if(state.tint&&style.getPropertyValue('filter')!==state.tint.applied)state.tint=null;
    if(effectiveTime()!=='evening'){restoreCanvasTint(state);return}
    if(state.tint)return;
    const value=style.getPropertyValue('filter'),priority=style.getPropertyPriority('filter');
    const base=value||(typeof getComputedStyle==='function'?getComputedStyle(canvas).filter:'none');
    style.setProperty('filter',(base&&base!=='none'?base+' ':'')+EVENING_FILTER,'important');
    state.tint={style,value,priority,applied:style.getPropertyValue('filter')};
  }
  function createSun(){
    // Original square geometry and stepped glow, with no borrowed texture.
    const points=[],colors=[];
    for(const [size,r,g,b,a] of [[1,1,.36,.12,.035],[.78,1,.52,.23,.075],[.60,1,.76,.42,.18],[.43,1,.98,.85,1],[.29,1,1,1,1]]){
      for(const [x,y] of [[-1,-1],[1,-1],[1,1],[-1,-1],[1,1],[-1,1]]){
        points.push(x*size,y*size,0);colors.push(r,g,b,a);
      }
    }
    const geometry=new T.v();geometry.setAttribute('position',new T.X(points,3));geometry.setAttribute('color',new T.X(colors,4));
    const sun=new T.Lt(geometry,new T.Rt({color:SUN.day.color,vertexColors:true,transparent:true,fog:false,toneMapped:false,depthWrite:false}));
    sun.name='MiningLocalSun';sun.userData.miningLocalSun=true;sun.frustumCulled=false;sun.renderOrder=-9000;
    return sun;
  }
  function createSky(sunDirection,Color){
    const material=new T.Rt({side:1,fog:false,toneMapped:false,depthTest:false,depthWrite:false});
    const uniforms={localSkySun:{value:sunDirection},localSkyHorizon:{value:new Color(0xe97148)},localSkyUpper:{value:new Color(0x755c88)},
      localSkyZenith:{value:new Color(0x282d59)},localSkyLower:{value:new Color(0x914751)},localSkyGlow:{value:new Color(0xffac57)}};
    // Keep the earlier sunset sky deliberately, independent of the realistic
    // ground-lighting preset. Do not replace it with the blue/cloud shader.
    material.customProgramCacheKey=()=> 'mining-local-sunset-sky-v3';
    material.onBeforeCompile=shader=>{
      Object.assign(shader.uniforms,uniforms);
      shader.vertexShader=`varying vec3 vLocalSkyDirection;
        void main(){
          vLocalSkyDirection=position;
          gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
          gl_Position.z=gl_Position.w;
        }`;
      shader.fragmentShader=`uniform vec3 localSkySun,localSkyHorizon,localSkyUpper,localSkyZenith,localSkyLower,localSkyGlow;
        varying vec3 vLocalSkyDirection;
        void main(){
          vec3 direction=normalize(vLocalSkyDirection);
          float height=max(direction.y,0.0);
          vec3 sky=mix(localSkyHorizon,localSkyUpper,smoothstep(0.0,0.48,height));
          sky=mix(sky,localSkyZenith,smoothstep(0.32,0.9,height));
          if(direction.y<0.0)sky=mix(localSkyHorizon,localSkyLower,smoothstep(0.0,0.35,-direction.y));
          vec2 horizontal=direction.xz/max(length(direction.xz),0.0001);
          float facing=pow(max(dot(horizontal,normalize(localSkySun.xz)),0.0),6.0);
          float glow=facing*exp(-pow((direction.y-0.06)/0.18,2.0));
          sky=mix(sky,localSkyGlow,glow*0.65);
          gl_FragColor=vec4(sky,1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`;
    };
    const sky=new T.Lt(new T.g(2,2,2),material);sky.name='MiningLocalSunsetSky';sky.userData.miningLocalSky=true;
    sky.frustumCulled=false;sky.renderOrder=-10000;sky.visible=false;return sky;
  }
  function updateEnvironment(state,camera,eye){
    const time=effectiveTime(),preset=SUN[time],distance=Math.min(120,Number.isFinite(camera.far)?camera.far*.8:120);
    state.sunDirection.set(...preset.offset).normalize();
    state.sun.visible=!realistic;
    if(state.sun.visible){
      state.sun.position.copy(camera.position).addScaledVector(state.sunDirection,distance);
      state.sun.quaternion.copy(camera.quaternion);state.sun.scale.setScalar(distance*.065);
      state.sun.material.color.setHex(preset.color);state.sun.updateWorldMatrix(true,false);
    }
    const ambient=time==='evening' ? .34 : time==='morning' ? .38 : .44;
    state.lighting.value.set(ambient,1-ambient,0);
    state.sky.visible=realistic||time==='evening';
    if(state.sky.visible){
      // Camera-centered sky directions stay fixed when the player changes view.
      state.sky.position.copy(camera.position);state.sky.scale.setScalar(distance);state.sky.updateWorldMatrix(true,false);
    }
    // Filter only the game's canvas, so inventory/HUD text keeps its own colors.
    if(realistic)restoreCanvasTint(state);else updateCanvasTint(state);
  }
  function createState(scene,world,renderer){
    // Reuse the game's Three.js instance and shader library. The core bundle
    // tree-shakes ShadowMaterial, so its small material adapter is defined below.
    const light=new T.V(0xffffff,0);light.name='MiningLocalShadowSun';light.castShadow=true;
    const mapSize=Math.min(1024,renderer.capabilities?.maxTextureSize||1024);
    light.shadow.mapSize.set(mapSize,mapSize);light.shadow.autoUpdate=false;
    Object.assign(light.shadow.camera,{left:-32,right:32,top:32,bottom:-32,near:.5,far:256});
    light.shadow.camera.updateProjectionMatrix();light.shadow.bias=-.00008;light.shadow.normalBias=0;light.shadow.radius=1;
    const realState=photometry?.createState();
    const sun=createSun(),sunDirection=new T.Lr(),sky=createSky(sunDirection,sun.material.color.constructor);scene.add(light,light.target,sky,sun);
    const torchData=new Uint8Array(TORCH_SIZE*TORCH_SIZE*TORCH_HEIGHT),torchField=new T.F(torchData,TORCH_SIZE,TORCH_SIZE,TORCH_HEIGHT);
    torchField.format=T.Xn;torchField.magFilter=T.Ct;torchField.minFilter=T.Ct;torchField.needsUpdate=true;
    const proxyGroup=new T.tt();proxyGroup.name='MiningLocalShadowCasters';scene.add(proxyGroup);
    let maxTorchSide=renderer.capabilities?.max3DTextureSize||256;
    try{const gl=renderer.getContext?.();if(gl?.MAX_3D_TEXTURE_SIZE)maxTorchSide=gl.getParameter(gl.MAX_3D_TEXTURE_SIZE)||maxTorchSide}catch{}
    const state={scene,world,renderer,light,sun,sky,sunDirection,realState,tint:null,mapSize,records:new Map(),materials:new Map(),casterSides:new Map(),terrainSnapshot:new Map(),actorSnapshot:new Map(),poseSnapshot:new Map(),terrainCount:0,lastUpdate:-Infinity,
      lighting:{value:new T.Lr(.44,.56,0)},lightRight:new T.Lr(),lightUp:new T.Lr(),clipMatrix:new T.It(),planeScale:{value:1},depthBounds:null,shadowMatrix:null,
      proxyGroup,proxyInverse:new T.It(),proxyMaterials:new Map(),viewFrustum:new T.$(),viewMatrix:new T.It(),rangeUniform:{value:RANGES[effectiveRange()]},shadowsEnabled:{value:rendering()?1:0},nativeRange:null,
      receiverBounds:{min:new T.Lr(),max:new T.Lr()},maxTorchSide:Math.min(512,maxTorchSide),
      torchField,torchData,torchUniform:{value:torchField},torchShape:{value:new T.Lr(TORCH_SIZE,TORCH_SIZE,TORCH_HEIGHT)},torchLevel:{value:14},torchChunks:new Map(),torchOrigin:{value:new T.Lr()},lastTorchUpdate:-Infinity,torchOwner:null,
      center:{value:new T.Lr()},scratch:new T.Lr(),originalShadowMap:{enabled:renderer.shadowMap.enabled,type:renderer.shadowMap.type,autoUpdate:renderer.shadowMap.autoUpdate,needsUpdate:renderer.shadowMap.needsUpdate}};
    state.cleanup=()=>dispose(state);
    state.contextLost=()=>{stop();report('context-lost')};
    renderer.domElement?.addEventListener('webglcontextlost',state.contextLost);
    configureShadows(state);states.set(scene,state);return state;
  }
  function shadowMaterial(state,source){
    let material=state.materials.get(source);if(material)return material;
    material=new T.Rt({color:0x000000,opacity:1,transparent:true,depthWrite:false,side:source.side,
      polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
    delete material.isMeshBasicMaterial;material.isShadowMaterial=true;material.type='ShadowMaterial';
    material.fog=source.fog!==false;material.toneMapped=false;
    const map=source.map,texture={value:map},transform={value:map?.matrix},alpha={value:map?source.alphaTest||.01:0};
    // Native expressions swap the face material's texture without replacing
    // the mesh. Read it at draw time, independently of the shadow-map cadence.
    material.onBeforeRender=()=>{
      if(!map)return;
      const current=source.map||map;
      texture.value=current;transform.value=current.matrix;alpha.value=source.alphaTest||.01;
    };
    material.customProgramCacheKey=()=>`local-realistic-overlay-v5-${!!map}-${!!source.vertexColors}-${!source.transparent&&source.opacity===1}`;
    material.onBeforeCompile=shader=>{
      shader.uniforms.localShadowCenter=state.center;
      shader.uniforms.localSunDirection={value:state.sunDirection};shader.uniforms.localSunLighting=state.lighting;
      shader.uniforms.localShadowsEnabled=state.shadowsEnabled;
      shader.uniforms.localShadowRight={value:state.lightRight};shader.uniforms.localShadowUp={value:state.lightUp};shader.uniforms.localShadowPlaneScale=state.planeScale;
      shader.uniforms.localTorchField=state.torchUniform;shader.uniforms.localTorchOrigin=state.torchOrigin;shader.uniforms.localTorchShape=state.torchShape;shader.uniforms.localTorchLevel=state.torchLevel;shader.uniforms.localShadowRange=state.rangeUniform;
      shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vLocalShadowWorld;'+(map?'\nvarying vec2 vLocalShadowUV;\nuniform mat3 localShadowUVTransform;':''))
        // Chunk geometry intentionally has no normals. With normalBias=0 this
        // stable normal is sufficient for the native shadow-coordinate shader.
        .replace('#include <beginnormal_vertex>','vec3 objectNormal = vec3(0.0, 1.0, 0.0);')
        .replace('#include <worldpos_vertex>','#include <worldpos_vertex>\nvLocalShadowWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;'+(map?'\nvLocalShadowUV = (localShadowUVTransform * vec3(uv, 1.0)).xy;':''));
      shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vLocalShadowWorld;\nuniform vec3 localShadowCenter,localSunDirection,localSunLighting,localTorchOrigin,localTorchShape,localShadowRight,localShadowUp;\nuniform float localTorchLevel,localShadowRange,localShadowsEnabled,localShadowPlaneScale;\nvec2 localReceiverPlaneGradient;\nuniform highp sampler3D localTorchField;'+(map?'\nvarying vec2 vLocalShadowUV;\nuniform sampler2D localShadowAlphaMap;\nuniform float localShadowAlphaTest;':''))
        // Compare each texel against the receiver plane at that texel. A single
        // constant depth for a grazing surface causes false self-shadowing.
        .replace('#include <shadowmap_pars_fragment>',`#define getShadow localNativeGetShadow
          #include <shadowmap_pars_fragment>
          #undef getShadow
          #if defined(USE_SHADOWMAP) && defined(SHADOWMAP_TYPE_PCF)
          float getShadow(sampler2DShadow shadowMap,vec2 shadowMapSize,float shadowIntensity,float shadowBias,float shadowRadius,vec4 shadowCoord){
            vec3 coord=shadowCoord.xyz/shadowCoord.w;
            vec2 gradient=localReceiverPlaneGradient;
            float shadow=1.0;
            if(coord.x>=0.0&&coord.x<=1.0&&coord.y>=0.0&&coord.y<=1.0&&coord.z<=1.0){
              vec2 pixel=coord.xy*shadowMapSize-0.5,base=floor(pixel),weight=fract(pixel);
              vec2 uv00=(base+0.5)/shadowMapSize,uv10=uv00+vec2(1.0/shadowMapSize.x,0.0);
              vec2 uv01=uv00+vec2(0.0,1.0/shadowMapSize.y),uv11=uv00+1.0/shadowMapSize;
              float a=texture(shadowMap,vec3(uv00,coord.z+shadowBias+dot(gradient,uv00-coord.xy)));
              float b=texture(shadowMap,vec3(uv10,coord.z+shadowBias+dot(gradient,uv10-coord.xy)));
              float c=texture(shadowMap,vec3(uv01,coord.z+shadowBias+dot(gradient,uv01-coord.xy)));
              float d=texture(shadowMap,vec3(uv11,coord.z+shadowBias+dot(gradient,uv11-coord.xy)));
              shadow=mix(mix(a,b,weight.x),mix(c,d,weight.x),weight.y);
            }
            return mix(1.0,shadow,shadowIntensity);
          }
          #elif defined(USE_SHADOWMAP)
          #define getShadow localNativeGetShadow
          #endif`)
        // Evaluate derivatives before alpha discard or sun-facing branches.
        // The light-space receiver slope follows directly from its plane;
        // differentiating shadow UVs inside getShadow is undefined in divergent
        // fragment control flow and loses precision on grazing surfaces.
        .replace('void main() {',`void main() {
          vec3 localFaceNormal=cross(dFdx(vLocalShadowWorld),dFdy(vLocalShadowWorld));
          localFaceNormal*=inversesqrt(max(dot(localFaceNormal,localFaceNormal),1e-20));
          if(!gl_FrontFacing)localFaceNormal=-localFaceNormal;
          float localPlaneFacing=dot(localFaceNormal,localSunDirection);
          localReceiverPlaneGradient=abs(localPlaneFacing)>1e-5?
            vec2(dot(localFaceNormal,localShadowRight),dot(localFaceNormal,localShadowUp))*localShadowPlaneScale/localPlaneFacing:vec2(0.0);
          ${map?'if (texture2D(localShadowAlphaMap, vLocalShadowUV).a < localShadowAlphaTest) discard;':''}`)
        .replace('gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );',`
          float localFacing=sqrt(max(dot(localFaceNormal,localSunDirection),0.0));
          // A sun-facing term of zero already fixes the result to ambient.
          // Avoid shadow-map reads on back-facing walls that fill the screen.
          float localLight=localSunLighting.x;
          if(localFacing>0.0)localLight+=localSunLighting.y*localFacing*(localShadowsEnabled>.5?getShadowMask():1.0);
          vec3 localTorchPoint=vLocalShadowWorld+localFaceNormal*0.501-localTorchOrigin;
          if(localTorchPoint.x>=0.0&&localTorchPoint.x<localTorchShape.x&&localTorchPoint.z>=0.0&&localTorchPoint.z<localTorchShape.y&&localTorchPoint.y>=0.0&&localTorchPoint.y<localTorchShape.z){
            float localBlockLight=texture(localTorchField,localTorchPoint.xzy/localTorchShape).r*255.0/localTorchLevel;
            localLight=mix(localLight,1.0,clamp(localBlockLight*1.25,0.0,1.0));
          }
          gl_FragColor=vec4(color,opacity*clamp(1.0-localLight,0.0,1.0));`)
        .replace('#include <tonemapping_fragment>','if(localShadowRange>0.0)gl_FragColor.a *= 1.0 - smoothstep(localShadowRange*0.9,localShadowRange,distance(vLocalShadowWorld,localShadowCenter));\n#include <tonemapping_fragment>');
      if(map){shader.uniforms.localShadowAlphaMap=texture;shader.uniforms.localShadowUVTransform=transform;shader.uniforms.localShadowAlphaTest=alpha}
      if(state.realState)photometry.decorate(shader,source,state.realState);
    };
    state.materials.set(source,material);return material;
  }
  function isVisible(object){
    for(let current=object;current;current=current.parent)if(!current.visible)return false;
    return true;
  }
  function isPhysical(mesh){
    if(!mesh.isMesh||!mesh.geometry?.attributes.position||mesh.material?.userData?.miningLocalWater||mesh.userData.miningLocalShadowOverlay||mesh.userData.miningLocalShadowProxy||mesh.userData.miningLocalSun||mesh.userData.miningLocalSky)return false;
    const materials=Array.isArray(mesh.material)?mesh.material:[mesh.material];
    return !materials.every(material=>material.transparent&&(material.opacity<.5||!material.depthWrite&&!material.alphaTest&&!material.alphaHash));
  }
  function worldBounds(state,mesh){
    mesh.updateWorldMatrix(true,false);if(!mesh.geometry.boundingBox)mesh.geometry.computeBoundingBox();
    const box=mesh.geometry.boundingBox;if(!box||box.isEmpty())return null;
    const bounds={min:new T.Lr(Infinity,Infinity,Infinity),max:new T.Lr(-Infinity,-Infinity,-Infinity)};
    for(let i=0;i<8;i++){
      const p=state.scratch.set(i&1?box.max.x:box.min.x,i&2?box.max.y:box.min.y,i&4?box.max.z:box.min.z).applyMatrix4(mesh.matrixWorld);
      bounds.min.min(p);bounds.max.max(p);
    }
    return bounds;
  }
  function boundsDistance(bounds,point){
    return Math.hypot(Math.max(bounds.min.x-point.x,0,point.x-bounds.max.x),Math.max(bounds.min.y-point.y,0,point.y-bounds.max.y),Math.max(bounds.min.z-point.z,0,point.z-bounds.max.z));
  }
  function distanceTo(state,mesh){
    mesh.updateWorldMatrix(true,false);
    if(!mesh.geometry.boundingSphere)mesh.geometry.computeBoundingSphere();
    state.scratch.copy(mesh.geometry.boundingSphere?.center||mesh.position).applyMatrix4(mesh.matrixWorld);
    return Math.hypot(state.scratch.x-state.center.value.x,state.scratch.z-state.center.value.z);
  }
  function terrainChanged(state){
    let count=0;
    // Mining replaces native chunk meshes before the draw. Detect that cheaply
    // on every draw, independently of the 10 Hz budget for unchanged geometry.
    for(const mesh of state.world.children){
      if(!mesh.isMesh||!mesh.geometry?.attributes.position)continue;
      count++;
      const previous=state.terrainSnapshot.get(mesh),geometry=mesh.geometry;
      if(!previous||previous.geometry!==geometry||previous.positionVersion!==geometry.attributes.position.version||previous.uvVersion!==geometry.attributes.uv?.version||
          previous.indexVersion!==geometry.index?.version||previous.visible!==mesh.visible)return true;
    }
    return count!==state.terrainSnapshot.size;
  }
  function rememberTerrain(state){
    state.terrainSnapshot.clear();
    for(const mesh of state.world.children){
      if(!mesh.isMesh||!mesh.geometry?.attributes.position)continue;
      const geometry=mesh.geometry;
      state.terrainSnapshot.set(mesh,{geometry,positionVersion:geometry.attributes.position.version,uvVersion:geometry.attributes.uv?.version,indexVersion:geometry.index?.version,visible:mesh.visible});
    }
  }
  function selectActors(state,camera){
    const actors=[],effects=new Set(),owner=sceneOwners.get(state.scene);
    state.viewFrustum.setFromProjectionMatrix(state.viewMatrix.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse),camera.coordinateSystem);
    for(const view of owner?.breakViews?.values?.()||[])if(view.crack)effects.add(view.crack);
    for(const child of state.scene.children){
      if(child===state.world||child===state.proxyGroup||child.isLight||child===state.light.target)continue;
      child.traverseVisible(object=>{
        if(!isPhysical(object)||effects.has(object)||!isVisible(object))return;
        const bounds=worldBounds(state,object);if(!bounds)return;
        const distance=boundsDistance(bounds,state.center.value);
        actors.push({mesh:object,bounds,distance,terrain:false,receive:(!RANGES[effectiveRange()]||distance<=RANGES[effectiveRange()])&&state.viewFrustum.intersectsObject(object)});
      });
    }
    return actors;
  }
  function updateTorchField(state,eye,now,terrainDirty){
    const owner=sceneOwners.get(state.scene),world=owner?.world;
    if(!world||world.group!==state.world||typeof world.store?.values!=='function')return;
    if(!terrainDirty&&state.torchOwner===world&&now-state.lastTorchUpdate<UPDATE_MS)return;
    state.torchOwner=world;state.lastTorchUpdate=now;
    const height=globalThis.__MINING_LOCAL_NATIVE_API__?.worldHeight||TORCH_HEIGHT;
    const bounds=state.receiverBounds,nearX=(Math.floor(eye.x/16)-2)*16,nearZ=(Math.floor(eye.z/16)-2)*16;
    let originX=Math.min(nearX,Math.floor((bounds.min.x-.501)/16)*16),originZ=Math.min(nearZ,Math.floor((bounds.min.z-.501)/16)*16);
    let width=Math.max(nearX+80,Math.ceil((bounds.max.x+.501)/16)*16)-originX,depth=Math.max(nearZ+80,Math.ceil((bounds.max.z+.501)/16)*16)-originZ;
    const limit=Math.floor(state.maxTorchSide/16)*16;
    if(width>limit){width=limit;originX=(Math.floor(eye.x/16)-Math.floor(limit/32))*16}
    if(depth>limit){depth=limit;originZ=(Math.floor(eye.z/16)-Math.floor(limit/32))*16}
    let upload=false;
    if(width!==state.torchShape.value.x||depth!==state.torchShape.value.y||height!==state.torchShape.value.z){
      state.torchField.dispose();state.torchData=new Uint8Array(width*depth*height);
      const texture=new T.F(state.torchData,width,depth,height);texture.format=T.Xn;texture.magFilter=T.Ct;texture.minFilter=T.Ct;texture.needsUpdate=true;
      state.torchField=texture;state.torchUniform.value=texture;state.torchShape.value.set(width,depth,height);state.torchChunks.clear();upload=true;
    }
    if(state.torchOrigin.value.x!==originX||state.torchOrigin.value.z!==originZ){state.torchData.fill(0);state.torchChunks.clear();upload=true}
    state.torchOrigin.value.set(originX,0,originZ);
    const radius=Math.max(1,Number(world.torchRadius)||14);state.torchLevel.value=radius;
    const seen=new Set();
    // Compare only the loaded chunk caches, rather than scanning a large empty
    // volume or running the native flood fill. Native buffers stay read-only.
    for(const chunk of world.store.values()){
      const x=chunk.cx*16-originX,z=chunk.cz*16-originZ;
      if(x<0||x+16>width||z<0||z+16>depth)continue;
      const key=chunk.cx+','+chunk.cz,previous=state.torchChunks.get(key),light=chunk.torchLight,torches=chunk.torches||[];seen.add(key);
      let changed=!previous||previous.radius!==radius||previous.torches.length!==torches.length||torches.some((value,index)=>value!==previous.torches[index])||!!previous.light!==!!light;
      if(!changed&&light){
        if(previous.light.length!==light.length)changed=true;
        else if(light.byteOffset%4===0&&light.byteLength%4===0){
          const a=new Uint32Array(light.buffer,light.byteOffset,light.byteLength/4),b=new Uint32Array(previous.light.buffer);for(let i=0;i<a.length;i++)if(a[i]!==b[i]){changed=true;break}
        }else for(let i=0;i<light.length;i++)if(light[i]!==previous.light[i]){changed=true;break}
      }
      if(!changed)continue;
      if(writeTorchChunk(state,x,z,light,torches,radius))upload=true;
      state.torchChunks.set(key,{cx:chunk.cx,cz:chunk.cz,radius,light:light?light.slice():null,torches:Array.from(torches)});
    }
    for(const [key,chunk] of state.torchChunks)if(!seen.has(key)){
      if(writeTorchChunk(state,chunk.cx*16-originX,chunk.cz*16-originZ,null,[],radius))upload=true;
      state.torchChunks.delete(key);
    }
    if(upload)state.torchField.needsUpdate=true;
  }
  function writeTorchChunk(state,x,z,light,torches,radius){
    const width=state.torchShape.value.x,depth=state.torchShape.value.y,pixels=state.torchData;let changed=false;
    if(x<0||z<0||x+16>width||z+16>depth)return false;
    for(let y=0;y<state.torchShape.value.z;y++)for(let row=0;row<16;row++){
      const from=(y*16+row)*16,to=(y*depth+z+row)*width+x;
      for(let col=0;col<16;col++){
        const value=light?.[from+col]||0;
        if(pixels[to+col]!==value){pixels[to+col]=value;changed=true}
      }
    }
    for(const index of torches){
      const y=index>>8;if(y<0||y>=state.torchShape.value.z)continue;
      const to=(y*depth+z+(index>>4&15))*width+x+(index&15);
      if(pixels[to]!==radius){pixels[to]=radius;changed=true}
    }
    return changed;
  }
  function poseObjects(actors){
    const objects=new Set();
    for(const {mesh} of actors){objects.add(mesh);for(const bone of mesh.skeleton?.bones||[])objects.add(bone)}
    return objects;
  }
  function actorsChanged(state,actors,objects){
    if(actors.length!==state.actorSnapshot.size||objects.size!==state.poseSnapshot.size)return true;
    for(const {mesh,receive} of actors){
      const previous=state.actorSnapshot.get(mesh),geometry=mesh.geometry,morph=mesh.morphTargetInfluences||[];
      if(!previous||previous.receive!==receive||previous.geometry!==geometry||previous.positionVersion!==geometry.attributes.position.version||previous.indexVersion!==geometry.index?.version||
          previous.morph.length!==morph.length||morph.some((value,index)=>value!==previous.morph[index]))return true;
    }
    // Skeleton boneMatrices are uploaded later by the renderer. World matrices
    // already contain this draw's native animation and local camera-view pose.
    for(const object of objects){
      const previous=state.poseSnapshot.get(object),elements=object.matrixWorld.elements;
      if(!previous||elements.some((value,index)=>value!==previous[index]))return true;
    }
    return false;
  }
  function rememberActors(state,actors,objects){
    state.actorSnapshot.clear();state.poseSnapshot.clear();
    for(const {mesh,receive} of actors){
      const geometry=mesh.geometry;
      state.actorSnapshot.set(mesh,{geometry,receive,positionVersion:geometry.attributes.position.version,indexVersion:geometry.index?.version,morph:Array.from(mesh.morphTargetInfluences||[])});
    }
    for(const object of objects)state.poseSnapshot.set(object,object.matrixWorld.elements.slice());
  }
  function placeLight(state,eye,sources,camera){
    const direction=state.sunDirection,right=state.lightRight,up=state.lightUp,target=state.light.target.position;
    right.set(direction.z,0,-direction.x).normalize();up.crossVectors(direction,right).normalize();
    const bounds=state.receiverBounds;bounds.min.set(Infinity,Infinity,Infinity);bounds.max.set(-Infinity,-Infinity,-Infinity);
    const radius=RANGES[effectiveRange()];state.rangeUniform.value=radius;
    for(const item of sources)if(item.receive){
      const min=item.bounds.min.clone(),max=item.bounds.max.clone();
      if(radius){min.max(state.scratch.copy(eye).addScalar(-radius));max.min(state.scratch.copy(eye).addScalar(radius))}
      bounds.min.min(min);bounds.max.max(max);
    }
    if(!Number.isFinite(bounds.min.x)){bounds.min.copy(eye).addScalar(-4);bounds.max.copy(eye).addScalar(4)}
    let minR=Infinity,maxR=-Infinity,minU=Infinity,maxU=-Infinity;
    for(let i=0;i<8;i++){
      const p=state.scratch.set(i&1?bounds.max.x:bounds.min.x,i&2?bounds.max.y:bounds.min.y,i&4?bounds.max.z:bounds.min.z);
      const r=p.dot(right),u=p.dot(up);minR=Math.min(minR,r);maxR=Math.max(maxR,r);minU=Math.min(minU,u);maxU=Math.max(maxU,u);
    }
    const extent=Math.max(16,Math.ceil((Math.max(maxR-minR,maxU-minU)/2+4)/16)*16);
    const limit=Math.min(8192,state.renderer.capabilities?.maxTextureSize||4096),desired=2**Math.ceil(Math.log2(extent*2/SHADOW_TEXEL)),size=Math.min(limit,Math.max(1024,desired));
    if(size!==state.mapSize){
      state.light.shadow.map?.dispose();state.light.shadow.map=null;state.light.shadow.mapPass?.dispose();state.light.shadow.mapPass=null;
      state.mapSize=size;state.light.shadow.mapSize.set(size,size);
    }
    const texel=extent*2/state.mapSize,x=Math.round((minR+maxR)/2/texel)*texel,y=Math.round((minU+maxU)/2/texel)*texel;
    let minS=Infinity,maxS=-Infinity;
    for(const item of sources){
      const box=item.bounds;let r0=Infinity,r1=-Infinity,u0=Infinity,u1=-Infinity,s0=Infinity,s1=-Infinity;
      for(let i=0;i<8;i++){
        const p=state.scratch.set(i&1?box.max.x:box.min.x,i&2?box.max.y:box.min.y,i&4?box.max.z:box.min.z),r=p.dot(right),u=p.dot(up),s=p.dot(direction);
        r0=Math.min(r0,r);r1=Math.max(r1,r);u0=Math.min(u0,u);u1=Math.max(u1,u);s0=Math.min(s0,s);s1=Math.max(s1,s);
      }
      if(r0<=x+extent&&r1>=x-extent&&u0<=y+extent&&u1>=y-extent){minS=Math.min(minS,s0);maxS=Math.max(maxS,s1)}
    }
    if(!Number.isFinite(minS)){minS=eye.dot(direction)-16;maxS=eye.dot(direction)+16}
    // Keep an enclosing depth interval rather than refitting it to every tiny
    // idle pose. Padding permits movement without changing depth precision.
    let depth=state.depthBounds;
    if(!depth||minS<depth.min+4||maxS>depth.max-4||depth.max-depth.min>(maxS-minS+32)*1.5+16){
      depth=state.depthBounds={min:Math.floor((minS-16)/4)*4,max:Math.ceil((maxS+16)/4)*4};
    }
    const z=(depth.min+depth.max)/2,distance=(depth.max-depth.min)/2;
    // Match the actual visible geometry, then snap in the light's texel grid.
    target.copy(direction).multiplyScalar(z).addScaledVector(right,x).addScaledVector(up,y);
    state.light.position.copy(target).addScaledVector(direction,distance);
    Object.assign(state.light.shadow.camera,{left:-extent,right:extent,top:extent,bottom:-extent,near:.5,far:Math.max(64,distance*2+16)});
    state.light.shadow.bias=-.02/state.light.shadow.camera.far;state.light.shadow.camera.updateProjectionMatrix();
    state.planeScale.value=extent*2/(state.light.shadow.camera.far-state.light.shadow.camera.near);
    state.light.target.updateMatrixWorld(true);state.light.updateMatrixWorld(true);state.light.shadow.updateMatrices(state.light);
    state.nativeRange={cameraFar:camera.far,fogNear:state.scene.fog?.near??null,fogFar:state.scene.fog?.far??null,chunkCullFar:state.scene.fog?.far!=null?state.scene.fog.far+16:null,shadowSpan:extent*2};
    const elements=state.light.shadow.matrix.elements;
    const changed=!state.shadowMatrix||elements.some((value,index)=>value!==state.shadowMatrix[index]);
    if(changed)state.shadowMatrix=elements.slice();
    return changed;
  }
  function inShadowVolume(state,mesh){
    const geometry=mesh.geometry;if(!geometry.boundingBox)geometry.computeBoundingBox();
    const box=geometry.boundingBox;if(!box||box.isEmpty())return false;
    const camera=state.light.shadow.camera;
    state.clipMatrix.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse).multiply(mesh.matrixWorld);
    let minX=Infinity,minY=Infinity,minZ=Infinity,maxX=-Infinity,maxY=-Infinity,maxZ=-Infinity;
    for(let i=0;i<8;i++){
      const p=state.scratch.set(i&1?box.max.x:box.min.x,i&2?box.max.y:box.min.y,i&4?box.max.z:box.min.z).applyMatrix4(state.clipMatrix);
      minX=Math.min(minX,p.x);maxX=Math.max(maxX,p.x);minY=Math.min(minY,p.y);maxY=Math.max(maxY,p.y);minZ=Math.min(minZ,p.z);maxZ=Math.max(maxZ,p.z);
    }
    return minX<=1&&maxX>=-1&&minY<=1&&maxY>=-1&&minZ<=1&&maxZ>=-1;
  }
  function syncCasterSides(state,selected){
    const keep=new Set();
    for(const {mesh} of selected)for(const material of Array.isArray(mesh.material)?mesh.material:[mesh.material]){
      keep.add(material);if(!state.casterSides.has(material))state.casterSides.set(material,material.shadowSide);
      // Voxel chunks contain exposed surfaces, not necessarily closed solids.
      material.shadowSide=2;
    }
    for(const [material,side] of state.casterSides)if(!keep.has(material)){material.shadowSide=side;state.casterSides.delete(material)}
  }
  function syncReceiver(mesh,overlay){
    overlay.geometry=mesh.geometry;
    if(mesh.isSkinnedMesh){
      overlay.skeleton=mesh.skeleton;overlay.bindMode=mesh.bindMode;
      overlay.bindMatrix.copy(mesh.bindMatrix);overlay.bindMatrixInverse.copy(mesh.bindMatrixInverse);
    }
    if(mesh.morphTargetInfluences){overlay.morphTargetInfluences=mesh.morphTargetInfluences;overlay.morphTargetDictionary=mesh.morphTargetDictionary}
    overlay.updateWorldMatrix(true,false);
  }
  function terrainSources(state){
    const terrain=[],radius=RANGES[effectiveRange()];
    for(const mesh of state.world.children){
      if(!isPhysical(mesh))continue;
      const bounds=worldBounds(state,mesh);if(!bounds)continue;
      const distance=boundsDistance(bounds,state.center.value);
      terrain.push({mesh,bounds,distance,terrain:true,receive:isVisible(mesh)&&(!radius||distance<=radius)});
    }
    return terrain;
  }
  function proxyMaterial(state,source){
    let material=state.proxyMaterials.get(source);if(material)return material;
    material=new T.Rt({map:source.map,alphaMap:source.alphaMap,alphaTest:source.alphaTest,side:source.side,shadowSide:2,colorWrite:false,depthWrite:false,depthTest:false,fog:false,toneMapped:false});
    state.proxyMaterials.set(source,material);return material;
  }
  function collect(state,sources){
    const selected=sources.filter(item=>item.receive||(rendering()&&inShadowVolume(state,item.mesh))),keep=new Set(selected.map(item=>item.mesh));
    for(const [mesh,record] of state.records)if(!keep.has(mesh)){restoreRecord(mesh,record);state.records.delete(mesh)}
    syncCasterSides(state,rendering()?selected:[]);
    state.proxyGroup.updateWorldMatrix(true,false);state.proxyInverse.copy(state.proxyGroup.matrixWorld).invert();
    state.terrainCount=0;
    for(const item of selected){
      const mesh=item.mesh;let record=state.records.get(mesh);
      if(!record){record={castShadow:mesh.castShadow,overlay:null,proxy:null};state.records.set(mesh,record)}
      mesh.castShadow=rendering()||record.castShadow;
      if(rendering()&&item.terrain&&!isVisible(mesh)){
        if(!record.proxy){
          const material=Array.isArray(mesh.material)?mesh.material.map(value=>proxyMaterial(state,value)):proxyMaterial(state,mesh.material);
          const proxy=new T.Lt(mesh.geometry,material);proxy.name='MiningLocalShadowCaster';proxy.userData.miningLocalShadowProxy=true;
          proxy.castShadow=true;proxy.receiveShadow=false;proxy.matrixAutoUpdate=false;proxy.layers.mask=mesh.layers.mask;proxy.raycast=()=>{};
          state.proxyGroup.add(proxy);record.proxy=proxy;
        }
        record.proxy.geometry=mesh.geometry;record.proxy.matrix.copy(state.proxyInverse).multiply(mesh.matrixWorld);
        record.proxy.matrixWorldNeedsUpdate=true;record.proxy.updateWorldMatrix(true,false);
      }else if(record.proxy){record.proxy.removeFromParent();record.proxy=null}
      if(item.terrain&&!state.watchedMaterial){state.watchedMaterial=Array.isArray(mesh.material)?mesh.material[0]:mesh.material;state.watchedMaterial.addEventListener('dispose',state.cleanup)}
      if(item.receive){
        if(!record.overlay){
          const material=Array.isArray(mesh.material)?mesh.material.map(value=>shadowMaterial(state,value)):shadowMaterial(state,mesh.material);
          const overlay=mesh.isSkinnedMesh?new T.mr(mesh.geometry,material):new T.Lt(mesh.geometry,material);overlay.name='MiningLocalShadowReceiver';overlay.userData.miningLocalShadowOverlay=true;
          // Render-only copies must never add a second collision/picking pass.
          overlay.raycast=()=>{};
          overlay.receiveShadow=true;overlay.castShadow=false;overlay.layers.mask=mesh.layers.mask;
          overlay.matrixAutoUpdate=false;overlay.updateMatrix();
          // Opaque native surfaces are already drawn in the opaque pass. Their
          // lighting must precede native transparent decals, including cracks.
          // Transparent source meshes still need lighting after their own draw.
          const opaque=(Array.isArray(mesh.material)?mesh.material:[mesh.material]).every(value=>!value.transparent);
          overlay.renderOrder=opaque?Math.min(mesh.renderOrder-.01,-.01):mesh.renderOrder+.01;
          mesh.add(overlay);
          // Scene.onBeforeRender runs after the renderer's world-matrix update.
          // Newly added receivers must inherit the chunk transform immediately;
          // otherwise their first draw uses identity/origin and flashes bright.
          record.overlay=overlay;
        }
        syncReceiver(mesh,record.overlay);if(item.terrain)state.terrainCount++;
      }else if(record.overlay){record.overlay.removeFromParent();record.overlay=null}
    }
  }
  function beforeWorld(scene,world,camera,renderer,eye=camera.position){
    try{
      if(!rendering()){water?.beforeWorld(scene,world,camera,renderer,{enabled:false,owner:sceneOwners.get(scene)});return}
      if(!renderer.shadowMap||!T.V||!T.Rt||!T.F||!T.Xn||!T.Ct||!T.$)throw Error('unsupported-renderer');
      let state=states.get(scene);
      if(state&&(state.world!==world||state.renderer!==renderer)){dispose(state);state=null}
      if(!state)state=createState(scene,world,renderer);
      const now=performance.now();state.center.value.copy(eye);updateEnvironment(state,camera,eye);
      camera.updateMatrixWorld(true);
      const terrainDirty=terrainChanged(state),actors=selectActors(state,camera),objects=poseObjects(actors),changed=terrainDirty||actorsChanged(state,actors,objects);
      if(!changed&&now-state.lastUpdate<UPDATE_MS){updateTorchField(state,eye,now,false);if(state.realState)photometry.update(state.realState,sceneOwners.get(scene),world,eye,camera,state.light,effectiveTime(),realistic,now,false);updateWater(state,camera,now);return}
      state.lastUpdate=now;
      const sources=[...terrainSources(state),...actors],lightChanged=placeLight(state,eye,sources,camera);updateTorchField(state,eye,now,terrainDirty);
      if(state.realState)photometry.update(state.realState,sceneOwners.get(scene),world,eye,camera,state.light,effectiveTime(),realistic,now,terrainDirty);
      collect(state,sources);rememberTerrain(state);rememberActors(state,actors,objects);
      if(rendering()&&(changed||lightChanged)){state.light.shadow.needsUpdate=true;renderer.shadowMap.needsUpdate=true}updateWater(state,camera,now);report();
    }catch(error){stop();report(String(error?.message||error))}
  }
  function updateWater(state,camera,now){
    water?.beforeWorld(state.scene,state.world,camera,state.renderer,{enabled:realistic,owner:sceneOwners.get(state.scene),now,sunDirection:state.sunDirection,lighting:state});
  }
  function cleanup(){stop();water?.dispose()}
  if(typeof window!=='undefined')window.addEventListener('pagehide',cleanup);
  report();return {get enabled(){return enabled},get rendering(){return rendering()},get timeOfDay(){return timeOfDay},get range(){return range},get realistic(){return realistic},setRealistic,setEnabled,setTimeOfDay,setRange,bindSceneClass,beforeWorld,dispose:cleanup,
    isClimbing:scene=>!!sceneOwners.get(scene)?.body?.climbing};
};

;
(() => {
  // The November 28 game update changed Three.js's generated export names.
  const november28 = {
    $:'Q', $t:'Qt', B:'z', Ct:'St', D:'E', F:'P', Gt:'Wt', Ir:'Ir', It:'Ft',
    L:'I', Lr:'Lr', Lt:'It', Rr:'Rr', Rt:'Lt', V:'B', Vr:'Vr', X:'Y', Xn:'Yn',
    Yn:'Jn', _:'g', a:'a', cn:'sn', cr:'sr', g:'h', h:'m', i:'i', m:'p',
    mr:'pr', nn:'tn', r:'r', sr:'or', tn:'en', tt:'et', v:'_', x:'b'
  };
  globalThis.__MINING_LOCAL_THREE_EXPORTS__ = (source, url) => {
    if (!new URL(url).pathname.endsWith('/three.core-CxShBFoc.js')) return source;
    return Object.fromEntries(Object.entries(november28).map(([name, key]) => [name, source[key]]));
  };
})();

;
/* Local visuals, MOD settings and the native Shift physics bridge. */
(() => {
  "use strict";
  const resources = globalThis.__MINING_LOCAL_RESOURCES__;
  const i18n = globalThis.__MINING_LOCAL_I18N__;
  const {t, bind: text} = i18n;
  const hostAdapter = globalThis.__MINING_LOCAL_HOST_ADAPTER__;
  const externalCamera = () => !!hostAdapter?.cameraActive();
  const cameraFactory = globalThis.__MINING_LOCAL_CAMERA_FACTORY__;
  const avatarFactory = globalThis.__MINING_LOCAL_AVATAR_FACTORY__;
  const controlsFactory = globalThis.__MINING_LOCAL_CONTROLS_FACTORY__;
  const sneak = globalThis.__MINING_LOCAL_SNEAK__;
  const inventoryFactory = globalThis.__MINING_LOCAL_INVENTORY_FACTORY__;
  const hotbarFactory = globalThis.__MINING_LOCAL_HOTBAR_FACTORY__;
  const iconsFactory = globalThis.__MINING_LOCAL_ICONS_FACTORY__;
  const compassFactory = globalThis.__MINING_LOCAL_COMPASS_FACTORY__;
  const shadowFactory = globalThis.__MINING_LOCAL_SHADOWS_FACTORY__;
  const realismFactory = globalThis.__MINING_LOCAL_REALISM_FACTORY__;
  const waterFactory = globalThis.__MINING_LOCAL_WATER_FACTORY__;
  const paperDollFactory = globalThis.__MINING_LOCAL_PAPER_DOLL_FACTORY__;
  delete globalThis.__MINING_LOCAL_HOTBAR_FACTORY__;
  delete globalThis.__MINING_LOCAL_MINECART_FACTORY__;
  delete globalThis.__MINING_LOCAL_INVENTORY_FACTORY__;
  delete globalThis.__MINING_LOCAL_SNEAK__;
  delete globalThis.__MINING_LOCAL_CAMERA_FACTORY__;
  delete globalThis.__MINING_LOCAL_AVATAR_FACTORY__;
  delete globalThis.__MINING_LOCAL_PICKAXE_FACTORY__;
  delete globalThis.__MINING_LOCAL_CONTROLS_FACTORY__;
  delete globalThis.__MINING_LOCAL_RESOURCES__;
  delete globalThis.__MINING_LOCAL_ICONS_FACTORY__;
  delete globalThis.__MINING_LOCAL_COMPASS_FACTORY__;
  delete globalThis.__MINING_LOCAL_SHADOWS_FACTORY__;
  delete globalThis.__MINING_LOCAL_REALISM_FACTORY__;
  delete globalThis.__MINING_LOCAL_WATER_FACTORY__;
  delete globalThis.__MINING_LOCAL_PAPER_DOLL_FACTORY__;
  if (!resources || document.documentElement?.hasAttribute("data-mining-local-loaded")) return;
  const hotbarControls = hotbarFactory?.(resources);
  const inventory = inventoryFactory?.(resources,hotbarControls);
  const report = {version:"1.3.2",edition:"native-distribution",locale:i18n.locale,hook:"waiting",roots:0,nameMode:"mining",appearance:"native-world-quarter-icons",settingsOpen:false,perspective:t('perspective0'),errors:[]};
  const itemIcons=iconsFactory?.(status=>{report.itemIcons=status;publish()});
  const shopCompass=compassFactory?.();
  function publish() {
    if (document.documentElement) {
      document.documentElement.setAttribute("data-mining-local-loaded", "true");
      document.documentElement.setAttribute("data-mining-local-status", JSON.stringify(report));
    }
  }
  function warn(error) {
    const message = String(error?.message || error);
    if (report.errors.includes(message)) return;
    report.errors.push(message); publish();
    console.warn('['+t('modName')+']', message);
  }
  const mineRoots = new WeakMap();
  let three=null;
  const renderMasks=new WeakMap();
  let coreStarted = false;
  let perspective = 0, cameraViews = null, localShadows = null, shadowEye = null, paperDoll = null;
  const perspectiveName = () => t('perspective' + perspective);
  let activeMineUI = null;
  function shadowStatus(status){
    report.shadows=status;
    if(activeMineUI?.state.shadowCheckbox){
      text(activeMineUI.state.shadowHint,status.error?'shadowsUnavailable':'shadowsHint');
      syncSunSettings(activeMineUI.state,status);
    }
    publish();
  }
  function syncSunSettings(state,status=report.shadows){
    state.shadowCheckbox.checked=!!status?.enabled;
    state.realismCheckbox.checked=!!status?.realistic;
    state.shadowCheckbox.disabled=!!status?.realistic;
    state.realismCheckbox.disabled=!!status?.enabled;
    state.sunFieldset.disabled=!status?.enabled||!!status?.realistic;
    for(const radio of state.sunRadios)radio.checked=radio.value===(status?.timeOfDay||'day');
    state.rangeFieldset.disabled=!status?.enabled||!!status?.realistic;
    for(const radio of state.rangeRadios)radio.checked=radio.value===(status?.range||'ultra');
  }
  const inputControls = controlsFactory?.(status => {
    report.controls = status;
    if(activeMineUI?.state.controlsCheckbox)activeMineUI.state.controlsCheckbox.checked=status.enabled;
    publish();
  });
  sneak?.subscribe(status => {
    report.shiftGuard = status;
    if (activeMineUI) syncSneakSettings(activeMineUI.state);
    publish();
  });
  function syncSneakSettings(state) {
    if (!state.sneakCheckbox) return;
    state.sneakCheckbox.checked = sneak.enabled;
    text(state.sneakHint, sneak.supported ? 'sneakHint' : 'sneakUnavailable');
    state.sneakWarning.hidden = !(sneak.enabled && report.shiftGuard?.held && !sneak.supported);
  }
  const movementKeys = new Set(["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight", "Space"]);
  const heldMovement = new Set();
  const css=resources.css;
  function syncEmbeddedSettings(root,state){
    if(!state.embeddedSettings)return;
    const panel=root.querySelector('.panelSettings');
    if(panel&&state.dialog.parentElement!==panel)panel.append(state.dialog);
    const opened=panel?.style.display==='block';
    if(state.settingsOpen!==opened){state.settingsOpen=opened;report.settingsOpen=opened;publish();}
  }
  function setModSettingsOpen(root, state, opened) {
    if(state.embeddedSettings)return;
    if (state.settingsOpen === opened) return;
    state.settingsOpen = opened; state.overlay.hidden = !opened;
    state.settingsButton.setAttribute("aria-expanded", String(opened));
    if (opened) {
      state.previousFocus = root.activeElement || document.activeElement;
      state.lockedCanvas = root.pointerLockElement || null;
      // Release movement keys already held when the menu opens, so they cannot stick.
      for (const code of [...heldMovement]) window.dispatchEvent(new KeyboardEvent("keyup", { code, bubbles: true }));
      if (state.lockedCanvas) document.exitPointerLock();
      state.controlsCheckbox.focus({ preventScroll: true });
    } else {
      const focus = state.previousFocus?.isConnected ? state.previousFocus : state.settingsButton;
      focus?.focus({ preventScroll: true });
      if (state.lockedCanvas?.isConnected) {
        try { const pending = state.lockedCanvas.requestPointerLock(); pending?.catch(() => {}); } catch { /* The game can relock on the next canvas click. */ }
      }
      state.lockedCanvas = null;
    }
    report.settingsOpen = opened; publish();
  }
  function installModSettings(root, state) {
    const hud = root.querySelector(".mhud");
    const button = document.createElement("button");
    button.type = "button"; button.className = "btn mcModOpen";
    text(button, 'settingsButton'); button.setAttribute("aria-haspopup", "dialog"); button.setAttribute("aria-expanded", "false");
    const embeddedSettings=!!hostAdapter?.settingsInNativePanel;
    if(!embeddedSettings)hud.append(button);
    else root.host.setAttribute('data-mining-local-settings','embedded');
    const ui = document.createElement("div"); ui.className = "mcModUi";
    const overlay = document.createElement("div"); overlay.className = "mcModOverlay"; overlay.hidden = true;
    const dialog = document.createElement("section"); dialog.className = "mcModDialog"; dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true"); dialog.setAttribute("aria-labelledby", "mc-mod-title");
    const title = document.createElement("h2"); title.id = "mc-mod-title"; title.className = "mcModTitle"; text(title, 'settingsTitle');
    const viewHint = document.createElement("p"); viewHint.className = "mcModViewHint"; text(viewHint, 'viewHint', () => ({view:perspectiveName()}));
    const sneakOption = document.createElement("label"); sneakOption.className = "mcModOption";
    const sneakCheckbox = document.createElement("input"); sneakCheckbox.type = "checkbox"; sneakCheckbox.className = "mcModCheckbox"; sneakCheckbox.checked = sneak?.enabled ?? false;
    const sneakLabel = document.createElement("span"); text(sneakLabel, 'sneakLabel'); sneakOption.append(sneakCheckbox, sneakLabel);
    const sneakHint = document.createElement("p"); sneakHint.className = "mcModHint";
    const controlsOption=document.createElement("label");controlsOption.className="mcModOption";
    const controlsCheckbox=document.createElement("input");controlsCheckbox.type="checkbox";controlsCheckbox.className="mcModCheckbox";controlsCheckbox.checked=inputControls?.enabled??false;
    const controlsLabel=document.createElement("span");text(controlsLabel, 'controlsLabel');controlsOption.append(controlsCheckbox,controlsLabel);
    const controlsHint=document.createElement("p");controlsHint.className="mcModHint";
    text(controlsHint, 'controlsHint');
    const paperDollOption=document.createElement('label');paperDollOption.className='mcModOption';
    const paperDollCheckbox=document.createElement('input');paperDollCheckbox.type='checkbox';paperDollCheckbox.className='mcModCheckbox';paperDollCheckbox.checked=paperDoll?.enabled??false;
    const paperDollLabel=document.createElement('span');text(paperDollLabel,'paperDollLabel');paperDollOption.append(paperDollCheckbox,paperDollLabel);
    const paperDollHint=document.createElement('p');paperDollHint.className='mcModHint';text(paperDollHint,'paperDollHint');
    paperDollCheckbox.addEventListener('change',()=>paperDoll?.setEnabled(paperDollCheckbox.checked));
    const shadowOption=document.createElement('label');shadowOption.className='mcModOption';
    const shadowCheckbox=document.createElement('input');shadowCheckbox.type='checkbox';shadowCheckbox.className='mcModCheckbox';shadowCheckbox.checked=localShadows?.enabled??false;
    const shadowLabel=document.createElement('span');text(shadowLabel,'shadowsLabel');shadowOption.append(shadowCheckbox,shadowLabel);
    const shadowHint=document.createElement('p');shadowHint.className='mcModHint';text(shadowHint,report.shadows?.error?'shadowsUnavailable':'shadowsHint');
    const realismOption=document.createElement('label');realismOption.className='mcModOption';
    const realismCheckbox=document.createElement('input');realismCheckbox.type='checkbox';realismCheckbox.className='mcModCheckbox';realismCheckbox.checked=localShadows?.realistic??false;
    const realismLabel=document.createElement('span');text(realismLabel,'realismLabel');realismOption.append(realismCheckbox,realismLabel);
    const realismHint=document.createElement('p');realismHint.className='mcModHint';text(realismHint,'realismHint');
    realismCheckbox.addEventListener('change',()=>{localShadows?.setRealistic(realismCheckbox.checked);syncSunSettings(state)});
    const sunFieldset=document.createElement('fieldset');sunFieldset.className='mcModSun';
    const sunLegend=document.createElement('legend');text(sunLegend,'sunPosition');
    const sunChoices=document.createElement('div');sunChoices.className='mcModSunChoices';
    const sunRadios=[];
    for(const [value,key] of [['morning','sunMorning'],['day','sunDay'],['evening','sunEvening']]){
      const option=document.createElement('label');option.className='mcModSunChoice';
      const radio=document.createElement('input');radio.type='radio';radio.name='mining-local-sun';radio.value=value;
      const label=document.createElement('span');text(label,key);option.append(radio,label);sunChoices.append(option);sunRadios.push(radio);
      radio.addEventListener('change',()=>{if(radio.checked)localShadows?.setTimeOfDay(radio.value)});
    }
    const sunHint=document.createElement('p');sunHint.className='mcModSunHint';text(sunHint,'sunHint');
    sunFieldset.append(sunLegend,sunChoices,sunHint);
    const rangeFieldset=document.createElement('fieldset');rangeFieldset.className='mcModSun';
    const rangeLegend=document.createElement('legend');text(rangeLegend,'shadowRange');
    const rangeChoices=document.createElement('div');rangeChoices.className='mcModSunChoices mcModRangeChoices';
    const rangeRadios=[];
    for(const [value,key] of [['small','rangeSmall'],['medium','rangeMedium'],['high','rangeHigh'],['ultra','rangeUltra']]){
      const option=document.createElement('label');option.className='mcModSunChoice';
      const radio=document.createElement('input');radio.type='radio';radio.name='mining-local-shadow-range';radio.value=value;
      const label=document.createElement('span');text(label,key);option.append(radio,label);rangeChoices.append(option);rangeRadios.push(radio);
      radio.addEventListener('change',()=>{if(radio.checked)localShadows?.setRange(radio.value)});
    }
    rangeFieldset.append(rangeLegend,rangeChoices);
    const sneakWarning = document.createElement("p"); sneakWarning.className = "mcModShiftWarning"; sneakWarning.hidden = true; sneakWarning.setAttribute("role", "status");
    text(sneakWarning, 'sneakWarning'); hud.append(sneakWarning);
    const close = document.createElement("button"); close.type = "button"; close.className = "mcModButton"; text(close, 'done');
    const keys = document.createElement("p"); keys.className = "mcModKeys"; text(keys, 'closeKeys');
    const realismSection=document.createElement('section');realismSection.className='mcModVisualMode';realismSection.append(realismOption,realismHint);
    const shadowSection=document.createElement('section');shadowSection.className='mcModVisualMode';shadowSection.append(shadowOption,shadowHint,sunFieldset,rangeFieldset);
    dialog.append(title, sneakOption, sneakHint, controlsOption, controlsHint, paperDollOption, paperDollHint, realismSection, shadowSection, viewHint);
    if(embeddedSettings){
      dialog.className='mcModEmbedded';dialog.removeAttribute('role');dialog.removeAttribute('aria-modal');
    }else{
      dialog.append(close,keys);overlay.append(dialog);ui.append(overlay);root.append(ui);
    }
    Object.assign(state, { embeddedSettings,uiRoot:ui,settingsButton: button, overlay, dialog, sneakCheckbox, sneakHint, sneakWarning, controlsCheckbox, paperDollCheckbox, shadowCheckbox, shadowHint, realismCheckbox, realismSection, shadowSection, sunFieldset, sunRadios, rangeFieldset, rangeRadios, viewHint, closeButton: close, settingsOpen: false, lockedCanvas: null });
    syncEmbeddedSettings(root,state);
    syncSneakSettings(state);
    syncSunSettings(state);
    sneakCheckbox.addEventListener("change", () => { sneak?.setEnabled(sneakCheckbox.checked); syncSneakSettings(state); });
    controlsCheckbox.addEventListener("change",()=>inputControls?.setEnabled(controlsCheckbox.checked));
    shadowCheckbox.addEventListener('change',()=>{localShadows?.setEnabled(shadowCheckbox.checked);syncSunSettings(state)});
    button.addEventListener("click", event => { event.stopPropagation(); setModSettingsOpen(root, state, !state.settingsOpen); });
    close.addEventListener("click", () => setModSettingsOpen(root, state, false));
    overlay.addEventListener("pointerdown", event => event.stopPropagation());

  }
  window.addEventListener("keydown", event => {
    if (hostAdapter?.settingsKey === false && ['F2','F4'].some(key => event.code === key || event.key === key)) return;
    if (externalCamera()) return;
    const active = activeMineUI;
    if (!active?.root.host.isConnected || !active.root.querySelector(".mhud") || !active.root.host.getClientRects().length) return;
    const { root, state } = active;
    syncEmbeddedSettings(root,state);
    // The native O panel owns keyboard handling, focus and closing.
    if(state.embeddedSettings&&state.settingsOpen)return;
    if (inputControls?.nativeHudHidden) return;
    const typing = event.composedPath().some(element => element instanceof HTMLElement && (element.isContentEditable || element.matches("textarea,select,input:not([type=checkbox]):not([type=radio]):not([type=button])")));
    if (event.code === "KeyM" && !typing && !event.isComposing && !event.ctrlKey && !event.altKey && !event.metaKey) {
      event.preventDefault(); event.stopImmediatePropagation();
      if (!event.repeat) {
        perspective = (perspective + 1) % 3; report.perspective = perspectiveName();
        i18n.update(state.dialog); publish();
      }
      return;
    }
    if ((event.code === "F2" || event.key === "F2") && !event.ctrlKey && !event.altKey && !event.metaKey) {
      event.preventDefault(); event.stopImmediatePropagation();
      if (!event.repeat) setModSettingsOpen(root, state, !state.settingsOpen);
      return;
    }
    if (state.settingsOpen) {
      event.stopImmediatePropagation();
      if(event.code==='F1'){event.preventDefault();return;}
      if (event.code === "Escape") { event.preventDefault(); setModSettingsOpen(root, state, false); }
      else if (event.code === "Tab") {
        event.preventDefault(); const current = root.activeElement;
        const controls = [...state.dialog.querySelectorAll("input:not(:disabled),button:not(:disabled)")];
        const index = controls.indexOf(current);
        const next = index < 0 ? (event.shiftKey ? controls.length - 1 : 0)
          : (index + (event.shiftKey ? -1 : 1) + controls.length) % controls.length;
        controls[next].focus();
      } else if (!state.dialog.contains(root.activeElement)) event.preventDefault();
      return;
    }
    if (inputControls?.handleKey(event)) return;
    if (inventory?.handleKey(event)) return;
    if (!typing && movementKeys.has(event.code)) heldMovement.add(event.code);
  }, true);
  window.addEventListener("keyup", event => heldMovement.delete(event.code), true);
  window.addEventListener("blur", () => heldMovement.clear());
  function installUI(root) {
    const hud = root.querySelector(".mhud");
    if (!hud) return null;
    const previous = mineRoots.get(root);
    if (previous?.hud === hud && (previous.embeddedSettings||previous.settingsButton.isConnected)) {
      syncEmbeddedSettings(root,previous);return previous;
    }
    if (previous) {
      paperDoll?.release(root);
      previous.observer.disconnect(); previous.settingsButton.remove(); previous.sneakWarning.remove(); previous.uiRoot.remove();previous.dialog.remove();
      report.settingsOpen = false;
    }
    let style = root.querySelector("style[data-mining-local]");
    if (!style) {
      style = document.createElement("style"); style.dataset.miningLocal = "true";
      style.textContent = css + (hostAdapter?.photoModeCSS || ""); root.append(style);
    }
    const state = { hud, tier: 1, queued: false, observer: null, nameTexts: new WeakMap(), nameAttributes: new WeakMap() };
    const buildButton=hud.querySelector('.addChip');
    if(buildButton){text(buildButton,'buildOpen',{},'title','ui.mining.build.openLabel');text(buildButton,'buildOpen',{},'aria-label','ui.mining.build.openLabel')}
    installModSettings(root, state);
    state.observer = new MutationObserver(() => {
      if (state.queued) return;
      state.queued = true;
      queueMicrotask(() => {
        state.queued = false;
        try { syncEmbeddedSettings(root,state);itemIcons?.update(root); inventory?.update(root); inputControls?.update(); } catch (e) { warn(e); }
      });
    });
    state.observer.observe(root, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ["style", "title", "aria-label", "class"] });
    mineRoots.set(root, state);
    itemIcons?.update(root);inventory?.update(root);
    report.roots++; publish();
    return state;
  }
  i18n.subscribe(locale => {
    report.locale=locale; report.perspective=perspectiveName();
    if(activeMineUI){i18n.update(activeMineUI.root);syncSneakSettings(activeMineUI.state);inventory?.update(activeMineUI.root);hotbarControls?.capture(activeMineUI.root);inputControls?.update()}
    publish();
  });
  function observeViewmodel(scene,root,ui) {
    if (externalCamera()) return;
    const rig=scene.children.find(o=>o.isGroup&&o.children.some(c=>c.isGroup&&c.children.length>=4));
    if(!rig)return;
    const tool=rig.children.find(o=>o.isGroup&&o.children.length>=4),head=tool?.children[1]?.material;
    const tier=globalThis.__MINING_LOCAL_NATIVE_API__?.tierFromColor(head?.color?.getHex())||ui.tier||1;
    ui.tier=tier;
    cameraViews.setViewmodelSource(root,{rig,ambient:scene.children.find(o=>o.isAmbientLight),tier});
    if(perspective!==0||inputControls?.hudHidden||hostAdapter?.photoHandHidden){
      const saved=[];
      for(const object of scene.children)if(object.isGroup||object.isMesh){saved.push([object,object.visible]);object.visible=false}
      renderMasks.set(scene,saved);
    }
  }
  async function installHook(url) {
    const source = await import(url);
    const module = globalThis.__MINING_LOCAL_THREE_EXPORTS__?.(source, url) ?? source;
    const required = { Scene:"sr", Group:"tt", Mesh:"Lt", BufferGeometry:"v", Float32BufferAttribute:"X", MeshBasicMaterial:"Rt", BoxGeometry:"g", CanvasTexture:"x", Vector3:"Lr", Raycaster:"Yn", AnimationMixer:"a" };
    three = Object.fromEntries(Object.entries(required).map(([name,key]) => [name,module[key]]));
    if (!three.Scene || !(new three.Scene()).isScene || !(new three.BoxGeometry()).isBufferGeometry || !(new three.MeshBasicMaterial()).isMeshBasicMaterial) {
      throw new Error(t('renderModuleChanged'));
    }
    if (!cameraFactory || !avatarFactory || !three.Raycaster?.prototype.intersectObjects) throw new Error(t('cameraModuleMissing'));
    localShadows=shadowFactory?.(module,shadowStatus,{realismFactory,waterFactory});
    shadowEye=new three.Vector3();
    const nativeAvatars=avatarFactory(module,{baseURL:url,onError:warn,getOwnModel:()=>cameraViews?.getOwnModel()});
    await nativeAvatars.ready;
    localShadows?.bindSceneClass(globalThis.__MINING_LOCAL_NATIVE_API__?.SceneClass);
    cameraViews=cameraFactory(three,camera=>{report.camera=camera;publish()},nativeAvatars);
    paperDoll=paperDollFactory?.(module,nativeAvatars,status=>{report.paperDoll=status;if(activeMineUI)activeMineUI.state.paperDollCheckbox.checked=status.enabled;publish()});
    paperDoll?.bindSceneClass(globalThis.__MINING_LOCAL_NATIVE_API__?.SceneClass);
    const previous = three.Scene.prototype.onBeforeRender;
    const after = three.Scene.prototype.onAfterRender;
    three.Scene.prototype.onBeforeRender = function(renderer, scene, camera, target) {
      if(this.userData.miningLocalPaperDoll){hostAdapter?.applyBodyWidth?.(this);return}
      if(this.userData.miningLocalWaterCapture)return;
      if (typeof previous === "function") previous.apply(this, arguments);
      try {
        cameraViews.captureTown(this, renderer);
        const root = renderer.domElement?.getRootNode();
        if (!(root instanceof ShadowRoot) || !root.querySelector(".mhud")) return;
        const ui = installUI(root);
        activeMineUI = { root, state: ui };
        inputControls?.setContext({root,isMenuOpen:()=>ui.settingsOpen || externalCamera()});
        hotbarControls?.setContext({root,isMenuOpen:()=>ui.settingsOpen || externalCamera()});
        const world = this.children.find(o => o.name === "voxelWorld");
        if (world) {
          if(itemIcons?.capture(world)){itemIcons.update(root);inventory?.update(root)}
          sneak?.setContext({root,worldGroup:world,camera,getPerspective:()=>perspective,isMenuOpen:()=>ui.settingsOpen || externalCamera(),
            isClimbing:()=>localShadows?.isClimbing(this)});
          // Keep the native eye as the shadow range/light anchor; inspect the
          // avatar only after this draw's position, animation and visibility.
          if(localShadows?.rendering)shadowEye.copy(camera.position);
          if (externalCamera()) {
            hostAdapter?.prepareCameraAvatar?.(nativeAvatars);
            cameraViews.suspend(this, camera, root);
            if (ui.settingsOpen) setModSettingsOpen(root, ui, false);
          } else {
            cameraViews.beforeWorld(this, world, camera, perspective, root);
            paperDoll?.beforeWorld(root,ui.hud,world,cameraViews.getLocalPose(root),perspective);
          }
          hostAdapter?.syncAvatarEffects?.(this);
          localShadows?.beforeWorld(this,world,camera,renderer,shadowEye);
          hostAdapter?.applyBodyWidth?.(this);
          shopCompass?.update(root,camera);
        } else observeViewmodel(this,root,ui);
      } catch (e) { warn(e); }
    };
    three.Scene.prototype.onAfterRender = function(renderer, scene, camera) {
      hostAdapter?.restoreBodyWidth?.(this);
      if(this.userData.miningLocalPaperDoll||this.userData.miningLocalWaterCapture)return;
      try { cameraViews.afterWorld(this, camera); } catch (e) { warn(e); }
      for(const [object,visible] of renderMasks.get(this)||[])object.visible=visible;renderMasks.delete(this);
      if (typeof after === "function") after.apply(this, arguments);
      if(!externalCamera() && this.children.some(object=>object.name==='voxelWorld')){
        try{paperDoll?.render(renderer.domElement.getRootNode(),renderer)}catch(e){warn(e)}
      }
    };
    report.hook = "ready"; publish();
    console.info('['+t('modName')+']', t('ready'));
  }
  function findCore() {
    publish();
    if (coreStarted) return;
    const link = Array.from(document.querySelectorAll('link[rel="modulepreload"][href]')).find(el => {
      try { const url = new URL(el.href); return url.origin === location.origin && /\/assets\/three\.core-[\w-]+\.js$/.test(url.pathname); } catch { return false; }
    });
    if (!link) return;
    coreStarted = true; coreObserver.disconnect();
    installHook(link.href).catch(warn);
  }
  const coreObserver = new MutationObserver(findCore);
  coreObserver.observe(document,{ childList:true,subtree:true }); findCore();
})();

}
export const runtimeVersion = '1.3.2-Plus';
export const runtimeProtocol = 1;
let initialized = false;
export async function prepareMining(source, requestedURL) {
  // Hash the original bytes before SpeakiMod+ rewrites the source.
  const prepared = await prepareClient(source, requestedURL, lookupMetadata);
  if (!prepared.reviewed) return {code: source, reviewed: false, hash: prepared.hash};
  if (!initialized) {
    initialized = true;
    installFeatures();
    globalThis.__MINING_LOCAL_HOST_ADAPTER__.installPhotoMode();
  }
  return prepared;
}
