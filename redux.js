const { createStore } = 'Redux';
function reducer(state, action) {
        if (typeof state === 'undefined') {
          return {
            controller:"",
            control:"",
            inputText:"",
            buttonName:"",
            selectedMesh:"",
            color:""
          }
        }
        console.log(action.type)
        switch (action.type) {
          case 'CONTROLLER_ACTION':
            return {...state, "controller":action.controller,"control":action.control}
          case 'SELECT_MESH':
            return {...state, "selectedMesh":action.mesh}
          case 'SELECT_INPUT_TEXT':
            return {...state, "inputText":action.inputText}
          case 'MENU_BUTTON':
            return {...state, "buttonName":action.buttonName}
          case 'TEXT_UPDATE':
            switch (action.textInputName) {
              case 'rotationX':
                return {...state, "rotationX":action.textValue}
              case 'rotationY':
                return {...state, "rotationY":action.textValue}
              case 'rotationZ':
                return {...state, "rotationZ":action.textValue}
              case 'scaleX':
                return {...state, "scaleX":action.textValue}
              case 'scaleY':
                return {...state, "scaleY":action.textValue}
              case 'scaleZ':
                return {...state, "scaleZ":action.textValue}
              default:
                return state
              }
          case 'SELECT_COLOR':
            return {...state, "colorR":""+action.color.r,"colorG":""+action.color.g,"colorB":""+action.color.b,"color":action.color}
          default:
            return state
        }
      }
const store = Redux.createStore(reducer)

var lastSelectedMesh
let currentState = store.getState()

function selectMesh(mesh) {
  return {
    type: 'SELECT_MESH',
    mesh
  }
}

function controller(controller,control) {
  return {
    type: 'CONTROLLER_ACTION',
    controller,
    control
  }
}

function selectInputText(inputText) {
  return {
    type: 'SELECT_INPUT_TEXT',
    inputText
  }
}

function selectColor(color) {
  return {
    type: 'SELECT_COLOR',
    color
  }
}