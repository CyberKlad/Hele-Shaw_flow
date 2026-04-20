// This file handles the users clicks and changes the "state" of the simulation


// ui canvas on the right side
var uiCanvas = document.getElementById("interface_canvas");

// variables from main_canvas.js
var uiPoints  = window.points;      // the circles
var uiButtons = window.buttons;     // the buttons
var redrawUI  = window.drawCanvas;  // function to draw the ui

// placement "modes"
// idle = not placing anything
// source = next click places a source
// sink = next click places a sink
if (typeof window.placeMode === "undefined") {
    window.placeMode = "idle";
}

// matches up with the grid in main_mainvas.js, change if we end up adding more rows and columns
var GRID_COLS = 10;
var GRID_ROWS = 10;

//helper to check if a button was clicked
function userClickedButton(mouseX, mouseY) {
    for (var i = 0; i < uiButtons.length; i++) {
        var b = uiButtons[i];
        if (mouseX >= b.x &&
            mouseX <= b.x + b.width &&
            mouseY >= b.y &&
            mouseY <= b.y + b.height) {
            return true;
        }
    }
    return false;
}

//helper function to find the circle that was clicked
function getCircleAt(mouseX, mouseY) {
    for (var i = 0; i < uiPoints.length; i++) {
        var p = uiPoints[i];

        var dx = mouseX - p.x;
        var dy = mouseY - p.y;

        // check if the click was inside the circle
        if (dx * dx + dy * dy <= p.radius * p.radius) {
            return p;
        }
    }

    return null;
}

//convert a circle's grid position to webgl coords (-1,1)
function convertToWEBGLCoords(point) {
    var u = point.col / (GRID_COLS - 1);
    var v = point.row / (GRID_ROWS - 1);

    // Convert into WebGL clip space
    var x = u * 2 - 1;   // left to right
    var y = 1 - v * 2;   // top to bottom (flip Y)

    return { x: x, y: y };
}

//main event listener, when a click is made check the location and color if needed
uiCanvas.addEventListener("click", function (event) {

    // only make changes if we are in source or sink mode, default to idle
    if (window.placeMode === "idle") {
        return;
    }

    // get mouse location
    var rect = uiCanvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;

    // ignore clicks on buttons
    if (userClickedButton(mouseX, mouseY)) {
        return;
    }

    // find the circle that was clicked
    var circle = getCircleAt(mouseX, mouseY);
    if (!circle) {
        return;
    }

    // update the circle that was clicked on
    if (circle.state === "none") {

        if (window.placeMode === "source") {
            circle.state = "source";

        } else if (window.placeMode === "sink") {
            circle.state = "sink";
        }

        // tells the liquid class where to put a source or sink
        if (window.Water) {
            var pos = convertToWEBGLCoords(circle);

            if (circle.state === "source") {
                Water.addSource(pos.x, pos.y);
            }
            else if (circle.state === "sink") {
                Water.addSink(pos.x, pos.y);
            }
        }
    }

    // optional: Reset back to idle after clicking a source or sink
    // window.placeMode = "idle";

    // call main.js drawCanvas to update colors
    redrawUI();
});
