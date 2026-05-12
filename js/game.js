//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval = 1000/60;
var player;

var frictionX = .5;	
var frictionY = .3;
var gravity = .5;

//Set Up the Canvas
canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	

player = new GameObject(canvas.width/2, canvas.height + 25, 50, 50, "#ffff00");

timer = setInterval(animate, interval);

function animate()
{
    player.drawRect();
}