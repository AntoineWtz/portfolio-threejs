import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function addRock(scene, x, y, z) {
    const loader = new GLTFLoader();

    loader.load(new URL('../../public/models/rock.glb', import.meta.url).toString(), (gltf) => {
        const rock = gltf.scene;
        rock.position.set(x, y, z);
        rock.scale.set(35, 35, 35);
        rock.rotation.y = Math.random() * Math.PI;

        rock.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        scene.add(rock);
    }, undefined, (error) => {
        console.error('An error occurred while loading the rock model:', error);
    });
}