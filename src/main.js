import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let camera, scene, renderer, controls, sun;

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

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const brickTexture = textureLoader.load('/textures/wall_texture.jpg');
    const grassTexture = textureLoader.load('/textures/grass_texture.jpg');
    const soilTexture = textureLoader.load('/textures/soil_texture.jpg');

    // Floating Island
    createFloatingIsland(grassTexture, soilTexture);

    // Building
    createBuilding(brickTexture);

    // Sky with Sun
    createSky();

    // Event listeners
    window.addEventListener('resize', onWindowResize);

    animate();
}

function createFloatingIsland(grassTexture, soilTexture) {
    // Top part of the island (grass)
    const islandTopGeometry = new THREE.CylinderGeometry(50, 50, 5, 32);
    const islandTopMaterial = new THREE.MeshStandardMaterial({ map: grassTexture });
    const islandTop = new THREE.Mesh(islandTopGeometry, islandTopMaterial);
    islandTop.position.y = 0;
    scene.add(islandTop);

    // Bottom part of the island (inverted cone shape)
    const islandBottomGeometry = new THREE.ConeGeometry(50, 30, 32);
    const islandBottomMaterial = new THREE.MeshStandardMaterial({ map: soilTexture });
    const islandBottom = new THREE.Mesh(islandBottomGeometry, islandBottomMaterial);
    islandBottom.rotation.x = Math.PI; // Invert the cone
    islandBottom.position.y = -15; // Adjust to make it look connected to the top part
    scene.add(islandBottom);
}

function createBuilding(brickTexture) {
    const buildingGeometry = new THREE.BoxGeometry(20, 60, 20);
    const buildingMaterial = new THREE.MeshStandardMaterial({ map: brickTexture });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.y = 30; // Adjust to be on top of the island
    scene.add(building);

    // Adding windows
    const windowGeometry = new THREE.BoxGeometry(4, 4, 0.1);
    const windowMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x9fd2f6,
        metalness: 0.5,
        roughness: 0.1,
        transmission: 0.9,
        transparent: true,
        opacity: 0.7
    });

    for (let y = -20; y <= 20; y += 10) {
        for (let x = -6; x <= 6; x += 6) {
            for (let z = -8; z <= 8; z += 8) {
                if (x !== 0 || z !== 0) {
                    const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
                    windowMesh.position.set(x, y, z === 8 ? 10.1 : -10.1);
                    building.add(windowMesh);
                }
            }
        }
    }
}

function createSky() {
    const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
    const skyMaterial = new THREE.MeshBasicMaterial({
        color: 0x87CEEB,
        side: THREE.BackSide
    });
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(sky);

    // Sun
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
    sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(100, 100, -100);
    scene.add(sun);

    // Adding some clouds
    createCloud(-50, 20, -50);
    createCloud(20, 40, -80);
    createCloud(-30, 60, -70);
    createCloud(50, 30, -90);
    createCloud(10, 70, -50);
    createCloud(-60, 40, -80);
    createCloud(40, 60, -70);
}

function createCloud(x, y, z) {
    const cloudGeometry = new THREE.SphereGeometry(10, 32, 32);
    const cloudMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloud.position.set(x, y, z);
    scene.add(cloud);
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
