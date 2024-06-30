import * as THREE from 'three';

export function createCloud(scene, x, y, z) {
    const cloudGeometry = new THREE.SphereGeometry(5, 32, 32);
    const cloudMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        opacity: 0.65, // Increase transparency
        transparent: true,
        depthWrite: false, // Disable depth writing for a more ethereal look
        side: THREE.DoubleSide, // Ensure both sides of the geometry render
    });

    const cloudGroup = new THREE.Group();

    // Add multiple spheres to form a cloud
    const spherePositions = [
        { x: 0, y: 0, z: 0 },
        { x: 6, y: 0, z: 0 },
        { x: -6, y: 0, z: 0 },
        { x: 3, y: 3, z: 0 },
        { x: -3, y: 3, z: 0 },
        { x: 3, y: -3, z: 0 },
        { x: -3, y: -3, z: 0 }
    ];

    spherePositions.forEach(pos => {
        const sphere = new THREE.Mesh(cloudGeometry, cloudMaterial);
        sphere.position.set(pos.x, pos.y, pos.z);
        sphere.castShadow = true; // Enable shadow casting
        cloudGroup.add(sphere);
    });

    cloudGroup.position.set(x, y, z);
    scene.add(cloudGroup);
}
