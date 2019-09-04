const { createStore } = 'Redux';
function reducer(state, action) {
        if (typeof state === 'undefined') {
          return {
            controller:null,
            control:"",
            inputText:null,
            buttonName:"M8",
            lastSelectedMesh:null,
            selectedMesh:null
          }
        }
        switch (action.type) {
          case 'CONTROLLER_ACTION':
            return {...state, "controller":action.controller,"control":action.control}
          case 'SELECT_MESH':
            return {...state, "lastSelectedMesh":state.selectedMesh,"selectedMesh":action.mesh}
          case 'SELECT_INPUT_TEXT':
            return {...state, "inputText":action.inputText}
          case 'MENU_BUTTON':
            return {...state, "buttonName":action.buttonName}
          default:
            return state
        }
      }
const store = Redux.createStore(reducer)

// binds redux to ui
function render() {
  var state=store.getState()
  
for (let [key, value] of Object.entries(state)) {
  console.log(`${key}: ${value}`);
}
  var lastSelectedMesh = store.getState().lastSelectedMesh
  var controller = store.getState().controller
  var control = store.getState().control
  var inputText = store.getState().inputText
  var buttonName = store.getState().buttonName
  
  if (buttonName){
    switch (buttonName) {
        
      case "M7":
        guiPanel.isVisible = true
        guiPanel2.isVisible = false
        
        return true
      case "M8":
        guiPanel.isVisible = false
        guiPanel2.isVisible = true
        return true
      case "Cube":
        var obj = new BABYLON.Mesh.CreateBox("cube", 0.2, scene)
        obj.position = new BABYLON.Vector3(1,1,1)
        //obj.position = VRHelper.webVRCamera.leftController.devicePosition.clone()
        obj.material = new BABYLON.StandardMaterial("cubeMat", scene)
        editableMeshes.push(obj)
        console.log(editableMeshes)
      return true  
    }
  }
  
  if (lastSelectedMesh)
  {
    picker.value = lastSelectedMesh.material.diffuseColor
    if (inputRotationX) {
      inputRotationX.text = "" + lastSelectedMesh.rotation.x
    }
    if (inputRotationY) {
      inputRotationY.text = "" + lastSelectedMesh.rotation.y
    }
    if (inputRotationZ) {
      inputRotationZ.text = "" + lastSelectedMesh.rotation.z
    }
    if (inputScaleX) {
      inputScaleX.text = "" + lastSelectedMesh.scaling.x
    }
    if (inputScaleY) {
      inputScaleY.text = "" + lastSelectedMesh.scaling.y
    }
    if (inputScaleZ) {
      inputScaleZ.text = "" + lastSelectedMesh.scaling.z
    }
  }
}
render()
store.subscribe(render)

// Button Logic
// move to redux
function actionHandler(type) {
                if (type == 0) {
                    if (lastSelectedMesh) {
                        var obj = lastSelectedMesh.clone('cloned');
                        editableMeshes.push(obj);
                    }
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
                    var obj = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 0, 0), scene).intensity=0.2
                    obj.position = VRHelper.webVRCamera.leftController.devicePosition.clone()
                }
  
                if (type > 1000) {
                    console.log("MENU")
                }
            }


function selectMesh(mesh) {
  return {
    type: 'SELECT_MESH',
    mesh:mesh
  }
}

function controller(controller,control) {
  return {
    type: 'CONTROLLER_ACTION',
    controller:controller,
    control
  }
}

function selectInputText(inputText) {
  return {
    type: 'SELECT_INPUT_TEXT',
    inputText
  }
}