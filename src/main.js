
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

document.addEventListener('DOMContentLoaded', () => {
    init();
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
    createSky(scene);

    // Adding random clouds using createCloud function
    const numClouds = 50; // Number of random clouds to create

    const cloudRadius = 300; // Radius within which clouds will be generated, adjust as needed

    for (let i = 0; i < numClouds; i++) {
        const x = Math.random() * cloudRadius * 2 - cloudRadius; // Random x position within cloudRadius
        let y, z;

        // Random y position: higher likelihood of being above or below the island
        const randY = Math.random();
        if (randY < 0.3) {
            y = Math.random() * 50 + 90; // Top of the scene, above the island
        } else if (randY < 0.6) {
            y = Math.random() * 30 + 30; // Middle of the scene, around the island
        } else {
            y = Math.random() * 30 - 20; // Bottom of the scene, below the island
        }

        // Random z position within cloudRadius
        z = Math.random() * cloudRadius * 2 - cloudRadius;

        createCloud(scene, x, y, z);
    }


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
