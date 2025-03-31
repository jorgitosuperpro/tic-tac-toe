# Tic-Tac-Toe Game with Animated, Modern UI

## Project Overview
A browser-based Tic Tac Toe game built with HTML, CSS, and JavaScript, featuring a modern UI and animations for an interactive player experience.

## What Was Done

### Project Setup
The project was organized with separate HTML, CSS, and JavaScript files, and a Git repository was initialized for version control.

### Gameboard and Logic
- Created a **Gameboard object** to represent the grid as an array.
- Developed **Player objects** to store player data (name, marker).
- Designed a **Game Control object** to manage the game flow, including turns, win conditions, and ties.
- Used **factory functions** and **IIFE (Immediately Invoked Function Expressions)** to minimize global code and ensure singleton instances.

### Console Logic
- Implemented game logic to check for wins, ties, and game termination.
- Tested the game using functions to simulate gameplay.

### DOM Interaction
- Developed a **Display Controller** to render the gameboard and handle player interactions via **click events**.
- Added logic to prevent players from marking already occupied squares.

### UI Enhancements
- Included a restart button, and a result display to show game outcomes (win/tie).

