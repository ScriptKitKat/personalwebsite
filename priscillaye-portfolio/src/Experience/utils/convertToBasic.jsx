import * as THREE from "three";

/**
 * Creates new MeshBasicMaterials for nodes based on material naming convention.
 * 
 * @param {Object} nodes - Nodes object from GLTF
 * @param {Object} textures - Preloaded textures { ImageTextureOne, ImageTextureTwo, ... }
 * @returns {Object} new materials mapped by node name
 */
export function convertMaterialsToBasic(materials) {
  const newMaterials = {};

  Object.keys(materials).forEach((key) => {
    const oldMaterial = materials[key];

    if (oldMaterial instanceof THREE.MeshStandardMaterial) {
      newMaterials[key] = new THREE.MeshBasicMaterial({
        map: oldMaterial.map || null,
        transparent: oldMaterial.transparent,
      });
    } else {
      newMaterials[key] = oldMaterial;
    }
  });

  return newMaterials;
}
