//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval = 1000/60;
var player;

var frictionX = .5;	
var frictionY = .3;
var gravity = 3;

var i = 0;

//Set Up the Canvas
canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	

player = new GameObject(canvas.width/2, canvas.height - 50, 50, 50, "#ffff00");

var amt = 5;
var items = [];
var hazards = [];

for (i = 0; i < amt; i++)
{
    items[i] = new GameObject();
	items[i].x = Math.random() * canvas.width;
	items[i].y = -1 * (Math.random() * 1000);
	items[i].width = 20;
	items[i].color = "#00ff00";
}

for (i = 0; i < amt; i++)
{
    hazards[i] = new GameObject();
	hazards[i].x = Math.random() * canvas.width;
	hazards[i].y = -1 * (Math.random() * 1000);
	hazards[i].height = 20;
    hazards[i].width = 20;
	hazards[i].color = "#ff0000";
}

timer = setInterval(animate, interval);

function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);
    
    if(d)
	{
		if (player.x >= canvas.width - player.width/2)
		{
			player.vx = 0;
            player.x = canvas.width - player.width/2;
		}
		else
		{
			player.vx +=  player.ax * player.force;
		}
	}
	else if(a)
	{
		if(player.x - player.width/2 <= 0)
		{
			player.vx = 0;
            player.x = player.width/2;
		}
		else
		{
			player.vx += player.ax * -player.force;
		}
	}
	else
	{
		player.vx *= frictionX;
	}
    
    player.x += player.vx;

    player.drawRect();
    for (i = 0; i < amt; i++)
    {
        items[i].y += gravity;
        items[i].drawCircle();
        hazards[i].y += gravity;
        hazards[i].drawRect();
    }
}