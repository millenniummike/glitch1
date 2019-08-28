function createGui(){
            
            // GUI

            //-- only for outside vr editing
            if (thirdView) {
                guiPanel.position = new BABYLON.Vector3(0, 1.5, 2)
                guiPanel.scaling.x = 3
                guiPanel.scaling.y = 3
                guiPanel.scaling.z = 3
            }

            guiPanel.parent = rootGUI;
            guiPanel.position.y += 0.5;

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
            panel.addControl(picker)

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
  
            var keyboard = BABYLON.GUI.VirtualKeyboard.CreateDefaultLayout();
            keyboard.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            panel.addControl(keyboard);

          var addInput = function(name) {
                var input = new BABYLON.GUI.InputText();
                input.width = 0.1;
                input.maxWidth = 0.1;
                input.height = "40px";
                input.text = "0";
                input.color = "white";
                input.background = "green";
                input.name = name;
                panel.addControl(input);
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
                keyboard.connect(input);
            }
          
            addInput('rotationX')
            addInput('rotationY')
            addInput('rotationZ')
            addInput('scaleX')
            addInput('scaleY')
            addInput('scaleZ')
          
            // Create the 3D UI manager
  
            var anchor1 = new BABYLON.TransformNode("");
            var manager1 = new BABYLON.GUI.GUI3DManager(scene);

            var panel1 = new BABYLON.GUI.PlanePanel();
            anchor1.width="300px"
            anchor1.parent = rootGUI;
            manager1.addControl(panel1);
            panel1.margin = 0.01;
            panel1.columns = 2;
            panel1.linkToTransformNode(anchor1);
            panel1.position.y = 0.6;
            panel1.position.x = 0.2;
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
            panel2.linkToTransformNode(anchor2);
            panel2.position.y = 0.6;
            panel2.position.x = 0.35;
            panel2.scaling.x = 0.05
            panel2.scaling.y = 0.05;
            panel2.scaling.z = 0.05;

            var addButton = function(name,index,panel,fontsize=80) {
                var button = new BABYLON.GUI.Button3D("orientation");
                panel.addControl(button);
                var text = new BABYLON.GUI.TextBlock();
                text.text = name;
                text.color = "white";
                text.fontSize = fontsize;
                button.content = text
                button.onPointerClickObservable.add(function () {
                  store.dispatch({ type: 'ButtonClick','data':{buttonName:name}})
                  actionHandler(index)
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
              {name:"?"},
              {name:"?"},
              {name:"?"},
                          ]
            
            panel2.blockLayout = true;
            for (var index = 0; index < buttons2.length; index++) {
                addButton(buttons2[index].name,index,panel2,40);    
            }
            panel2.blockLayout = false;
  }