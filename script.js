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
        console.log("current player: ", currentPlayer.getName());

        const moveSuccess = gameBoard.placeMark(position, currentPlayer.getMarker());
        
        if (moveSuccess) {
            checkWin();
            switchPlayer();
        }
    }

    function checkWin() {
        const board = gameBoard.getBoard();
        let win = false;
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

        winningCombos.forEach((row) => {
            const a = row[0];
            const b = row[1];
            const c = row[2];
            if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
                return win = true;
            }
        });

        return win;
    }

    function checkTie() {
        const board = gameBoard.getBoard();
        let tie = false;
        let boardFull = false
        
        board.forEach(e => {
            if (e === "") {
                boardFull = false;
            } else {
                boardFull = true;
            }
        })

        if (boardFull && !checkWin()) {
            tie = true;
        }

        return tie;
    }

    return { getCurrentPlayer, switchPlayer, playRound, checkWin, checkTie };
})();