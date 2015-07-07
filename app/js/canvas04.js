// setting canvas element
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var lines = canvas.getContext('2d');

// function for drawing hexagon with color

drawHexagon = function(){
  // clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // variable for parsing hue
  // note: this variable uses outside function which sets one value for whole loop

    // function for setting saturation
    randomColor = function () {
      return Math.floor((Math.random() * 20) + 20);
    };

    // setting variable for color
    var color = "hsl(" + randomColor() + ", " + randomColor() + "%, " + randomColor() + "% )";

    // draw rectangle
    context.fillStyle = color;
    context.fillRect( 220, 400 , 100, 100);

};

// executing functions

window.setInterval(drawHexagon, 1000);
