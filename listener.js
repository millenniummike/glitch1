// binds redux to ui
function render() {
  let nextState = store.getState()

console.log("CURRENT")
console.log(currentState)
console.log("NEXT")
console.log(nextState)
  
  var controller = store.getState().controller
  var control = store.getState().control
  var inputText = store.getState().inputText
  var selectedMesh = store.getState().selectedMesh
  var buttonName = ""
  var color = ""
  
  if (selectedMesh != "") {
    console.log("selected mesh "+selectedMesh.name)
    lastSelectedMesh = selectedMesh
  }
  
 for (var key in currentState) {
  if (currentState[key] !== nextState[key]) {
    if (key == "buttonName") {buttonName = nextState[key]}
  }
}
  
  function clearGui(){   
        manager2.utilityLayer.shouldRender = false
        guiPanel.isVisible = false
        guiPanel2.isVisible = false
  }

  if (buttonName){
    switch (buttonName) {   
      case "M6":
        clearGui()
        guiPanel.isVisible = true
        break
      case "M7":
        clearGui()
        manager2.utilityLayer.shouldRender = true
        break
      case "M8":
        clearGui()
        guiPanel2.isVisible = true
        break
      case "Cube":
        var obj = new BABYLON.Mesh.CreateBox("cube", 0.2, scene)
        obj.position = new BABYLON.Vector3(1,1,1)
        //obj.position = VRHelper.webVRCamera.leftController.devicePosition.clone()
        obj.material = new BABYLON.StandardMaterial("cubeMat", scene)
        editableMeshes.push(obj)
      break      
      case "Sphere":
        var obj = BABYLON.MeshBuilder.CreateSphere("sphere", { diameterX: 0.25, diameterY: 0.25, diameterZ: 0.25 }, scene);
        obj.position = new BABYLON.Vector3(0,1,1)
        //obj.position = VRHelper.webVRCamera.leftController.devicePosition.clone()
        obj.material = new BABYLON.StandardMaterial("cubeMat", scene)
        editableMeshes.push(obj)                 
      break
    }
  }
  
  if (currentState.color) {
    console.log(currentState.color.r)
    if (currentState.colorR!=nextState.colorR || currentState.colorG!=nextState.colorG || currentState.colorB !=nextState.colorB){
    color = nextState.color
    console.log("color updated")
      if (lastSelectedMesh) {
       console.log("updated mesh "+lastSelectedMesh.name)
       lastSelectedMesh.material.diffuseColor = nextState.color.clone()
      }
    }
  }
  
                    /*
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
    */
  
  
  /*
                // TODO move to redux
                if (selectedMesh) {
                    var origRotation = { ...selectedMesh.rotation }
                    selectedMesh.rotation = webVRController.mesh.rotation;
                    selectedMesh.translate(BABYLON.Vector3.Forward(), 0.5, BABYLON.Space.LOCAL);
                    selectedMesh.rotation = origRotation
                }
                */
  
  
                // TODO move to redux
              /*
                if (selectedMesh) {
                    var origRotation = { ...selectedMesh.rotation }
                    selectedMesh.rotation = webVRController.mesh.rotation;
                    selectedMesh.translate(BABYLON.Vector3.Backward(), 0.5, BABYLON.Space.LOCAL);
                    selectedMesh.rotation = origRotation
                }
                */
  
  
    if (nextState !== currentState) {
      currentState = nextState;
  }
}
render()
store.subscribe(render)

// Button Logic
// move to redux
/*
function actionHandler(type) {
                if (type == 0) {
                    if (lastSelectedMesh) {
                        var obj = lastSelectedMesh.clone('cloned');
                        editableMeshes.push(obj);
                    }
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
                    var obj = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 0, 0), scene).intensity=0.2
                    obj.position = VRHelper.webVRCamera.leftController.devicePosition.clone()
                }
            }
*/