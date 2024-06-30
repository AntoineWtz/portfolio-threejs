// Importer la fonction addTree depuis Tree.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createBuilding } from './components/Building';
import { createCloud } from './components/Cloud';
import { createFloatingIsland } from './components/FloatingIsland';
import { createSky } from './components/Sky';
import { addTree } from './components/Tree'; // Importer la fonction addTree

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
    renderer.shadowMap.enabled = true; // Enable shadow maps
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping (inertia)
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false; // Disable panning
    controls.minDistance = 50; // Set minimum zoom distance
    controls.maxDistance = 200; // Set maximum zoom distance

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
    createSky(scene);

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

    // Adding the tree
    addTree(scene, 30, 40, 20); // Ajuster la position comme nécessaire

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
    controls.update(); // Required if controls.enableDamping or controls.autoRotate are set to true
    renderer.render(scene, camera);
}
