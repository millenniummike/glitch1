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
    inputScaleX.text=''+selectedMesh.scaling.x
    inputScaleY.text=''+selectedMesh.scaling.y
    inputScaleZ.text=''+selectedMesh.scaling.z
    inputRotationX.text=''+selectedMesh.rotation.x
    inputRotationY.text=''+selectedMesh.rotation.y
    inputRotationZ.text=''+selectedMesh.rotation.z
  }
  
 for (var key in currentState) {
  if (currentState[key] !== nextState[key]) {
    if (key == "buttonName") {buttonName = nextState[key]}
    if (selectedMesh && nextState[key]) {
      if (key == "scaleX") { selectedMesh.scaling.x=nextState[key]; inputScaleX.text=''+nextState[key]}
      if (key == "scaleY") { selectedMesh.scaling.y=nextState[key]; inputScaleY.text=''+nextState[key]}
      if (key == "scaleZ") { selectedMesh.scaling.z=nextState[key]; inputScaleZ.text=''+nextState[key]}
      if (key == "rotationX") { selectedMesh.rotation.x=nextState[key]; inputRotationX.text=''+nextState[key]}
      if (key == "rotationY") { selectedMesh.rotation.y=nextState[key]; inputRotationY.text=''+nextState[key]}
      if (key == "rotationZ") { selectedMesh.rotation.z=nextState[key]; inputRotationZ.text=''+nextState[key]}
    }
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