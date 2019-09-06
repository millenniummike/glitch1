function setupDetailPanel2(){
  //detail panel2
  
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
              store.dispatch(selectColor(value))
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

                input.onTextChangedObservable.add(function (value){
                  store.dispatch({ type: 'TEXT_UPDATE',textInputName:name, textValue:value.text})
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
}