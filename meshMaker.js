//--- create mesh

//var body = JSM.GenerateCuboid (1, 1, 1);
var body = new JSM.Body ();

body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 0.0, 0.0)));
body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.5, 1.0, 1.0)));
body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1.0, 0.0, 0.0)));
body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1.0, 0.0, 1.0)));
body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 0.0, 1.0)));

body.AddPolygon (new JSM.BodyPolygon ([0,1,2,3,4]))

var polyLine = [];
var i;
for (i = 0; i < 50; i++) {
  polyLine.push (new JSM.Coord (i / 4.0, JSM.RandomNumber (1.0, 2.0), 0.0));
}

var axis = new JSM.Sector (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (1.0, 0.0, 0.0));
var body2 = JSM.GenerateRevolved (polyLine, axis, 360.0 * JSM.DegRad, 50, true, 'CurveSegments');
body2.SetPolygonsMaterialIndex (0);

var materials = new JSM.MaterialSet ();
materials.AddMaterial (new JSM.Material ({
  ambient : 0xffffff,
  diffuse : 0xffffff,
  textureWidth : 1,
  textureHeight : 1
}));

var renderBody = JSM.ConvertBodyToRenderBody (body2, materials);
var meshes = JSM.ConvertBodyToThreeMeshes (body);
var obj = JSM.ExportBodyToObj (body2, 'JSModelerBody', false);

var onSuccess = function(container) {
    console.log(container.meshes[0])
    container.meshes[0].scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
    editableMeshes.push(container.meshes[0])
    container.addAllToScene();
};

var onProgress = function(message) {
    console.log('progress');
}

var onError = function(error) {
    console.log("ERROR!")
    console.log(error)
}

var loadMesh = function(){
 var mesh = BABYLON.SceneLoader.LoadAssetContainer(
        '',
        'data: ' + obj,
        scene,
        onSuccess,
        onProgress,
        onError,
        '.obj'
    );
}