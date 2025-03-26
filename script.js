const gameboard = (function createGameboard() {
    let grid = [];
    for (let i = 1; i < 10; i++) {
        grid.push(createCell(i));
    }    

    const winCondition = false;
    const getGrid = () => grid;
    const printGrid = function() {
        let grid_string = "";
        let i = 0;
        gameboard.getGrid().forEach(cell => {
            if(i === 3 | i === 6) {
                grid_string += "\n";
            }
            grid_string += cell.state;
            i++;
        });
        return console.log(grid_string);
    }

    const draw = function(player1, player2) {
        const position = prompt("Tell which cell to draw: 1-9");
        if (grid[position-1].state === "-") {
            if (player1.myTurn) {
                grid[position-1].state = player1.my_symbol;
                printGrid(); 
            } else {
                grid[position-1].state = player2.my_symbol;
                printGrid(); 
            }
        }else {
            console.log("You can't draw this cell.")
        }
    }
    return {getGrid, printGrid, draw, winCondition};
})();

function createCell(i) {
    const cell_id = i;
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
        console.log("State of Player's 1 turn: " + player1.myTurn)
        console.log("State of Player's 2 turn: " + player2.myTurn)
    } else if (player2.myTurn === true) {
        gameboard.draw(player1, player2);
        player2.myTurn = false;
        player1.myTurn = true;
        console.log("State of Player's 1 turn: " + player1.myTurn)
        console.log("State of Player's 2 turn: " + player2.myTurn)
    }
}