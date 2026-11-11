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
