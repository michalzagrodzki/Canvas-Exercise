// setting canvas element
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var lines = canvas.getContext('2d');

// properties of visible elements
// properties related to function drawTilePattern
var horizontalTileNumber = 4;
var verticalTileNumber = 4;
var tileChangeSpeed = 500;

var saturationScatter = 0;
var saturationShift = 20;

var lightnessScatter = 5;
var lightnessShift = 40;

// properties of transition between colors
var balanceFade = 0;


// properties related to functions gridHorizontal and gridVertical
var gridLineColor = 'rgb(50, 50, 50)';
var gridLineWidth = 1;

// ////////////// functions related to blending colors /////////////////// //

function blendColors(h1,s1,l1,h2,s2,l2,balance) {

  var bal = Math.min(Math.max(balance,0),1);
  var nbal = 1-bal;
  return {
    h : Math.floor(h1*nbal + h2*bal),
    s : Math.floor(s1*nbal + s2*bal),
    l : Math.floor(l1*nbal + l2*bal)
  };

}

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

// function for drawing tiles  with random color

drawTilePattern = function(){
  // clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // loop populating firstArrayOfColors and drawing tiles
  for(var x = 0; x < horizontalTileNumber; x++){

    firstArrayOfColors[x] = new Array(verticalTileNumber);

    for (var y = 0; y < verticalTileNumber; y++) {

      // function for setting saturation
      randomSaturation = function () {
        return Math.floor((Math.random() * saturationScatter) + saturationShift);
      };

      // function for setting lightness
      randomLight = function () {
        return Math.floor((Math.random() * lightnessScatter) + lightnessShift);
      };

      // setting variable for color
      firstArrayOfColors[x][y] = "hsl( " + firstHue + ", " + randomSaturation() + "%, " + randomLight() + "% )";

      // draw tile
      context.fillStyle = firstArrayOfColors[x][y];
      context.fillRect(( x * (canvas.width / horizontalTileNumber) ), ( y * (canvas.height / verticalTileNumber) ), (canvas.width / horizontalTileNumber), (canvas.height / verticalTileNumber));

    }

  }

  // loop populating secondArrayOfColors
  for(var x = 0; x < horizontalTileNumber; x++){

    secondArrayOfColors[x] = new Array(verticalTileNumber);

    for (var y = 0; y < verticalTileNumber; y++) {

      // function for setting saturation
      randomSaturation = function () {
        return Math.floor((Math.random() * saturationScatter) + saturationShift);
      };

      // function for setting lightness
      randomLight = function () {
        return Math.floor((Math.random() * lightnessScatter) + lightnessShift);
      };

      // setting variable for color
      secondArrayOfColors[x][y] = "hsl( " + secondHue + ", " + randomSaturation() + "%, " + randomLight() + "% )";

    }

  }

  // transition between first and second array
   for(var x = 0; x < horizontalTileNumber; x++){

    for (var y = 0; y < verticalTileNumber; y++) {

      var bc = blendColors( 0, 20, 100, 100, 100, 50, balanceFade);
      context.fillStyle = 'hsl('+ bc.h +','+ bc.s +','+ bc.l +')';
      context.fillRect(( x * (canvas.width / horizontalTileNumber) ), ( y * (canvas.height / verticalTileNumber) ), (canvas.width / horizontalTileNumber), (canvas.height / verticalTileNumber));
      if (balanceFade < 1) {
        balanceFade += 0.1;

      }

    }

  }
  // move colors from secondArrayOfColors into firstArrayOfColors;
  firstArrayOfColors = secondArrayOfColors;

};

// executing functions
window.setInterval(randomHue, tileChangeSpeed);
window.setInterval(drawTilePattern, tileChangeSpeed);


