function initializeGame(){const gameData = {
    start: {
        story: "Welcome to your eco-village! You have to make decisions to build a sustainable community. What will you focus on first?",
        choices: [
            { text: "Implement renewable energy sources", nextScene: "energy" },
            { text: "Start a community recycling program", nextScene: "recycling" },
            { text: "Promote water conservation measures", nextScene: "water" }
        ]
    },
    energy: {
        story: "You decided to implement renewable energy sources. What is your next step?",
        choices: [
            { text: "Install solar panels", nextScene: "solar", score: 10 },
            { text: "Build wind turbines", nextScene: "wind", score: 15 },
            { text: "Promote energy efficiency", nextScene: "efficiency", score: 5 }
        ]
    },
    recycling: {
        story: "You started a recycling program. What will you do next?",
        choices: [
            { text: "Set up recycling bins around the village", nextScene: "bins", score: 10 },
            { text: "Organize recycling workshops", nextScene: "workshops", score: 5 },
            { text: "Collaborate with local businesses for recycling", nextScene: "business", score: 15 }
        ]
    },
    water: {
        story: "You promoted water conservation measures. What is your next action?",
        choices: [
            { text: "Implement rainwater harvesting", nextScene: "harvesting", score: 10 },
            { text: "Install water-efficient fixtures", nextScene: "fixtures", score: 5 },
            { text: "Educate community about water conservation", nextScene: "education", score: 5 }
        ]
    },
    solar: {
        story: "Solar panels are up and running. How do you maintain them?",
        choices: [
            { text: "Regular cleaning and maintenance", nextScene: "maintenance", score: 10 },
            { text: "Monitor energy production", nextScene: "monitoring", score: 5 },
            { text: "Upgrade technology periodically", nextScene: "upgrades", score: 5 }
        ]
    },
    wind: {
        story: "Wind turbines are operational. What’s your next step?",
        choices: [
            { text: "Check for noise issues", nextScene: "noise", score: 5 },
            { text: "Monitor energy output", nextScene: "output", score: 10 },
            { text: "Ensure minimal impact on wildlife", nextScene: "wildlife", score: 15 }
        ]
    },
    efficiency: {
        story: "You promoted energy efficiency. What’s your next initiative?",
        choices: [
            { text: "Conduct energy audits", nextScene: "audits", score: 5 },
            { text: "Encourage energy-saving habits", nextScene: "habits", score: 10 },
            { text: "Upgrade to energy-efficient appliances", nextScene: "appliances", score: 15 }
        ]
    },
    bins: {
        story: "Recycling bins are set up. What’s your next move?",
        choices: [
            { text: "Promote proper waste segregation", nextScene: "segregation", score: 10 },
            { text: "Track recycling rates", nextScene: "tracking", score: 5 },
            { text: "Expand recycling bin locations", nextScene: "expansion", score: 15 }
        ]
    },
    workshops: {
        story: "Recycling workshops are underway. What’s the next step?",
        choices: [
            { text: "Evaluate workshop effectiveness", nextScene: "evaluation", score: 5 },
            { text: "Increase workshop frequency", nextScene: "frequency", score: 10 },
            { text: "Collaborate with schools", nextScene: "schools", score: 15 }
        ]
    },
    business: {
        story: "Local businesses are collaborating. What’s your next action?",
        choices: [
            { text: "Implement a business recycling program", nextScene: "business_program", score: 15 },
            { text: "Host community events", nextScene: "events", score: 10 },
            { text: "Increase business participation", nextScene: "participation", score: 5 }
        ]
    },
    harvesting: {
        story: "Rainwater harvesting is in place. How do you maintain it?",
        choices: [
            { text: "Regularly clean filters", nextScene: "cleaning", score: 10 },
            { text: "Monitor water quality", nextScene: "quality", score: 5 },
            { text: "Educate residents on use", nextScene: "education_use", score: 5 }
        ]
    },
    fixtures: {
        story: "Water-efficient fixtures are installed. What’s your next step?",
        choices: [
            { text: "Track water usage", nextScene: "tracking", score: 10 },
            { text: "Promote fixture benefits", nextScene: "promotion", score: 5 },
            { text: "Conduct regular maintenance", nextScene: "maintenance", score: 5 }
        ]
    },
    education: {
        story: "Community education is in progress. What will you focus on next?",
        choices: [
            { text: "Expand education programs", nextScene: "expansion", score: 10 },
            { text: "Evaluate program success", nextScene: "evaluation", score: 5 },
            { text: "Engage local influencers", nextScene: "influencers", score: 5 }
        ]
    }
};

let currentScene;
let ecoScore = 0;
let decisionPath = [];
const maxDecisions = 10;

function startGame() {
    currentScene = 'start';
    ecoScore = 0;
    decisionPath = [];
    updateScene();
    updateDecisionTree();
}

function updateScene() {
    const scene = gameData[currentScene];
    document.getElementById('story').textContent = scene.story;
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    scene.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.onclick = () => makeChoice(choice);
        choicesDiv.appendChild(button);
    });
    document.getElementById('score').textContent = ecoScore;
}

function makeChoice(choice) {
    decisionPath.push(choice.text);
    if (choice.score) {
        ecoScore += choice.score;
    }
    if (decisionPath.length >= maxDecisions) {
        endGame();
    } else if (gameData[choice.nextScene]) {
        currentScene = choice.nextScene;
        updateScene();
        updateDecisionTree();
    } else {
        endGame();
    }
}

function updateDecisionTree() {
    const treeContainer = document.getElementById('tree-container');
    treeContainer.innerHTML = '';
    let currentNode = treeContainer;

    decisionPath.forEach((decision, index) => {
        const node = document.createElement('div');
        node.className = 'tree-node';
        node.textContent = `${index + 1}. ${decision}`;
        currentNode.appendChild(node);
        currentNode = node;
    });
}

function endGame() {
    let message;
    if (ecoScore >= 70) {
        message = "Outstanding! Your eco-village is a model of sustainability!";
    } else if (ecoScore >= 40) {
        message = "Well done! Your eco-village is making a positive impact.";
    } else if (ecoScore >= 10) {
        message = "Good job! Your eco-village is improving, but there’s room for more sustainability.";
    } else {
        message = "Your eco-village has potential. Review your decisions and try again to improve sustainability.";
    }
    showCustomAlert(`Game Over. ${message}`);
}

startGame();
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