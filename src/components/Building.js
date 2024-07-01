import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function createBuilding(scene) {
    // Load GLTF model
    const loader = new GLTFLoader();
    loader.load('/models/building.glb', (gltf) => {
        const building = gltf.scene;
        building.position.set(0, 3, 0); // Adjust the position to be on top of the island
        building.scale.set(30, 35, 30); // Adjust the scale if necessary
        building.rotation.y = Math.PI; // Rotate 180 degrees (π radians)

        // Traverse the model to set castShadow and receiveShadow
        building.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        scene.add(building);
    }, undefined, (error) => {
        console.error('An error happened while loading the building model:', error);
    });
}
