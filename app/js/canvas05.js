// setting canvas element
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var lines = canvas.getContext('2d');

// properties of visible elements
// properties related to function drawTilePattern
var horizontalTileNumber = 10;
var verticalTileNumber = 10;
var tileChangeSpeed = 2000;

var saturationScatter = 0;
var saturationShift = 20;

var lightnessScatter = 5;
var lightnessShift = 40;

// properties related to functions gridHorizontal and gridVertical
var gridLineColor = 'rgb(50, 50, 50)';
var gridLineWidth = 1;

// properties related to function incrementHue


// ////////////// functions related to setting arrays for colors /////////////////// //

var firstArrayOfColors = new Array(horizontalTileNumber);
var secondArrayOfColors = new Array(horizontalTileNumber);

// ////////////////////// functions related to setting color /////////////////////// //

// function for setting hue
var randomHue = function(){
  return Math.floor((Math.random() * 359 ));
};

var firstHue = randomHue();
var secondHue = randomHue();

// ////////////////////// functions related to drawing elements on screen /////////////////////// //

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

drawTilePattern = function(){
  // clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  for(x = 0; x < horizontalTileNumber; x++){

    firstArrayOfColors[x] = new Array(verticalTileNumber);

    for (y = 0; y < verticalTileNumber; y++) {

      // function for setting saturation
      randomSaturation = function () {
        return Math.floor((Math.random() * saturationScatter) + saturationShift);
      };

      // function for setting lightness
      randomLight = function () {
        return Math.floor((Math.random() * lightnessScatter) + lightnessShift);
      };

      // setting variable for color
      firstArrayOfColors[x][y] = "hsl(" + firstHue + ", " + randomSaturation() + "%, " + randomLight() + "% )";

      // draw rectangle
      context.fillStyle = firstArrayOfColors[x][y];
      context.fillRect(( x * (canvas.width / horizontalTileNumber) ), ( y * (canvas.height / verticalTileNumber) ), (canvas.width / horizontalTileNumber), (canvas.height / verticalTileNumber));

    }
  }

  //return firstArrayOfColors;


};

// executing functions
window.setInterval(drawTilePattern, tileChangeSpeed);
//window.setInterval(gridHorizontal, tileChangeSpeed);
//window.setInterval(gridVertical, tileChangeSpeed);
window.setInterval(randomHue, tileChangeSpeed);
