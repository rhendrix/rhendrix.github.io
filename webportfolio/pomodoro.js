var endTime;
var length;
var now;
var interval;
var started = false;
var onBreak = true;

//start up function
document.addEventListener('DOMContentLoaded', resetTimer, false);

function resetTimer()
{
	//draw circle
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var x = canvas.width / 2;
	var y = canvas.height / 2;
	var radius = x-10;
	context.beginPath();
	context.arc(x, y, radius, 0, 2*Math.PI, false);
	context.lineWidth = 2;
	context.strokeStyle = "#99CC00";
	context.stroke();
	
	//set up timer
	var t = parseInt(document.getElementById("session").value);
	document.getElementById("curTime").innerHTML = t;

	started = false;
	onBreak = true;
}

function handleStart()
{
	if(started)
	{
		clearInterval(interval);
		resetTimer();
		return;
	}
	else
	{
		started = true;
		startTimer();
		return;
	}
}

function startTimer()
{
	if(!onBreak)
	{
		onBreak = true;
		document.getElementById("curTimer").innerHTML = "Break";
		length = parseInt(document.getElementById("break").value) * 60 * 1000;
	}
	else
	{
		onBreak = false;
		document.getElementById("curTimer").innerHTML = "Session";
		length = parseInt(document.getElementById("session").value) * 60 * 1000;
	}
	endTime = length + (new Date().getTime());
	interval = setInterval(handleTimer, 500);
}

function startBreak()
{

	endTime = length + (new Date().getTime());
	interval = setInterval(handleTimer, 500);
}

function handleTimer()
{
	now = new Date().getTime();

	var diff = endTime - now;

	var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((diff % (1000 * 60)) / 1000);
	seconds = "00" + seconds;
	seconds = seconds.substr(seconds.length-2);
	document.getElementById("curTime").innerHTML = minutes + ":" + seconds;

	//update canvas
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
	var x = canvas.width / 2;
	var y = canvas.height / 2;
	var radius = x-10;
	var startAngle = 0;
	var endAngle = (diff/length) * 2 * Math.PI;

	//complete portion
	context.beginPath();
	context.arc(x, y, radius, startAngle, endAngle, false);
	context.lineWidth = 2;
	context.strokeStyle = "#99CC00";
	context.stroke();

	//incomplete portion
	startAngle = endAngle;
	endAngle = 2 * Math.PI;

	context.beginPath();
	context.arc(x, y, radius, startAngle, endAngle, false);
	context.lineWidth = 2;
	context.strokeStyle = "red";
	context.stroke();

	if(diff < 0)
	{
		clearInterval(interval);
		document.getElementById("curTime").innerHTML = "";
		var audio = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
		audio.play();
		startTimer();
	}
}
