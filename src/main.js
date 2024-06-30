import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare';

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
    islandTop.castShadow = true; // Enable shadow casting
    islandTop.receiveShadow = true; // Enable shadow receiving
    scene.add(islandTop);

    // Bottom part of the island (inverted cone shape)
    const islandBottomGeometry = new THREE.ConeGeometry(50, 30, 32);
    const islandBottomMaterial = new THREE.MeshStandardMaterial({ map: soilTexture });
    const islandBottom = new THREE.Mesh(islandBottomGeometry, islandBottomMaterial);
    islandBottom.rotation.x = Math.PI; // Invert the cone
    islandBottom.position.y = -15; // Adjust to make it look connected to the top part
    islandBottom.castShadow = true; // Enable shadow casting
    islandBottom.receiveShadow = true; // Enable shadow receiving
    scene.add(islandBottom);
}

function createBuilding(brickTexture) {
    const buildingGeometry = new THREE.BoxGeometry(20, 60, 20);
    const buildingMaterial = new THREE.MeshStandardMaterial({ map: brickTexture });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.y = 30; // Adjust to be on top of the island
    building.castShadow = true; // Enable shadow casting
    building.receiveShadow = true; // Enable shadow receiving
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
                    windowMesh.castShadow = true; // Enable shadow casting
                    windowMesh.receiveShadow = true; // Enable shadow receiving
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
    const sunGeometry = new THREE.SphereGeometry(12, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
    sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(120, 150, -200); // Position on the right and further back
    scene.add(sun);

    // Lensflare textures
    const textureFlare0 = new THREE.TextureLoader().load('/textures/lensflare0.png');
    const textureFlare3 = new THREE.TextureLoader().load('/textures/lensflare3.png');

    const lensflare = new Lensflare();
    lensflare.addElement(new LensflareElement(textureFlare0, 700, 0, sunMaterial.color));
    lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
    lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 1));

    sun.add(lensflare);

    // Directional light from the sun
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(120, 150, -200);
    sunLight.castShadow = true; // Enable shadow casting
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

    // Adding some clouds
    createCloud(-50, 20, -50);
    createCloud(20, 40, -80);
    createCloud(-30, 60, -70);
    createCloud(50, 30, -90);
    createCloud(10, 70, -50);
    createCloud(-60, 40, -80);
    createCloud(20, 100, -80);
    createCloud(-40, 95, -80);
    createCloud(40, 60, -70);
    createCloud(-70, 30, -90);
    createCloud(60, 75, -55);
}

function createCloud(x, y, z) {
    const cloudGeometry = new THREE.SphereGeometry(5, 32, 32);
    const cloudMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        opacity: 0.9,
        transparent: true
    });

    const cloudGroup = new THREE.Group();

    // Add multiple spheres to form a cloud
    const spherePositions = [
        { x: 0, y: 0, z: 0 },
        { x: 6, y: 0, z: 0 },
        { x: -6, y: 0, z: 0 },
        { x: 3, y: 3, z: 0 },
        { x: -3, y: 3, z: 0 },
        { x: 3, y: -3, z: 0 },
        { x: -3, y: -3, z: 0 }
    ];

    spherePositions.forEach(pos => {
        const sphere = new THREE.Mesh(cloudGeometry, cloudMaterial);
        sphere.position.set(pos.x, pos.y, pos.z);
        cloudGroup.add(sphere);
    });

    cloudGroup.position.set(x, y, z);
    scene.add(cloudGroup);
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
