var createScene = function () {
            var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 6, 0), scene).intensity = 0.3;
            //createGround();
            createMovableMeshes();
            setupGUI();
            setupVR();
            //loadMesh();
        };

function createGround() {
            var ground = BABYLON.Mesh.CreateGround("ground1", 12, 36, 2, scene);
            var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
            groundMaterial.diffuseTexture = new BABYLON.Texture("https://cdn.glitch.com/3287682c-27f7-4c63-9d93-2b0d4b635304%2Fground.jpg?v=1567336362443", scene);
            groundMaterial.diffuseTexture.uScale = 6;
            groundMaterial.diffuseTexture.vScale = 6;
            groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            ground.material = groundMaterial;
        };

function createMovableMeshes() {
            for (var i = 0; i < 4; i++) {
                editableMeshes.push(new BABYLON.Mesh.CreateBox("cube" + i, 2, scene));
                editableMeshes[i].position.y = 1;
                editableMeshes[i].material = new BABYLON.StandardMaterial("cubeMat", scene);
            }
            editableMeshes[0].position.z = 8;
            editableMeshes[0].position.y = 3;
            editableMeshes[1].position.x = 8;
            editableMeshes[2].position.x = -8;
            editableMeshes[3].position.z = -8;
        };

function nearest(number, n) {
            return Math.round(number / n) * n;
        }

// LAUNCH
createScene();
VRHelper.currentVRCamera.position.z=-1.5
VRHelper.currentVRCamera.position.y=0

store.dispatch({ type: 'MENU_BUTTON',buttonName:"M6"})
//scene.debugLayer.show();

engine.runRenderLoop(function () {
            scene.render();
        });

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});