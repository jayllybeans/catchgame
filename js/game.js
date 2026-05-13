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

var scoreCount = 0;

var amt = 5;
var items = [];
var hazards = [];

for (i = 0; i < amt; i++)
{
    items[i] = new GameObject();
	items[i].x = Math.random() * canvas.width;
	items[i].y = -1 * (Math.random() * 1000);
	items[i].width = 20;
	items[i].height = 20;
	items[i].color = "#00ff00";
}

for (i = 0; i < amt; i++)
{
    hazards[i] = new GameObject();
	hazards[i].x = Math.random() * canvas.width;
	hazards[i].y = -1 * (Math.random() * 1000);
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
        if (items[i].y >= canvas.height + items[i].width/2 || player.hitTestObject(items[i]))
		{
			if(player.hitTestObject(items[i]))
			{
				colorSet("#00ff00");
				scoreCount++;
				setTimeout(function() {
        		colorSet("#ffff00");
    			}, 500);
			}
			items[i].y = -1 * (Math.random() * 1000);
			items[i].x = Math.random() * canvas.width;
		}
		items[i].y += gravity;
        items[i].drawRect();
		if (hazards[i].y >= canvas.height + hazards[i].width/2 || player.hitTestObject(hazards[i]))
		{
			if(player.hitTestObject(hazards[i]))
			{
				colorSet("#ff0000");
				scoreCount = 0;
				setTimeout(function() {
        		colorSet("#ffff00");
    			}, 500);
			}
			hazards[i].y = -1 * (Math.random() * 1000);
			hazards[i].x = Math.random() * canvas.width;
		}
        hazards[i].y += gravity;
        hazards[i].drawCircle();
    }

	context.font = "30px Arial black";
	context.weight = "bold";
	context.fillStyle = "black";
	context.fillText("Score: " + scoreCount, 20, 40);
}

function colorSet(color)
{
	player.color = color;
}