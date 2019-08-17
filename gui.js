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
            panel.addControl(picker)

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

          /*
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
          */
          
          // Create the 3D UI manager
            var anchor = new BABYLON.TransformNode("");
            var manager = new BABYLON.GUI.GUI3DManager(scene);

            var panel2 = new BABYLON.GUI.PlanePanel();
            anchor.width="300px"
            anchor.parent = rootGUI;
            manager.addControl(panel2);
            panel2.margin = 0.01;
          
            panel2.columns = 3;

            panel2.linkToTransformNode(anchor);
            panel2.position.y = 0.2;
            panel2.scaling.x = 0.1;
            panel2.scaling.y = 0.1;
            panel2.scaling.z = 0.1;

            var addButton = function(text,index) {
                var button = new BABYLON.GUI.HolographicButton("orientation");
                panel2.addControl(button);
                button.text = text
                button.onPointerClickObservable.add(function () {
                  buttonAction(index)
                })
            }

            var buttons = [
              {name:"Duplicate"},
              {name:"Cube"},
              {name:"Sphere"},
              {name:"Plane"},
              {name:"Rectangle"},
              {name:"Delete"},
                          ]
            
            panel2.blockLayout = true;
            for (var index = 0; index < buttons.length; index++) {
                addButton(buttons[index].name,index);    
            }
            panel2.blockLayout = false;
  }