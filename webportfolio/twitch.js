channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function getChannels()
{
	for(var i=0;i<channels.length;i++)
	{
		var url = "https://wind-bow.gomix.me/twitch-api/channels/";
		url += channels[i];
		url += "?callback=:handleChannel";

		var script = document.createElement("script");
		script.src = url;
		document.getElementsByTagName("head")[0].append(script);
	}
}

function handleChannel(channel)
{
	//create container
	chanDiv = document.createElement("div");
	chanDiv.className = "chanDiv";

	//check if channel exists

	//handle logo
	chanImg = document.createElement("img");
	chanImg.className = "chanImg";
	chanImg.src = channel.logo;
	chanImg.onerror = "this.src=\"\""
	chanDiv.append(chanImg);

	//handle name/link
	chanLink = document.createElement("a");
	chanLink.className = "chanLink";
	chanLink.href = channel.url;
	chanLink.innerHTML = channel.display_name;

	//set up for status/game
	chanStatus = document.createElement("p");
	chanStatus.className = "chanStatus";
	chanStatus.id = channel.name;
	chanStatus.innerHTML = "Offline";

	//elements to container
	chanDiv.append(chanImg);
	chanDiv.append(chanLink);
	chanDiv.append(chanStatus);

	//add container to parent
	document.getElementById("content").append(chanDiv);

	//handle status/game
	var url = "https://wind-bow.gomix.me/twitch-api/streams/";
	url += channel.name;
	url += "?callback=:handleStatus";

	var script = document.createElement("script");
	script.src = url;
	document.getElementsByTagName("head")[0].append(script);
}

function handleStatus(data)
{
	if(data.stream !== null)
	{
		chanStatus = document.getElementById(data.stream.channel.name);
		chanStatus.innerHTML = data.stream.channel.game;
		chanStatus.parentElement.style.backgroundColor = "#a239cA";
	}
}

document.addEventListener('DOMContentLoaded', getChannels, false);
