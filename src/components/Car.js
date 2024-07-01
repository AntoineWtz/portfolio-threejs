// import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function addCar(scene, x, y, z) {
    const loader = new GLTFLoader();

    loader.load(
        '/models/car.glb', // Link to the 3D model of the car
        function (gltf) {
            const car = gltf.scene;
            car.scale.set(4, 4, 4); // Adjust the size of the car
            car.position.set(x, y, z); // Adjust the position of the car

            car.rotation.y = Math.PI / 12; // Rotate the car

            // Add the car to the scene
            scene.add(car);

            // Activate shadows for the car
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
