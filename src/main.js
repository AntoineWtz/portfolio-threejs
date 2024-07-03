import { initializeScene } from './scene';

let isNight = false;
let { scene, camera, renderer, controls, sky, sun, sunLight, lensflare, textureMoon, clouds } = initializeScene();

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
    if (isNight) {
        // Change to night mode
        sun.material.color.set(0xffffff);
        sunLight.intensity = 0.5;
        sky.material.map.image.getContext('2d').clearRect(0, 0, 2, 2);
        const context = sky.material.map.image.getContext('2d');
        const gradient = context.createLinearGradient(0, 0, 0, 2);
        gradient.addColorStop(0, '#333333');
        gradient.addColorStop(1, '#220033');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 2, 2);
        sky.material.map.needsUpdate = true;

        // Remove lensflare
        sun.remove(lensflare);

        // Change cloud color to very dark gray
        clouds.forEach(cloud => {
            if (cloud) {
                cloud.traverse(child => {
                    if (child.isMesh) {
                        child.material.color.set(0x111111);
                    }
                });
            }
        });
    } else {
        // Change to day mode
        sun.material.color.set(0xffff00);
        sunLight.intensity = 1;
        sky.material.map.image.getContext('2d').clearRect(0, 0, 2, 2);
        const context = sky.material.map.image.getContext('2d');
        const gradient = context.createLinearGradient(0, 0, 0, 2);
        gradient.addColorStop(0, '#65AFFF');
        gradient.addColorStop(1, '#1E90FF');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 2, 2);
        sky.material.map.needsUpdate = true;

        // Remove lensflare
        sun.remove(lensflare);

        // Restore cloud color to white
        clouds.forEach(cloud => {
            if (cloud) {
                cloud.traverse(child => {
                    if (child.isMesh) {
                        child.material.color.set(0xffffff);
                    }
                });
            }
        });
    }
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
