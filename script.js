document.addEventListener('DOMContentLoaded', () => {

    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.querySelector('#status');
    const restartButton = document.querySelector('#restartButton');

    let gameActive = true;
    let currentPlayer = 'X';
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
        clickedCell.classList.add('played');
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusDisplay.textContent = `Jogador ${currentPlayer} venceu!`;
            gameActive = false;
            return;
        }

        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            statusDisplay.textContent = 'Empate!';
            gameActive = false;
            return;
        }

        handlePlayerChange();
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.textContent = `Vez do ${currentPlayer}`;
    }

    function handleRestartGame() {
        gameActive = true;
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusDisplay.textContent = `Vez do ${currentPlayer}`;
        
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove('x', 'o', 'played');
        });
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);

    function createFallingStars() {
        const container = document.getElementById('stars-container');
        const numberOfStars = 50;

        for (let i = 0; i < numberOfStars; i++) {
            const star = document.createElement('div');
            star.classList.add('star');

            star.style.left = `${Math.random() * 100}vw`;

            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            const duration = Math.random() * 5 + 5; 
            star.style.animationDuration = `${duration}s`;

            star.style.animationDelay = `${Math.random() * 10}s`;

            star.style.opacity = Math.random() * 0.5 + 0.5;

            container.appendChild(star);
        }
    }

    createFallingStars();

});