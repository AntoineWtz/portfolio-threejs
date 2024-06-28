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
    renderer = new THREE.WebGLRenderer();
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

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(500, 500);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    scene.add(ground);

    // Building
    buildBuilding();

    // Event listeners
    window.addEventListener('resize', onWindowResize);

    animate();
}

function buildBuilding() {
    const buildingGeometry = new THREE.BoxGeometry(20, 60, 20);
    const buildingMaterial = new THREE.MeshStandardMaterial({ color: 0x8B0000 });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.y = 30; // Center the building on the y-axis
    scene.add(building);

    // Adding windows
    const windowGeometry = new THREE.BoxGeometry(4, 4, 0.1);
    const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x87CEEB });
    for (let y = 10; y <= 50; y += 10) {
        for (let x = -6; x <= 6; x += 6) {
            for (let z = -8; z <= 8; z += 8) {
                if (x !== 0 || z !== 0) {
                    const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
                    windowMesh.position.set(x, y, z === 8 ? 10.1 : -10.1);
                    scene.add(windowMesh);
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
