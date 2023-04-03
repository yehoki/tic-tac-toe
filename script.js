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

    const rows = 3;
    const cols = 3;
    const board = [];

    // create the gameboard as a 2d array of 0's to begin with
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push(0);
        }
    }
    
    // retrieving the board itself
    const getBoard = () => board;
    return {
        getBoard
    };
})();

console.log(gameBoard.getBoard());


// displayController module

const displayController = (() => {
    const display = 0;
})();


// players factory

const Person = (name) => {
    const sayName = () => console.log(`The name: ${name}`);
    return {sayName};
}

const newName = Person('newName');
newName.sayName();