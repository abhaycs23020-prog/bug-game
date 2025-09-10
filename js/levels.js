// Game Levels Configuration
const levels = [
  {
    id: 1,
    goal: {x: 5, y: 1},
    obstacles: []
  },
  {
    id: 2,
    goal: {x: 5, y: 5},
    obstacles: [{x: 3, y: 3}]
  },
  {
    id: 3,
    goal: {x: 1, y: 1},
    obstacles: [{x: 2, y: 2}, {x: 4, y: 4}]
  }
];

let currentLevel = 0;

function loadLevel(levelIndex) {
  currentLevel = levelIndex;
  const level = levels[levelIndex];

  // Reset robot position & direction
  robotPos = {x: 1, y: 5};
  direction = "up";
  updateRobot();

  // Place goal
  const goal = document.getElementById("goal");
  goal.style.gridColumn = level.goal.x;
  goal.style.gridRow = level.goal.y;

  // Clear old obstacles
  document.querySelectorAll(".obstacle").forEach(el => el.remove());

  // Add obstacles
  const gameArea = document.getElementById("gameArea");
  level.obstacles.forEach(obs => {
    const div = document.createElement("div");
    div.classList.add("obstacle");
    div.style.gridColumn = obs.x;
    div.style.gridRow = obs.y;
    div.textContent = "⬛";
    gameArea.appendChild(div);
  });
}

function checkCollision() {
  const level = levels[currentLevel];
  for (let obs of level.obstacles) {
    if (robotPos.x === obs.x && robotPos.y === obs.y) {
      alert("❌ Game Over! You hit an obstacle.");
      loadLevel(currentLevel); // restart same level
      return true;
    }
  }
  return false;
}

function checkWin() {
  const level = levels[currentLevel];
  if (robotPos.x === level.goal.x && robotPos.y === level.goal.y) {
    alert("🎉 Level " + (currentLevel + 1) + " Complete!");
    if (currentLevel + 1 < levels.length) {
      loadLevel(currentLevel + 1);
    } else {
      alert("🏆 Congratulations! You finished all levels!");
    }
  }
}
