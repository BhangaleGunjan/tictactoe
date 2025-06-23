let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('reset');

const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
    const idx = e.target.getAttribute('data-index');
    if (board[idx] !== '' || !gameActive) return;

    board[idx] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkResult();
    switchPlayer();
}

function switchPlayer() {
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkResult() {
    let roundWon = false;
    for (let combo of winCombos) {
        const [a, b, c] = combo;
        if (board[a] === '' || board[b] === '' || board[c] === '') continue;
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        statusDisplay.classList.add('winner-animation');
        gameActive = false;
        disableBoard();
        return;
    }

    if (!board.includes('')) {
        statusDisplay.textContent = `It's a tie!`;
        statusDisplay.classList.add('tie-animation');
        gameActive = false;
    }
}

function disableBoard() {
    cells.forEach(cell => cell.classList.add('disabled'));
}

function resetGame() {
    board.fill('');
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    statusDisplay.classList.remove('winner-animation', 'tie-animation');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);