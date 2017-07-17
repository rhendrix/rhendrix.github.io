function toF()
{
	//Swap buttons
	document.getElementById("FBut").style.display = "none";
	document.getElementById("CBut").style.display = "inline";

	//Swap temps
	document.getElementById("FTemp").style.display = "inline";
	document.getElementById("CTemp").style.display = "none";
}

function toC()
{
	//Swap buttons
	document.getElementById("FBut").style.display = "inline";
	document.getElementById("CBut").style.display = "none";

	//Swap temps
	document.getElementById("FTemp").style.display = "none";
	document.getElementById("CTemp").style.display = "inline";
}

function getLocation()
{
	//get user location
	navigator.geolocation.getCurrentPosition(getWeather);
}

function getWeather(pos)
{
	var latP = pos.coords.latitude;
	var longP = pos.coords.longitude;
	url = "http://api.openweathermap.org/data/2.5/weather?";
	url += "lat=" + latP
	url += "&lon=" + longP;
	url += "&units=metric"
	url += "&APPID=49f362cece10752de3a40d086fe6738b"
	url += "&callback=setWeather"

	var script = document.createElement('script');
	script.src = url;
	//document.getElementsByTagName('head')[0].appendChild(script);
	document.head.appendChild(script);
}

function setWeather(weather)
{
	//get temps
	FElem = document.getElementById("FTemp");
	CElem = document.getElementById("CTemp");
	temp = weather.main.temp;

	if(temp > 25)
	{
		document.body.style.background= "url(\"https://upload.wikimedia.org/wikipedia/commons/b/b3/Libya_4709_Idehan_Ubari_Luca_Galuzzi_2007.jpg\")";
	}
	else if(temp > 0)
	{
		document.body.style.background= "url(\"https://upload.wikimedia.org/wikipedia/commons/6/68/White_Oak_Park_%282541974899%29.jpg\")";
	}
	else
	{
		document.body.style.background= "url(\"https://upload.wikimedia.org/wikipedia/commons/0/07/Tingh%C3%B8j_Hammersh%C3%B8j_Kvorning_2010-01-08_edit_filtered.jpg\")";
	}

	CElem.innerHTML = temp + " C";
	FElem.innerHTML = (temp * 9/5 + 32) + " F";
}
