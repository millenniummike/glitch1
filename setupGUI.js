function setupGUI(){
            
            // GUI

            guiPanel.parent = rootGUI;
            guiPanel.position.y += 0.4;

            guiPanel2.parent = rootGUI;
            guiPanel2.position.y += 0.4;


            // panel rows
            panel.addRowDefinition(0.05)
            panel.addRowDefinition(0.2)
            panel.addRowDefinition(0.05)
            panel.addRowDefinition(0.05)

            advancedTexture.addControl(panel)
            advancedTexture2.addControl(detailPanel1)
            panel.background = "red";
            detailPanel1.background = "red";
  
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
  
            //detail panels
    
            setupDetailPanel1()   
            setupDetailPanel2()  
  
            //menus
  
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
                })
            }
            
            var anchor1 = new BABYLON.TransformNode("");
            var panel1 = new BABYLON.GUI.PlanePanel();
            anchor1.parent = rootGUI;
            manager1.addControl(panel1);
            panel1.margin = 0.01;
            panel1.columns = 2;
            panel1.linkToTransformNode(anchor1);
            panel1.position.x = -0.30
            panel1.scaling.x = 0.075
            panel1.scaling.y = 0.075
            panel1.scaling.z = 0.075

            var panel2 = new BABYLON.GUI.PlanePanel();
            manager2.addControl(panel2);
            panel2.margin = 0.01;
            panel2.columns = 3;
            panel2.linkToTransformNode(anchor1)
            panel2.position.y = 0.4
            panel2.scaling.x = 0.075
            panel2.scaling.y = 0.075
            panel2.scaling.z = 0.075

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