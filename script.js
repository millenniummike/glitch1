var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

/******* Add the create scene function ******/
var editableMeshes = [];
var snap = true;
var snapSize = 0.2;
const thirdView = false;

//** todo redux
var vrControllerState = {};
vrControllerState.lastLeftPosition = new BABYLON.Vector3(0, 0, 0)
vrControllerState.lastRighPosition = new BABYLON.Vector3(0, 0, 0)
vrControllerState.onSecondaryLeftButtonPressed
vrControllerState.onSecondaryRightButtonPressed = false
vrControllerState.onSecondaryLeftButtonPressed = false
vrControllerState.scaling = false

var lastSelectedMesh;
var selectedMesh;
scene = new BABYLON.Scene(engine);

      
        var createScene = function () {

            var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 6, 0), scene);
            createGround();
            createeditableMeshes();

            
            // GUI
            var rootGUI = new BABYLON.TransformNode("guiRoot");
            var guiPanel = BABYLON.Mesh.CreatePlane("guiPanel", 1);

            //-- only for outside vr editing
            if (thirdView) {
                guiPanel.position = new BABYLON.Vector3(0, 1.5, 2)
                guiPanel.scaling.x = 3
                guiPanel.scaling.y = 3
                guiPanel.scaling.z = 3
            }

            guiPanel.parent = rootGUI;
            guiPanel.position.y += 0.4;

            var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(guiPanel);
            var panel = new BABYLON.GUI.StackPanel();
            advancedTexture.addControl(panel);

            var header = new BABYLON.GUI.TextBlock();
            header.text = "Control Panel";
            header.height = "50px";
            header.color = "white";
            header.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            header.fontSize = "50"
            panel.addControl(header);

            var picker = new BABYLON.GUI.ColorPicker();
            picker.value = 0;
            picker.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            picker.height = "200px";
            picker.width = "200px";
            picker.onValueChangedObservable.add(function (value) {
                if (lastSelectedMesh != null) {
                    lastSelectedMesh.material.diffuseColor.copyFrom(value);
                }
            });
            panel.addControl(picker);

            function createSlider() {
                var slider = new BABYLON.GUI.Slider();
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

            function createButton(title) {
                var button = BABYLON.GUI.Button.CreateSimpleButton("but", title);
                button.width = "60px"
                button.height = "60px";
                button.color = "white";
                button.background = "black";
                button.fontSize = "10px"
                return button
            }

            var slider = createSlider();
            slider.onValueChangedObservable.add(function (value) {
                if (lastSelectedMesh != null) {
                    lastSelectedMesh.scaling.x = value
                }
            });
            panel.addControl(slider);

            var slider2 = createSlider();
            slider2.onValueChangedObservable.add(function (value) {
                if (lastSelectedMesh != null) {
                    lastSelectedMesh.scaling.y = value
                }
            });
            panel.addControl(slider2);

            var slider3 = createSlider();
            slider3.onValueChangedObservable.add(function (value) {
                if (lastSelectedMesh != null) {
                    lastSelectedMesh.scaling.z = value
                }
            });
            panel.addControl(slider3);

            var hPanel1 = new BABYLON.GUI.StackPanel("hPanel1");
            hPanel1.isVertical = false;
            hPanel1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
            hPanel1.height = "90px";
            hPanel1.width = "200px"

            var button = createButton('Cube');
            button.onPointerClickObservable.add(function () {
                createObject(1)
            })
            hPanel1.addControl(button);

            var button2 = createButton("Sphere");
            button2.onPointerClickObservable.add(function () {
                createObject(2)
            })
            hPanel1.addControl(button2)

            var button3 = createButton("Plane");
            button3.onPointerClickObservable.add(function () {
                createObject(3)
            })
            hPanel1.addControl(button3);

            var hPanel2 = new BABYLON.GUI.StackPanel("hPanel1");
            hPanel2.isVertical = false;
            hPanel2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
            hPanel2.height = "100px";
            hPanel2.width = "200px"

            var button4 = createButton("Rectangle");
            button4.onPointerClickObservable.add(function () {
                createObject(4)
            })
            hPanel2.addControl(button4);

            var button5 = createButton("Duplicate");
            button5.onPointerClickObservable.add(function () {
                createObject(0)
            })
            hPanel2.addControl(button5);

            var button6 = createButton("Delete");
            button6.onPointerClickObservable.add(function () {
                deleteObject()
            })

            hPanel2.addControl(button6);

            var hPanel3 = new BABYLON.GUI.StackPanel("hPanel1");
            hPanel3.isVertical = false;
            hPanel3.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
            hPanel3.height = "100px";
            hPanel3.width = "200px"

            var button7 = createButton("7");
            button7.onPointerClickObservable.add(function () {
                createObject(7)
            })
            hPanel3.addControl(button7);

            var button8 = createButton("Button");
            button8.onPointerClickObservable.add(function () {
                createObject(8)
            })
            hPanel3.addControl(button8);

            var button9 = createButton("Button");
            button9.onPointerClickObservable.add(function () {
                deleteObject()
            })
            hPanel3.addControl(button9);

            panel.addControl(hPanel1);
            panel.addControl(hPanel2);
            panel.addControl(hPanel3);

            var label = new BABYLON.GUI.TextBlock();
            label.text = "Use snapping";
            label.width = "140px";
            label.height = "20px";
            label.marginLeft = "5px";
            label.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            label.color = "white";
            panel.addControl(label);

            var checkbox = new BABYLON.GUI.Checkbox();
            checkbox.width = "20px";
            checkbox.height = "20px";
            checkbox.isChecked = true;
            checkbox.color = "green";
            checkbox.onIsCheckedChangedObservable.add(function (value) {
                snap = value;
            });
            panel.addControl(checkbox);
      
            var debugText = new BABYLON.GUI.TextBlock();
            debugText.text = "Debug box";
            debugText.width = "140px";
            debugText.height = "20px";
            debugText.marginLeft = "5px";
            debugText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            debugText.color = "white";
            panel.addControl(debugText);

            var input = new BABYLON.GUI.InputText();
            input.width = 0.2;
            input.maxWidth = 0.2;
            input.height = "40px";
            input.text = "Click here to start typing!";
            input.color = "white";
            input.background = "green";
            panel.addControl(input);

            var keyboard = BABYLON.GUI.VirtualKeyboard.CreateDefaultLayout();
            keyboard.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            panel.addControl(keyboard);

            keyboard.connect(input);
          
          
          // Create the 3D UI manager
            var anchor = new BABYLON.TransformNode("");
            var manager = new BABYLON.GUI.GUI3DManager(scene);

            var panel2 = new BABYLON.GUI.PlanePanel();
            manager.addControl(panel2);
            panel2.margin = 0.01;

            panel2.linkToTransformNode(anchor);
            panel2.position.z = -1.5;

            // Let's add some buttons!
            var addButton = function(text) {
                var button = new BABYLON.GUI.HolographicButton("orientation");
                button.width = "30px";
                panel2.addControl(button);
                button.text = text
            }

            panel2.blockLayout = true;
            for (var index = 0; index < 18; index++) {
                addButton(""+index);    
            }
            panel2.blockLayout = false;

            function deleteObject(type) {
                if (lastSelectedMesh) {
                    scene.removeMesh(lastSelectedMesh);
                    lastSelectedMesh = null;
                }
            }

            function createObject(type) {
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

                if (type == 7) {
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
            }
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
                debugText.text = vrControllerState.scaling.toString(); 
            })

            return scene;
        };

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
        /******* End of the create scene function ******/

        var scene = createScene(); //Call the createScene function

        // Register a render loop to repeatedly render the scene
        engine.runRenderLoop(function () {
            scene.render();
        });

        // Watch for browser/canvas resize events
        window.addEventListener("resize", function () {
            engine.resize();
        });