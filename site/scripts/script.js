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
//// * ------------------------------------ Функции -----------------------------------------------

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].addEventListener('click', turnClick, false);
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

function turnClick(square) {
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, huPlayer)
		if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
	}
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
