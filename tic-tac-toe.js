    let currentPlayer = 'X';
    let cells = document.querySelectorAll('.cell');
    let gameOver = false;

  function play(cell) {
        if (!gameOver && !cell.textContent) {
            cell.textContent = currentPlayer;
            if (checkWinner()) {
                document.getElementById('result').textContent = currentPlayer + ' wins!';
                gameOver = true;
            } else if (checkDraw()) {
                document.getElementById('result').textContent = 'It\'s a draw!';
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                if (currentPlayer === 'O') {
                    setTimeout(botPlay, 500); // Delay bot's move by 500 milliseconds
                }
            }
        }
    }


    function botPlay() {
        let emptyCells = [...cells].filter(cell => !cell.textContent);
        let moveFound = false;

        // Check if bot can win in next move
        emptyCells.some(cell => {
            cell.textContent = 'O';
            if (checkWinner('O')) { // Check if bot (O) has won
                moveFound = true;
                currentPlayer = 'X';
                document.getElementById('result').textContent = 'Bot wins!';
                gameOver = true;
                return true; // Exit loop
            }
            cell.textContent = '';
        });

        if (!moveFound) {
            // Check if bot needs to block player from winning
            emptyCells.some(cell => {
                cell.textContent = 'X';
                if (checkWinner('X')) { // Check if player (X) has won
                    cell.textContent = 'O';
                    moveFound = true;
                    currentPlayer = 'X';
                    return true; // Exit loop
                }
                cell.textContent = '';
            });
        }

        // If no winning move or blocking move found, play randomly
        if (!moveFound && emptyCells.length > 0) {
            let randomIndex = Math.floor(Math.random() * emptyCells.length);
            emptyCells[randomIndex].textContent = 'O';
            currentPlayer = 'X';
        }
    }


    function checkWinner(player) {
        const symbol = player === 'X' ? 'X' : 'O'; // Determine the symbol to check

        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        return winConditions.some(condition => {
            const [a, b, c] = condition;
            return cells[a].textContent === symbol && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
        });
    }

    function checkWinner() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        return winConditions.some(condition => {
            const [a, b, c] = condition;
            return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
        });
    }

 

    function checkDraw() {
        return [...cells].every(cell => cell.textContent);
    }

 

    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
        });
        currentPlayer = 'X';
        gameOver = false;
        document.getElementById('result').textContent = ''; // Clear the result message
    }
