// Robot Logic
let robotPos = {x: 1, y: 5};
let direction = "up";

function updateRobot() {
  const robot = document.getElementById("robot");
  robot.style.gridColumn = robotPos.x;
  robot.style.gridRow = robotPos.y;
}

function moveForward() {
  if (direction === "up" && robotPos.y > 1) robotPos.y--;
  else if (direction === "down" && robotPos.y < 5) robotPos.y++;
  else if (direction === "left" && robotPos.x > 1) robotPos.x--;
  else if (direction === "right" && robotPos.x < 5) robotPos.x++;
  updateRobot();
}

function turnLeft() {
  if (direction === "up") direction = "left";
  else if (direction === "left") direction = "down";
  else if (direction === "down") direction = "right";
  else if (direction === "right") direction = "up";
}

function turnRight() {
  if (direction === "up") direction = "right";
  else if (direction === "right") direction = "down";
  else if (direction === "down") direction = "left";
  else if (direction === "left") direction = "up";
}

// ✅ Reset game will reload the current level (from levels.js)
function resetGame() {
  loadLevel(currentLevel);
}

// ❌ Old checkWin() removed (handled in levels.js)

updateRobot();
