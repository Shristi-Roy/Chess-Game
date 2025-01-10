const board = document.getElementById('chessboard');
const pieces = {
  R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔', P: '♙',
  r: '♜', n: '♞', b: '♝', q: '♛', k: '♚', p: '♟︎'
};

const initialBoard = [
  'rnbqkbnr',
  'pppppppp',
  '........',
  '........',
  '........',
  '........',
  'PPPPPPPP',
  'RNBQKBNR',
];

let selectedPiece = null;
let gameStatus = 'ongoing'; // 'ongoing', 'win', 'tie'
let currentPlayer = 'white'; // 'white' or 'black'

function createChessboard() {
  board.innerHTML = ''; // Clear the board
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement('div');
      square.className = `square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
      square.dataset.row = row;
      square.dataset.col = col;

      const piece = initialBoard[row][col];
      if (piece !== '.') {
        const pieceElement = document.createElement('div');
        pieceElement.className = 'piece';
        pieceElement.textContent = pieces[piece];
        pieceElement.dataset.piece = piece;
        pieceElement.addEventListener('click', () => selectPiece(pieceElement, square));
        square.appendChild(pieceElement);
      }

      square.addEventListener('click', () => movePiece(square));
      board.appendChild(square);
    }
  }
}

function selectPiece(pieceElement, square) {
  if (selectedPiece) {
    selectedPiece.classList.remove('selected');
  }
  selectedPiece = pieceElement;
  selectedPiece.classList.add('selected');
}

function movePiece(square) {
  if (gameStatus === 'ongoing') {
    if (selectedPiece) {
      // Only move if square is empty or contains a piece of opposite color
      if (!square.querySelector('.piece')) {
        square.appendChild(selectedPiece);
        selectedPiece.classList.remove('selected');
        selectedPiece = null;

        // Change the player turn
        currentPlayer = currentPlayer === 'white' ? 'black' : 'white';

        // Update game status (just a simple example for checkmate or tie)
        updateGameStatus();
      }
    }
  }
}

function updateGameStatus() {
  // Example game end conditions:
  // If no kings are left, it's a tie
  const whiteKing = document.querySelector('.piece[data-piece="K"]');
  const blackKing = document.querySelector('.piece[data-piece="k"]');

  if (!whiteKing && !blackKing) {
    gameStatus = 'tie';
    document.getElementById('status').innerText = 'Game is a Tie!';
  } else if (!whiteKing) {
    gameStatus = 'win';
    document.getElementById('status').innerText = 'Black Wins!';
  } else if (!blackKing) {
    gameStatus = 'win';
    document.getElementById('status').innerText = 'White Wins!';
  } else {
    document.getElementById('status').innerText = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s turn`;
  }
}

function restartGame() {
  // Reset game variables and create the board again
  gameStatus = 'ongoing';
  currentPlayer = 'white';
  document.getElementById('status').innerText = "Game is On";
  createChessboard();
}

document.getElementById('restart-btn').addEventListener('click', restartGame);

// Initialize the chessboard
createChessboard();
