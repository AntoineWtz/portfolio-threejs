// import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function addTree(scene, x, y, z) {
    const loader = new GLTFLoader();

    loader.load(
        '/models/tree.glb', 
        function (gltf) {
            const tree = gltf.scene;

            tree.scale.set(12, 12, 12);

            // Adjust the position of the tree
            tree.position.set(x, y - 15, z); 

            // Add the tree to the scene
            scene.add(tree);

            // Add shadows to the tree
            tree.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        },
        undefined,
        function (error) {
            console.error('Erreur lors du chargement du modèle 3D :', error);
        }
    );
}
