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
    state.sun.position.copy(camera.position).addScaledVector(state.sunDirection,distance);
    state.sun.quaternion.copy(camera.quaternion);state.sun.scale.setScalar(distance*.065);
    state.sun.material.color.setHex(preset.color);state.sun.updateWorldMatrix(true,false);
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
  report();return {get enabled(){return enabled},get rendering(){return rendering()},get timeOfDay(){return timeOfDay},get range(){return range},get realistic(){return realistic},setRealistic,setEnabled,setTimeOfDay,setRange,bindSceneClass,beforeWorld,dispose:cleanup};
};
