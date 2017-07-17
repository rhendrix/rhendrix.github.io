document.addEventListener("submit", searchWiki);

function searchWiki(event)
{
	event.preventDefault();

	//get search string
	sbox = document.getElementById("search");
	searchStr = sbox.value;
	searchStr = searchStr.replace(/\s+/g, "+");

	//generate url
	var url = "https://www.wikipedia.org/w/api.php?action=opensearch";
	url += "&search=" + searchStr;
	url += "&format=json";
	url += "&callback=displayResults";

	//jsonp script
	var script = document.createElement('script');
	script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);

	return false;
}

function displayResults(results)
{
	var resElem = document.getElementById("results");
	
	//clear results element
	while(resElem.firstChild) resElem.removeChild(resElem.firstChild);

	var newRes, resLink;
	for(var i=0;i<results[1].length;i++)
	{
		resLink = document.createElement("a");
		newRes = document.createElement("div");
		resLink.appendChild(newRes);
		newRes.id = "resBox";

		newRes.innerHTML = "\n<h2>" + results[1][i] + "</h2>\n";
		newRes.innerHTML += "<p>" + results[2][i] + "</p>\n";

		resLink.href = results[3][i];
		resLink.target = "_blank";
		resElem.appendChild(resLink);
	}
	resElem.innerHtml = results;
	console.log(results);
}
