import { initializeScene } from './scene';

let isNight = false;
const { scene, camera, renderer, controls, sky, sun, sunLight, clouds } = initializeScene();

document.addEventListener('DOMContentLoaded', () => {
    addToggleEventListener();
    animate();
});

function addToggleEventListener() {
    const toggleButton = document.getElementById('toggle-day-night');
    toggleButton.addEventListener('change', (event) => {
        isNight = event.target.checked;
        toggleDayNight();
    });
}

function toggleDayNight() {
    const skyContext = sky.material.map.image.getContext('2d');
    skyContext.clearRect(0, 0, 2, 2);
    const gradient = skyContext.createLinearGradient(0, 0, 0, 2);

    if (isNight) {
        sun.material.color.set(0xffffff);
        sunLight.intensity = 0.3;
        gradient.addColorStop(0, '#220033');
        gradient.addColorStop(1, '#333333');
        updateCloudColor(0x6E8387);
    } else {
        sun.material.color.set(0xffff00);
        sunLight.intensity = 1;
        gradient.addColorStop(0, '#1E90FF');
        gradient.addColorStop(1, '#FFFFFF');
        updateCloudColor(0xffffff);
    }

    skyContext.fillStyle = gradient;
    skyContext.fillRect(0, 0, 2, 2);
    sky.material.map.needsUpdate = true;
}

function updateCloudColor(color) {
    clouds.forEach(cloud => {
        if (cloud) {
            cloud.children.forEach(sphere => {
                sphere.material.color.set(color);
            });
        }
    });
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
