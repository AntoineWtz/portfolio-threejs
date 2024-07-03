import * as THREE from 'three';

export function createCloud(scene, x, y, z) {
    const cloudGeometry = new THREE.SphereGeometry(5, 32, 32);
    const cloudMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff, 
        opacity: 0.5, 
        transparent: true,
        depthWrite: false 
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
        const sphereMaterial = cloudMaterial.clone(); 
        const sphere = new THREE.Mesh(cloudGeometry, sphereMaterial);
        sphere.position.set(pos.x, pos.y, pos.z);
        sphere.castShadow = true; 
        cloudGroup.add(sphere);
    });

    cloudGroup.position.set(x, y, z);
    scene.add(cloudGroup); 

    // Adjust the shadows for the cloud group
    cloudGroup.traverse(child => {
        if (child.isMesh) {
            child.receiveShadow = true; 
            child.material.shadowSide = THREE.FrontSide; 
            child.material.shadowDarkness = 0.3; 
        }
    });

    return cloudGroup; 
}
