import * as THREE from 'three';

export function loadTextures() {
    const textureLoader = new THREE.TextureLoader();
    return {
        grass: textureLoader.load('/textures/grass_texture.jpg'),
        soil: textureLoader.load('/textures/soil_texture.jpg'),
        lensflare0: textureLoader.load('/textures/lensflare0.png'),
        lensflare3: textureLoader.load('/textures/lensflare3.png'),
        moon: textureLoader.load('/textures/moon.jpg')
    };
}
