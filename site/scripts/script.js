//// * ------------------------------------ ПЕРЕМЕННЫЕ -----------------------------------------------
var table = document.getElementById('tictactoe');
var cells = table.getElementsByClassName('cell');
var contrCont = document.querySelector('.controls-container');
var startButton = contrCont.querySelector('input[type="button"]');
var userMode;
var userLogin;
var whoTurn;

const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]
var virtualBoard;

const playerX = 'X';
const playerO = 'O';

//// * ------------------------------------ Функции -----------------------------------------------

function startGame() {
	document.querySelector(".endgame").style.display = "none";

    var loginField = contrCont.querySelector('input[name = "Login"]');
    var gameModeField = contrCont.querySelector('select[name = "gameMode"]')
    
    userMode = gameModeField.options[gameModeField.selectedIndex].value;
    userLogin = loginField.value;

    virtualBoard = Array.from(Array(9).keys());
	
    for (var i = 0; i < cells.length; i++) {
		cells[i].addEventListener('click', turnClick, false);
        
        cells[i].addEventListener('mouseover', (e) => {
            e.target.classList.add('selected');
        });
        cells[i].addEventListener('mouseout', (e) => {
            e.target.classList.remove('selected');
        });
	}

    whoTurn = playerX;
}

function checkStyleDisplayTable() {
    if (table.style.display != "table") { 
        table.style.display = "table" 
    };
}

function clearTable() {
    for(let i = 0; i < cells.length; i++) {
        cells[i].classList.remove('xFig');
        cells[i].classList.remove('oFig');
        cells[i].style.backgroundColor = '#78cdabec';
    }
}

function turnClick(event) {
    if (typeof virtualBoard[event.target.id] == 'number') {
        if (userMode == "player-player") {
            if (whoTurn == "X") {
                turn(event.target.id, playerX);
                whoTurn = "O";
                checkDraw();
            } else {
                turn(event.target.id, playerO);
                whoTurn = "X";
                checkDraw();
            }
        } else {
            turn(event.target.id, playerX);

            if (!checkWin(virtualBoard, playerX) && !checkDraw()) {
                turn(bestSpot(), playerO);
            }
        }
    }
}

function turn(eId, player) {
    virtualBoard[eId] = player;

    if(player == playerX) {
        cells[eId].classList.add('xFig');
    } else if(player == playerO) {
        cells[eId].classList.add('oFig');
    }

	let gameWon = checkWin(virtualBoard, player);
	
    if (gameWon) {
        gameOver(gameWon)
    } 
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function checkDraw() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("НИЧЬЯ!")
		return true;
	}
	return false;
}

function emptySquares() {
	return virtualBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
	return minimax(virtualBoard, playerO).index;
}

function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (checkWin(newBoard, playerX)) {
		return {score: -10};
	} else if (checkWin(newBoard, playerO)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == playerO) {
			var result = minimax(newBoard, playerX);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, playerO);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === playerO) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		cells[index].style.backgroundColor =
			gameWon.player == playerX ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
    if (userMode == "player-ii") {
	    declareWinner(gameWon.player == playerX ? `${userLogin}, чудом выграл у ПК` : `${userLogin}, позорно проиграл ПК`);
    } else {
        declareWinner(gameWon.player == playerX ? `Победу одержал Х` : `Победу одержал О`);
    }
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}
//// * ------------------------------------ Инициализация -----------------------------------------------


startButton.addEventListener('click', ()=> {
    var loginField = contrCont.querySelector('input[name = "Login"]');
    var gameModeField = contrCont.querySelector('select[name = "gameMode"]')
    
    userMode = gameModeField.options[gameModeField.selectedIndex].value;
    userLogin = loginField.value;

    if(userLogin.length > 1){
        checkStyleDisplayTable();
        clearTable();
        startGame();
    } else {
        alert("Чтобы начать игру необходимо ввести логин");
    }
    
});

//// * ------------------------------------ Игровой процесс -----------------------------------------------

if (table == null) {
    console.error('EROR');
}


