console.log("Initializing...");

let xTurn= true;
const playerPieces = ['X','O'];
let piecesPlaced = 0;

//function declarations

//Check if current position is empty (-).  If so, set to the piece of the active player
//and switch to the next side's turn
function setPiece(event) {
  //console.log("Piece clicked");
  if(xTurn && event.target.innerHTML === '-')  {
    event.target.innerHTML = 'X';
    piecesPlaced++;
    xTurn = !xTurn;
    checkWinner();

  } else if(event.target.innerHTML === '-'){
    event.target.innerHTML = 'O';
    piecesPlaced++;
    xTurn = !xTurn;
    checkWinner();
  }
}

//resets board to initial state
function clearBoard() {
  //remove all pieces
  piecesPlaced = 0;

  let cells = document.getElementsByTagName('td');
  for(let i = 0; i < cells.length; i++){
    cells[i].innerHTML = '-';
  }

  //set game to start with player X
  xTurn = true;
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
  let cells = document.getElementsByTagName('td');
  let boardState = [];
  for(let i = 0; i < cells.length; i++) {
    boardState.push(cells[i].innerHTML);
  }
  //console.log(boardState);

  //check rows (012 / 345 / 678)
  for(let i = 0; i < 9; i+=3) {
    if(sideWon === null) { //only check if a winner has not been found yet
      let row = boardState[i] + boardState[i+1] + boardState[i+2];
      sideWon = checkLine(row);
      winnerFound = !!sideWon; //if sideWon is not null, winnerFound will be set to true
    }
  }

  //check columns (036 / 147 / 258)
  for(let i = 0; i < 3; i++) {
    if(sideWon === null) {
      let column = boardState[i] + boardState[i+3] + boardState[i+6];
      sideWon = checkLine(column);
      winnerFound = !!sideWon;
    }
  }

  //diagonals (048 / 246)
  if(sideWon === null) {
    let leftDiag = boardState[0] + boardState[4] + boardState[8];
    let rightDiag = boardState[2] + boardState[4] + boardState[6];
    sideWon = checkLine(leftDiag) || checkLine(rightDiag);
    winnerFound = !!sideWon;
  }


  //check if a winner was found, or if there's a tie.
  if(winnerFound) {
    console.log("Winner winner chicken dinner!");
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

//event handler declarations
document.getElementById("cell1").addEventListener("click", setPiece);
document.getElementById("cell2").addEventListener("click", setPiece);
document.getElementById("cell3").addEventListener("click", setPiece);
document.getElementById("cell4").addEventListener("click", setPiece);
document.getElementById("cell5").addEventListener("click", setPiece);
document.getElementById("cell6").addEventListener("click", setPiece);
document.getElementById("cell7").addEventListener("click", setPiece);
document.getElementById("cell8").addEventListener("click", setPiece);
document.getElementById("cell9").addEventListener("click", setPiece);

document.getElementById('reset').addEventListener("click",clearBoard);

console.log("Script loaded.");