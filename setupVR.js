var grabbedMesh
function setupVR() {

    VRHelper.enableInteractions();
    if (!locomotion) {
        VRHelper.enableTeleportation({ floorMeshName: "ground1" });
    }
    VRHelper.onControllerMeshLoaded.add((webVRController) => { 

        if (webVRController.hand === 'left') {

          rootGUI.position = VRHelper.webVRCamera.leftController.devicePosition.clone()
          rootGUI.rotationQuaternion = VRHelper.webVRCamera.leftController.deviceRotationQuaternion.clone()
          rootGUI.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.LOCAL);
          webVRController.mesh.addChild(rootGUI)

        }
        // setup rays
        var origin = webVRController.mesh.position;
        var forward = new BABYLON.Vector3(0, 0, 1);
        var length = 100;
        var ray = new BABYLON.Ray();
        var rayHelper = new BABYLON.RayHelper(ray);
        var length = 300;
        var localMeshDirection = new BABYLON.Vector3(0, 0, -1);
        var localMeshOrigin = new BABYLON.Vector3(0, 0, 0);
        rayHelper.attachToMesh(webVRController.mesh, localMeshDirection, localMeshOrigin, length);

        // button listeners
        webVRController.onSecondaryButtonStateChangedObservable.add((stateObject) => {
            if (stateObject.value > 0.5) {
                store.dispatch(controller(webVRController, "SecondaryButton"))
            }
        })

        webVRController.onMainButtonStateChangedObservable.add((stateObject) => {
            if (stateObject.value > 0.5) {
                store.dispatch(controller(webVRController, "MainButton"))
            }
        })
        webVRController.onTriggerStateChangedObservable.add((stateObject) => {
            if (stateObject.value > 0.5) {
                store.dispatch(controller(webVRController, "Trigger"))
            }

            //grab
            if (stateObject.value > 0.5) {
                var hitInfo = ray.intersectsMeshes(editableMeshes);
                if (hitInfo.length) {
                  grabbedMesh = hitInfo[0].pickedMesh
                  store.dispatch(selectMesh(hitInfo[0].pickedMesh))
                  //store.dispatch({ type: 'MENU_BUTTON',buttonName:"M6"})
                  webVRController.mesh.addChild(grabbedMesh);
                }
                //ungrab   
            } else {
              
                store.dispatch(selectMesh(""))
                if (grabbedMesh) {
                    // move to redux
                    if (snap) {
                        var diff = grabbedMesh.position;
                        diff = new BABYLON.Vector3(nearest(grabbedMesh.position.x, snapSize), nearest(grabbedMesh.position.y, snapSize), nearest(grabbedMesh.position.z, snapSize));
                        grabbedMesh.position = diff
                        var diff2 = grabbedMesh.position;
                        diff2 = new BABYLON.Vector3(nearest(grabbedMesh.rotation.x, 45 * Math.PI / 180), nearest(grabbedMesh.rotation.y, 45 * Math.PI / 180), nearest(grabbedMesh.rotation.z, 45 * Math.PI / 180));
                        grabbedMesh.rotation = diff2
                    }
                     webVRController.mesh.removeChild(grabbedMesh);
                     grabbedMesh = "";
                }
            }
        });


        if (locomotion) {
            // stick listener

            webVRController.onPadValuesChangedObservable.add((stateObject) => {
                if (webVRController.hand === 'left') {
                    var cameraTransform = BABYLON.Matrix = BABYLON.Matrix.RotationYawPitchRoll(VRHelper.currentVRCamera.rotation.y, VRHelper.currentVRCamera.rotation.x, 0);
                    var deltaTransform = BABYLON.Vector3 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(stateObject.x / 100, 0, stateObject.y / 100 * -1), cameraTransform);
                    VRHelper.currentVRCamera.cameraDirection = VRHelper.currentVRCamera.cameraDirection.add(deltaTransform);
                }

                if (webVRController.hand === 'right') {
                    VRHelper.currentVRCamera.cameraRotation.y = stateObject.x / 200;
                    VRHelper.position.y -= stateObject.y / 10;
                }
            });
        }
      }
    );
}