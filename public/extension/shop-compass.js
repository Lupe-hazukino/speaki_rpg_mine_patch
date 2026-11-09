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
