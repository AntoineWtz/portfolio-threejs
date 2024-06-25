import * as THREE from 'three';

let camera, scene, renderer;
let currentFloor = 0;

function init() {
    // Setup scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Sky blue for day

    // Setup camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 30);

    // Setup renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Build the building
    buildBuilding();

    // Event listeners
    window.addEventListener('resize', onWindowResize);
    document.getElementById('doorbell').addEventListener('click', onDoorbellClicked);

    animate();
}

function buildBuilding() {
    // Ground floor
    const groundFloor = createFloor(0x9c661f, 'Accueil');
    groundFloor.position.set(0, 0, 0);
    scene.add(groundFloor);

    // Projects floor
    const projectsFloor = createFloor(0x7f7f7f, 'Projets');
    projectsFloor.position.set(0, 10, 0);
    scene.add(projectsFloor);

    // Experiences floor
    const experiencesFloor = createFloor(0x4c4c4c, 'Expériences');
    experiencesFloor.position.set(0, 20, 0);
    scene.add(experiencesFloor);

    // Contact floor
    const contactFloor = createFloor(0x2b2b2b, 'Contact');
    contactFloor.position.set(0, 30, 0);
    scene.add(contactFloor);
}

function createFloor(color, label) {
    const geometry = new THREE.BoxGeometry(20, 1, 20);
    const material = new THREE.MeshStandardMaterial({ color: color });
    const floor = new THREE.Mesh(geometry, material);
    floor.userData.label = label;
    return floor;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDoorbellClicked() {
    // Zoom to ground floor
    currentFloor = 0;
    zoomToFloor(currentFloor);
}

function zoomToFloor(floorIndex) {
    const targetY = floorIndex * 10;
    const targetPosition = new THREE.Vector3(0, targetY + 5, 30);
    animateCamera(targetPosition);
}

function animateCamera(targetPosition) {
    new TWEEN.Tween(camera.position)
        .to(targetPosition, 1000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();
}

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    renderer.render(scene, camera);
}

init();
