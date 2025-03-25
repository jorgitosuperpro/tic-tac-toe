const gameboard = (function createGameboard() {
    let grid = [];
    for (let i = 1; i < 10; i++) {
        grid.push(createCell(i));
    }    

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

    const draw = function() {
        const position = prompt("Tell which cell to draw: 1-9");
        if (grid[position-1].state === "-") {
            grid[position-1].state = "x";
            printGrid(); 
        }else {
            console.log("You can't draw this cell.")
        }
    }
    return {getGrid, printGrid, draw};
})();

function createCell(i) {
    const cell_id = i;
    const state = "-";

    return {cell_id, state};
}

function createPlayer(name) {
    const game_name = "Player " + name;
    let wins = 0;
    const getWins = () => wins;
    const giveWins = () => wins++;

    return {game_name, getWins, giveWins};
}

const player1 = createPlayer("1");
const player2 = createPlayer("2");
