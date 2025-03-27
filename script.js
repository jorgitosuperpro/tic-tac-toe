const gameboard = (function createGameboard() {
    let grid = [[], [], []];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            grid[i][j] = createCell(i,j);
        }
    }
    let winCondition = false;
    const getGrid = () => grid;
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
    const draw = function(player1, player2) {
        const position_row = prompt("Tell which row to draw: 0-2");
        const position_column = prompt("Tell which columnt to draw: 0-2");
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
                console.log(player.game_name + " wins.")
                break;
            }
        }
    }
    return {getGrid, printGrid, draw, winCondition, checkWinCondition};
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

const player1 = createPlayer("1", "O");
const player2 = createPlayer("2", "X");

player1.myTurn = true;
gameboard.printGrid();

while(gameboard.winCondition === false) {
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
