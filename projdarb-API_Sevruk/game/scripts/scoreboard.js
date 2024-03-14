import { sendRequest } from './api.js';

async function updateScoreboard() {
    try {
        const timedModeScores = await getScoresByMode(1);
        const challengeModeScores = await getScoresByMode(0);

        await updateTable('timed-mode-scores', timedModeScores);
        await updateTable('challenge-mode-scores', challengeModeScores);
    } catch (error) {
        console.error('Error updating scoreboard:', error);
    }
}

function getScoresByMode(mode) {
    const queryParams = {mode: mode}
    return sendRequest('scores', 'GET', queryParams)
}

function updateTable(tableId, scores) {
    const tableBody = document.getElementById(tableId);
 
    tableBody.innerHTML = '';

    if (scores.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = 'No scores available';
        cell.setAttribute('colspan', 2);
        row.appendChild(cell);
        tableBody.appendChild(row);
        return;
    }
    
    scores.forEach(function (score, i) {
        const row = document.createElement('tr');
        const playerNameCell = document.createElement('td');
        playerNameCell.textContent = score.playername;
        const scoreCell = document.createElement('td');
        scoreCell.textContent = score.score;
        row.appendChild(playerNameCell);
        row.appendChild(scoreCell);
        tableBody.appendChild(row);
    });
}

updateScoreboard();