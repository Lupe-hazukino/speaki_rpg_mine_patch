/* Local HUD portrait, rendered with the existing game renderer and loaded skin. */
globalThis.__MINING_LOCAL_PAPER_DOLL_FACTORY__=(T,avatars,onStatus)=>{
  'use strict';
  const states=new Map(),boundClasses=new WeakSet();let enabled=false,drawing=false,lastReport='';
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
    if(!state.lease||state.source!==source){
      state.lease?.dispose();state.source=source;state.lease=avatars.create();state.scene.add(state.lease.avatar.group);
      state.ready=false;state.mining=false;
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
