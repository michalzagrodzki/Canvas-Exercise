// setting canvas element
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var lines = canvas.getContext('2d');

// properties of visible elements
// properties related to function drawTilePattern
var horizontalTileNumber = 2;
var verticalTileNumber = 2;
var tileChangeSpeed = 1000;

var saturationScatter = 75;
var saturationShift = 20;

var lightnessScatter = 75;
var lightnessShift = 40;

// properties of transition between colors
var balanceFade = 0;


// properties related to functions gridHorizontal and gridVertical
var gridLineColor = 'rgb(50, 50, 50)';
var gridLineWidth = 1;

// ////////////// functions related to setting arrays for colors /////////////////// //

var firstArrayOfColors = new Array(horizontalTileNumber);
var secondArrayOfColors = new Array(horizontalTileNumber);
var thirdArrayOfColors = new Array(horizontalTileNumber);
var fourthArrayOfColors = new Array(horizontalTileNumber);

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


drawInitialTilePattern = function(){

  // loop populating firstArrayOfColors and drawing tiles for first color
  for(var x = 0; x < (horizontalTileNumber - 1); x++){

    firstArrayOfColors[x] = new Array(verticalTileNumber);

    for (var y = 0; y < (verticalTileNumber - 1); y++) {

      // function for setting saturation
      var randomSaturation = function () {
        return Math.floor((Math.random() * saturationScatter) + saturationShift);
      };

      // function for setting lightness
      var randomLight = function () {
        return Math.floor((Math.random() * lightnessScatter) + lightnessShift);
      };

      // setting variable for color
      firstArrayOfColors[x][y] = [ firstHue, randomSaturation, randomLight ];

      // draw tile
      //context.fillStyle = "hsl( " + firstArrayOfColors[x][y][0] + ", " + firstArrayOfColors[x][y][1] + "%, " + firstArrayOfColors[x][y][2] + "% )" ;
      //context.fillRect(( x * (canvas.width / horizontalTileNumber) ), ( y * (canvas.height / verticalTileNumber) ), (canvas.width / horizontalTileNumber), (canvas.height / verticalTileNumber));

    }

  }
};

// function for drawing tiles  with random color

drawTilePattern = function(){
  // clear canvas


  // loop populating firstArrayOfColors and drawing tiles for first color
  for(var x = 0; x < (horizontalTileNumber - 1); x++){

    firstArrayOfColors[x] = new Array(verticalTileNumber);

    for (var y = 0; y < (verticalTileNumber - 1); y++) {

      // function for setting saturation
      function randomSaturation() {
        return Math.floor((Math.random() * saturationScatter) + saturationShift);
      }

      // function for setting lightness
      function randomLight() {
        return Math.floor((Math.random() * lightnessScatter) + lightnessShift);
      }

      // setting variable for color
      firstArrayOfColors[x][y] = [ firstHue, randomSaturation(), randomLight() ];

      // draw tile
      //context.fillStyle = "hsl( " + firstArrayOfColors[x][y][0] + ", " + firstArrayOfColors[x][y][1] + "%, " + firstArrayOfColors[x][y][2] + "% )" ;
      //context.fillRect(( x * (canvas.width / horizontalTileNumber) ), ( y * (canvas.height / verticalTileNumber) ), (canvas.width / horizontalTileNumber), (canvas.height / verticalTileNumber));

    }

  }

  // loop populating secondArrayOfColors
  for(var x = 0; x < (horizontalTileNumber - 1); x++){

    secondArrayOfColors[x] = new Array(verticalTileNumber);

    for (var y = 0; y < (verticalTileNumber - 1); y++) {

      // function for setting saturation
      function randomSaturation() {
        return Math.floor((Math.random() * saturationScatter) + saturationShift);
      };

      // function for setting lightness
      function randomLight() {
        return Math.floor((Math.random() * lightnessScatter) + lightnessShift);
      };

      // setting variable for color
      secondArrayOfColors[x][y] = [ firstHue, randomSaturation(), randomLight() ];

    }

  }

  // loop populating thirdArrayOfColors - difference between values in firstArrayOfColors and secondArrayOfColors
  for(var x = 0; x < (horizontalTileNumber - 1); x++){

    thirdArrayOfColors[x] = new Array(verticalTileNumber);

    for (var y = 0; y < (verticalTileNumber - 1); y++) {

      //thirdArrayOfColors[x][y] = [valueOne, valueTwo, valueThree];
      // substracting hue values from firstArrayOfColors and secondArrayOfColors
      if (firstArrayOfColors[x][y][0] > secondArrayOfColors[x][y][0]) {
        var valueOne = firstArrayOfColors[x][y][0] - secondArrayOfColors[x][y][0];
      } else {
        var valueOne = (secondArrayOfColors[x][y][0] - firstArrayOfColors[x][y][0]);
      }

      // substracting saturation values from firstArrayOfColors and secondArrayOfColors
      if (firstArrayOfColors[x][y][1] > secondArrayOfColors[x][y][1]) {
        var valueTwo = firstArrayOfColors[x][y][1] - secondArrayOfColors[x][y][1];
      } else {
        var valueTwo = secondArrayOfColors[x][y][1] - firstArrayOfColors[x][y][1];
      }

      // substracting lightness values from firstArrayOfColors and secondArrayOfColors
      if (firstArrayOfColors[x][y][2] > secondArrayOfColors[x][y][2]) {
        var valueThree = firstArrayOfColors[x][y][2] - secondArrayOfColors[x][y][2];
      } else {
        var valueThree = secondArrayOfColors[x][y][2] - firstArrayOfColors[x][y][2];
      }

      thirdArrayOfColors[x][y] = [valueOne, valueTwo, valueThree];
    }

  }

  // transition between first and second array
  // start loop for number of iterations between two states
  // then start loop which go in single iteration through all tiles and change state

  var numberOfTransitions = tileChangeSpeed / 100;

  for(var z = 0; z < numberOfTransitions; z++){

    for(var x = 0; x < (horizontalTileNumber - 1); x++){

      fourthArrayOfColors[x] = new Array(verticalTileNumber);

      for (var y = 0; y < (verticalTileNumber - 1); y++) {

        var incrementHue = firstArrayOfColors[x][y][0] + ( thirdArrayOfColors[x][y][0] / numberOfTransitions );

        var incrementSaturation = firstArrayOfColors[x][y][1] + ( thirdArrayOfColors[x][y][1] / numberOfTransitions );

        var incrementLightness = firstArrayOfColors[x][y][2] + ( thirdArrayOfColors[x][y][2] / numberOfTransitions );

        // setting variable for color
        fourthArrayOfColors[x][y] = [ incrementHue, incrementSaturation, incrementLightness ];

        // draw tile
        context.fillStyle = "hsl( " +  fourthArrayOfColors[x][y][0] + ", " + fourthArrayOfColors[x][y][1] + "%, " + fourthArrayOfColors[x][y][2] + "% )" ;
        context.fillRect(( x * (canvas.width / horizontalTileNumber) ), ( y * (canvas.height / verticalTileNumber) ), (canvas.width / horizontalTileNumber), (canvas.height / verticalTileNumber));
        console.log('hello' + numberOfTransitions);
      }

    }

  }

  // move colors from secondArrayOfColors into firstArrayOfColors;
  firstArrayOfColors = secondArrayOfColors;

};

// executing functions

window.setInterval(randomHue, tileChangeSpeed);
window.drawInitialTilePattern();
window.setInterval(drawTilePattern, tileChangeSpeed);


