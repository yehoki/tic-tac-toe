// Store the gameboard as an array inside of a gameboard object

// Players will be stored inside objects

// Object to control the flow of the game i.e. check if game over, win, loss, draw.

/*
3 rows 3 columns in a gameboard

Create a function inside of the gameController which creates the empty grid, 
and in turn which creates event listeners, dictates who's turn it is and so on.
*/

//------------------------------------------------------------------------------------------------------
// players factory
//------------------------------------------------------------------------------------------------------

const Person = (name) => {
  const sayName = () => console.log(`The name: ${name}`);
  return { sayName };
};

//------------------------------------------------------------------------------------------------------
// entry factory - represents each entry that we add to the grid
//------------------------------------------------------------------------------------------------------

const entry = () => {
  let value = 0;

  const addValue = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    getValue,
    addValue,
  };
};

//------------------------------------------------------------------------------------------------------
// gameBoard module
//------------------------------------------------------------------------------------------------------

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
    console.log(printed, "printed");
  };

  // gets an array of all valid moves
  const checkValidMoves = () => {
    const validMoves = [];
    board.forEach((row, rowIndex) =>
      row.forEach((col, colIndex) => {
        if (col.getValue() === 0) {
          validMoves.push([rowIndex.toString(), colIndex.toString()]); // toString the numbers here since we are comparing strings later
        }
      })
    );
    return validMoves;
  };

  // Checks if the move is valid
  const isValidMove = (move) => {
    const validMoves = JSON.stringify(checkValidMoves());
    return validMoves.indexOf(JSON.stringify(move)) !== -1 ? true : false;
  };

  // add entry value to the board
  const addEntry = (move, entryValue) => {
    board[move[0]][move[1]].addValue(entryValue);
  };

  // retrieving the board itself
  const getBoard = () => board;
  return {
    getBoard,
    printBoard,
    checkValidMoves,
    isValidMove,
    checkValidMoves,
    addEntry,
  };
})();

gameBoard.printBoard();
console.log(gameBoard.checkValidMoves(), "check move");

console.log(gameBoard.isValidMove([0, 2]), "check moveeee");

//------------------------------------------------------------------------------------------------------
// gameController module
//------------------------------------------------------------------------------------------------------

const gameController = ((
  playerOne = "Player One",
  playerTwo = "Player Two"
) => {
  const players = [
    {
      name: playerOne,
      entryValue: 1,
    },
    {
      name: playerTwo,
      entryValue: 2,
    },
  ];

  // Manually set the first player to be player one
  // Implementing a coin toss/randomness function to dictate who goes first here is an idea.
  let currentPlayer = players[0];

  const getCurrentPlayer = () => currentPlayer;

  // When run, checks which player it is, and switches to the other player in the game
  const switchTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  //   const makeNewRound = () => {};

  return {
    getCurrentPlayer,
    switchTurn,
  };
})();

//------------------------------------------------------------------------------------------------------
// screenController module
// Used to display the current information in the DOM
//------------------------------------------------------------------------------------------------------

const screenController = (() => {
  const board = gameBoard.getBoard();
  const boardGrid = document.querySelector(".game-board");
  const main = document.querySelector('main');
  const turnMessage = document.createElement('p');
  main.appendChild(turnMessage);
  

  const getEntry = (value) => {
    return value === 0 ? "" : toEntry(value);
  };

  const toEntry = (value) => {
    return value === 1 ? "X" : "O";
  };

  const makeBoard = () => {
    boardGrid.textContent = "";
    board.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        const entryButton = document.createElement("button");
        entryButton.classList.add("entry");
        entryButton.dataset.row = rowIndex;
        entryButton.dataset.column = colIndex;
        entryButton.textContent = getEntry(col.getValue());
        boardGrid.appendChild(entryButton);
        console.log(col.getValue(), col.getValue() === 0);
      });
    });
    turnMessage.textContent = `It is ${gameController.getCurrentPlayer().name}'s turn.`;
  };

  const handleGridClick = (e) => {
    const rowIndex = e.target.dataset.row;
    const colIndex = e.target.dataset.column;

    if (!rowIndex || !colIndex) return;
    console.log(
      gameBoard.isValidMove([rowIndex, colIndex]),
      "check",
      rowIndex,
      colIndex,
      gameBoard.checkValidMoves()
    );
    if (gameBoard.isValidMove([rowIndex, colIndex])) {
      console.log(gameController.getCurrentPlayer());
      gameBoard.addEntry(
        [rowIndex, colIndex],
        gameController.getCurrentPlayer().entryValue
      );
      gameController.switchTurn();
      makeBoard();
      // change the value on the button;
    } else {
        alert('This is not a valid input!');
    }
    //Functionality here what happens after button press
  };

  boardGrid.addEventListener("click", handleGridClick);

  console.log(board, "screenControl");

  return {
    makeBoard
  }
})();

screenController.makeBoard();
