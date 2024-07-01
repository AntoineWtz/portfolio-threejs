// FloatingIsland.js

import * as THREE from 'three';

export function createFloatingIsland(scene, grassTexture, soilTexture) {
    // Top part of the island (grass)
    const islandTopGeometry = new THREE.CylinderGeometry(70, 70, 7, 32); // Augmenter les dimensions
    const islandTopMaterial = new THREE.MeshStandardMaterial({ map: grassTexture });
    const islandTop = new THREE.Mesh(islandTopGeometry, islandTopMaterial);
    islandTop.position.y = 0;
    islandTop.castShadow = true;
    islandTop.receiveShadow = true;
    scene.add(islandTop);

    // Bottom part of the island (inverted cone shape)
    const islandBottomGeometry = new THREE.ConeGeometry(70, 40, 32); // Augmenter les dimensions
    const islandBottomMaterial = new THREE.MeshStandardMaterial({ map: soilTexture });
    const islandBottom = new THREE.Mesh(islandBottomGeometry, islandBottomMaterial);
    islandBottom.rotation.x = Math.PI;
    islandBottom.position.y = -23; // Ajuster la position
    islandBottom.castShadow = true;
    islandBottom.receiveShadow = true;
    scene.add(islandBottom);
}
