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
import { createGarage } from './components/Garage';
import { addRock } from './components/Rock';

let camera, scene, renderer, controls;
let sun, sky, sunLight, clouds = [];

export function initializeScene() {
    setupScene();
    setupCamera();
    setupRenderer();
    setupControls();
    setupLights();

    loadTextures();

    // Setup environment
    createFloatingIsland(scene, grassTexture, soilTexture);
    createBuilding(scene);
    const skyComponents = createSky(scene);
    sky = skyComponents.sky;
    sun = skyComponents.sun;
    sunLight = skyComponents.sunLight;

    createRandomClouds(scene);
    addElements();

    window.addEventListener('resize', onWindowResize);

    return { scene, camera, renderer, controls, sky, sun, sunLight, clouds };
}

function setupScene() {
    scene = new THREE.Scene();
}

function setupCamera() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 30, 100);
}

function setupRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('canvas-container').appendChild(renderer.domElement);
}

function setupControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 50;
    controls.maxDistance = 200;
}

function setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
}

let grassTexture, soilTexture;
function loadTextures() {
    const textureLoader = new THREE.TextureLoader();
    grassTexture = textureLoader.load('/textures/grass_texture.jpg');
    soilTexture = textureLoader.load('/textures/soil_texture.jpg');
}

function addElements() {
    addTree(scene, 40, 39, 25);
    addTree(scene, -44, 39, 12);
    addTree(scene, 34, 39, -23);
    addTree(scene, -40, 39, -30);

    addCar(scene, -21.5, 3.5, -1);
    createGarage(scene, -22, 3.5, 0);
    addBench(scene, 24, 6.5, -5);
    addStreetLight(scene, 22, 3, 6);
    addRock(scene, 7, 3.5, -45);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function createRandomClouds(scene) {
    const numClouds = 120;
    const cloudRadius = 400;
    const cloudHeightRange = 500;

    for (let i = 0; i < numClouds; i++) {
        let x, y, z;
        do {
            x = Math.random() * cloudRadius * 2 - cloudRadius;
            y = Math.random() * cloudHeightRange * 2 - cloudHeightRange;
            z = Math.random() * cloudRadius * 2 - cloudRadius;
        } while (Math.sqrt(x * x + y * y + z * z) < 100);

        const cloud = createCloud(scene, x, y, z);
        clouds.push(cloud);

        const extraClouds = Math.random() < 0.3 ? Math.floor(Math.random() * 3) + 1 : 0;
        for (let j = 0; j < extraClouds; j++) {
            const offsetX = (Math.random() - 0.5) * 60;
            const offsetY = (Math.random() - 0.5) * 60;
            const offsetZ = (Math.random() - 0.5) * 60;
            const extraCloud = createCloud(scene, x + offsetX, y + offsetY, z + offsetZ);
            clouds.push(extraCloud);
        }
    }
}
