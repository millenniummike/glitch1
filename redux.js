const { createStore } = 'Redux';
function reducer(state, action) {
        if (typeof state === 'undefined') {
          return {
            controller:null,
            control:"",
            inputText:null,
            menuButton:null,
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
            return {...state, "menuButton":action.buttonName}
          default:
            return state
        }
      }
const store = Redux.createStore(reducer)

function render() {
  var state=store.getState()
  console.log(state)
  
for (let [key, value] of Object.entries(state)) {
  console.log(`${key}: ${value}`);
}
  var lastSelectedMesh = store.getState().lastSelectedMesh
  var controller = store.getState().controller
  var control = store.getState().control
  var inputText = store.getState().inputText
  
  var hand = ""
  if(controller) {hand=controller.id}
  //debugText.text = hand + ' ' + control
  
  if (inputText) {
   // debugText.text = ""+inputText.name
  }
  
  if (lastSelectedMesh)
  {
    picker.value = lastSelectedMesh.material.diffuseColor
    if (inputTexts.length>0) {
      inputTexts[0].text = "" + lastSelectedMesh.scaling.x
      //inputTexts[1].text = "" + selectedMesh.scaling.y
      //inputTexts[2].text = "" + selectedMesh.scaling.z
      //inputTexts[3].text = "" + selectedMesh.rotation.x
      //inputTexts[4].text = "" + selectedMesh.rotation.y
      //inputTexts[5].text = "" + selectedMesh.rotation.z
    }
  }
}
render()
store.subscribe(render)

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