//Global variables

var canvas = document.getElementById("renderCanvas") // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true) // Generate the BABYLON 3D engine
var editableMeshes = []
var inputTexts = []
var snap = true
var snapSize = 0.2
const thirdView = true
var lastSelectedMesh = null
var selectedMesh = null
var debugText = new BABYLON.GUI.TextBlock();
var picker = new BABYLON.GUI.ColorPicker();
var locomotion = false

// Objects
var scene = new BABYLON.Scene(engine);
var VRHelper = scene.createDefaultVRExperience();
//var vrControllerState = {};
var rootGUI = new BABYLON.TransformNode("guiRoot");
var guiPanel = BABYLON.Mesh.CreatePlane("guiPanel", 1);