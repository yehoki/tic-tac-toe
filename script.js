//------------------------------------------------------------------------------------------------------
// Players factory
//------------------------------------------------------------------------------------------------------

const Person = (name) => {
  const sayName = () => console.log(`The name: ${name}`);
  return { sayName };
};

//------------------------------------------------------------------------------------------------------
// Entry factory - represents each entry that we add to the grid
//------------------------------------------------------------------------------------------------------

const entry = () => {
  let value = 0;
  let place;

  const addValue = (player) => {
    value = player;
  };

  const assignPlace = (gridPlaceRow, gridPlaceCol) => {
    place = 3 * gridPlaceRow + gridPlaceCol;
  };

  const getPlace = () => place;

  const getValue = () => value;

  return {
    getValue,
    addValue,
    assignPlace,
    getPlace,
  };
};

//------------------------------------------------------------------------------------------------------
// gameBoard module
//------------------------------------------------------------------------------------------------------

const gameBoard = (() => {
  const rows = 3;
  const cols = 3;
  let board = [];

  // Initialise the gameboard as a 2D array of 0's
  const createBoard = () => {
    board = [];
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < cols; j++) {
        board[i].push(entry());
      }
    }
    board.map((row, rowIndex) =>
      row.map((cell, cellIndex) => cell.assignPlace(rowIndex, cellIndex))
    );
  };
  createBoard();

  // Used to console log the board for sanity checks
  const printBoard = () => {
    const printed = board.map((row) => row.map((cell) => cell.getValue()));
  };
  printBoard();

  // Converts the position to a place number: 0 is [0,0], 1 is [0,1],... 8 is [2,2] in array notation
  const toPlace = (rowIndex, colIndex) => rowIndex * 3 + colIndex;

  const fromPlaceToBoard = (place) => {
    if (place === 0) {
      return [0, 0];
    }
    let row = 0;
    let col = 0;
    let calcPlace = place;
    while (calcPlace > 0) {
      if (calcPlace % 3 === 0) {
        row += 1;
        calcPlace = calcPlace -= 3;
      } else {
        col += 1;
        calcPlace -= 1;
      }
    }
    return [row, col];
  };

  // returns an array of all valid moves
  const checkValidMoves = () => {
    const validMoves = [];
    board.forEach((row, rowIndex) =>
      row.forEach((col, colIndex) => {
        if (col.getValue() === 0) {
          validMoves.push(toPlace(rowIndex, colIndex).toString()); // toString the numbers here since we are comparing strings later
        }
      })
    );
    return validMoves;
  };

  // Checks if the move is valid
  const isValidMove = (move) => {
    const validMoves = checkValidMoves();
    return validMoves.indexOf(move) !== -1 ? true : false;
  };

  // Add entry value to the board
  const addEntry = (move, entryValue) => {
    const boardPlace = fromPlaceToBoard(move);
    board[boardPlace[0]][boardPlace[1]].addValue(entryValue);
  };

  // retrieving the board itself
  const getBoard = () => board;

  return {
    getBoard,
    printBoard,
    isValidMove,
    addEntry,
    createBoard,
    toPlace,
    checkValidMoves,
  };
})();

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
      moves: [],
    },
    {
      name: playerTwo,
      entryValue: 2,
      moves: [],
    },
  ];
  // array of all winning moves sorted;
  const winningMoves = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 7],
  ].sort();

  // Manually set the first player to be player one
  // Implementing a coin toss/randomness function to dictate who goes first here is an idea.
  let currentPlayer = players[0];

  const getCurrentPlayer = () => currentPlayer;


  // Runs a single move at a time
  const playMove = (move) => {
    currentPlayer.moves.push(screenController.toInt(move));
    currentPlayer.moves.sort();
    checkFinish();
    console.log(currentPlayer.moves, move, winningMoves);
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  // checks if the game is finished as a win/loss or a draw
  const checkFinish = () => {
    if (currentPlayer.moves.length > 2) {
        if (gameBoard.checkValidMoves().length === 0){
            console.log("It's a draw!");
            screenController.displayEnding("It's a draw!");
        }
        console.log('checking', currentPlayer.name);
        winningMoves.forEach((winningMove) => {
            if(winningMove.every(move => currentPlayer.moves.includes(move))){
                console.log(`WINNER ${currentPlayer.name}`);
                screenController.displayEnding(`${currentPlayer.name} won!`);
            }
        })
        console.log(gameBoard.checkValidMoves().length);
    }
  };

  const resetGame = () => {
    // resetting the game
  }

  return {
    getCurrentPlayer,
    playMove,
  };
})();

//------------------------------------------------------------------------------------------------------
// screenController module
// Used to display the current information in the DOM
//------------------------------------------------------------------------------------------------------

const screenController = (() => {
  let board = gameBoard.getBoard();
  const boardGrid = document.querySelector(".game-board");
  const restartButton = document.querySelector("#restart");
  const main = document.querySelector("main");
  const turnMessage = document.createElement("p");
  main.appendChild(turnMessage);
  const endingMessage = document.querySelector('.ending-message');

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
        entryButton.dataset.place = gameBoard.toPlace(rowIndex, colIndex);
        entryButton.textContent = getEntry(col.getValue());
        boardGrid.appendChild(entryButton);
      });
    });
    turnMessage.textContent = `It is ${
      gameController.getCurrentPlayer().name
    }'s turn.`;
  };

  makeBoard();

  const toInt = (value) => {
    return value == 0 ? 0 : (parseInt(value) || value);
  }

  const handleGridClick = (e) => {
    const place = e.target.dataset.place;

    if (!place) return;

    if (gameBoard.isValidMove(place)) {
      gameBoard.addEntry(place, gameController.getCurrentPlayer().entryValue);
      gameController.playMove(place);
      makeBoard();
    }
    else {
      alert("This is not a valid input!");
    }
    // Functionality here what happens after button press
  };

  // handling when the restart button is pressed
  const handleRestart = (e) => {
    gameBoard.createBoard();
    board = gameBoard.getBoard();
    makeBoard();
  };
  boardGrid.addEventListener("click", handleGridClick);
  restartButton.addEventListener("click", handleRestart);

  const displayEnding = (message) => {
    endingMessage.textContent = message;
    endingMessage.setAttribute('class', 'ending-message on');
    setTimeout(() => {
        endingMessage.setAttribute('class', 'ending-message');  
        endingMessage.textContent = "";
    }, 4000)
  }

  return {
    makeBoard,
    toInt,
    displayEnding
  };
})();
