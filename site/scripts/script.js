//// * ------------------------------------ ПЕРЕМЕННЫЕ -----------------------------------------------
var table = document.getElementById('tictactoe');
var cells = table.getElementsByTagName('td');
var rows = table.getElementsByTagName('tr');

cells = [];

var contrCont = document.querySelector('.controls-container');
var startButton = contrCont.querySelector('input[type="button"]');
//// * ------------------------------------ Функции -----------------------------------------------


//// * ------------------------------------ Инициализация -----------------------------------------------

if (table == null) {
    console.error('EROR');
}

for(let i = 0; i < rows.length; i++)
{
    cells[i] = rows[i].getElementsByTagName('td');
}

for(let r= 0; r < cells.length; r++) {
    for(let c=0; c<cells[r].length; c++){
        cells[r][c].addEventListener('mouseover', (e) => {
            e.target.classList.add('selected');
        });
        cells[r][c].addEventListener('mouseout', (e) => {
            e.target.classList.remove('selected');
        });

        cells[r][c].addEventListener('click', (e) => {
            e.target.classList.add('xFig');
        });
    }
}

startButton.addEventListener('click', ()=> {
    var loginField = contrCont.querySelector('input[name = "Login"]');
    var gameModeField = contrCont.querySelector('select[name = "gameMode"]')
    

    var userLogin = loginField.value;
    var userMode = gameModeField.options[gameModeField.selectedIndex].value;
    //alert(userLogin + " " + userMode);
    checkStyleDisplayTable();
    clearTable();




});


function checkStyleDisplayTable() {
    if (table.style.display != "table") { 
        table.style.display = "table" 
    };
}

function clearTable() {
    
}



