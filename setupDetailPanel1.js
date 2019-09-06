function setupDetailPanel1(){

// detailPanel1 rows

            detailPanel1.addRowDefinition(0.05)
            detailPanel1.addRowDefinition(0.2)
            detailPanel1.height="400px"
            // checkbox panel
            rect = new BABYLON.GUI.Rectangle();
            rect.background = "blue";
            rect.width = "400px"
            rect.thickness = 0;
            detailPanel1.addControl(rect, 0, 0)
            var newGrid3 = new BABYLON.GUI.Grid();
            newGrid3.width = "400px"
            detailPanel1.addControl(newGrid3, 0, 0);
            newGrid3.addColumnDefinition(0.8);
            newGrid3.addColumnDefinition(0.2)
            var label = new BABYLON.GUI.TextBlock();
            label.text = "Use snapping";
            label.width = "140px";
            label.height = "20px";
            label.marginLeft = "5px";
            label.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            label.color = "white";
            newGrid3.addControl(label, 0, 0);
            var checkbox = new BABYLON.GUI.Checkbox();
            checkbox.width = "20px";
            checkbox.height = "20px";
            checkbox.isChecked = true;
            checkbox.color = "white";
            checkbox.onIsCheckedChangedObservable.add(function (value) {
                snap = value;
            });
            newGrid3.addControl(checkbox, 0, 1);
  
    
            // debug box
            rect = new BABYLON.GUI.Rectangle();
            rect.background = "grey";
            rect.width = "400px"
            rect.thickness = 0;
            detailPanel1.addControl(rect, 1, 0)
            debugText.text = "The Debug box";
            debugText.width = "280px";
            debugText.height = "20px";
            debugText.marginLeft = "5px";
            debugText.fontSize = "12px";
            debugText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            debugText.color = "white";
            detailPanel1.addControl(debugText, 5, 0);   
}