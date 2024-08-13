function initializeGame(){const items = [
    { emoji: '🍎', correct: '🍂', name: "Apple" },
    { emoji: '📰', correct: '♻️', name: "Newspaper" },
    { emoji: '🥫', correct: '♻️', name: "Juice box" },
    { emoji: '🍌', correct: '🍂', name: "Banana" },
    { emoji: '📦', correct: '♻️', name: "Carton" },
    { emoji: '🥤', correct: '♻️', name: "Plastic glass" },
    { emoji: '👕', correct: '♻️', name: "Shirt" },
    { emoji: '🔋', correct: '🗑️', name: "Battery" },
    { emoji: '💡', correct: '🗑️', name: "Bulb" },
    { emoji: '🍽️', correct: '🗑️', name: "Plate" },
    { emoji: '🥚', correct: '🍂', name: "Egg" }, // Egg - organic waste
    { emoji: '🥛', correct: '♻️', name: "Milk carton" }, // Milk carton - recyclable
    { emoji: '📱', correct: '🗑️', name: "Phone" }, // Smartphone - general waste
    { emoji: '💻', correct: '🗑️', name: "Laptop" }, // Laptop - general waste
    { emoji: '📺', correct: '🗑️', name: "TV" }, // Television - general waste
    { emoji: '📄', correct: '♻️', name: "Paper" }, // Paper - recyclable
    { emoji: '☕', correct: '♻️', name: "Teacup" }, // Coffee cup - recyclable
    { emoji: '🍵', correct: '♻️', name: "Cup" }, // Tea cup - recyclable
    { emoji: '🍾', correct: '♻️', name: "Glass bottle" }, // Glass bottle - recyclable
    { emoji: '🥕', correct: '🍂', name: "Carrot" }, // Carrot - organic waste
    { emoji: '🍊', correct: '🍂', name: "Orange" }, // Orange - organic waste
    { emoji: '🍕', correct: '🍂', name: "Pizza box" }, // Pizza box - general waste
    { emoji: '🍔', correct: '🍂', name: "Burger wrapper" }, // Hamburger wrapper - general waste
    { emoji: '🍟', correct: '🗑️', name: "Fries box" }, // French fries - general waste
    { emoji: '🧸', correct: '🗑️', name: "Teddy" } // Teddy bear - general waste
];

let score = 0;
let timeLeft = 60;
let gameInterval;
let currentItem;

const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const itemElement = document.getElementById('item');
const bins = document.querySelectorAll('.bin');
const startButton = document.getElementById('start-btn');
const itemName = document.getElementById('item-name');
// const continueButton = document.getElementById('continue-btn');

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function updateTime() {
    timeElement.textContent = `Time: ${timeLeft}s`;
}

function getRandomItem() {
    return items[Math.floor(Math.random() * items.length)];
}

function setNewItem() {
    currentItem = getRandomItem();
    itemElement.textContent = currentItem.emoji;
    itemName.textContent = currentItem.name;
}

function endGame() {
    clearInterval(gameInterval);
    itemElement.textContent = `Game Over !!!`;
    startButton.style.display = 'none';
    // continueButton.style.display = 'block';
    bins.forEach(bin => bin.style.pointerEvents = 'none');
    showCustomAlert(`Game Over! Your score is ${score}`);
}
    

function startGame() {
    score = 0;
    timeLeft = 30;
    updateScore();
    updateTime();
    setNewItem();
    startButton.style.display = 'none';
    // continueButton.style.display = 'none';
    bins.forEach(bin => bin.style.pointerEvents = 'auto');

    gameInterval = setInterval(() => {
        timeLeft--;
        updateTime();
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

bins.forEach(bin => {
    bin.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    bin.addEventListener('drop', () => {
        if (bin.getAttribute('data-type') === currentItem.correct) {
            score++;
        } else {
            score--;
        }
        updateScore();
        setNewItem();
    });
});

itemElement.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', null);
});

startButton.addEventListener('click', startGame);
// continueButton.addEventListener('click', startGame);
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