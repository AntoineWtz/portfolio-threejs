import * as THREE from 'three';

export function loadTextures() {
    const textureLoader = new THREE.TextureLoader();
    return {
        grass: textureLoader.load('/textures/grass_texture.jpg'),
        soil: textureLoader.load('/textures/soil_texture.jpg'),
    };
}
