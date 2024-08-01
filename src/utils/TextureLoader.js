import * as THREE from 'three';

export function loadTextures() {
    const textureLoader = new THREE.TextureLoader();
    return {
        grass: textureLoader.load(new URL('../../public/textures/grass_texture.jpg', import.meta.url).toString()),
        soil: textureLoader.load(new URL('../../public/textures/soil_texture.jpg', import.meta.url).toString()),
    };
}
