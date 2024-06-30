// Car.js

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function addCar(scene, x, y, z) {
    const loader = new GLTFLoader();

    loader.load(
        '/models/car.glb', // Chemin vers votre modèle 3D de voiture
        function (gltf) {
            const car = gltf.scene;
            car.scale.set(4, 4, 4); // Ajuster l'échelle pour doubler la taille de la voiture
            car.position.set(x, y, z); // Positionner la voiture

            // Rotation de la voiture d'environ 15 degrés vers sa droite
            car.rotation.y = Math.PI / 12; // En radians, Math.PI est la moitié d'un cercle complet (180 degrés)

            // Ajouter la voiture à la scène
            scene.add(car);

            // Activer la projection d'ombres pour la voiture
            car.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        },
        undefined,
        function (error) {
            console.error('Erreur lors du chargement du modèle 3D de la voiture :', error);
        }
    );
}
