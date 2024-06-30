import * as THREE from 'three';

export function createBuilding(scene, brickTexture) {
    const buildingGeometry = new THREE.BoxGeometry(20, 60, 20);
    const buildingMaterial = new THREE.MeshStandardMaterial({ map: brickTexture });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.y = 30; // Adjust to be on top of the island
    building.castShadow = true; // Enable shadow casting
    building.receiveShadow = true; // Enable shadow receiving
    scene.add(building);

    // Adding windows
    const windowGeometry = new THREE.BoxGeometry(4, 4, 0.1);
    const windowMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x9fd2f6,
        metalness: 0.5,
        roughness: 0.1,
        transmission: 0.9,
        transparent: true,
        opacity: 0.7
    });

    for (let y = -20; y <= 20; y += 10) {
        for (let x = -6; x <= 6; x += 6) {
            for (let z = -8; z <= 8; z += 8) {
                if (x !== 0 || z !== 0) {
                    const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
                    windowMesh.position.set(x, y, z === 8 ? 10.1 : -10.1);
                    windowMesh.castShadow = true; // Enable shadow casting
                    windowMesh.receiveShadow = true; // Enable shadow receiving
                    building.add(windowMesh);
                }
            }
        }
    }
}
