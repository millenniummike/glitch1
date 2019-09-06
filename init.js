// Objects
var canvas = document.getElementById("renderCanvas") // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true) // Generate the BABYLON 3D engine
var scene = new BABYLON.Scene(engine)
var VRHelper = scene.createDefaultVRExperience()
var rootGUI = new BABYLON.TransformNode("guiRoot")
var manager1 = new BABYLON.GUI.GUI3DManager();
var manager2 = new BABYLON.GUI.GUI3DManager();
var guiPanel = BABYLON.Mesh.CreatePlane("guiPanel", 1)
var guiPanel2 = BABYLON.Mesh.CreatePlane("guiPanel2", 1)
var panel = new BABYLON.GUI.Grid()
var detailPanel1 = new BABYLON.GUI.Grid()
var debugText = new BABYLON.GUI.TextBlock()
var picker = new BABYLON.GUI.ColorPicker()
var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(guiPanel);
var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(guiPanel2);

var editableMeshes = []
var inputRotationX = null
var inputRotationY = null
var inputRotationZ = null
var inputScaleX = null
var inputScaleY = null
var inputScaleZ = null

//Global variables
var snap = true
var snapSize = 0.2
var locomotion = false