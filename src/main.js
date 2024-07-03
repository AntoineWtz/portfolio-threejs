import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createCloud } from './components/Cloud';
import { createFloatingIsland } from './components/FloatingIsland';
import { createBuilding } from './components/Building';
import { createSky } from './components/Sky';
import { addTree } from './components/Tree';
import { addCar } from './components/Car';
import { addBench } from './components/Bench';
import { addStreetLight } from './components/StreetLight';

let camera, scene, renderer, controls;
let sun, sky, sunLight, lensflare, textureMoon, clouds = [];
let isNight = false; // Track current mode

document.addEventListener('DOMContentLoaded', () => {
    init();
    addToggleEventListener();
});

function init() {
    // Setup scene
    scene = new THREE.Scene();

    // Setup camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 30, 100);

    // Setup renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 50;
    controls.maxDistance = 200;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const grassTexture = textureLoader.load('/textures/grass_texture.jpg');
    const soilTexture = textureLoader.load('/textures/soil_texture.jpg');

    // Floating Island
    createFloatingIsland(scene, grassTexture, soilTexture);

    // Building
    createBuilding(scene);

    // Sky with Sun
    const skyComponents = createSky(scene);
    sky = skyComponents.sky;
    sun = skyComponents.sun;
    sunLight = skyComponents.sunLight;
    lensflare = skyComponents.lensflare;
    textureMoon = skyComponents.textureMoon;

    // Adding random clouds
    createRandomClouds(scene);

    // Adding trees
    addTree(scene, 40, 39, 25);
    addTree(scene, -44, 39, 12);
    addTree(scene, 34, 39, -23);

    // Add car
    addCar(scene, -24, 3.5, -5);

    // Add bench
    addBench(scene, 24, 6.5, -5);

    // Add street light
    addStreetLight(scene, 22, 3, 6);

    // Event listeners
    window.addEventListener('resize', onWindowResize);

    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function createRandomClouds(scene) {
    const numClouds = 50; 
    const cloudRadius = 300; 

    for (let i = 0; i < numClouds; i++) {
        const x = Math.random() * cloudRadius * 2 - cloudRadius; // Random x position within cloudRadius
        let y, z;

        // Random y position: higher likelihood of being above or below the island
        const randY = Math.random();
        if (randY < 0.3) {
            y = Math.random() * 100 + 100; // Top of the scene, far above the island
        } else if (randY < 0.6) {
            y = Math.random() * 60 + 30; // Middle of the scene, around the island
        } else {
            y = Math.random() * 100 - 50; // Bottom of the scene, far below the island
        }

        // Random z position within cloudRadius
        z = Math.random() * cloudRadius * 2 - cloudRadius;

        const cloud = createCloud(scene, x, y, z);
        clouds.push(cloud); // Store reference to each cloud
    }
}

function addToggleEventListener() {
    const toggleButton = document.getElementById('toggle-day-night');
    toggleButton.addEventListener('change', (event) => {
        isNight = event.target.checked;
        toggleDayNight();
    });
}

function toggleDayNight() {
    if (isNight) {
        // Change to night mode
        sun.material.color.set(0xffffff);
        sunLight.intensity = 0.5; // Reduce sun light intensity
        sky.material.map.image.getContext('2d').clearRect(0, 0, 2, 2);
        const context = sky.material.map.image.getContext('2d');
        const gradient = context.createLinearGradient(0, 0, 0, 2);
        gradient.addColorStop(0, '#232C33'); // Très foncé bleu
        gradient.addColorStop(1, '#220033'); // Très foncé violet
        context.fillStyle = gradient;
        context.fillRect(0, 0, 2, 2);
        sky.material.map.needsUpdate = true; // Update sky texture

        // Replace lensflare elements with moon texture
        sun.remove(lensflare);
        lensflare = new Lensflare();
        lensflare.addElement(new LensflareElement(textureMoon, 700, 0, sunMaterial.color));
        sun.add(lensflare);

        // Change cloud color to gray
        clouds.forEach(cloud => {
            cloud.traverse(child => {
                if (child.isMesh) {
                    child.material.color.set(0x888888);
                }
            });
        });
    } else {
        // Change to day mode
        sun.material.color.set(0xffff00);
        sunLight.intensity = 1; // Restore sun light intensity
        sky.material.map.image.getContext('2d').clearRect(0, 0, 2, 2);
        const context = sky.material.map.image.getContext('2d');
        const gradient = context.createLinearGradient(0, 0, 0, 2);
        gradient.addColorStop(0, '#65AFFF');
        gradient.addColorStop(1, '#1E90FF');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 2, 2);
        sky.material.map.needsUpdate = true; // Restore daytime sky

        // Replace lensflare elements with sun texture
        sun.remove(lensflare);
        lensflare = new Lensflare();
        const textureFlare0 = new THREE.TextureLoader().load('/textures/lensflare0.png');
        const textureFlare3 = new THREE.TextureLoader().load('/textures/lensflare3.png');
        lensflare.addElement(new LensflareElement(textureFlare0, 700, 0, sunMaterial.color));
        lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
        lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
        lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
        lensflare.addElement(new LensflareElement(textureFlare3, 70, 1));
        sun.add(lensflare);

        // Change cloud color to white
        clouds.forEach(cloud => {
            cloud.traverse(child => {
                if (child.isMesh) {
                    child.material.color.set(0x000000);
                }
            });
        });
    }
}
