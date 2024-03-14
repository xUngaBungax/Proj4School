// Import statements
import { sendRequest } from './api.js';

// Configuration and state variables
const challengeMode = {
    mode: 0,
    scoreDeduction: 5,
    timeDeduction: 3,
    scoreReward: 10,
    timeReward: 7,
    playTime: 10
};

const timeMode = {
    mode: 1,
    scoreDeduction: 10,
    timeDeduction: 0,
    scoreReward: 10,
    timeReward: 0,
    playTime: 40
};

let timer;
let seconds;
let score = 0;
let isTimedMode = true;
let isPaused = false;

// Utility functions
function getModeConfig() {
    return isTimedMode ? timeMode : challengeMode;
}

function setTextContent(id, text) {
    document.getElementById(id).innerText = text;
}

function getInputValue(id) {
    return document.getElementById(id).value;
}

function clearInput(id) {
    document.getElementById(id).value = "";
}

function shuffleWord(word) {
    return word.split('').sort(function(){return 0.5-Math.random()}).join('');
}

function isAnagram(word1, word2) {
    return word1.split('').sort().join('') === word2.split('').sort().join('');
}

// Game control functions
function startTimer() {
    timer = setInterval(function () {
        if (!isPaused) {
            seconds--;
            updateTimer(seconds)
            if (seconds <= 0) {
                endGame();
            }
        }
    }, 1000);
}

function updateTimer(seconds) {
    document.getElementById('timer').innerText = seconds;
}

function togglePause() {
    isPaused = !isPaused;
    document.getElementById('check-word-button').disabled = isPaused;
    document.getElementById('pause-button').textContent = isPaused ? 'Resume' : 'Pause';
    if (!isPaused) {
        if (!timer) { // Check if the timer is already running
            startTimer();
        }
    }
}

async function startGame() {
    seconds = getModeConfig().playTime
    score = 0;
    updateScore(0);
    clearInput('user-input');
    await updateWordDisplay();
    localStorage.removeItem('words');
    startTimer();
}

async function endGame() {
    clearInterval(timer);
    isPaused = true;

    const playerName = localStorage.getItem('playerName') || 'Player';
    
    let resultMessage = score <= 30 ? `${playerName}, you need some practice...` :
                        score <= 60 ? `Good job, ${playerName}, but you should exercise a bit :)` :
                        score <= 90 ? `Nice score, ${playerName}!` : `Godlike, ${playerName}! 🔥`;

    document.getElementById('modal-title').innerText = resultMessage;
    document.getElementById('modal-message').innerText = `Your final score is: ${score}.`
    document.getElementById('modal-backdrop').style.display = 'block';
    document.getElementById('end-game-modal').style.display = 'block';

    setTimeout(() => {
        document.getElementById('modal-backdrop').style.opacity = 1;
        document.getElementById('end-game-modal').style.opacity = 1;
        }, 10);

    if (score >= 0){
        await saveScore(score);
    }
    await updateScoreboard();
}

async function changeMode() {
    isTimedMode = !isTimedMode;
    alert("Mode changed to " + (isTimedMode ? "Timed" : "Challenge"));
    await updateScoreboard();
    restartGame();
}

function restartGame() {
    isPaused = false;
    clearInterval(timer);
    startGame();
}

// Word handling functions
async function generateRandomWord() {
    let words;

    const storedWords = localStorage.getItem('words');

    if (storedWords) {
        words = JSON.parse(storedWords);
    } else {
        try {
            words = await retrieveFruitWordsFromAPI();
            localStorage.setItem('words', JSON.stringify(words));
        } catch (error) {
            console.error('Failed to load fruits data:', error);
            return [];
        }
    }

    return words[Math.floor(Math.random() * words.length)];
}

async function retrieveFruitWordsFromAPI() {
    const req = await sendRequest('fruits', 'GET')
    
    return req.map(fruit => fruit.name.toLowerCase());
}

async function updateWordDisplay() {
    const randomWord = await generateRandomWord();
    const shuffledWord = shuffleWord(randomWord);
    const spannedWord = Array.from(shuffledWord).map(letter => `<span>${letter}</span>`).join('');
    document.getElementById('word').innerHTML = spannedWord;
    setTextContent('current-word', randomWord);
    document.getElementById('current-word').setAttribute('data-shuffled', shuffledWord); // If needed
    document.getElementById('current-word').style.display = 'none';
}

async function checkWord() {
    if (isPaused) return;

    const userInput = getInputValue('user-input').toLowerCase();
    const currentWord = document.getElementById('current-word').innerText.toLowerCase();
    const modeConfig = getModeConfig();
    clearInput('user-input');
    
    if (userInput === ""){
        return;
    }

    if (userInput === currentWord) {
        updateScore(modeConfig.scoreReward);
        seconds += modeConfig.timeReward
        await updateWordDisplay();
    } else {
        updateScore(-modeConfig.scoreDeduction);
        seconds -= modeConfig.timeDeduction;
    }
}

// Score handling functions
function saveScore(score) {
    const payload = {
        playername: localStorage.getItem('playerName'),
        score:  score,
        mode: getModeConfig().mode,
    };
    
    sendRequest('scores', 'POST', payload)
}

function updateScore(additionalScore) {
    score += additionalScore;
    setTextContent('scoreCount', `${score}`);
}

async function updateScoreboard() {
    const topScoresTable = document.getElementById('top-scores-table');
    const topScoresBody = document.getElementById('top-scores-body');
    const queryParams = {mode: getModeConfig().mode ?? 0}
    const topScores = await sendRequest('scores', 'GET', queryParams)

    // Clear the table before updating
    topScoresBody.innerHTML = '';

    // Sort the scores in descending order
    topScores.sort((a, b) => b.score - a.score);

    // Add data to the table
    for (let i = 0; i < Math.min(topScores.length, 5); i++) {
        const row = document.createElement('tr');
        const playerNameCell = document.createElement('td');
        const scoreCell = document.createElement('td');
        playerNameCell.textContent = topScores[i].playername;
        scoreCell.textContent = topScores[i].score;
        row.appendChild(playerNameCell);
        row.appendChild(scoreCell);
        topScoresBody.appendChild(row);
    }
}

// Modal control functions
function closeEndGameModal() {
    document.getElementById('modal-backdrop').style.opacity = 0;
    document.getElementById('end-game-modal').style.opacity = 0;

    setTimeout(() => {
        document.getElementById('modal-backdrop').style.display = 'none';
        document.getElementById('end-game-modal').style.display = 'none';
        }, 500);
}

// Event setup functions
function setupEnterKeyHandler() {
    const inputElement = document.getElementById('user-input');
    inputElement.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            checkWord();
        }
    });
}

// Initialize game setup and event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('change-mode-button').addEventListener('click', changeMode);
    document.getElementById('restart-game-button').addEventListener('click', restartGame);
    document.getElementById('try-again-button').addEventListener('click', function(){
        closeEndGameModal();
        restartGame();
    })
    document.getElementById('pause-button').addEventListener('click', togglePause);
    document.getElementById('check-word-button').addEventListener('click', checkWord);
    document.getElementById('modal-backdrop').addEventListener('click', closeEndGameModal);
});

setupEnterKeyHandler();
updateScoreboard();
startGame();