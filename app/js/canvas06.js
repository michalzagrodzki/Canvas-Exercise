// setting canvas element
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var context2 = canvas.getContext('2d');

// properties of visible elements
// properties related to function drawTilePattern
var tileChangeSpeed = 1000;
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
  var colorHighlightArray = colorArray;


  // loop to set color and push it to array
  for(var c = 0; c < stripeNumber; c++){
    var color = "hsl(" + firstHue + ", " + randomSaturation() + "%, " + randomLight() + "%)";
    colorArray.push(color);
  }

  /*
  // loop to set color and push it to array
  for(var c = 0; c < stripeNumber; c++){
    var color = {
      'hue': firstHue,
      'sat': randomSaturation(),
      'light': randomLight()
    };
    colorArray.push(color);
  }
*/
  /*
  console.log("array of colors - initial");
  console.log(colorArray);

  colorArray.sort();

  console.log("array of colors - sorted");
  console.log(colorArray);
  console.log("array of colors - single value: " + colorArray);

  console.log("---//---");
  console.log("array of highlighted colors - before changes");
  console.log(colorHighlightArray);
*/
  // loop to set highlight color based on colorArray and push it to colorHighlightArray
  for(var h = 0; h < stripeNumber; h++){
    var colorBase = colorArray[h];
    // extract value of brightness from color array
    var colorHighlightValue = colorBase.substr(13,3);
    // change value to number
    colorHighlightValue = parseInt(colorHighlightValue);
    // add 10 to value of highlight
    colorHighlightValue = colorHighlightValue + 10;

    if(colorHighlightValue > 100){
      colorHighlightValue = 100;
    }
    // set new value of highlight into array value
    // review this area
    colorHighlightValue = colorBase.substr(0,13) + colorHighlightValue + "%)";
    // replace old value with new value in highlight array
    colorHighlightArray[h] = colorHighlightValue;
  }

  //console.log("array of highlighted colors - after changes");
  //console.log(colorHighlightArray);


  // loop drawing bands with colors
 for(var x = 0; x < stripeNumber; x++){

    //draw stripe
    context.fillStyle = colorArray[x];
    context.fillRect(0 , ( x * ((canvas.height / stripeNumber)) ), canvas.width, (canvas.height / stripeNumber));

  }
/*
// loop drawing highlight bands
  for(var y = 0; y < stripeNumber; y++){

    context2.fillStyle = colorHighlightArray[y];
    context2.fillRect(0 , ( y * (canvas.height / stripeNumber) ), canvas.width, ( (canvas.height / stripeNumber) - canvas.height*0.18) );

  }
*/
  console.log("--------");
};

// executing functions

window.setInterval(randomHue, tileChangeSpeed);
window.setInterval(drawStripes, tileChangeSpeed);


