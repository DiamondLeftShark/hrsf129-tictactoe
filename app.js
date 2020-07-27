console.log("Initializing...");

let xTurn= true;
const playerPieces = ['X','O'];

//function declarations

//Check if current position is empty (-).  If so, set to the piece of the active player
//and switch to the next side's turn
function setPiece(event) {
  console.log("Piece clicked");

  //check for a winner
  checkWinner();
}

//resets board to initial state
function clearBoard() {
  //remove all pieces
  //set game to start with player X
  xTurn = true;
  console.log("Board reset!");
}

//Run after every piece is placed to check for a winner.
//If a player wins, update the reset element with text informing the players who won.
function checkWinner() {
  console.log("Checking for a winner...");
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