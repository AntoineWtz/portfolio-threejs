import * as THREE from 'three';

export function createFloatingIsland(scene, grassTexture, soilTexture) {
    // Top part of the island (grass)
    const islandTopGeometry = new THREE.CylinderGeometry(50, 50, 5, 32);
    const islandTopMaterial = new THREE.MeshStandardMaterial({ map: grassTexture });
    const islandTop = new THREE.Mesh(islandTopGeometry, islandTopMaterial);
    islandTop.position.y = 0;
    islandTop.castShadow = true; // Enable shadow casting
    islandTop.receiveShadow = true; // Enable shadow receiving
    scene.add(islandTop);

    // Bottom part of the island (inverted cone shape)
    const islandBottomGeometry = new THREE.ConeGeometry(50, 30, 32);
    const islandBottomMaterial = new THREE.MeshStandardMaterial({ map: soilTexture });
    const islandBottom = new THREE.Mesh(islandBottomGeometry, islandBottomMaterial);
    islandBottom.rotation.x = Math.PI; // Invert the cone
    islandBottom.position.y = -15; // Adjust to make it look connected to the top part
    islandBottom.castShadow = true; // Enable shadow casting
    islandBottom.receiveShadow = true; // Enable shadow receiving
    scene.add(islandBottom);
}
