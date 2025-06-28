let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let timeLeft = 10;
let timerInterval;

const boardContainer = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const timerDisplay = document.getElementById('timer');

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createBoard() {
  boardContainer.innerHTML = '';
  board.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    cellDiv.setAttribute('data-index', index);
    cellDiv.textContent = cell;
    cellDiv.addEventListener('click', handleCellClick);
    boardContainer.appendChild(cellDiv);
  });
  updateStatus();
  startTimer();
}

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');

  if (!gameActive || board[index] !== '') return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  stopTimer();

  if (checkWin()) {
    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (board.every((cell) => cell !== '')) {
    statusDisplay.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  switchPlayer();
  startTimer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
}

function checkWin() {
  return winningConditions.some((combination) => {
    return combination.every((index) => board[index] === currentPlayer);
  });
}

function updateStatus() {
  if (gameActive) {
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  stopTimer();
  createBoard();
}

function startTimer() {
  timeLeft = 10;
  timerDisplay.textContent = `Time left: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      stopTimer();
      statusDisplay.textContent = `Time's up! Switching to player ${
        currentPlayer === 'X' ? 'O' : 'X'
      }`;
      setTimeout(() => {
        if (gameActive) {
          switchPlayer();
          startTimer();
        }
      }, 1000);
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

createBoard();
