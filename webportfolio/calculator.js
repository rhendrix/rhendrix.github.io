function newInput(ni)
{
	exp = document.getElementById("exp");
	
	exp.innerHTML += ni;
}

function clearInput()
{
	exp = document.getElementById("exp");
	exp.innerHTML = "";
}

function submitInput()
{
	exp = document.getElementById("exp");

	try
	{
		v = parseFloat(eval(exp.innerHTML).toFixed(5));
		exp.innerHTML = v;
	}
	catch(e)
	{
		exp.innerHTML = "Error";
	}
}
