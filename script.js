const gameboard = (function createGameboard() {
    let grid = [];
    for (let i = 1; i < 10; i++) {
        grid.push(createCell(i));
    }

    return {grid};
})();

function createPlayer(name) {
    const game_name = "Player " + name;
    let wins = 0;
    const getWins = () => wins;
    const giveWins = () => wins++;

    return {game_name, getWins, giveWins};
}

function createCell(i) {
    const cell_id = i;
    const state = "";
    
    return {cell_id, state};
}
