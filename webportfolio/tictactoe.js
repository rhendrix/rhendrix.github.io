var board = ["", "", "", "", "", "", "", "", ""];
var playerTurn;
var playerTeam;
var computerTeam;

function startGame(pt)
{
	//clear board
	for(var i=0;i<9;i++) setCell(i, "");

	playerTeam = pt;
	if(playerTeam == "X") 
	{
		computerTeam = "O";
		playerTurn = true;
	}
	else 
	{
		computerTeam = "X";
		playerTurn = false;
		computerTurn();
	}
	return;
}

function playerClick(cell)
{
	if(!playerTurn) return;

	if(board[cell] != "") return;

	setCell(cell, playerTeam);

	gameover = checkForWin();
	if(gameover) return;

	playerTurn = false;
	computerTurn();
}

function computerTurn()
{
	var cell = Math.floor(Math.random() * 10);
	while(board[cell] != "")
	{
		cell = Math.floor(Math.random() * 10);
	}
	setCell(cell, computerTeam);

	gameover = checkForWin();
	if(gameover) return;

	playerTurn = true;
}

function setCell(cell, val)
{
	board[cell] = val;
	document.getElementById("c" + cell).innerHTML = val;
}

function checkForWin()
{
	if(board[0] == board[1] && board[1] == board[2] && board[0] != "")
	{
		declareWinner(0);
	}
	else if(board[3] == board[4] && board[4] == board[5] && board[3] != "")
	{
		declareWinner(3);
	}
	else if(board[6] == board[7] && board[7] == board[8] && board[6] != "")
	{
		declareWinner(6);
	}
	else if(board[0] == board[3] && board[3] == board[6] && board[0] != "")
	{
		declareWinner(0);
	}
	else if(board[1] == board[4] && board[4] == board[7] && board[1] != "")
	{
		declareWinner(1);
	}
	else if(board[2] == board[5] && board[5] == board[8] && board[2] != "")
	{
		declareWinner(2);
	}
	else if(board[0] == board[4] && board[4] == board[8] && board[0] != "")
	{
		declareWinner(0);
	}
	else if(board[2] == board[4] && board[4] == board[6] && board[2] != "")
	{
		declareWinner(2);
	}
	else
	{
		for(var i=0;i<9;i++) 
		{
			if(board[i] == "") return false;
		}
		declareWinner(-1);
	}
	return true;
}

function declareWinner(winCell)
{
	gameover = true;

	if(winCell == -1)
	{
		alert("Draw!");
	}
	else
	{
		if(board[winCell] == playerTeam) alert("You win!");
		else alert("Computer Wins!");
	}

	//start new game
	setTimeout(startGame(playerTeam), 0);
	return;
}
