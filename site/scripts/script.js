//// * ------------------------------------ ПЕРЕМЕННЫЕ -----------------------------------------------
var table = document.getElementById('tictactoe');
var cells = table.getElementsByClassName('cell');
var contrCont = document.querySelector('.controls-container');
var startButton = contrCont.querySelector('input[type="button"]');

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
var origBoard;

const playerX = 'X';
const playerO = 'O';

//// * ------------------------------------ Функции -----------------------------------------------

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	
    origBoard = Array.from(Array(9).keys());
	
    for (var i = 0; i < cells.length; i++) {
		cells[i].addEventListener('click', turnClick, false);
        
        cells[i].addEventListener('mouseover', (e) => {
            e.target.classList.add('selected');
        });
        cells[i].addEventListener('mouseout', (e) => {
            e.target.classList.remove('selected');
        });
	}
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
    }
}

function turnClick(event) {
	turn(event.target, playerX)
    
    if (!checkWin(origBoard, playerX) && !checkDraw()) {
        turn(bestSpot(), playerO);
    }

}

function turn(eId, player) {
    origBoard[eId] = player;

    if(player == playerX) {
        eId.classList.add('xFig');
    } else if(player == playerO) {
        cells[eId].classList.add('oFig');
    }

	let gameWon = checkWin(origBoard, player);
	
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
	return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
	return minimax(origBoard, playerO).index;
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
	declareWinner(gameWon.player == playerX ? "Вы выграли!" : "Вы проиграли!");
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}
//// * ------------------------------------ Инициализация -----------------------------------------------


startButton.addEventListener('click', ()=> {
    var loginField = contrCont.querySelector('input[name = "Login"]');
    var gameModeField = contrCont.querySelector('select[name = "gameMode"]')
    var userLogin = loginField.value;
    var userMode = gameModeField.options[gameModeField.selectedIndex].value;
    checkStyleDisplayTable();
    clearTable();
    startGame();
});

//// * ------------------------------------ Игровой процесс -----------------------------------------------

if (table == null) {
    console.error('EROR');
}





/// работает
// for(let i = 0; i < cells.length; i++) {
//         cells[i].addEventListener('mouseover', (e) => {
//             e.target.classList.add('selected');
//         });
//         cells[i].addEventListener('mouseout', (e) => {
//             e.target.classList.remove('selected');
//         });
//         cells[i].addEventListener('click', (e) => {
//             e.target.classList.add('xFig');
//         });
// }
