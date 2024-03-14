function proceedToGame() {
    var playerName = document.getElementById('player-name').value.trim();
    if (playerName !== "") {
        localStorage.setItem('playerName', playerName);
        window.location.href = "game.html";
    } else {
        alert("Please enter your name before starting the game.");
    }
}

function setupEnterKeyHandler() {
    const inputElement = document.getElementById('player-name');
    inputElement.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            proceedToGame();
        }
    });
}

setupEnterKeyHandler();