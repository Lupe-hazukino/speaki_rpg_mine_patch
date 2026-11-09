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
  if(typeof window!=="undefined") {
    window.addEventListener("pointerdown",event=>{
      if(event.button===0&&event.composedPath().some(element=>element instanceof HTMLElement&&element.tagName==="CANVAS"))primaryHeld=true;
    },true);
    window.addEventListener("pointerup",event=>{if(event.button===0)primaryHeld=false},true);
    window.addEventListener("blur",()=>{primaryHeld=false});
    document.addEventListener("pointerlockchange",()=>{if(!document.pointerLockElement)primaryHeld=false});
  }
  return {captureTown,beforeWorld,afterWorld,setViewmodelSource,getOwnModel:nativeModel,getLocalPose:root=>localPoses.get(root)};
};
