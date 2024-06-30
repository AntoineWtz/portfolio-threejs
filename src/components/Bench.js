// import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function addBench(scene, x, y, z) {
    const loader = new GLTFLoader();

    loader.load(
        '/models/bench.glb',
        function (gltf) {
            const bench = gltf.scene;
            bench.scale.set(4, 4, 4);
            bench.position.set(x, y, z);

            bench.rotation.y = Math.PI / 2.15 * 3;

            scene.add(bench);

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
