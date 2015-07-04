// setting canvas element
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var lines = canvas.getContext('2d');

// properties of visible elements
// properties related to function drawTilePattern
var horizontalTileNumber = 3;
var verticalTileNumber = 20;
var tileChangeSpeed = 1500;

// properties related to functions gridHorizontal and gridVertical
var gridLineColor = 'rgb(205, 205, 205)';
var gridLineWidth = 2;


// function for drawing grid of lines - goes through horizontal lines and then through vertical lines
// 1. loop through all places on display
// 2. draw line with specified color
gridHorizontal = function(){
  for (y = 0; y < verticalTileNumber; y++) {
    lines.beginPath();
    lines.moveTo(0, (y * canvas.height / verticalTileNumber));
    lines.lineTo(canvas.width, (y * canvas.height / verticalTileNumber));
    lines.lineWidth = gridLineWidth;
    lines.strokeStyle = gridLineColor;
    lines.stroke();
  }
};

gridVertical = function(){
  for (x = 0; x < horizontalTileNumber; x++) {
    lines.beginPath();
    lines.moveTo((x * canvas.width / horizontalTileNumber), 0 );
    lines.lineTo((x * canvas.width/ horizontalTileNumber), canvas.height);
    lines.lineWidth = gridLineWidth;
    lines.strokeStyle = gridLineColor;
    lines.stroke();
  }
};

// function for drawing rectangle with random color
// 1. clear canvas from previous state
// 2. loop through all places on display
// 3. set random color and attach it to variable color
// 4. draw rectangle, with height and width specified from global properties
drawTilePattern = function(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  for(x = 0; x < horizontalTileNumber; x++)for (y = 0; y < verticalTileNumber; y++) {
    // function for setting color
    function randomColor() {
        return Math.floor((Math.random() * 175) + 1);
    }

    // setting variable for color
    var color = "rgb(" + randomColor() + ", " + randomColor() + ", " + randomColor() + ")";

    // draw rectangle
    context.fillStyle = color;
    context.fillRect(( x * (canvas.width / horizontalTileNumber) ), ( y * (canvas.height / verticalTileNumber) ), (canvas.width / horizontalTileNumber), (canvas.height / verticalTileNumber));
  }
};

// executing functions
window.setInterval(drawTilePattern, tileChangeSpeed);
window.setInterval(gridHorizontal, tileChangeSpeed);
window.setInterval(gridVertical, tileChangeSpeed);
