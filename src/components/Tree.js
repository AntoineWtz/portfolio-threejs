
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function addTree(scene, x, y, z) {
    const loader = new GLTFLoader();

    loader.load(new URL('../../public/models/tree.glb', import.meta.url).toString(), (gltf) => {
        const tree = gltf.scene;
        tree.scale.set(16, 16, 16);
        tree.position.set(x, y - 8, z);
        scene.add(tree);

        tree.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, undefined, (error) => {
        console.error('An error occurred while loading the tree model:', error);
    });
}