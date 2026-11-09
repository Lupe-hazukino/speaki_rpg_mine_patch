/* Adapt the game's runtime avatar interfaces; no model or game renderer is copied. */
(() => {
  let api,resolveAPI,ownWorld=null;
  const localAnimations=new WeakMap(),localViews=new WeakMap();
  const nativeReady=new Promise(resolve=>{resolveAPI=resolve});
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
        const result=original.apply(this,arguments);ownWorld=this;return result;
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
        if(original||!this.active||playerId!==this.myObjectId||!view?.enabled)return original;
        return view.avatar?.animationController??original;
      };
    }
    if(scene?.exit){
      const exit=scene.exit;
      scene.exit=function(){
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
      const textures=controller?.faceExpression?.textures;
      const face=textures&&faceMaterials.length?new assets.T(faceMaterials,textures):null;
      face?.setExpression(assets.w);
      const animation=controller?new assets.y(mixer,controller.sourceClips,face):null,root=new module.tt(),visual=new module.tt();
      visual.add(model);root.add(visual);
      if(sourceRoot.userData.skinAvatarRoot)root.userData.skinAvatarRoot=true;
      return {root,animationController:animation,faceExpression:face,update:dt=>animation?.update(dt),dispose:()=>{mixer?.stopAllAction();mixer?.uncacheRoot(model);instance.dispose()}};
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
          this.hideStaff(instance.root);this.buildSwingBones(instance.root);this.attachPickaxe(instance.root);
          this.collectTintEntries(instance.root);this.syncAnimState();
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
      return {avatar,dispose:()=>{avatar.dispose();kit.dispose()}};
    }
    return {ready,create,getOwnModel:ownModel,skinCodeFromModel:root=>root?.uuid||null,renderer:'native-mining-multiplayer',
      getAnimState(root){const value=localAnimations.get(root);return value?.scene.active?value.state:0},
      setLocalViewAvatar(root,avatar,enabled){localViews.set(root,{avatar,enabled})},
      releaseLocalViewAvatar(root,avatar){if(localViews.get(root)?.avatar===avatar)localViews.delete(root)}
    };
  };
})();
