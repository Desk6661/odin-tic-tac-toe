function createPlayer(name, marker) {

    function getName() {
        return name;
    }

    function getMarker() {
        return marker;
    }

    return {
        name,
        marker,
        getName,
        getMarker
    }
}

const gameBoard = (function () {
    const board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    function getBoard() {
        return board;
    }

    function placeMark(position, marker) {
        if (board[position] == "") {
            board[position] = marker;
            console.log("move successful");
            return true;
        } else {
            console.log("invalid move!");
            return false;
        }
    }

    function resetBoard() {
        for (let i = 0; i < 9; i++) {
            board[i] = "";
        }
    }

    return { getBoard, placeMark, resetBoard };
})();

const gameController = (function () {
    const player1 = createPlayer("desk", "X");
    const player2 = createPlayer("disk", "O");

    let currentPlayer = player1;
    let isGameOver = false;

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function switchPlayer() {
        if (currentPlayer == player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    function playRound(position) {

        if (isGameOver) {
            return;
        }

        console.log("current player: ", currentPlayer.getName());

        const moveSuccess = gameBoard.placeMark(position, currentPlayer.getMarker());
        if (moveSuccess) {
            displayController.renderBoard();
            const win = checkWin();
            const tie = checkTie();

            if (win.bool) {
                console.log("player won the game: ", win.wonPlayer.getName(), win.wonPlayer.getMarker());
                displayController.text.textContent = `${win.wonPlayer.getName()} won the game. their mark ${win.wonPlayer.getMarker()}`;
                isGameOver = true;
            } else if (tie) {
                console.log("Tie! no one won the game.");
                displayController.text.textContent = "Tie! no one won the game.";
                isGameOver = true;
                stopGame();
            } else {
                switchPlayer();
            }
        }
    }

    function checkWin() {
        const board = gameBoard.getBoard();
        let bool = false;
        let wonPlayer = getCurrentPlayer();

        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const row of winningCombos) {
            const a = row[0];
            const b = row[1];
            const c = row[2];

            if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
                bool = true;
                break;
            }
        }
        return { bool, wonPlayer };
    }

    function checkTie() {
        const board = gameBoard.getBoard();

        if (!board.includes("") && !checkWin().bool) {
            return true;
        } else {
            return false;
        }
    }

    function resetGame() {
        isGameOver = false;
        currentPlayer = player1;
    }

    return { getCurrentPlayer, switchPlayer, playRound, checkWin, checkTie, resetGame };
})();

const displayController = (function () {
    const cells = document.querySelectorAll(".cell");
    const text = document.getElementById("text");
    const restart = document.getElementById("restart");

    function renderBoard() {
        const board = gameBoard.getBoard();

        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    }

    cells.forEach((cell, index) => {
        cell.addEventListener("click", function () {
            console.log("btn clicked!");
            gameController.playRound(index);
            renderBoard();
        });
    });

    restart.addEventListener("click", function() {
        gameBoard.resetBoard();
        gameController.resetGame();
        renderBoard();
    });

    return { text, renderBoard };
})();