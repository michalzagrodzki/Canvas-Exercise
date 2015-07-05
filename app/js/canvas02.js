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
var gridLineWidth = 1;


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

// function for setting hue
var randomHue = function(){
  return Math.floor((Math.random() * 359 ));
};

// function for drawing rectangle with random color
// 1. clear canvas from previous state
// 2. set one random hue value for tiles - this creates uniform color for one interval
// 2. loop through all places on display
// 3. in each loop set random saturation and light for one tile - this creates variance
// 4. draw rectangle, with height and width specified from global properties
drawTilePattern = function(){
  context.clearRect(0, 0, canvas.width, canvas.height);

  // variable for parsing hue
  // note: this variable uses outside function which sets one value for whole loop
  var hue = randomHue();

  for(x = 0; x < horizontalTileNumber; x++)for (y = 0; y < verticalTileNumber; y++) {

    // function for setting saturation
    randomSaturation = function () {
      return Math.floor((Math.random() * 20) + 20);
    };

    // function for setting lightness
    randomLight = function () {
      return Math.floor((Math.random() * 50) + 20);
    };

    // setting variable for color
    var color = "hsl(" + hue + ", " + randomSaturation() + "%, " + randomLight() + "% )";

    // draw rectangle
    context.fillStyle = color;
    context.fillRect(( x * (canvas.width / horizontalTileNumber) ), ( y * (canvas.height / verticalTileNumber) ), (canvas.width / horizontalTileNumber), (canvas.height / verticalTileNumber));
  }
};

// executing functions
window.setInterval(drawTilePattern, tileChangeSpeed);
window.setInterval(gridHorizontal, tileChangeSpeed);
window.setInterval(gridVertical, tileChangeSpeed);
