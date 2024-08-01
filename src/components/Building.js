import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function createBuilding(scene) {

    const loader = new GLTFLoader();
    loader.load(new URL('../../public/models/building.glb', import.meta.url).toString(), (gltf) => {
        const building = gltf.scene;
        building.position.set(0, 3, 0);
        building.scale.set(30, 35, 30);
        building.rotation.y = Math.PI;

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
