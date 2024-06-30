import * as THREE from 'three';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare';

export function createSky(scene) {
    const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
    const skyMaterial = new THREE.MeshBasicMaterial({
        color: 0x87CEEB,
        side: THREE.BackSide
    });
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(sky);

    // Sun
    const sunGeometry = new THREE.SphereGeometry(12, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(120, 150, -200); 
    scene.add(sun);

    // Lensflare textures
    const textureFlare0 = new THREE.TextureLoader().load('/textures/lensflare0.png');
    const textureFlare3 = new THREE.TextureLoader().load('/textures/lensflare3.png');

    const lensflare = new Lensflare();
    lensflare.addElement(new LensflareElement(textureFlare0, 700, 0, sunMaterial.color));
    lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
    lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 1));

    sun.add(lensflare);

    // Directional light from the sun
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(120, 150, -200);
    sunLight.castShadow = true; 
    scene.add(sunLight);

    // Configure shadow properties for the directional light
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 500;
    sunLight.shadow.camera.left = -200;
    sunLight.shadow.camera.right = 200;
    sunLight.shadow.camera.top = 200;
    sunLight.shadow.camera.bottom = -200;

    // Adjust shadow darkness
    sunLight.shadow.bias = -0.0001; 
    sunLight.shadow.darkness = 0.3; 
}
