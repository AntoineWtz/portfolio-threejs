import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function createGarage(scene, x, y, z) {
    const loader = new GLTFLoader();

    // Load the column model
    loader.load(
        '/models/column.glb',
        function (gltf) {
            const column = gltf.scene;

            column.scale.set(8, 8, 8); // Adjust scale as needed
            // First column position
            const firstColumn = column.clone();
            firstColumn.position.set(x - 8.5, y, z - 8.5);
            scene.add(firstColumn);

            // Second column position
            const secondColumn = column.clone();
            secondColumn.position.set(x - 8.5, y, z + 8.5);
            scene.add(secondColumn);

            // Add shadows to the columns
            [firstColumn, secondColumn].forEach(col => {
                col.traverse(function (child) {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
            });


            // Load the roof model after the columns are added
            loader.load(
                '/models/roof.glb',
                function (gltf) {
                    const roof = gltf.scene;

                    roof.scale.set(10, 10, 10);
                    roof.position.set(x, y + 19, z);
                    scene.add(roof);

                    // Add shadows to the roof
                    roof.traverse(function (child) {
                        if (child.isMesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });
                    // Load the gutter model and position it on the roof near the neighboring building
                    loader.load(
                        '/models/gutter.glb',
                        function (gltf) {
                            const gutter = gltf.scene;

                            // Adjust scale and position of the gutter
                            gutter.scale.set(10, 10, 10);
                            gutter.position.set(x + 8, y + 20, z - 7);
                            gutter.rotation.y = Math.PI / 2;

                            scene.add(gutter);

                            // Add shadows to the gutter
                            gutter.traverse(function (child) {
                                if (child.isMesh) {
                                    child.castShadow = true;
                                    child.receiveShadow = true;
                                }
                            });
                        },
                        undefined,
                        function (error) {
                            console.error('An error occurred while loading the gutter model:', error);
                        }
                    );
                },
                undefined,
                function (error) {
                    console.error('An error occurred while loading the roof model:', error);
                }
            );
        },
        undefined,
        function (error) {
            console.error('An error occurred while loading the column model:', error);
        }
    );
}
