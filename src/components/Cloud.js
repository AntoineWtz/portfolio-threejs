import * as THREE from 'three';

export function createCloud(scene, x, y, z) {
    const cloudGeometry = new THREE.SphereGeometry(5, 32, 32);
    const cloudMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff, // Couleur de base blanche
        emissive: 0xffffff, // Luminosité supplémentaire pour simuler l'exposition au soleil
        emissiveIntensity: 0.2, // Intensité de l'émissivité
        opacity: 0.6, // Transparence
        transparent: true,
        depthWrite: false, // Ne pas écrire la profondeur pour un look plus éthéré
        side: THREE.DoubleSide, // Rendre les deux côtés de la géométrie visibles
    });

    const cloudGroup = new THREE.Group();

    // Positions des sphères pour former un nuage
    const spherePositions = [
        { x: 0, y: 0, z: 0 },
        { x: 6, y: 0, z: 0 },
        { x: -6, y: 0, z: 0 },
        { x: 3, y: 3, z: 0 },
        { x: -3, y: 3, z: 0 },
        { x: 3, y: -3, z: 0 },
        { x: -3, y: -3, z: 0 },
        { x: 0, y: 3, z: 0 },
        { x: 0, y: -3, z: 0 },
        { x: 0, y: 0, z: 3 },
        { x: 0, y: 0, z: -3 },
        { x: 3, y: 0, z: 3 },
        { x: -3, y: 0, z: 3 },
        { x: 3, y: 0, z: -3 },
        { x: -3, y: 0, z: -3 },
        { x: 0, y: 3, z: 3 },
        { x: 0, y: -3, z: 3 },
        { x: 0, y: 3, z: -3 },
        { x: 0, y: -3, z: -3 },
    ];

    // Création des sphères de nuage avec le matériau défini
    spherePositions.forEach(pos => {
        const sphere = new THREE.Mesh(cloudGeometry, cloudMaterial);
        sphere.position.set(pos.x, pos.y, pos.z);
        sphere.castShadow = true; // Activer la projection d'ombres
        cloudGroup.add(sphere);
    });

    cloudGroup.position.set(x, y, z); // Position du groupe de nuages
    scene.add(cloudGroup); // Ajout du groupe à la scène

    // Ajustement des propriétés de rendu pour les nuages
    cloudGroup.traverse(child => {
        if (child.isMesh) {
            child.receiveShadow = true; // Assurer que les nuages reçoivent les ombres
            child.material.shadowSide = THREE.FrontSide; // Préciser le côté des ombres
            child.material.shadowDarkness = 0.3; // Ajuster l'obscurité des ombres
        }
    });
}
