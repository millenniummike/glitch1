//Global variables

var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
var editableMeshes = [];
var snap = true;
var snapSize = 0.2;
const thirdView = false
var lastSelectedMesh;
var selectedMesh;

// Objects
var slider = new BABYLON.GUI.Slider();
var scene = new BABYLON.Scene(engine);
var rootGUI = new BABYLON.TransformNode("guiRoot");
var guiPanel = BABYLON.Mesh.CreatePlane("guiPanel", 1);

var createScene = function () {

            var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 6, 0), scene);
            createGround();
            createeditableMeshes();
            createGui();
  
            // Runs every frame
            scene.onBeforeRenderObservable.add(() => {
                if (VRHelper.webVRCamera.leftController) { // sync gui to controller
                    rootGUI.rotationQuaternion = VRHelper.webVRCamera.leftController.deviceRotationQuaternion.clone()
                    rootGUI.position = VRHelper.webVRCamera.leftController.devicePosition.clone()
                    rootGUI.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.LOCAL);
                }

                if (!vrControllerState.scaling && vrControllerState.onSecondaryLeftButtonPressed && vrControllerState.onSecondaryRightButtonPressed )
                {
                    vrControllerState.scaling = true
                    vrControllerState.lastLeftPosition = VRHelper.webVRCamera.leftController.devicePosition.clone()
                    vrControllerState.lastRightPosition = VRHelper.webVRCamera.leftController.devicePosition.clone()
                }
                if (!vrControllerState.onSecondaryLeftButtonPressed && !vrControllerState.onSecondaryRightButtonPressed ){
                    vrControllerState.scaling = false
                }
                if (vrControllerState.scaling) {
                   var delta = vrControllerState.lastLeftPosition.x-VRHelper.webVRCamera.leftController.devicePosition.x
                  // ** TODO scale here
                }  
                //debugText.text = vrControllerState.scaling.toString(); 
            })
        };

// Button Logic
function actionHandler(type) {
                if (type == 0) {
                    if (lastSelectedMesh) {
                        var obj = lastSelectedMesh.clone('cloned');
                        editableMeshes.push(obj);
                    }
                }
                if (type == 1) {
                    var obj = new BABYLON.Mesh.CreateBox("cube", 0.2, scene);
                    obj.position = VRHelper.webVRCamera.leftController.devicePosition.clone();
                    obj.material = new BABYLON.StandardMaterial("cubeMat", scene);
                    editableMeshes.push(obj);
                }
                if (type == 2) {
                    var obj = BABYLON.MeshBuilder.CreateSphere("sphere", { diameterX: 0.25, diameterY: 0.25, diameterZ: 0.25 }, scene);
                    obj.position = VRHelper.webVRCamera.leftController.devicePosition.clone();
                    obj.material = new BABYLON.StandardMaterial("cubeMat", scene);
                    editableMeshes.push(obj);
                }

                if (type == 3) {
                    var obj = BABYLON.MeshBuilder.CreatePlane("plane", { height: 1, width: 1 }, scene);
                    obj.position = VRHelper.webVRCamera.leftController.devicePosition.clone();
                    obj.material = new BABYLON.StandardMaterial("cubeMat", scene);
                    editableMeshes.push(obj);
                }

                if (type == 4) {
                    var frontWallData = [
                        new BABYLON.Vector3(-5.5, 0, -3),
                        new BABYLON.Vector3(5.5, 0, -3),
                        new BABYLON.Vector3(5.5, 0, 3),
                        new BABYLON.Vector3(-5.5, 0, 3)
                    ];
                    var obj = BABYLON.MeshBuilder.ExtrudePolygon("wall", { shape: frontWallData, depth: 0.15 }, scene);
                    obj.position = VRHelper.webVRCamera.leftController.devicePosition.clone();
                    obj.material = new BABYLON.StandardMaterial("cubeMat", scene);
                    obj.tag = 'selectable';
                    editableMeshes.push(obj);
                }
              
               if (type == 5) {
                  if (lastSelectedMesh) {
                    scene.removeMesh(lastSelectedMesh);
                    lastSelectedMesh = null;
                }
               }

                if (type == 6) {
                    var frontWallData = [
                        new BABYLON.Vector3(-5.5, 0, -3),
                        new BABYLON.Vector3(5.5, 0, -3),
                        new BABYLON.Vector3(5.5, 0, 3),
                        new BABYLON.Vector3(-5.5, 0, 3)
                    ];
                    var obj = BABYLON.MeshBuilder.ExtrudePolygon("wall", { shape: frontWallData, depth: 0.15 }, scene);
                    obj.position = VRHelper.webVRCamera.leftController.devicePosition.clone();
                    obj.material = new BABYLON.StandardMaterial("cubeMat", scene);
                    obj.tag = 'selectable';
                    editableMeshes.push(obj);
                }
  
                if (type > 1000) {
                    console.log("MENU")
                }
            }

function createSlider() {

                slider.minimum = 0.01;
                slider.maximum = 5;
                slider.value = 1;
                slider.height = "40px";
                slider.width = "350px";
                slider.color = "#003399";
                slider.background = "black";
                slider.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                slider.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                return slider;
            }

var createGround = function () {
            var ground = BABYLON.Mesh.CreateGround("ground1", 12, 36, 2, scene);
            var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
            groundMaterial.diffuseTexture = new BABYLON.Texture("textures/ground.jpg", scene);
            groundMaterial.diffuseTexture.uScale = 6;
            groundMaterial.diffuseTexture.vScale = 6;
            groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            ground.material = groundMaterial;
        };

var createeditableMeshes = function () {
            for (var i = 0; i < 4; i++) {
                editableMeshes.push(new BABYLON.Mesh.CreateBox("cube" + i, 2, scene));
                editableMeshes[i].position.y = 1;
                editableMeshes[i].material = new BABYLON.StandardMaterial("cubeMat", scene);
                editableMeshes[i].tag = 'selectable';
            }
            editableMeshes[0].position.z = 8;
            editableMeshes[0].position.y = 3;
            editableMeshes[1].position.x = 8;
            editableMeshes[2].position.x = -8;
            editableMeshes[3].position.z = -8;

            lastSelectedMesh = editableMeshes[0]
        };

function nearest(number, n) {
            return Math.round(number / n) * n;
        }

// LAUNCH
createScene();
engine.runRenderLoop(function () {
            scene.render();
        });

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});