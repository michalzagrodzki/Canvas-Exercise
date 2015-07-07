// setting canvas element
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var lines = canvas.getContext('2d');

// function for drawing hexagon with color

drawHexagon = function() {
  // clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // function for setting saturation
  randomColor = function () {
    return Math.floor((Math.random() * 20) + 20);
  };

  // function for drawing hexagon
  function polygon( ctx, x, y, radius, sides ) {
    if ( sides < 3 ) return;
    var a = ( Math.PI * 2 )/sides;
    ctx.save();
    ctx.translate( x, y );
    ctx.moveTo( radius, 0 );
    for (var i = 1; i < sides; i++) {
      ctx.lineTo( radius * Math.cos(a*i), radius * Math.sin(a*i) );
    }
    ctx.closePath();
    ctx.restore();
  }

  // setting variable for color
  var color = "hsl(" + randomColor() + ", " + randomColor() + "%, " + randomColor() + "% )";

  // draw hexagon with specified color
  context.fillStyle = color;
  polygon(context, 220, 450, 100, 6);
  context.fill();


};

// executing functions

window.setInterval(drawHexagon, 1000);
