function parseQuote(data)
{
	document.getElementById("quote").innerHTML = data.quoteText;
	document.getElementById("author").innerHTML = data.quoteAuthor;
	document.getElementById("tb").href = "https://twitter.com/intent/tweet?hashtags=quotes&text=\"" + data.quoteText + "\" " + data.quoteAuthor;
}

function getQuote()
{
	var script = document.createElement('script');
	script.src = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=parseQuote";
	document.getElementsByTagName('head')[0].appendChild(script);
}

document.addEventListener('DOMContentLoaded', function() 
{
	getQuote();
}, false);
