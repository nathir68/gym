const fs = require('fs');
const path = require('path');

try {
  const filePath = path.join(__dirname, '..', 'public', 'shirt_baked.glb');
  const buffer = fs.readFileSync(filePath);
  
  // Read the GLTF header to find the JSON chunk length
  const magic = buffer.readUInt32LE(0);
  const version = buffer.readUInt32LE(4);
  const totalLength = buffer.readUInt32LE(8);
  
  console.log(`GLB Header: magic=${magic.toString(16)}, version=${version}, length=${totalLength}`);
  
  // First chunk is JSON
  const chunkLength = buffer.readUInt32LE(12);
  const chunkType = buffer.readUInt32LE(16);
  
  console.log(`JSON Chunk: length=${chunkLength}, type=${chunkType.toString(16)}`);
  
  if (chunkType === 0x4E4F534A) { // 'JSON' in ASCII
    const jsonBuffer = buffer.slice(20, 20 + chunkLength);
    const jsonStr = jsonBuffer.toString('utf8');
    const gltfJson = JSON.parse(jsonStr);
    
    console.log('Nodes in GLB:');
    if (gltfJson.nodes) {
      gltfJson.nodes.forEach((node, idx) => {
        console.log(`- Node ${idx}: name="${node.name}", mesh=${node.mesh}`);
      });
    }
    
    console.log('\nMeshes in GLB:');
    if (gltfJson.meshes) {
      gltfJson.meshes.forEach((mesh, idx) => {
        console.log(`- Mesh ${idx}: name="${mesh.name}"`);
      });
    }
  } else {
    console.log('First chunk is not JSON!');
  }
} catch (err) {
  console.error('Error inspecting GLB:', err);
}
