function initializeGame(){
    document.addEventListener('DOMContentLoaded', () => {
        const gameArea = document.getElementById('game-area');
        const spaceship = document.getElementById('spaceship');
        const scoreDisplay = document.getElementById('score');
        const livesDisplay = document.getElementById('lives');
        const startButton = document.getElementById('start-btn');
        // const continueButton = document.getElementById('continue-btn');
    
        let score = 0;
        let lives = 5;
        let bullets = [];
        let asteroids = [];
        let keys = {};
        let gameInterval;
        let gameAnimationFrame;
        let spaceshipSpeed = 2;
        let bulletSpeed = 10;
        let asteroidSpeed = 2;
        const asteroidEmojis = ['⛽', '🏭', '🚗', '🚌', '✈️', '🚢', '🗑️', '☢️', '💨', '🔥', '🛢️', '💣'];
    
        // Move spaceship with arrow keys and shoot bullets with space key
        document.addEventListener('keydown', (event) => {
            keys[event.key] = true;
            if (event.key === ' ') {
                shootBullet();
            }
        });
    
        document.addEventListener('keyup', (event) => keys[event.key] = false);
    
        function moveSpaceship() {
            const spaceshipPos = spaceship.getBoundingClientRect();
            const gameAreaPos = gameArea.getBoundingClientRect();
    
            if (keys['ArrowLeft'] && spaceshipPos.left > gameAreaPos.left) {
                spaceship.style.left = spaceship.offsetLeft - spaceshipSpeed + 'px';
            } else if (keys['ArrowRight'] && spaceshipPos.right < gameAreaPos.right) {
                spaceship.style.left = spaceship.offsetLeft + spaceshipSpeed + 'px';
            }
        }
    
        function shootBullet() {
            const bullet = document.createElement('div');
            bullet.classList.add('bullet');
            bullet.style.left = spaceship.offsetLeft + spaceship.clientWidth / 30 - 2.5 + 'px'; // Adjusted bullet position
            bullet.style.top = spaceship.offsetTop - 20 + 'px';
            gameArea.appendChild(bullet);
            bullets.push(bullet);
        }
    
        function createAsteroid() {
            const asteroid = document.createElement('div');
            asteroid.classList.add('asteroid');
            asteroid.textContent = asteroidEmojis[Math.floor(Math.random() * asteroidEmojis.length)];
            asteroid.style.left = Math.floor(Math.random() * (gameArea.clientWidth - 40)) + 'px';
            asteroid.style.top = '0px';
            gameArea.appendChild(asteroid);
            asteroids.push(asteroid);
        }
    
        function moveBullets() {
            bullets.forEach((bullet, index) => {
                bullet.style.top = bullet.offsetTop - bulletSpeed + 'px';
                if (bullet.offsetTop < 0) {
                    bullet.remove();
                    bullets.splice(index, 1);
                }
            });
        }
    
        function moveAsteroids() {
            asteroids.forEach((asteroid, index) => {
                asteroid.style.top = asteroid.offsetTop + asteroidSpeed + 'px';
                if (asteroid.offsetTop > gameArea.clientHeight) {
                    asteroid.remove();
                    asteroids.splice(index, 1);
                    loseLife();
                }
            });
        }
    
        function checkCollisions() {
            bullets.forEach((bullet, bulletIndex) => {
                const bulletPos = bullet.getBoundingClientRect();
                asteroids.forEach((asteroid, asteroidIndex) => {
                    const asteroidPos = asteroid.getBoundingClientRect();
                    if (
                        bulletPos.bottom > asteroidPos.top &&
                        bulletPos.top < asteroidPos.bottom &&
                        bulletPos.left < asteroidPos.right &&
                        bulletPos.right > asteroidPos.left
                    ) {
                        bullet.remove();
                        asteroid.remove();
                        bullets.splice(bulletIndex, 1);
                        asteroids.splice(asteroidIndex, 1);
                        score++;
                        scoreDisplay.textContent = score;
                    }
                });
            });
            // if (score > 20){
            //     endGame()
            // }
        }
    
        function loseLife() {
            lives--;
            livesDisplay.textContent = lives;
            if (lives <= 0) {
                endGame();
            }
        }
    
        function gameLoop() {
            moveSpaceship();
            moveBullets();
            moveAsteroids();
            checkCollisions();
            gameAnimationFrame = requestAnimationFrame(gameLoop);
        }
    
        function startGame() {
            if (gameAnimationFrame) {
                cancelAnimationFrame(gameAnimationFrame);
            }
            score = 0;
            lives = 5;
            scoreDisplay.textContent = score;
            livesDisplay.textContent = lives;
            startButton.style.display = 'none';
            // continueButton.style.display = 'none';
            gameInterval = setInterval(createAsteroid, 1000);
            gameLoop();
        }
    
        function endGame() {
            clearInterval(gameInterval);
            cancelAnimationFrame(gameAnimationFrame);
            asteroids.forEach(asteroid => asteroid.remove());
            bullets.forEach(bullet => bullet.remove());
            asteroids = [];
            bullets = [];
            showCustomAlert(`Game Over! Your score is ${score}`);
        }
            // continueButton.style.display = 'block';
        
    
        startButton.addEventListener('click', startGame);
        // continueButton.addEventListener('click', startGame);
    });
    const instructionPanel = document.getElementById('instruction-panel');
    const closeInstructionsBtn = document.getElementById('close-instructions');
    
    closeInstructionsBtn.addEventListener('click', () => {
      instructionPanel.style.display = 'none';
    });
    
    // Add a button to show instructions
    const showInstructionsBtn = document.createElement('button');
    showInstructionsBtn.textContent = 'Show Instructions';
    showInstructionsBtn.addEventListener('click', () => {
      instructionPanel.style.display = 'block';
    });
    
    // Insert the show instructions button after the continue button
    // continueButton.parentNode.insertBefore(showInstructionsBtn, continueButton.nextSibling);
}

initializeGame();

function finishGame() {
    window.location.href = "../index.html"; // Redirect back to the quiz page
}


function showCustomAlert(message) {
    const modal = document.getElementById('custom-alert');
    const messageElement = document.getElementById('custom-alert-message');
    const closeButton = document.querySelector('.close-btn');
    const okButton = document.getElementById('custom-alert-ok-btn');
    
    messageElement.textContent = message;
    modal.style.display = 'block';

    okButton.onclick = () => {
        finishGame();
    };
}