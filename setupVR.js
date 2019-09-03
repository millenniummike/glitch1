function setupVR(){

  VRHelper.enableInteractions();
  if (!locomotion){
    VRHelper.enableTeleportation({floorMeshName: "ground1"});
}
  VRHelper.onControllerMeshLoaded.add((webVRController) => {
      
      // setup rays
          var origin = webVRController.mesh.position;
          var forward = new BABYLON.Vector3(0, 0, 1);
          var length = 100;
          var ray = new BABYLON.Ray();
          var rayHelper= new BABYLON.RayHelper(ray);
          var length = 300;
          var localMeshDirection = new BABYLON.Vector3(0, 0, -1);
          var localMeshOrigin = new BABYLON.Vector3(0, 0, 0);
          rayHelper.attachToMesh(webVRController.mesh, localMeshDirection, localMeshOrigin, length);

      // button listeners
      webVRController.onSecondaryButtonStateChangedObservable.add((stateObject) => {
              if (stateObject.value > 0.5) {
                  store.dispatch(controller(webVRController,"SecondaryButton"))
                  
                  // TODO move to redux
                if (selectedMesh) {
                  var origRotation = { ...selectedMesh.rotation }
                  selectedMesh.rotation = webVRController.mesh.rotation;
                  selectedMesh.translate(BABYLON.Vector3.Forward(), 0.5, BABYLON.Space.LOCAL);
                  selectedMesh.rotation = origRotation
                }
              }
      })

      webVRController.onMainButtonStateChangedObservable.add((stateObject) => {
              if (stateObject.value > 0.5) {
                  store.dispatch(controller(webVRController,"MainButton"))
                
                  // TODO move to redux
                  if (selectedMesh) {
                    var origRotation = { ...selectedMesh.rotation }
                    selectedMesh.rotation = webVRController.mesh.rotation;
                    selectedMesh.translate(BABYLON.Vector3.Backward(), 0.5, BABYLON.Space.LOCAL);
                    selectedMesh.rotation = origRotation
                  }
              }
      })

      webVRController.onTriggerStateChangedObservable.add((stateObject) => {
        
        if (stateObject.value > 0.5) {
                  store.dispatch(controller(webVRController,"Trigger"))
        }

              //grab
              if (stateObject.value > 0.5) {
                  var hitInfo = ray.intersectsMeshes(editableMeshes);
                  if (hitInfo.length) {
                      console.log(hitInfo[0].pickedMesh.name);
                      selectedMesh = hitInfo[0].pickedMesh
                      lastSelectedMesh = selectedMesh;
                      store.dispatch(selectMesh(selectedMesh))

                    webVRController.mesh.addChild(selectedMesh);

                  }
                  //ungrab   
              } else {
                  if (selectedMesh) {
                      if (snap) {
                          var diff = selectedMesh.position;
                          diff = new BABYLON.Vector3(nearest(selectedMesh.position.x, snapSize), nearest(selectedMesh.position.y, snapSize), nearest(selectedMesh.position.z, snapSize));
                          selectedMesh.position = diff
                          var diff2 = selectedMesh.position;
                          diff2 = new BABYLON.Vector3(nearest(selectedMesh.rotation.x, 45 * Math.PI / 180), nearest(selectedMesh.rotation.y, 45 * Math.PI / 180), nearest(selectedMesh.rotation.z, 45 * Math.PI / 180));
                          selectedMesh.rotation = diff2
                      }
                      webVRController.mesh.removeChild(selectedMesh);
                      selectedMesh = null;
                      store.dispatch(selectMesh(selectedMesh))
                  }
              }
      });
    
    
    if (locomotion) {
      // stick listener
  
  webVRController.onPadValuesChangedObservable.add((stateObject)=>{
            if(webVRController.hand ==='left'){
                var cameraTransform = BABYLON.Matrix = BABYLON.Matrix.RotationYawPitchRoll(VRHelper.currentVRCamera.rotation.y, VRHelper.currentVRCamera.rotation.x, 0);
                var deltaTransform = BABYLON.Vector3 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(stateObject.x/100, 0, stateObject.y/100*-1), cameraTransform);
                VRHelper.currentVRCamera.cameraDirection = VRHelper.currentVRCamera.cameraDirection.add(deltaTransform);
            }
    
    if(webVRController.hand ==='right'){
                VRHelper.currentVRCamera.cameraRotation.y = stateObject.x/200;
                VRHelper.position.y -= stateObject.y/10;
            }
        });
    }
    }
  );
  
  
  
  // Runs every frame
            scene.onBeforeRenderObservable.add(() => {
                if (VRHelper.webVRCamera.leftController) { // sync gui to controller
                    rootGUI.rotationQuaternion = VRHelper.webVRCamera.leftController.deviceRotationQuaternion.clone()
                    rootGUI.position = VRHelper.webVRCamera.leftController.devicePosition.clone()
                    rootGUI.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.LOCAL);
                }
            })
}