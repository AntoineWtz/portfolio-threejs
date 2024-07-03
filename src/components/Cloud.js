import * as THREE from 'three';

export function createCloud(scene, x, y, z) {
    const cloudGeometry = new THREE.SphereGeometry(5, 32, 32);
    const cloudMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff, // White color initially
        opacity: 0.5, // Opacity for slight transparency
        transparent: true,
        depthWrite: false // Disable depth write to prevent z-fighting
    });

    const cloudGroup = new THREE.Group();

    // Cloud sphere positions in 3D space
    const spherePositions = [
        { x: 0, y: 0, z: 0 },
        { x: 6, y: 0, z: 0 },
        { x: -6, y: 0, z: 0 },
        { x: 3, y: 3, z: 0 },
        { x: -3, y: 3, z: 0 },
        { x: 3, y: -3, z: 0 },
        { x: -3, y: -3, z: 0 },
        { x: 0, y: 3, z: 0 },
        { x: 0, y: -3, z: 0 },
        { x: 0, y: 0, z: 3 },
        { x: 0, y: 0, z: -3 },
        { x: 3, y: 0, z: 3 },
        { x: -3, y: 0, z: 3 },
        { x: 3, y: 0, z: -3 },
        { x: -3, y: 0, z: -3 },
        { x: 0, y: 3, z: 3 },
        { x: 0, y: -3, z: 3 },
        { x: 0, y: 3, z: -3 },
        { x: 0, y: -3, z: -3 },
    ];

    // Create cloud spheres and add them to the group
    spherePositions.forEach(pos => {
        const sphereMaterial = cloudMaterial.clone(); // Clone material for each sphere
        const sphere = new THREE.Mesh(cloudGeometry, sphereMaterial);
        sphere.position.set(pos.x, pos.y, pos.z);
        sphere.castShadow = true; // Enable shadows for the cloud spheres
        cloudGroup.add(sphere);
    });

    cloudGroup.position.set(x, y, z); // Position the cloud group
    scene.add(cloudGroup); // Add the cloud group to the scene

    // Adjust the shadows for the cloud group
    cloudGroup.traverse(child => {
        if (child.isMesh) {
            child.receiveShadow = true; // Enable shadows for the cloud spheres
            child.material.shadowSide = THREE.FrontSide; // Adjust the shadow side
            child.material.shadowDarkness = 0.3; // Adjust the shadow darkness
        }
    });

    return cloudGroup; // Return the cloud group for potential further manipulation
}
