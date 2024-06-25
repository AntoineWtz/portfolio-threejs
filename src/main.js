import * as THREE from 'three';

// Setup the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Sky blue for day

// Setup the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;
camera.position.y = 10;

// Setup the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add a point light
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Function to create a building
function createBuilding(floors) {
    const building = new THREE.Group();

    // Create each floor
    for (let i = 0; i < floors; i++) {
        const floorGeometry = new THREE.BoxGeometry(10, 3, 10);
        const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = i * 3;
        building.add(floor);

        // Add windows to each floor
        const windowGeometry = new THREE.BoxGeometry(1, 1, 0.1);
        const windowMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

        for (let j = -3; j <= 3; j += 2) {
            const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
            window1.position.set(j, i * 3, 5.05);
            building.add(window1);

            const window2 = new THREE.Mesh(windowGeometry, windowMaterial);
            window2.position.set(j, i * 3, -5.05);
            building.add(window2);

            const window3 = new THREE.Mesh(windowGeometry, windowMaterial);
            window3.position.set(5.05, i * 3, j);
            window3.rotation.y = Math.PI / 2;
            building.add(window3);

            const window4 = new THREE.Mesh(windowGeometry, windowMaterial);
            window4.position.set(-5.05, i * 3, j);
            window4.rotation.y = Math.PI / 2;
            building.add(window4);
        }
    }

    return building;
}

// Create the building with 10 floors
const building = createBuilding(10);
scene.add(building);

// Add a ground plane
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Add the sun and the moon
const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(15, 15, -10);
scene.add(sun);

const moonGeometry = new THREE.SphereGeometry(1, 32, 32);
const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(-15, -15, 10);
moon.visible = false;
scene.add(moon);

// Toggle Day/Night mode
document.getElementById('toggle-mode').addEventListener('click', () => {
    const isNight = scene.background.getHex() === 0x000000;
    scene.background.set(isNight ? 0x87CEEB : 0x000000); // Sky blue or black
    ambientLight.intensity = isNight ? 0.5 : 0.2;
    pointLight.intensity = isNight ? 1 : 0.5;
    console.log(isNight ? 'Switched to day mode' : 'Switched to night mode');
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Responsive design
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Inverse scroll to navigate floors
window.addEventListener('wheel', (event) => {
    camera.position.y += event.deltaY * 0.01;
});
