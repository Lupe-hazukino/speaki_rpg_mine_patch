// Test geometry uses the native mesher's six face directions, vertex order,
// water ID and water/water face culling. No game connection is made.
const directions=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
const corners=[[[1,0,1],[1,0,0],[1,1,0],[1,1,1]],[[0,0,0],[0,0,1],[0,1,1],[0,1,0]],[[0,1,1],[1,1,1],[1,1,0],[0,1,0]],[[0,0,0],[1,0,0],[1,0,1],[0,0,1]],[[0,0,1],[1,0,1],[1,1,1],[0,1,1]],[[1,0,0],[0,0,0],[0,1,0],[1,1,0]]];
export const cellKey=(x,y,z)=>`${x},${y},${z}`;
export function waterCells(cells){const set=new Set(cells.map(p=>cellKey(...p)));return {cells,set,blockAt:(x,y,z)=>set.has(cellKey(x,y,z))?79:0};}
export function voxelWater(T,data,filter=()=>true,origin=[0,0,0]){
 const positions=[],colors=[],indices=[];
 for(const [x,y,z] of data.cells){if(!filter(x,y,z))continue;
  for(let face=0;face<6;face++){const d=directions[face];if(data.blockAt(x+d[0],y+d[1],z+d[2])===79)continue;
   const first=positions.length/3;for(const v of corners[face]){positions.push(x+v[0]-origin[0],y+v[1]-origin[1],z+v[2]-origin[2]);colors.push(255,255,255)}indices.push(first,first+1,first+2,first,first+2,first+3);
  }
 }
 const g=new T.v();g.setAttribute('position',new T._(new Float32Array(positions),3));g.setAttribute('color',new T._(new Uint8Array(colors),3,true));g.setIndex(indices);return g;
}
