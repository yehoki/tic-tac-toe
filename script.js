// Store the gameboard as an array inside of a gameboard object

// Players will be stored inside objects

// Object to control the flow of the game i.e. check if game over, win, loss, draw.


/*
3 rows 3 columns in a gameboard

Create a function inside of the displayController which creates the empty grid, 
and in turn which creates event listeners, dictates who's turn it is and so on.
*/



// gameBoard module

const gameBoard = (() => {
    const game = () => [[0, 0, 0],
                  [0, 0, 0],
                  [0, 0, 0]];
    return {
        game
    };
})();

console.log(gameBoard.game());



// displayController module

const displayController = (() => {
    const display = 0;
})();