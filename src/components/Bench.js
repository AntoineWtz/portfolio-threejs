// Bench.js

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function addBench(scene, x, y, z) {
    const loader = new GLTFLoader();

    loader.load(
        '/models/bench.glb', // Chemin vers votre modèle 3D de voiture
        function (gltf) {
            const bench = gltf.scene;
            bench.scale.set(4, 4, 4); // Ajuster l'échelle pour doubler la taille de la voiture
            bench.position.set(x, y, z); // Positionner la voiture

            // Rotation bench
            bench.rotation.y = Math.PI / 2.15 * 3; // En radians, Math.PI est la moitié d'un cercle complet (180 degrés) et Math.PI / 26 * 3 est 60 degrés

            // Ajouter la voiture à la scène
            scene.add(bench);

            // Activer la projection d'ombres pour la voiture
            bench.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        },
        undefined,
        function (error) {
            console.error('Erreur lors du chargement du modèle 3D du banc :', error);
        }
    );
}
