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
