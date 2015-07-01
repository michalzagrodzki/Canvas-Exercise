var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

// do cool things with the context
context.beginPath();
context.rect(10, 10, 250, 250);
context.fillStyle = "rgb(255, 204, 153)";
context.fill();