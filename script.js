//create gameboard
const gameboard = (function createGameboard() {
    //grid variable is block scope so i cant target within global
    let grid = [[], [], []];
    //i create 2d grid 3x3 in each element i have a cell object
    const initial_grid = function() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                grid[i][j] = createCell(i,j);
            }
        }
        return grid;
    }
    //i establish wincondition false cause start of the game
    let winCondition = false;
    //retrieve grid for later ui development
    const getGrid = () => grid;
    //print grid for console
    const printGrid = function() {
    let grid_string = "";
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                grid_string += grid[i][j].state;
            }
            grid_string += "\n";
        }
        return console.log(grid_string);
    }
    //draw function to mark cells depending on which player's turn
    const draw = function(player1, player2) {
        let position_row = prompt("Tell which row to draw: 0-2");
        let position_column = prompt("Tell which columnt to draw: 0-2");
        if (grid[position_row][position_column].state === "-") {
            if (player1.myTurn) {
                grid[position_row][position_column].state = player1.my_symbol;
                printGrid(); 
            } else {
                grid[position_row][position_column].state = player2.my_symbol;
                printGrid(); 
            }
        }else {
            console.log("You can't draw this cell.")
        }
    }
    //check if someone has win
    const checkWinCondition = function(player) {
        //check horizontal
        for (let i =0; i < 3; i++) {
            let isMySymbol = false;
            for(let j = 0; j < 3; j++) {
                if (grid[i][j].state === player.my_symbol) {
                    isMySymbol = true;
                } else {
                    isMySymbol = false;
                    break;
                }
            }
            if (isMySymbol === true) {
                gameboard.winCondition = true;
                player.giveWins();
                console.log(player.game_name + " wins.")
                break;
            }
        }
        //check vertical
        for (let i =0; i < 3; i++) {
            let isMySymbol = false;
            for(let j = 0; j < 3; j++) {
                if (grid[j][i].state === player.my_symbol) {
                    isMySymbol = true;
                } else {
                    isMySymbol = false;
                    break;
                }
            }
            if (isMySymbol === true) {
                gameboard.winCondition = true;
                player.giveWins();
                console.log(player.game_name + " wins.")
                break;
            }
        }
        //check diagonal left 
        let isMySymbol = false;
        for (let i = 0; i < 3; i++) {
            if (grid[i][i].state === player.my_symbol) {
                isMySymbol = true;
            } else {
                isMySymbol = false;
                break;
            }
        }
        if (isMySymbol === true) {
            gameboard.winCondition = true;
            player.giveWins();
            console.log(player.game_name + " wins.")
        } else {
            //check diagonal right
            isMySymbol = false;
            for (let i = 2; i >= 0; i--) {
                if (grid[2-i][i].state === player.my_symbol) {
                    isMySymbol = true;
                } else {
                    isMySymbol = false;
                    break;
                }
            }
            if (isMySymbol === true) {
                gameboard.winCondition = true;
                player.giveWins();
                console.log(player.game_name + " wins.")
            }
        }
        //is it a tie?
        let isATie = false;
        isATie = gameboard.getGrid().every(row => row.every(cell => cell.state != "-"));
        if (isATie) gameboard.winCondition = true;
    }
    //reset grid
    const reset = ()=> initial_grid();
    //continue another game
    const nextGame = () => winCondition = false;
    return {getGrid, initial_grid, printGrid, draw, winCondition, checkWinCondition, reset, nextGame};
})();

function createCell(i,j) {
    const cell_id = ""+ i + j;
    const state = "-";

    return {cell_id, state};
}

function createPlayer(name, symbol) {
    const game_name = "Player " + name;
    let wins = 0;
    const my_symbol = symbol+"";
    const getWins = () => wins;
    const giveWins = () => wins++;
    const myTurn = () => false;
    return {game_name, my_symbol, getWins, giveWins, myTurn};
}

//DOM
const player1 = createPlayer("1", "O");
const player2 = createPlayer("2", "X");
nextGame();
function nextGame() {
    gameboard.initial_grid();
    player1.myTurn = true;
    gameboard.printGrid();
    gameboard.winCondition = false;
    gameboard.reset();
    while(gameboard.winCondition === false) {
        createDisplay();
        if (player1.myTurn === true) {
            gameboard.draw(player1, player2);
            player1.myTurn = false;
            player2.myTurn = true;
            gameboard.checkWinCondition(player1);
        } else if (player2.myTurn === true) {
            gameboard.draw(player1, player2);
            player2.myTurn = false;
            player1.myTurn = true;
            gameboard.checkWinCondition(player2);
        }
    }
}


function createDisplay() {
    const main_content = document.querySelector(".main-content");
    const display = document.createElement("div");
    main_content.appendChild(display);
    display.setAttribute("class", "gameboard");
    let displayGrid = document.createElement("div");
    displayGrid.innerHTML = "";
    displayGrid.setAttribute("class", "grid");
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            displayGrid.innerHTML += gameboard.getGrid()[i][j].state;
        }
        displayGrid.innerHTML += "<br>";
    }
    display.appendChild(displayGrid);
}