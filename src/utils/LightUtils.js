import * as THREE from 'three';

export function createAmbientLight() {
    return new THREE.AmbientLight(0xffffff, 0.6);
}

export function createDirectionalLight(position) {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(...position);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500;
    light.shadow.camera.left = -200;
    light.shadow.camera.right = 200;
    light.shadow.camera.top = 200;
    light.shadow.camera.bottom = -200;
    light.shadow.bias = -0.0001;
    light.shadow.darkness = 0.3;
    return light;
}
