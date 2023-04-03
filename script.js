// Store the gameboard as an array inside of a gameboard object

// Players will be stored inside objects

// Object to control the flow of the game i.e. check if game over, win, loss, draw.

/*
3 rows 3 columns in a gameboard

Create a function inside of the gameController which creates the empty grid, 
and in turn which creates event listeners, dictates who's turn it is and so on.
*/

// players factory

const Person = (name) => {
    const sayName = () => console.log(`The name: ${name}`);
    return { sayName };
  };
  
  const newName = Person("newName");
  newName.sayName();
  
  // entry factory - represents each entry that we add to the grid
  
  const entry = () => {
    let value = 0;
  
    const addValue = (player) => {
      value = player;
    };
  
    const getValue = () => value;
  
    return {
      addValue,
      getValue,
    };
  };
  
// gameBoard module

const gameBoard = (() => {
  const rows = 3;
  const cols = 3;
  const board = [];

  // create the gameboard as a 2d array of 0's to begin with
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(entry());
    }
  }

  const printBoard = () => {
    const printed = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(printed, 'printed');
  };

  // retrieving the board itself
  const getBoard = () => board;
  return {
    getBoard,
    printBoard,
  };
})();

gameBoard.printBoard();

// gameController module

const gameController = ((
  playerOne = "Player One",
  playerTwo = "Player Two"
) => {
  const players = [
    {
      name: playerOne,
      entry: "X",
    },
    {
      name: playerTwo,
      entry: "O",
    },
  ];

  // Manually set the first player to be player one
  // Implementing a coin toss/randomness function to dictate who goes first here is an idea.
  let currentPlayer = players[0];

  // When run, checks which player it is, and switches to the other player in the game
  const switchTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const getCurrentPlayer = () => currentPlayer;

  const makeNewRound = () => {};
})();


/* screenController module 
    Used to display the current information in the DOM
*/

const screenController = (() => {
  const board = gameBoard.getBoard();
  const boardGrid = document.querySelector(".game-board");

  boardGrid.textContent = "";

  board.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const entryButton = document.createElement("button");
      entryButton.classList.add("entry");
      entryButton.dataset.row = rowIndex;
      entryButton.dataset.column = colIndex;
      entryButton.textContent = col.getValue();
      boardGrid.appendChild(entryButton);
    });
  });

  const handleGridClick = (e) => {
    const rowIndex = e.target.dataset.row;
    const colIndex = e.target.dataset.column;

    if (!rowIndex || !colIndex) return;
    console.log('Button PRESS!');

    //Functionality here what happens after button press
  }


  boardGrid.addEventListener('click', handleGridClick);

  console.log(board, "screenControl");
})();

