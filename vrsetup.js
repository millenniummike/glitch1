var vrControllerState = {};
vrControllerState.lastLeftPosition = new BABYLON.Vector3(0, 0, 0)
vrControllerState.lastRighPosition = new BABYLON.Vector3(0, 0, 0)
vrControllerState.onSecondaryLeftButtonPressed
vrControllerState.onSecondaryRightButtonPressed = false
vrControllerState.onSecondaryLeftButtonPressed = false
vrControllerState.scaling = false

var VRHelper = scene.createDefaultVRExperience();
            VRHelper.enableInteractions();
            VRHelper.enableTeleportation({
                floorMeshName: "ground1"
            });

            VRHelper.onControllerMeshLoaded.add((webVRController) => {
                if (webVRController.hand == "left") {
                    var origin = webVRController.mesh.position;
                    var forward = new BABYLON.Vector3(0, 0, 1);
                    var length = 100;
                    var rayLeft = new BABYLON.Ray();
                    var rayHelperLeft = new BABYLON.RayHelper(rayLeft);
                    var length = 300;
                    var localMeshDirection = new BABYLON.Vector3(0, 0, -1);
                    var localMeshOrigin = new BABYLON.Vector3(0, 0, 0);
                    rayHelperLeft.attachToMesh(webVRController.mesh, localMeshDirection, localMeshOrigin, length);
                }

                if (webVRController.hand == "right") {
                    var origin = webVRController.mesh.position;
                    var forward = new BABYLON.Vector3(0, 0, 1);
                    var length = 100;
                    var rayRight = new BABYLON.Ray();
                    var rayHelperRight = new BABYLON.RayHelper(rayRight);
                    var length = 300;
                    var localMeshDirection = new BABYLON.Vector3(0, 0, -1);
                    var localMeshOrigin = new BABYLON.Vector3(0, 0, 0);
                    rayHelperRight.attachToMesh(webVRController.mesh, localMeshDirection, localMeshOrigin, length);
                }

                webVRController.onSecondaryButtonStateChangedObservable.add((stateObject) => {
                    if (selectedMesh) {
                        if (stateObject.value > 0.5) {
                            var origRotation = { ...selectedMesh.rotation }
                            selectedMesh.rotation = webVRController.mesh.rotation;
                            selectedMesh.translate(BABYLON.Vector3.Forward(), 0.5, BABYLON.Space.LOCAL);
                            selectedMesh.rotation = origRotation
                        }
                    }
                    if (webVRController.hand == "right") {
                        if (stateObject.value > 0.5) {
                            vrControllerState.onSecondaryRightButtonPressed = true
                        } else {
                            vrControllerState.onSecondaryRightButtonPressed = false
                        }
                    }
                    if (webVRController.hand == "left") {
                        if (stateObject.value > 0.5) {
                            vrControllerState.onSecondaryLeftButtonPressed = true
                        } else {
                           vrControllerState.onSecondaryLeftButtonPressed = false
                        }
                    }
                })

                webVRController.onMainButtonStateChangedObservable.add((stateObject) => {
                    if (selectedMesh) {
                        if (stateObject.value > 0.5) {
                            var origRotation = { ...selectedMesh.rotation }
                            selectedMesh.rotation = webVRController.mesh.rotation;
                            selectedMesh.translate(BABYLON.Vector3.Backward(), 0.5, BABYLON.Space.LOCAL);
                            selectedMesh.rotation = origRotation
                        }
                    }
                })

                webVRController.onTriggerStateChangedObservable.add((stateObject) => {
                    if (webVRController.hand == "left") {
                        //grab
                        if (stateObject.value > 0.5) {
                            // console.log('grab')
                            var hitInfo = rayLeft.intersectsMeshes(editableMeshes);
                            if (hitInfo.length) {
                                console.log(hitInfo[0].pickedMesh.name);
                                selectedMesh = hitInfo[0].pickedMesh
                                lastSelectedMesh = selectedMesh;
                                //slider.value = selectedMesh.scaling.x
                                //slider2.value = selectedMesh.scaling.y
                               // slider3.value = selectedMesh.scaling.z
                                //picker.value = selectedMesh.material.diffuseColor

                                webVRController.mesh.addChild(selectedMesh);

                            }
                            //ungrab   
                        } else {
                            // console.log('ungrab')
                            if (selectedMesh) {
                                webVRController.mesh.removeChild(selectedMesh);
                                if (snap) {
                                    var diff = selectedMesh.position;
                                    diff = new BABYLON.Vector3(nearest(selectedMesh.position.x, snapSize), nearest(selectedMesh.position.y, snapSize), nearest(selectedMesh.position.z, snapSize));
                                    selectedMesh.position = diff
                                    var diff2 = selectedMesh.position;
                                    diff2 = new BABYLON.Vector3(nearest(selectedMesh.rotation.x, 45 * Math.PI / 180), nearest(selectedMesh.rotation.y, 45 * Math.PI / 180), nearest(selectedMesh.rotation.z, 45 * Math.PI / 180));
                                    selectedMesh.rotation = diff2
                                    // console.log(diff2)
                                }
                                selectedMesh = null;
                            }
                        }
                    }

                    if (webVRController.hand == "right") {
                        //grab
                        if (stateObject.value > 0.5) {
                            // console.log('grab')

                            var hitInfo = rayRight.intersectsMeshes(editableMeshes);
                            if (hitInfo.length) {
                                console.log(hitInfo[0].pickedMesh.name);
                                selectedMesh = hitInfo[0].pickedMesh
                                lastSelectedMesh = selectedMesh;
                                //slider.value = selectedMesh.scaling.x
                                //slider2.value = selectedMesh.scaling.y
                                //slider3.value = selectedMesh.scaling.z
                                //picker.value = selectedMesh.material.diffuseColor
                                webVRController.mesh.addChild(selectedMesh);
                            }
                            //ungrab   
                        } else {
                            // console.log('ungrab')
                            if (selectedMesh) {
                                webVRController.mesh.removeChild(selectedMesh);
                                if (snap) {
                                    var diff = selectedMesh.position;
                                    diff = new BABYLON.Vector3(nearest(selectedMesh.position.x, snapSize), nearest(selectedMesh.position.y, snapSize), nearest(selectedMesh.position.z, snapSize));
                                    selectedMesh.position = diff
                                    var diff2 = selectedMesh.position;
                                    diff2 = new BABYLON.Vector3(nearest(selectedMesh.rotation.x, 45 * Math.PI / 180), nearest(selectedMesh.rotation.y, 45 * Math.PI / 180), nearest(selectedMesh.rotation.z, 45 * Math.PI / 180));
                                    selectedMesh.rotation = diff2
                                    // console.log(diff2) 
                                }
                                selectedMesh = null;
                            }
                        }
                    }

                });
            });
