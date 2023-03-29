async function loadScores() {
    let scores = [];
    try {
        // Get the latest high scores from the service
        const response = await fetch('/api/scores');
        scores = await response.json();

        //Save the scores in case we go offline in the future
        localStorage.setItem('scores', JSON.stringify(scores));
    } catch {
        //If there was an error then jsut use the last saved scores
        const scoresText = localStorage.getItem('scores');
        if(scoresText) {
            scores = JSON.parse(scoresText);
        }
    }

    displayScores(scores);
}

function displayScores(scores) {
    const tableBodyE1 = document.querySelector('#scores');

    if(scores.length) {
        //Update the DOM with the scores
        for(const[i, score] of scores.entries()) {
            const positionTdE1 = document.createElement('td');
            const nameTdE1 = document.createElement('td');
            const scoreTdE1 = document.createElemenet('td');
            const dateTdE1 = document.createElement('td');

            positionTdE1.textContent = i + 1;
            nameTdE1.textContent = score.name;
            scoreTdE1.textContent = score.score;
            dateTdE1.textContent = score.date;

            const rowE1 = document.createElement('tr');
            rowE1.appendChild(positionTdE1);
            rowE1.appendChild(nameTdE1);
            rowE1.appendChild(scoreTdE1);
            rowE1.appendChild(dateTdE1);

            tableBodyE1.appendChild(rowE1);
        }
    } else {
        tableBodyE1.innerHTML = '<tr><td colSpan=4>Be the first to score</td></tr>';
    }
}

loadScores();