import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function addTree(scene, x, y, z) {
    const loader = new GLTFLoader();

    loader.load(
        '/models/tree.glb', // Chemin vers votre modèle 3D d'arbre
        function (gltf) {
            const tree = gltf.scene;

            // Ajuster l'échelle pour augmenter la taille de l'arbre
            tree.scale.set(15, 15, 15); // Par exemple, multiplier par 3

            // Positionner l'arbre à côté de l'immeuble
            tree.position.set(x, y - 15, z); // Ajuster la position pour qu'il touche le sol de l'île

            // Ajouter l'arbre à la scène
            scene.add(tree);

            // Activer la projection d'ombres pour l'arbre
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
