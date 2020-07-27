console.log("Initializing...");

let xTurn= true;
const playerPieces = ['X','O'];
let piecesPlaced = 0;

//function declarations

//Check if current position is empty (-).  If so, set to the piece of the active player
//and switch to the next side's turn
function setPiece(event) {
  console.log("Piece clicked");
  if(xTurn && event.target.innerHTML === '-')  {
    event.target.innerHTML = 'X';
    piecesPlaced++;
    xTurn = !xTurn;
  } else if(event.target.innerHTML === '-'){
    event.target.innerHTML = 'O';
    piecesPlaced++;
    xTurn = !xTurn;
  }
  //check for a winner
  checkWinner();
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
  console.log("Checking for a winner...");
  let winnerFound = false;
  let cells = document.getElementsByTagName('td');
  //check to see if a player has won.  Must check:
  //rows (123 / 456 / 789)
  //columns (147 / 258 / 369)
  //diagonals (159 / 357)

  if(winnerFound) {
    console.log("Winner winner chicken dinner!");
  } else if (piecesPlaced >= 9) {
    console.log("It's a draw!");
    document.getElementById('reset').innerHTML = "It's a draw!  Play again?";
  } else {
    console.log("Keep going...");
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