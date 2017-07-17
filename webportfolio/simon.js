var playerTurn = false;

var computerMoves = [];
var playerMoves = [];
var cMoveCount = 0;
var pMoveCount = 0;

var strict = false;

document.addEventListener("DOMContentLoaded", drawBoard, false);

function drawBoard()
{
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var x = canvas.width / 2;
	var y = canvas.height / 2;
	var radius = 180;
	var startAngle, endAngle;
	context.lineWidth = 80;

	//draw green section
	drawArc(-10, -10, Math.PI, 3*Math.PI/2, "#00a74a");

	//draw red section
	drawArc(10, -10, 3*Math.PI/2, 0, "#9f0f17");

	//draw blue section
	drawArc(10, 10, 0, Math.PI/2, "#094a8f");

	//draw yellow section
	drawArc(-10, 10, Math.PI/2, Math.PI, "#cca707");

	canvas.addEventListener("click", handleClick, false);
}

function toggleStrict()
{
	strict = !strict;
}

function startGame()
{
	computerMoves = [];
	playerMoves = [];
	pMoveCount = 0;
	cMoveCount = 0;

	computerTurn();
}

function computerTurn()
{
	if(cMoveCount == 20)
	{
		alert("You Win!");
	}

	cMoveCount++;
	document.getElementById("count").innerHTML = cMoveCount;

	addMove();
	playMoves();

	playerTurn = true;
}

function addMove()
{
	ri = getRandomInt(0, 4);
	switch(ri)
	{
		case 0:
			computerMoves.push("green");
			break;
		case 1:
			computerMoves.push("red");
			break;
		case 2:
			computerMoves.push("blue");
			break;
		case 3:
			computerMoves.push("yellow");
			break;
	}
}

async function playMoves()
{
	await sleep(500);
	for(var i=0;i<computerMoves.length;i++)
	{
		await sleep(500);
		flash(computerMoves[i]);
		await sleep(500);
	}
}

function checkMove()
{
	if(computerMoves[pMoveCount-1] == playerMoves[pMoveCount-1] && pMoveCount < cMoveCount)
	{
		playerTurn = true;
	}
	else if(computerMoves[cMoveCount-1] == playerMoves[cMoveCount-1])
	{
		computerTurn();
		pMoveCount = 0;
		playerMoves = [];
	}
	else
	{
		if(strict)
		{
			startGame();
		}
		else
		{
			playerMoves.pop();
			playMoves();
			playerTurn = true;
		}
	}
}

function handleClick(e)
{
	if(!playerTurn) return;

	playerTurn = false;
	pMoveCount++;

	var canvas = document.getElementById('canvas');
	var rect = canvas.getBoundingClientRect();
	var x = e.clientX - rect.left;
	var y = e.clientY - rect.top;

	if(x < 250 && y < 250)
	{
		playerMoves.push("green");
		flash("green");
		checkMove();
	}
	else if(x > 250 && y < 250)
	{
		playerMoves.push("red");
		flash("red");
		checkMove();
	}
	else if(x < 250 && y > 250)
	{
		playerMoves.push("yellow");
		flash("yellow");
		checkMove();
	}
	else if(x > 250 && y > 250)
	{
		playerMoves.push("blue");
		flash("blue");
		checkMove();
	}
}

async function flash(color)
{
	switch(color)
	{
		case "green":
			drawArc(-10, -10, Math.PI, 3*Math.PI/2, "#7fd3a5");
			var audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
			audio.play()
			await sleep(500);
			drawArc(-10, -10, Math.PI, 3*Math.PI/2, "#00a74a");
			break;
		case "red":
			drawArc(10, -10, 3*Math.PI/2, 0, "#CF878A");
			var audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
			audio.play()
			await sleep(500);
			drawArc(10, -10, 3*Math.PI/2, 0, "#9f0f17");
			break;
		case "blue":
			drawArc(10, 10, 0, Math.PI/2, "#84A4C7");
			var audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
			audio.play()
			await sleep(500);
			drawArc(10, 10, 0, Math.PI/2, "#094a8f");
			break;
		case "yellow":
			drawArc(-10, 10, Math.PI/2, Math.PI, "#EADC9B");
			var audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
			audio.play()
			await sleep(500);
			drawArc(-10, 10, Math.PI/2, Math.PI, "#cca707");
			break;
		default:
			break;
	}
}

function drawArc(xOff, yOff, startAngle, endAngle, color)
{
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var x = canvas.width / 2;
	var y = canvas.height / 2;
	var radius = 180;
	context.lineWidth = 80;

	context.beginPath();
	context.arc(x+xOff, y+yOff, radius, startAngle, endAngle, false);
	context.strokeStyle = color;
	context.stroke();
}

function sleep(ms) 
{
	return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) 
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
