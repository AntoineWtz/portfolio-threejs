import * as THREE from 'three';

export function createCloud(scene, x, y, z) {
    const cloudGeometry = new THREE.SphereGeometry(5, 32, 32);
    const cloudMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff, 
        emissive: 0xffffff, 
        emissiveIntensity: 0.5, 
        opacity: 0.6,
        transparent: true,
        depthWrite: false, 
        side: THREE.DoubleSide, // Two faces of the sphere will be visible
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
        const sphere = new THREE.Mesh(cloudGeometry, cloudMaterial);
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
}
