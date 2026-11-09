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
