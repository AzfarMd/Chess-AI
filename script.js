const board = document.getElementById("board");
const game = new Chess();

// Create the chessboard
function createBoard() {
    board.innerHTML = "";
    for (let row = 7; row >= 0; row--) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.classList.add("square", (row + col) % 2 === 0 ? "light" : "dark");
            square.dataset.position = `${"abcdefgh"[col]}${row + 1}`;
            board.appendChild(square);
        }
    }
    updateBoard();
}

// Update the board with pieces
function updateBoard() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.innerHTML = "";
        const piece = game.get(square.dataset.position);
        if (piece) {
            square.innerHTML = getPieceSymbol(piece);
        }
    });
}

// Convert piece to a Unicode chess symbol
function getPieceSymbol(piece) {
    const symbols = {
        p: "♙", r: "♖", n: "♘", b: "♗", q: "♕", k: "♔",
        P: "♟", R: "♜", N: "♞", B: "♝", Q: "♛", K: "♚"
    };
    return symbols[piece.type] || "";
}

// AI makes a move
function makeAIMove() {
    const moves = game.moves();
    if (moves.length === 0) return;
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    game.move(randomMove);
    updateBoard();
}

// Reset the game
function resetGame() {
    game.reset();
    updateBoard();
}

// Initialize board and set up moves
createBoard();
board.addEventListener("click", makeAIMove);