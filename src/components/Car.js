import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function addCar(scene, x, y, z) {
    const loader = new GLTFLoader();

    loader.load(new URL('../../public/models/car.glb', import.meta.url).toString(), (gltf) => {
        const car = gltf.scene;
        car.scale.set(4, 4, 4);
        car.position.set(x, y, z);
        car.rotation.y = Math.PI / 12;
        scene.add(car);

        car.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, undefined, (error) => {
        console.error('An error happened while loading the car model:', error);
    });
}
