store.dispatch(selectMesh(editableMeshes[0]))
store.dispatch(selectColor(new BABYLON.Color3(0.2,0.99,0.8)))

picker.value=new BABYLON.Color3(0.2,0.99,0.8)

store.dispatch(selectMesh(null))

inputRotationX.text=99
