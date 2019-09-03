function setupGUI(){
            
            // GUI

            //-- only for outside vr editing
            if (thirdView) {
                rootGUI.position = new BABYLON.Vector3(0, 0.5, 2)
                rootGUI.scaling.x = 2
                rootGUI.scaling.y = 2
                rootGUI.scaling.z = 2
            }

            guiPanel.parent = rootGUI;
            guiPanel.position.y += 0.5;

            var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(guiPanel);
            var panel = new BABYLON.GUI.Grid()
            .addRowDefinition(0.025)
            .addRowDefinition(0.15)
            .addRowDefinition(0.03)
            .addRowDefinition(0.03)
            .addRowDefinition(0.03)
            .addRowDefinition(0.03)
            
            advancedTexture.addControl(panel)
            .width = "220px"
            .height = "500px"
  
            var rect = new BABYLON.GUI.Rectangle()
            rect.background = "black";
            rect.thickness = 0;
            panel.addControl(rect, 0, 0);
  
            rect = new BABYLON.GUI.Rectangle();
            rect.background = "#333";
            rect.thickness = 0;
            panel.addControl(rect, 1, 0);
  
            rect = new BABYLON.GUI.Rectangle();
            rect.background = "red";
            rect.thickness = 0;
            panel.addControl(rect, 2, 0);
  
            rect = new BABYLON.GUI.Rectangle();
            rect.background = "blue";
            rect.thickness = 0;
            panel.addControl(rect, 3, 0);
  
            rect = new BABYLON.GUI.Rectangle();
            rect.background = "grey";
            rect.thickness = 0;
            panel.addControl(rect, 5, 0)

            var newGrid3 = new BABYLON.GUI.Grid();      
            newGrid3.addColumnDefinition(0.8);
            newGrid3.addColumnDefinition(0.2);
            rect.addControl(newGrid3, 5, 0); 
    
            var rect1 = new BABYLON.GUI.Rectangle();
            rect1.background = "grey";
            rect1.thickness = 0;
            rect1.width = "1200px"
            newGrid3.addControl(rect1, 0, 0); 

            var rect2 = new BABYLON.GUI.Rectangle();
            rect2.width = "1200px"
            rect2.background = "grey";
            rect2.thickness = 0;
            newGrid3.addControl(rect2, 0, 1); 
            panel.addControl(newGrid3, 4, 0)

            var header = new BABYLON.GUI.TextBlock()
            header.text = "Detail Panel";
            header.height = "50px";
            header.color = "white";
            header.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            header.fontSize = "30"
            panel.addControl(header, 0, 0);

            picker.value = 0;
            picker.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            picker.height = "200px";
            picker.width = "200px";
            picker.onValueChangedObservable.add(function (value) {
                if (lastSelectedMesh != null) {
                    lastSelectedMesh.material.diffuseColor.copyFrom(value);
                }
            });
            panel.addControl(picker, 1, 0)

            var label = new BABYLON.GUI.TextBlock();
            label.text = "Use snapping";
            label.width = "140px";
            label.height = "20px";
            label.marginLeft = "5px";
            label.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            label.color = "white";
            newGrid3.addControl(label, 0, 0);

            var checkbox = new BABYLON.GUI.Checkbox();
            checkbox.width = "20px";
            checkbox.height = "20px";
            checkbox.isChecked = true;
            checkbox.color = "white";
            checkbox.onIsCheckedChangedObservable.add(function (value) {
                snap = value;
            });
            newGrid3.addControl(checkbox, 0, 1);

            debugText.text = "Debug box";
            debugText.width = "180px";
            debugText.height = "20px";
            debugText.marginLeft = "5px";
            debugText.fontSize = "10px";
            debugText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            debugText.color = "white";
            panel.addControl(debugText, 6, 0);

            var addInput = function(name, panel) {
                var input = new BABYLON.GUI.InputText();
                input.width = 0.05;
                input.maxWidth = 0.1;
                input.height = "40px";
                input.text = "0";
                input.color = "white";
                input.background = "black";
                input.name = name;
                panel.addControl(input, 2, 0);
              
              input.onFocusObservable.add(function (value) {
                store.dispatch(selectInputText(input))
              })
 
                input.onTextChangedObservable.add(function (value) {
                    console.log(value)
                    if (lastSelectedMesh != null) {
                      switch (name) {
                        case 'rotationX':
                          lastSelectedMesh.rotation.x = value.text
                        break;
                          case 'rotationY':
                          lastSelectedMesh.rotation.y = value.text
                        break;
                          case 'rotationZ':
                          lastSelectedMesh.rotation.z = value.text
                        break;
                          case 'scaleX':
                          lastSelectedMesh.scaling.x = value.text
                        break;
                          case 'scaleY':
                          lastSelectedMesh.scaling.y = value.text
                        break;
                          case 'scaleZ':
                          lastSelectedMesh.scaling.z = value.text
                        break;
                      } 
                  }
                })

              
              		var keyboard = BABYLON.GUI.VirtualKeyboard.CreateDefaultLayout();
                  keyboard.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
                  advancedTexture.addControl(keyboard);

                      keyboard.connect(input);

                      keyboard.onKeyPressObservable.add(function(value){
                         header.text = value
                      })
              inputTexts.push(input)
            }
                   
            var newGrid = new BABYLON.GUI.Grid();      
            newGrid.addColumnDefinition(0.5);
            newGrid.addColumnDefinition(0.5);
            newGrid.addColumnDefinition(0.5);
            panel.addControl(newGrid, 2, 0); 
            
            var rect1 = new BABYLON.GUI.Rectangle();
            rect1.background = "grey";
            rect1.thickness = 0;
            rect1.width = "1200px"
            newGrid.addControl(rect1, 0, 0); 

            var rect2 = new BABYLON.GUI.Rectangle();
            rect2.width = "1200px"
            rect2.background = "grey";
            rect2.thickness = 0;
            newGrid.addControl(rect2, 0, 1); 

            var rect3 = new BABYLON.GUI.Rectangle();
            rect3.width = "1200px"
            rect3.background = "grey";
            rect3.thickness = 0;
            newGrid.addControl(rect3, 0, 2); 

            var newGrid2 = new BABYLON.GUI.Grid();      
            newGrid2.addColumnDefinition(0.5);
            newGrid2.addColumnDefinition(0.5);
            newGrid2.addColumnDefinition(0.5);
            panel.addControl(newGrid2, 3, 0); 

            var rect4 = new BABYLON.GUI.Rectangle();
            rect4.width = "1200px"
            rect4.background = "grey";
            rect4.thickness = 0;
            newGrid2.addControl(rect4, 0, 0); 

            var rect5 = new BABYLON.GUI.Rectangle();
            rect5.width = "1200px"
            rect5.background = "grey";
            rect5.thickness = 0;
            newGrid2.addControl(rect5, 0, 1); 

            var rect6 = new BABYLON.GUI.Rectangle();
            rect6.width = "1200px"
            rect6.background = "grey";
            rect6.thickness = 0;
            newGrid2.addControl(rect6, 0, 2);
          
            addInput('rotationX', rect1)
            addInput('rotationY', rect2)
            addInput('rotationZ', rect3)
  
            addInput('scaleX', rect4)
            addInput('scaleY', rect5)
            addInput('scaleZ', rect6)
          
            // Create the 3D UI manager
  
            var anchor1 = new BABYLON.TransformNode("");
            var manager1 = new BABYLON.GUI.GUI3DManager(scene);

            var panel1 = new BABYLON.GUI.PlanePanel();
            anchor1.width="300px"
            anchor1.parent = rootGUI;
            manager1.addControl(panel1);
            panel1.background = "red";
            panel1.margin = 0.01;
            panel1.columns = 2;
            panel1.linkToTransformNode(anchor1);
            panel1.position.y = 0.64;
            panel1.position.x = -0.21
            panel1.scaling.x = 0.05
            panel1.scaling.y = 0.05;
            panel1.scaling.z = 0.05;
  
            var anchor2 = new BABYLON.TransformNode("");
            var manager2 = new BABYLON.GUI.GUI3DManager(scene);

            var panel2 = new BABYLON.GUI.PlanePanel();
            anchor2.width="300px"
            anchor2.parent = rootGUI;
            manager2.addControl(panel2);
            panel2.margin = 0.01;
            panel2.columns = 3;
            panel2.linkToTransformNode(anchor2)
            panel2.position.y = 0.665
            panel2.position.x = -0.35
            panel2.scaling.x = 0.05
            panel2.scaling.y = 0.05;
            panel2.scaling.z = 0.05;

            var addButton = function(name, index, panel, fontsize=80) {
              var button = new BABYLON.GUI.HolographicButton("down");
              //button.imageUrl = "https://cdn.glitch.com/3287682c-27f7-4c63-9d93-2b0d4b635304%2Ficon.png?v=1567351855390";
              panel.addControl(button);
              button.backMaterial.albedoColor = BABYLON.Color3.FromInts(30,30,30)
              
                var text = new BABYLON.GUI.TextBlock();
                text.text = name;
                text.color = "white";
                text.fontSize = fontsize
                button.content = text
                button.name = name
                button.onPointerClickObservable.add(function () {
                  store.dispatch({ type: 'MENU_BUTTON',buttonName:name})
                  //actionHandler(index)
                })
            }
            
            var buttons1 = [
              {name:"M1"},
              {name:"M2"},
              {name:"M3"},
              {name:"M4"},
              {name:"M5"},
              {name:"M6"},
              {name:"M7"},
              {name:"M8"}
                          ]
            
            panel1.blockLayout = true;
            for (var index = 0; index < buttons1.length; index++) {
                addButton(buttons1[index].name,1000+index,panel1);    
            }
            panel1.blockLayout = false;

            var buttons2 = [
              {name:"Duplicate"},
              {name:"Cube"},
              {name:"Sphere"},
              {name:"Plane"},
              {name:"Rectangle"},
              {name:"Delete"},
              {name:"Floor"},
              {name:"Light"},
              {name:"?"},
                          ]
            
            panel2.blockLayout = true;
            for (var index = 0; index < buttons2.length; index++) {
                addButton(buttons2[index].name,index,panel2,40);    
            }
            panel2.blockLayout = false;
  }

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
  
                if (type == 7) {
                    var obj = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 0, 0), scene).intensity=0.2;
                    obj.position = VRHelper.webVRCamera.leftController.devicePosition.clone();
                    //obj.tag = 'selectable';
                    //editableMeshes.push(obj);
                }
  
                if (type > 1000) {
                    console.log("MENU")
                }
            }
