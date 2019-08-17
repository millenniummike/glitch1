
const { createStore } = 'Redux';
function reducer(state, action) {
        if (typeof state === 'undefined') {
          return {
            "VRControllerLeftPosition":null,
            "VRControllerRightosition":null
          }
        }
        switch (action.type) {
          case 'VRControllerLeftPosition':
            return {...state, "VRControllerLeftPosition":action.data}
          case 'VRControllerRightPosition':
            return {...state, "VRControllerRightPosition":action.data}
          default:
            return state
        }
      }
const store = Redux.createStore(reducer)

function render() {
  str = JSON.stringify(store.getState(), null, 4); // (Optional) beautiful indented output.
  console.log(str);
}
render()
store.subscribe(render)

store.dispatch({ type: 'VRControllerLeftPosition',
                'data':{x:3,y:4,z:5}})
store.dispatch({ type: 'VRControllerRightPosition',
                'data':{x:3,y:4,z:5}})