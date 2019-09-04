function setupGUI(){
            
            // GUI

            guiPanel.parent = rootGUI;
            guiPanel.position.y += 0.5;
            guiPanel.height = "400px"
  
            guiPanel2.parent = rootGUI;
            guiPanel2.position.y += 0.8;
            guiPanel2.height = "400px"
  
            advancedTexture.addControl(panel)
            advancedTexture2.addControl(detailPanel1)
            
            // panel rows
            panel.addRowDefinition(0.05)
            panel.addRowDefinition(0.2)
            panel.addRowDefinition(0.05)
            panel.addRowDefinition(0.05)
            panel.addRowDefinition(0.05)
            panel.addRowDefinition(0.2)
            panel.addRowDefinition(0.4)
  
            //header
            var rect = new BABYLON.GUI.Rectangle()
            rect.background = "black";
            rect.thickness = 0;
            rect.width = "400px"
            panel.addControl(rect, 0, 0);
            var header = new BABYLON.GUI.TextBlock()
            header.text = "Detail Panel";
            header.color = "white";
            header.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            header.fontSize = "20"
            panel.addControl(header, 0, 0);
  
            //buttons and detail panel
            rect = new BABYLON.GUI.Rectangle();
            rect.background = "#333";
            rect.thickness = 0;
            rect.width = "400px"
            panel.addControl(rect, 1, 0);

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
  
            // scaling input
            rect = new BABYLON.GUI.Rectangle();
            rect.background = "red";
            rect.width = "400px"
            rect.thickness = 0;
            panel.addControl(rect, 2, 0);
  
            // rotation input
            rect = new BABYLON.GUI.Rectangle();
            rect.background = "blue";
            rect.width = "400px"
            rect.thickness = 0;
            panel.addControl(rect, 3, 0);
  
  var addInput = function(name, panel) {
                var input = new BABYLON.GUI.InputText();
                input.height = "40px";
                input.width = "80px"
                input.text = "0";
                input.color = "white";
                input.background = "black";
                input.name = name;
                input.disableMobilePrompt = true
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
              return input
            }
                   
            var newGrid = new BABYLON.GUI.Grid();  
            newGrid.width="400px"
            newGrid.addColumnDefinition(0.5);
            newGrid.addColumnDefinition(0.5);
            newGrid.addColumnDefinition(0.5);
            panel.addControl(newGrid, 2, 0);

            var rect1 = new BABYLON.GUI.Rectangle()
            rect1.thickness = 0;
            newGrid.addControl(rect1, 0, 0); 

            var rect2 = new BABYLON.GUI.Rectangle()
            rect2.thickness = 0;
            newGrid.addControl(rect2, 0, 1); 

            var rect3 = new BABYLON.GUI.Rectangle();
            rect3.thickness = 0;
            newGrid.addControl(rect3, 0, 2);

            var newGrid2 = new BABYLON.GUI.Grid();
            newGrid2.width="400px"
            newGrid2.addColumnDefinition(0.5);
            newGrid2.addColumnDefinition(0.5);
            newGrid2.addColumnDefinition(0.5);
            panel.addControl(newGrid2, 3, 0); 

            var rect4 = new BABYLON.GUI.Rectangle()
            rect4.thickness = 0
            newGrid2.addControl(rect4, 0, 0)

            var rect5 = new BABYLON.GUI.Rectangle()
            rect5.thickness = 0
            newGrid2.addControl(rect5, 0, 1)

            var rect6 = new BABYLON.GUI.Rectangle()
            rect6.thickness = 0;
            newGrid2.addControl(rect6, 0, 2)
          
            inputRotationX = addInput('rotationX', rect1)
            inputRotationY = addInput('rotationY', rect2)
            inputRotationZ = addInput('rotationZ', rect3)
  
            inputScaleX = addInput('scaleX', rect4)
            inputScaleY = addInput('scaleY', rect5)
            inputScaleZ = addInput('scaleZ', rect6)
  
  
            // detailPanel1 rows

            detailPanel1.addRowDefinition(0.05)
            detailPanel1.addRowDefinition(0.2)
            detailPanel1.height="400px"
            // checkbox panel
            rect = new BABYLON.GUI.Rectangle();
            rect.background = "blue";
            rect.width = "400px"
            rect.thickness = 0;
            detailPanel1.addControl(rect, 0, 0)
            var newGrid3 = new BABYLON.GUI.Grid();
            newGrid3.width = "400px"
            detailPanel1.addControl(newGrid3, 0, 0);
            newGrid3.addColumnDefinition(0.8);
            newGrid3.addColumnDefinition(0.2)
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
  
            // debug box
            rect = new BABYLON.GUI.Rectangle();
            rect.background = "grey";
            rect.width = "400px"
            rect.thickness = 0;
            detailPanel1.addControl(rect, 1, 0)
            debugText.text = "Debug box";
            debugText.width = "180px";
            debugText.height = "20px";
            debugText.marginLeft = "5px";
            debugText.fontSize = "10px";
            debugText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            debugText.color = "white";
            detailPanel1.addControl(debugText, 5, 0);       
  
            //menus
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
            panel1.position.y = 0.75
            panel1.position.x = -0.30
            panel1.scaling.x = 0.05
            panel1.scaling.y = 0.05
            panel1.scaling.z = 0.05
  
            var anchor2 = new BABYLON.TransformNode("");
            var manager2 = new BABYLON.GUI.GUI3DManager(scene);

            var panel2 = new BABYLON.GUI.PlanePanel();
            manager2.addControl(panel2);
            panel2.margin = 0.01;
            panel2.columns = 3;
            panel2.linkToTransformNode(anchor2)
            panel2.position.y = 0.75
            panel2.position.x = -0.45
            panel2.scaling.x = 0.05
            panel2.scaling.y = 0.05
            panel2.scaling.z = 0.05

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