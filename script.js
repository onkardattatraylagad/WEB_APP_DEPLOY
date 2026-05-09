document.addEventListener('DOMContentLoaded', () => {
    // Game variables
    let targetNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    let previousGuessesArr = [];

    // DOM Elements
    const guessInput = document.getElementById('guessInput');
    const guessButton = document.getElementById('guessButton');
    const restartButton = document.getElementById('restartButton');
    const messageElement = document.getElementById('message');
    const attemptsDisplay = document.getElementById('attemptsDisplay');
    const previousGuesses = document.getElementById('previousGuesses');
    const gameArea = document.querySelector('.game-area');

    // Focus input on load
    guessInput.focus();

    // Event Listeners
    guessButton.addEventListener('click', handleGuess);
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleGuess();
    });
    restartButton.addEventListener('click', resetGame);

    function handleGuess() {
        const guessValue = guessInput.value;
        const guess = parseInt(guessValue);

        // Input validation
        if (isNaN(guess) || guess < 1 || guess > 100) {
            showMessage('Please enter a valid number between 1 and 100.', 'error');
            triggerShake();
            return;
        }

        // Check if already guessed
        if (previousGuessesArr.includes(guess)) {
            showMessage(`You already guessed ${guess}! Try another number.`, 'warning');
            triggerShake();
            return;
        }

        // Process valid guess
        attempts++;
        previousGuessesArr.push(guess);
        updateStats();
        
        if (guess === targetNumber) {
            handleWin();
        } else if (guess < targetNumber) {
            showMessage('Too low! Try a higher number.', 'warning');
            guessInput.value = '';
            guessInput.focus();
        } else {
            showMessage('Too high! Try a lower number.', 'warning');
            guessInput.value = '';
            guessInput.focus();
        }
    }

    function handleWin() {
        showMessage(`Congratulations! You found the number in ${attempts} attempts!`, 'success');
        guessInput.disabled = true;
        guessButton.disabled = true;
        restartButton.classList.remove('hidden');
        gameArea.classList.add('pop');
        
        setTimeout(() => {
            gameArea.classList.remove('pop');
        }, 400);
    }

    function resetGame() {
        targetNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        previousGuessesArr = [];
        
        guessInput.disabled = false;
        guessButton.disabled = false;
        guessInput.value = '';
        restartButton.classList.add('hidden');
        
        showMessage('Start guessing!', '');
        updateStats();
        guessInput.focus();
    }

    function showMessage(msg, type) {
        messageElement.textContent = msg;
        messageElement.className = 'message ' + type;
    }

    function updateStats() {
        attemptsDisplay.textContent = `Attempts: ${attempts}`;
        previousGuesses.textContent = `Previous: ${previousGuessesArr.length > 0 ? previousGuessesArr.join(', ') : 'None'}`;
    }

    function triggerShake() {
        gameArea.classList.remove('shake');
        // Trigger reflow
        void gameArea.offsetWidth;
        gameArea.classList.add('shake');
    }
});
