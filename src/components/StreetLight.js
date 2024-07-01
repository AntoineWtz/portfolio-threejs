// import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function addStreetLight(scene, x, y, z) {
    const loader = new GLTFLoader();

    loader.load(
        '/models/street_light.glb',
        function (gltf) {
            const streetLight = gltf.scene;
            streetLight.scale.set(3, 3, 3);
            streetLight.position.set(x, y, z);

            streetLight.rotation.y = Math.PI / 2.4 * 6;

            scene.add(streetLight);

            streetLight.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        },
        undefined,
        function (error) {
            console.error('Erreur lors du chargement du modèle 3D du lampadaire :', error);
        }
    );
}
