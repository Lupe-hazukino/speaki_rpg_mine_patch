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
    s.cave.value=Math.max(0,Math.min(1,Number(owner?.fogMix)||0));
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
