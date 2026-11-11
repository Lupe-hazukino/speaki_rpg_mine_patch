/* Local visuals, MOD settings and the native Shift physics bridge. */
(() => {
  "use strict";
  const resources = globalThis.__MINING_LOCAL_RESOURCES__;
  const i18n = globalThis.__MINING_LOCAL_I18N__;
  const {t, bind: text} = i18n;
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
  const report = {version:"1.2.3",edition:"native-distribution",locale:i18n.locale,hook:"waiting",roots:0,nameMode:"mining",appearance:"native-world-quarter-icons",settingsOpen:false,perspective:t('perspective0'),errors:[]};
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
  function setModSettingsOpen(root, state, opened) {
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
    hud.append(button);
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
    dialog.append(title, sneakOption, sneakHint, controlsOption, controlsHint, paperDollOption, paperDollHint, realismSection, shadowSection, viewHint, close, keys); overlay.append(dialog); ui.append(overlay); root.append(ui);
    Object.assign(state, { settingsButton: button, overlay, dialog, sneakCheckbox, sneakHint, sneakWarning, controlsCheckbox, paperDollCheckbox, shadowCheckbox, shadowHint, realismCheckbox, realismSection, shadowSection, sunFieldset, sunRadios, rangeFieldset, rangeRadios, viewHint, closeButton: close, settingsOpen: false, lockedCanvas: null });
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
    const active = activeMineUI;
    if (!active?.root.host.isConnected || !active.root.querySelector(".mhud") || !active.root.host.getClientRects().length) return;
    const { root, state } = active;
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
    if (previous?.hud === hud && previous.settingsButton.isConnected) return previous;
    if (previous) {
      paperDoll?.release(root);
      previous.observer.disconnect(); previous.settingsButton.remove(); previous.sneakWarning.remove(); previous.overlay.parentElement.remove();
      report.settingsOpen = false;
    }
    let style = root.querySelector("style[data-mining-local]");
    if (!style) { style = document.createElement("style"); style.dataset.miningLocal = "true"; style.textContent = css; root.append(style); }
    const state = { hud, tier: 1, queued: false, observer: null, nameTexts: new WeakMap(), nameAttributes: new WeakMap() };
    const buildButton=hud.querySelector('.addChip');
    if(buildButton){text(buildButton,'buildOpen',{},'title','ui.mining.build.openLabel');text(buildButton,'buildOpen',{},'aria-label','ui.mining.build.openLabel')}
    installModSettings(root, state);
    state.observer = new MutationObserver(() => {
      if (state.queued) return;
      state.queued = true;
      queueMicrotask(() => {
        state.queued = false;
        try { itemIcons?.update(root); inventory?.update(root); inputControls?.update(); } catch (e) { warn(e); }
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
    const rig=scene.children.find(o=>o.isGroup&&o.children.some(c=>c.isGroup&&c.children.length>=4));
    if(!rig)return;
    const tool=rig.children.find(o=>o.isGroup&&o.children.length>=4),head=tool?.children[1]?.material;
    const tier=globalThis.__MINING_LOCAL_NATIVE_API__?.tierFromColor(head?.color?.getHex())||ui.tier||1;
    ui.tier=tier;
    cameraViews.setViewmodelSource(root,{rig,ambient:scene.children.find(o=>o.isAmbientLight),tier});
    if(perspective!==0||inputControls?.hudHidden){
      const saved=[];
      for(const object of scene.children)if(object.isGroup||object.isMesh){saved.push([object,object.visible]);object.visible=false}
      renderMasks.set(scene,saved);
    }
  }
  async function installHook(url) {
    const module = await import(url);
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
      if(this.userData.miningLocalPaperDoll||this.userData.miningLocalWaterCapture)return;
      if (typeof previous === "function") previous.apply(this, arguments);
      try {
        cameraViews.captureTown(this, renderer);
        const root = renderer.domElement?.getRootNode();
        if (!(root instanceof ShadowRoot) || !root.querySelector(".mhud")) return;
        const ui = installUI(root);
        activeMineUI = { root, state: ui };
        inputControls?.setContext({root,isMenuOpen:()=>ui.settingsOpen});
        hotbarControls?.setContext({root,isMenuOpen:()=>ui.settingsOpen});
        const world = this.children.find(o => o.name === "voxelWorld");
        if (world) {
          if(itemIcons?.capture(world)){itemIcons.update(root);inventory?.update(root)}
          sneak?.setContext({root,worldGroup:world,camera,getPerspective:()=>perspective,isMenuOpen:()=>ui.settingsOpen});
          // Keep the native eye as the shadow range/light anchor; inspect the
          // avatar only after this draw's position, animation and visibility.
          if(localShadows?.rendering)shadowEye.copy(camera.position);
          cameraViews.beforeWorld(this, world, camera, perspective, root);
          paperDoll?.beforeWorld(root,ui.hud,world,cameraViews.getLocalPose(root),perspective);
          localShadows?.beforeWorld(this,world,camera,renderer,shadowEye);
          shopCompass?.update(root,camera);
        } else observeViewmodel(this,root,ui);
      } catch (e) { warn(e); }
    };
    three.Scene.prototype.onAfterRender = function(renderer, scene, camera) {
      if(this.userData.miningLocalPaperDoll||this.userData.miningLocalWaterCapture)return;
      try { cameraViews.afterWorld(this, camera); } catch (e) { warn(e); }
      for(const [object,visible] of renderMasks.get(this)||[])object.visible=visible;renderMasks.delete(this);
      if (typeof after === "function") after.apply(this, arguments);
      if(this.children.some(object=>object.name==='voxelWorld')){
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
