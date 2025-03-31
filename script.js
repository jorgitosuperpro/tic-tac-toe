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
    const draw = function(player1, player2, posRow, posCol){
        if (grid[posRow][posCol].state === "-") {
            if (player1.myTurn) {
                grid[posRow][posCol].state = player1.my_symbol;
                printGrid();
            } else {
                grid[posRow][posCol].state = player2.my_symbol;
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
                leaderboard.innerHTML = "Player 1 O: " + player1.getWins() + " Player 2 X: " + player2.getWins();
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
                leaderboard.innerHTML = "Player 1 O: " + player1.getWins() + " Player 2 X: " + player2.getWins();
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
            leaderboard.innerHTML = "Player 1 O: " + player1.getWins() + " Player 2 X: " + player2.getWins();
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
                leaderboard.innerHTML = "Player 1 O: " + player1.getWins() + " Player 2 X: " + player2.getWins();
            }
        }
        //is it a tie?
        let isATie = false;
        isATie = gameboard.getGrid().every(row => row.every(cell => cell.state != "-"));
        if (isATie) gameboard.winCondition = true;
    }
    //reset grid
    const reset = function() {
        initial_grid();
        //quitar child html
    }
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
    let my_image;
    if (symbol === "X") {
        my_image = "images/cross.svg";
    } else {
        my_image = "images/circle.svg";
    }
    const getWins = () => wins;
    const giveWins = () => wins++;
    const myTurn = () => false;
    return {game_name, my_symbol, getWins, giveWins, myTurn, my_image};
}

const player1 = createPlayer("1", "O");
const player2 = createPlayer("2", "X");
play();
const leaderboard = document.querySelector(".leaderboard");
leaderboard.innerHTML = "Player 1 O: " + player1.getWins() + " Player 2 X: " + player2.getWins();


function play() {
    createGrid();
    createSymbol(player1, player2);
}

function createGrid() {
    gameboard.initial_grid();
    player1.myTurn = true;
    gameboard.printGrid();
    const container = document.querySelector(".gameboard");
    container.style.setProperty('--grid-rows', 3);
    container.style.setProperty('--grid-cols', 3);
    let cell;
    for (let i = 0; i < 9; i++) {
        cell = document.createElement("div");
        cell.setAttribute("id", i);
        container.appendChild(cell).className = "grid-item";
    }
}

function createSymbol(player1, player2) {
    let gridItems = document.querySelectorAll(".grid-item");
    function printSymbol(event) {
        const item = event.target;
    
        if (gameboard.winCondition) {
            removeEvent(gridItems, printSymbol); 
            return; 
        }
    
        const myimage = document.createElement("img");
        item.appendChild(myimage);
        itemIsClicked(item);
        if (player1.myTurn) {
            myimage.setAttribute("src", player1.my_image);
            player1.myTurn = false;
            player2.myTurn = true;
        } else {
            myimage.setAttribute("src", player2.my_image);
            player1.myTurn = true;
            player2.myTurn = false;
        }
        gameboard.checkWinCondition(player1);
        gameboard.checkWinCondition(player2);
        item.removeEventListener("click", printSymbol);
    }
    gridItems.forEach(item => {
        item.addEventListener("click", printSymbol);
    });
    const reset = document.querySelector("button");
    reset.addEventListener("click", function removeImagesAndEventListener() {
        gameboard.reset();
        gridItems.forEach(item => {
            if(item.hasChildNodes()) {
                item.removeChild(item.firstChild);
            }
        });
        const container = document.querySelector(".gameboard");
        while(container.hasChildNodes()) {
            container.removeChild(container.firstChild);
        }
        gameboard.winCondition = false;
        player1.myTurn = true;
        player2.myTurn = false;
        createGrid();
        createSymbol(player1, player2);
    });
}

function itemIsClicked(item) {
    let id = item.getAttribute("id");
    if (id == 0) {
        gameboard.draw(player1, player2, 0, 0);
    } else if (id == 1) {
        gameboard.draw(player1, player2, 0, 1);
    } else if (id == 2) {
        gameboard.draw(player1, player2, 0, 2);
    } else if (id == 3) {
        gameboard.draw(player1, player2, 1, 0);
    } else if (id == 4) {
        gameboard.draw(player1, player2, 1, 1);
    } else if (id == 5) {
        gameboard.draw(player1, player2, 1, 2);
    } else if (id == 6) {
        gameboard.draw(player1, player2, 2, 0);
    } else if (id == 7) {
        gameboard.draw(player1, player2, 2, 1);
    } else if (id == 8) {
        gameboard.draw(player1, player2, 2, 2);
    }
}

function removeEvent(gridItems, printSymbol) {
    gridItems.forEach(item => {
        item.removeEventListener("click", printSymbol);
    })
}