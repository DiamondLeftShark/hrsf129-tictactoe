console.log("Initializing...");

//global variable declarations

let xTurn= true;
let lastWinner = null;
let xWins = 0;
let oWins = 0;
let piecesPlaced = 0;
let rotateMode = false;
let currentBoard = ['-','-','-',
                      '-','-','-',
                      '-','-','-'];

//function declarations

//Check if current position is empty (-).  If so, set to the piece of the active player
//and switch to the next side's turn
function setPiece(event) {
  //console.log("Piece clicked: ", event.target.id);
  let position = event.target.id;

  if(xTurn && currentBoard[position] === '-')  {
    currentBoard[event.target.id] = 'X';
    event.target.innerHTML = 'X';
    piecesPlaced++;
    xTurn = !xTurn;
    if(rotateMode) {
      rotateBoard();
    }
    checkWinner();

  } else if(currentBoard[position]  === '-'){
    currentBoard[event.target.id] = 'O';
    event.target.innerHTML = 'O';
    piecesPlaced++;
    xTurn = !xTurn;
    if(rotateMode) {
      rotateBoard();
    }
    checkWinner();
  }
  console.log(currentBoard);
}

//event handler function for rotate mode.  Should only change rotate mode option
//at the beginning of a new game.
function setRotateMode () {
  if(piecesPlaced === 0) {
    rotateMode = !rotateMode;
    //if rotate mode is enabled, change text link to indicate the state to the user
    if(rotateMode) {
      document.getElementById('rotate').innerHTML ="Rotate mode enabled, watch for falling pieces!";
    //else, return text link to default value
    } else {
      document.getElementById('rotate').innerHTML = "Enable Rotate Mode";
    }
  }
}

//if rotate mode is enabled, rotate board 90 degrees: all pieces
//"fall" to the lowest unoccupied position after rotating
//top row becomes right column
//middle row becomes middle column
//bottom row becomes left column
function rotateBoard() {
  let topRow = currentBoard[0]+currentBoard[1]+currentBoard[2];
  let middleRow = currentBoard[3]+currentBoard[4]+currentBoard[5];
  let bottomRow = currentBoard[6]+currentBoard[7]+currentBoard[8];

  topRow = topRow.replace(/-/gi,'');
  middleRow = middleRow.replace(/-/gi,'');
  bottomRow = bottomRow.replace(/-/gi,'');

  topRow = topRow.padStart(3,'-');
  middleRow = middleRow.padStart(3,'-');
  bottomRow = bottomRow.padStart(3,'-');

  currentBoard = [bottomRow[0], middleRow[0], topRow[0],
                  bottomRow[1], middleRow[1], topRow[1],
                  bottomRow[2], middleRow[2], topRow[2]];

  //after rotating board, update DOM with new board state
  let cells = document.getElementsByTagName('td');
  for(let i = 0; i < currentBoard.length; i++){
    cells[i].innerHTML = currentBoard[i];
  }

}

//resets board to initial state
function clearBoard() {
  //remove all pieces
  piecesPlaced = 0;

  let cells = document.getElementsByTagName('td');
  for(let i = 0; i < currentBoard.length; i++){
    cells[i].innerHTML = '-';
    currentBoard[i] = '-';
  }

  //determine who goes first based on winner of last game.  Default to X
  //if no previous winner.
  if(lastWinner = 'O') {
    xTurn = false;
  } else {
    xTurn = true;
  }
  document.getElementById('reset').innerHTML = 'Flip the table!';
  console.log("Board reset!");
}

//Run after every piece is placed to check for a winner.
//If a player wins, update the reset element with text informing the players who won.
//If a tie, also inform the users
function checkWinner() {
  //console.log("Checking for a winner...");
  let winnerFound = false;
  let sideWon = null;

  //check to see if a player has won.
  // let cells = document.getElementsByTagName('td');
  // let boardState = [];
  // for(let i = 0; i < cells.length; i++) {
  //   boardState.push(cells[i].innerHTML);
  // }
  //console.log(boardState);

  //check rows (012 / 345 / 678)
  for(let i = 0; i < 9; i+=3) {
    if(sideWon === null) { //only check if a winner has not been found yet
      let row = currentBoard[i] + currentBoard[i+1] + currentBoard[i+2];
      sideWon = checkLine(row);
      winnerFound = !!sideWon; //if sideWon is not null, winnerFound will be set to true
    }
  }

  //check columns (036 / 147 / 258)
  for(let i = 0; i < 3; i++) {
    if(sideWon === null) {
      let column = currentBoard[i] + currentBoard[i+3] + currentBoard[i+6];
      sideWon = checkLine(column);
      winnerFound = !!sideWon;
    }
  }

  //diagonals (048 / 246)
  if(sideWon === null) {
    let leftDiag = currentBoard[0] + currentBoard[4] + currentBoard[8];
    let rightDiag = currentBoard[2] + currentBoard[4] + currentBoard[6];
    sideWon = checkLine(leftDiag) || checkLine(rightDiag);
    winnerFound = !!sideWon;
  }

  //check if a winner was found, or if there's a tie.  If win, increment
  //the correct counter and set lastWinner to the appropriate value
  if(winnerFound) {
    console.log("Winner winner chicken dinner!");
    lastWinner = sideWon;

    if(sideWon === 'X') {
      xWins++;
      document.getElementById('x-score').innerHTML = xWins;
    } else {
      oWins++;
      document.getElementById('o-score').innerHTML = oWins;
    }
    document.getElementById('reset').innerHTML = `${sideWon} wins!  Play again?`;

  } else if (piecesPlaced >= 9) {
    console.log("It's a draw!");
    document.getElementById('reset').innerHTML = "It's a draw!  Play again?";

  } else {
    console.log("Keep going...");
  }
}

//helper function to check if a given line contains all Xs or Os
//returns the winning side if true, else returns null
function checkLine(line) {
  if(line === 'XXX' || line === 'OOO') {
    //console.log("Winning line found!");
    return line[0];
  } else {
    return null;
  }
}

//helper function to set player name.  Called by name prompt when page is loaded
function setName (playerName, playerId) {
  if(playerId === 1) {
    document.getElementById('player-1').innerHTML = playerName;
  }
  if(playerId === 2) {
    document.getElementById('player-2').innerHTML = playerName;
  }
}

//event handler declarations
let board = document.getElementById('board');

board.addEventListener('click', event => {
  //console.log(event);
  //console.dir(event.target);
  setPiece(event);
});

document.getElementById('reset').addEventListener("click",clearBoard);
document.getElementById('rotate').addEventListener("click", setRotateMode);

//alert declarations
setName(prompt("Enter first player's name", "Player 1"), 1);
setName(prompt("Enter second player's name", "Player 2"), 2);

console.log("Script loaded.");


//OLD SCRIPTS, maintained under this line for reference
// document.getElementById("0").addEventListener("click", setPiece);
// document.getElementById("1").addEventListener("click", setPiece);
// document.getElementById("2").addEventListener("click", setPiece);
// document.getElementById("3").addEventListener("click", setPiece);
// document.getElementById("4").addEventListener("click", setPiece);
// document.getElementById("5").addEventListener("click", setPiece);
// document.getElementById("6").addEventListener("click", setPiece);
// document.getElementById("7").addEventListener("click", setPiece);
// document.getElementById("8").addEventListener("click", setPiece);