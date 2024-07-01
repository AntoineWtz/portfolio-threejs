// main.js

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createBuilding } from './components/Building';
import { createCloud } from './components/Cloud';
import { createFloatingIsland } from './components/FloatingIsland';
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
    const brickTexture = textureLoader.load('/textures/wall_texture.jpg');
    const grassTexture = textureLoader.load('/textures/grass_texture.jpg');
    const soilTexture = textureLoader.load('/textures/soil_texture.jpg');

    // Floating Island
    createFloatingIsland(scene, grassTexture, soilTexture);

    // Building
    createBuilding(scene, brickTexture);

    // Sky with Sun
    createSky(scene); // Appeler createSky sans passer la caméra

    // Adding some clouds
    createCloud(scene, -50, 20, -50);
    createCloud(scene, 20, 40, -80);
    createCloud(scene, -30, 60, -70);
    createCloud(scene, 50, 30, -90);
    createCloud(scene, 10, 70, -50);
    createCloud(scene, -60, 40, -80);
    createCloud(scene, 20, 100, -80);
    createCloud(scene, -40, 95, -80);
    createCloud(scene, 40, 60, -70);
    createCloud(scene, -70, 30, -90);
    createCloud(scene, 60, 75, -55);

    // Adding trees
    addTree(scene, 30, 35, 20);
    addTree(scene, -34, 35, 12);
    addTree(scene, 24, 35, -23);
    // Add car
    addCar(scene, -24, 2.5, -5);
    // Add bench
    addBench(scene, 24, 5, -5);
    // Add street light
    addStreetLight(scene, 22, 2, 6);

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
