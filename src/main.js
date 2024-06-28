import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let camera, scene, renderer, controls;

document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    // Setup scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Sky blue for day

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

    // Floating Island
    createFloatingIsland();

    // Building
    createBuilding();

    // Event listeners
    window.addEventListener('resize', onWindowResize);

    animate();
}

function createFloatingIsland() {
    // Top part of the island (grass)
    const islandTopGeometry = new THREE.CylinderGeometry(50, 50, 5, 32);
    const islandTopMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const islandTop = new THREE.Mesh(islandTopGeometry, islandTopMaterial);
    islandTop.position.y = 0;
    scene.add(islandTop);

    // Bottom part of the island (inverted cone shape)
    const islandBottomGeometry = new THREE.ConeGeometry(50, 30, 32);
    const islandBottomMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const islandBottom = new THREE.Mesh(islandBottomGeometry, islandBottomMaterial);
    islandBottom.rotation.x = Math.PI; // Invert the cone
    islandBottom.position.y = -15; // Adjust to make it look connected to the top part
    scene.add(islandBottom);
}

function createBuilding() {
    const buildingGeometry = new THREE.BoxGeometry(20, 60, 20);
    const buildingMaterial = new THREE.MeshStandardMaterial({ color: 0x8B0000 });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.y = 30; // Adjust to be on top of the island
    scene.add(building);

    // Adding windows
    const windowGeometry = new THREE.BoxGeometry(4, 4, 0.1);
    const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x87CEEB });
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
