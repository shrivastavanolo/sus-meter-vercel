function initializeGame(){
    const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const continueBtn = document.getElementById('continueBtn');

canvas.width = 400;
canvas.height = 600;

let cloud = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 80,
    height: 50,
    speed: 5,
    moveLeft: false,
    moveRight: false
};

let drops = [];
let score = 0;
let lives = 6;
let gameLoop;

function drawCloud() {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(cloud.x, cloud.y, 25, 0, Math.PI * 2);
    ctx.arc(cloud.x - 25, cloud.y, 20, 0, Math.PI * 2);
    ctx.arc(cloud.x + 25, cloud.y, 20, 0, Math.PI * 2);
    ctx.fill();
}

function drawDrop(drop) {
    ctx.fillStyle = '#00f';
    ctx.beginPath();
    ctx.arc(drop.x, drop.y, 5, 0, Math.PI * 2);
    ctx.fill();
}

function createDrop() {
    return {
        x: Math.random() * canvas.width,
        y: 0,
        speed: Math.random() * 0.9 + 0.7
    };
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCloud();

    if (Math.random() < 0.009) { // Reduced the probability to 0.005
        drops.push(createDrop());
    }

    drops.forEach((drop, index) => {
        drop.y += drop.speed;
        drawDrop(drop);

        if (drop.y > canvas.height) {
            drops.splice(index, 1);
            lives--;
            updateLives();
            if (lives === 0) {
                gameOver();
            }
        }

        if (
            drop.x > cloud.x - cloud.width / 2 &&
            drop.x < cloud.x + cloud.width / 2 &&
            drop.y > cloud.y - cloud.height / 2 &&
            drop.y < cloud.y + cloud.height / 2
        ) {
            drops.splice(index, 1);
            score++;
            updateScore();
        }
    });

    // if (score >= 10) {
    //     gameOver();
    // }

    if (cloud.moveLeft && cloud.x > cloud.width / 2) {
        cloud.x -= cloud.speed;
    }
    if (cloud.moveRight && cloud.x < canvas.width - cloud.width / 2) {
        cloud.x += cloud.speed;
    }

    gameLoop = requestAnimationFrame(update);
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function updateLives() {
    livesElement.textContent = `Lives: ${lives}`;
}

function gameOver() {
    cancelAnimationFrame(gameLoop);
    gameOverElement.classList.remove('hidden');
    finalScoreElement.textContent = score;
    showCustomAlert(`Game Over! Your score is ${score}`);
}

function resetGame() {
    score = 0;
    lives = 6;
    drops = [];
    updateScore();
    updateLives();
    gameOverElement.classList.add('hidden');
    update();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        cloud.moveLeft = true;
    } else if (e.key === 'ArrowRight') {
        cloud.moveRight = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') {
        cloud.moveLeft = false;
    } else if (e.key === 'ArrowRight') {
        cloud.moveRight = false;
    }
});

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;

    if (touchX < canvas.width / 2) {
        cloud.moveLeft = true;
        cloud.moveRight = false;
    } else {
        cloud.moveRight = true;
        cloud.moveLeft = false;
    }
});

canvas.addEventListener('touchend', (e) => {
    cloud.moveLeft = false;
    cloud.moveRight = false;
});

continueBtn.addEventListener('click', resetGame);

resetGame();

const instructionPanel = document.getElementById('instructionPanel');
const closeInstructionsBtn = document.getElementById('closeInstructionsBtn');

function showInstructions() {
    instructionPanel.classList.remove('hidden');
}

function hideInstructions() {
    instructionPanel.classList.add('hidden');
}

closeInstructionsBtn.addEventListener('click', hideInstructions);

// Create and add a button to show instructions
const showInstructionsBtn = document.createElement('button');
showInstructionsBtn.textContent = 'Show Instructions';
showInstructionsBtn.style.position = 'absolute';
showInstructionsBtn.style.top = '10px';
showInstructionsBtn.style.left = '50%';
showInstructionsBtn.style.transform = 'translateX(-50%)';
showInstructionsBtn.style.zIndex = '5';
showInstructionsBtn.addEventListener('click', showInstructions);
document.querySelector('.game-container').appendChild(showInstructionsBtn);

// Show instructions when the game loads
showInstructions();


}
initializeGame();

function finishGame() {
    window.location.href = "../index.html"; // Redirect back to the quiz page
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