// ---------------- Variables ----------------
let score = 0, level = 1, combo = 0, time = 60;
let difficulty = 'easy';
let bugSpeed = 1000;
let timerInterval, bugInterval;
let soundEnabled = true;
let powerupsEnabled = true;

const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const endScreen = document.getElementById('endScreen');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');
const timeEl = document.getElementById('time');
const comboEl = document.getElementById('combo');
const gameArea = document.getElementById('gameArea');
const finalScoreEl = document.getElementById('finalScore');

const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const muteBtn = document.getElementById('muteBtn');

const settingsBtn = document.getElementById('settingsBtn');
const settingsMenu = document.getElementById('settingsMenu');
const closeSettings = document.getElementById('closeSettings');
const difficultyInGame = document.getElementById('difficultyInGame');
const soundToggle = document.getElementById('soundToggle');
const powerupToggle = document.getElementById('powerupToggle');

const difficultySelect = document.getElementById('difficulty');

// ---------------- Start Screen Difficulty ----------------
difficultySelect.addEventListener('change', () => {
    difficulty = difficultySelect.value;
});

// ---------------- Start Game ----------------
startBtn.addEventListener('click', () => startGame());
restartBtn.addEventListener('click', () => startGame());

function startGame() {
    // Reset variables
    score = 0; level = 1; combo = 0;
    scoreEl.textContent = score;
    levelEl.textContent = level;
    comboEl.textContent = combo;

    // Adjust settings based on difficulty
    switch(difficulty){
        case 'easy':
            time = 90; bugSpeed = 1000; break;
        case 'medium':
            time = 60; bugSpeed = 700; break;
        case 'hard':
            time = 45; bugSpeed = 400; break;
    }
    timeEl.textContent = time;

    // Show game screen
    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    gameArea.innerHTML = '';

    // Timer
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        time--;
        timeEl.textContent = time;
        if(time <= 0) endGame();
    }, 1000);

    // Bug spawning
    clearInterval(bugInterval);
    bugInterval = setInterval(spawnBugs, bugSpeed);
}

// ---------------- Spawn Bugs ----------------
function spawnBugs() {
    if(powerupsEnabled === false && Math.random() < 0.2) return; // skip power-ups

    const bug = document.createElement('div');
    bug.classList.add('bug');

    // Random type based on difficulty
    let typeRand = Math.random();
    if(difficulty==='easy') typeRand *= 0.8;
    else if(difficulty==='medium') typeRand *= 0.9;

    if(typeRand < 0.6) bug.dataset.type = 'easy';
    else if(typeRand < 0.9) bug.dataset.type = 'hard';
    else bug.dataset.type = 'critical';

    // Set background
    bug.style.backgroundImage = typeRand < 0.6 ? "url('assets/images/bug_easy.png')" :
                                typeRand < 0.9 ? "url('assets/images/bug_hard.png')" :
                                "url('assets/images/bug_critical.png')";

    // Random position
    bug.style.top = Math.random()*(gameArea.clientHeight-50)+'px';
    bug.style.left = Math.random()*(gameArea.clientWidth-50)+'px';

    gameArea.appendChild(bug);

    bug.addEventListener('click', () => handleBugClick(bug));

    // Remove after 5s
    setTimeout(()=> { if(bug.parentElement) bug.remove(); }, 5000);
}

// ---------------- Handle Bug Click ----------------
function handleBugClick(bug) {
    let points = 1;
    if(bug.dataset.type === 'hard') points = 3;
    else if(bug.dataset.type === 'critical') points = 5;

    score += points;
    combo++;
    scoreEl.textContent = score;
    comboEl.textContent = combo;

    if(soundEnabled) playSound('fix');

    // Bug disappear
    if(bug.parentElement) bug.remove();

    // Level up every 20 points
    if(score >= level*20) {
        level++;
        levelEl.textContent = level;
        if(soundEnabled) playSound('levelup');
        // Optional: increase difficulty slightly
        if(bugSpeed > 200) {
            bugSpeed -= 50;
            clearInterval(bugInterval);
            bugInterval = setInterval(spawnBugs, bugSpeed);
        }
    }
}

// ---------------- End Game ----------------
function endGame() {
    clearInterval(timerInterval);
    clearInterval(bugInterval);
    finalScoreEl.textContent = score;

    gameScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
}

// ---------------- Mute ----------------
muteBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    muteBtn.textContent = soundEnabled ? '🔊 Mute' : '🔇 Muted';
});

// ---------------- Settings Menu ----------------
settingsBtn.addEventListener('click', () => settingsMenu.classList.remove('hidden'));
closeSettings.addEventListener('click', () => {
    settingsMenu.classList.add('hidden');
    difficulty = difficultyInGame.value;
});
soundToggle.addEventListener('change', () => soundEnabled = soundToggle.checked);
powerupToggle.addEventListener('change', () => powerupsEnabled = powerupToggle.checked);

// ---------------- Sound Function (Demo) ----------------
function playSound(type){
    // For demo, we just log. Replace with actual audio files if needed.
    console.log(`Play sound: ${type}`);
}
