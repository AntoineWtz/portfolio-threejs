import * as THREE from 'three';

export function createSky(scene) {
    const skyGeometry = new THREE.SphereGeometry(500, 32, 32);

    const skyCanvas = document.createElement('canvas');
    skyCanvas.width = 2;
    skyCanvas.height = 2;
    const context = skyCanvas.getContext('2d');
    const gradient = context.createLinearGradient(0, 0, 0, skyCanvas.height);
    gradient.addColorStop(0, '#65AFFF');
    gradient.addColorStop(1, '#1E90FF');
    context.fillStyle = gradient;
    context.fillRect(0, 0, skyCanvas.width, skyCanvas.height);
    const skyTexture = new THREE.Texture(skyCanvas);
    skyTexture.needsUpdate = true;

    const skyMaterial = new THREE.MeshBasicMaterial({
        map: skyTexture,
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

    return { sky, sun, sunLight };
}
