// setting canvas element
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

// properties of visible elements
// properties related to function drawTilePattern
var tileChangeSpeed = 10000;
var stripeNumber = 5;

var saturationScatter = 30;
var saturationShift = 50;

var lightnessScatter = 15;
var lightnessShift = 50;

// ////////////////////// functions related to setting color /////////////////////// //

// function for setting hue
var randomHue = function(){
  return Math.floor((Math.random() * 359 ));
};

var firstHue = randomHue();
var secondHue = randomHue();

// ////////////////////// functions related to drawing elements on screen /////////////////////// //

drawStripes = function(){

  //console.log("first Hue: " + firstHue);
  //console.log("second Hue: " + secondHue);

  // function for setting saturation
  var randomSaturation = function () {
    return Math.floor((Math.random() * saturationScatter) + saturationShift);
  };

  // function for setting lightness
  var randomLight = function () {
    return Math.floor((Math.random() * lightnessScatter) + lightnessShift);
  };

  var colorArray = [];

  // set color and push it to array
  for(var c = 0; c < stripeNumber; c++){
    var color = "hsl(" + firstHue + ", " + randomSaturation() + "%, " + randomLight() + "%)";
    colorArray.push(color);
  }

  console.log("array of colors - initial");
  console.log(colorArray);

  colorArray.sort();

  console.log("array of colors - sorted");
  console.log(colorArray);

  for(var x = 0; x < stripeNumber; x++){

    //draw stripe
    context.fillStyle = colorArray[x];
    context.fillRect(0 , ( x * (canvas.height / stripeNumber) ), canvas.width, (canvas.height / stripeNumber));
  }
  console.log("--------");
};

// executing functions
drawStripes();
window.setInterval(randomHue, tileChangeSpeed);
window.setInterval(drawStripes, tileChangeSpeed);


