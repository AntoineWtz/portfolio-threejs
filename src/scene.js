// scene.js

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

export function initializeScene() {
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

    // Return important scene components
    return {
        scene, camera, renderer, controls, sky, sun, sunLight, lensflare, textureMoon, clouds
    };
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function createRandomClouds(scene) {
    const numClouds = 50;
    const cloudRadius = 300;

    for (let i = 0; i < numClouds; i++) {
        const x = Math.random() * cloudRadius * 2 - cloudRadius;
        let y, z;

        // Random y position: higher likelihood of being above or below the island
        const randY = Math.random();
        if (randY < 0.3) {
            y = Math.random() * 100 + 100;
        } else if (randY < 0.6) {
            y = Math.random() * 60 + 30;
        } else {
            y = Math.random() * 100 - 50;
        }

        // Random z position within cloudRadius
        z = Math.random() * cloudRadius * 2 - cloudRadius;

        const cloud = createCloud(scene, x, y, z);
        clouds.push(cloud);
    }
}
