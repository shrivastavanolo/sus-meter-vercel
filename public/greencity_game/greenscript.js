function initializeGame(){const gridContainer = document.getElementById('grid-container');
const scoreDisplay = document.getElementById('score');
const moneyDisplay = document.getElementById('money');
const resetButton = document.getElementById('resetButton');
const optionButtons = document.querySelectorAll('.option-btn');

let score = 0;
let money = 50;
let selectedOption = null;
let gridItems = [];
let numRows = 5;
let numCols = 10;

function greenCity() {
    score = 0;
    money = 50;
    selectedOption = null;
    gridItems = [];
    gridContainer.innerHTML = '';

    for (let i = 0; i < numRows * numCols; i++) {
        const div = document.createElement('div');
        div.className = 'grid-cell';
        div.addEventListener('click', handleCellClick);
        gridContainer.appendChild(div);
        gridItems.push(div);
    }

    updateScore();
    updateMoney();
}

function handleCellClick(event) {
    if (selectedOption) {
        const cell = event.target;
        const { type, score: optionScore, cost: optionCost } = selectedOption.dataset;

        if (!cell.classList.contains('selected') && money + parseInt(optionCost) >= 0) {
            cell.textContent = selectedOption.textContent;
            cell.dataset.type = type;
            cell.dataset.score = optionScore;
            cell.dataset.cost = optionCost;
            cell.classList.add('selected');
            cell.classList.add(type === 'positive' ? 'clicked' : 'incorrect');
            updateScore(parseInt(optionScore));
            updateMoney(parseInt(optionCost));
        }
    }
}

function updateScore(change = 0) {
    score += change;
    scoreDisplay.textContent = `Score: ${score}`;
}

function updateMoney(change = 0) {
    money -= change;
    moneyDisplay.textContent = `Coins: ${money}`;
    if(money<0){
        endGame(score);
    }
}

function handleOptionClick(event) {
    selectedOption = event.target;
    optionButtons.forEach(button => button.classList.remove('active'));
    selectedOption.classList.add('active');
}

optionButtons.forEach(button => {
    button.addEventListener('click', handleOptionClick);
});

resetButton.addEventListener('click', greenCity);

greenCity();}

initializeGame();

function finishGame() {
    window.location.href = "../index.html"; // Redirect back to the quiz page
}

function endGame(score){
    var s=`Game Over! Your score is ${score}`;
    showCustomAlert(s);
}

function showCustomAlert(message) {
    const modal = document.getElementById('custom-alert');
    const messageElement = document.getElementById('custom-alert-message');
    const okButton = document.getElementById('custom-alert-ok-btn');
    
    messageElement.textContent = message;
    modal.style.display = 'block';

    okButton.onclick = () => {
        finishGame();
    };
}