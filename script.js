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

  const printBoard = () => {
    const printed = board.map((row) => row.map((cell) => cell));
    console.log(printed);
  };

  // retrieving the board itself
  const getBoard = () => board;
  return {
    getBoard,
    printBoard,
  };
})();

gameBoard.printBoard();

// displayController module

const displayController = ((
  playerOne = "Player One",
  playerTwo = "Player Two"
) => {
  const display = 0;
})();

/* screenController module 
    Used to display the current information in the DOM
*/

const screenController = (() => {
  const board = gameBoard.getBoard();
  const boardGrid = document.querySelector(".game-board");

  boardGrid.textContent = "";

  board.forEach((row) => {
    row.forEach((col) => {
      const entryButton = document.createElement("button");
      entryButton.classList.add('entry');
      entryButton.dataset.column = col;
      entryButton.textContent = col;
      boardGrid.appendChild(entryButton);
    });
  });
  console.log(board, "screenControl");
})();

// players factory

const Person = (name) => {
  const sayName = () => console.log(`The name: ${name}`);
  return { sayName };
};

const newName = Person("newName");
newName.sayName();
