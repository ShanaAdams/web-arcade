const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const startButton = document
  .getElementById("startButton")
  .addEventListener("click", restartGame);
function clearCanvas() {
  context.fillStyle = "white";
  context.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  context.strokeStyle = "black";
  context.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

let snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 },
];
let score = 0;
let dx = 10;
let dy = 0;

function drawSnakePart(snakePart) {
  context.fillStyle = "lightgreen";
  context.strokeStyle = "darkgreen";
  context.fillRect(snakePart.x, snakePart.y, 10, 10);
  context.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

document.addEventListener("keydown", changeDirection);
/*
 * Advances the snake by changing the x-coordinates of its parts
 * according to the horizontal velocity and the y-coordinates of its parts
 * according to the vertical veolocity
 */

function advanceSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  const didEatFood = snake[0].x === foodX && snake[0].y === foodY;

  if (didEatFood) {
    score += 10;
    document.getElementById("score").innerHTML = score;
    createFood();
  } else {
    snake.pop();
  }
}

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

createFood();
main();

function main() {
  if (didGameEnd()) {
    drawGameOver();
    return;
  }
  setTimeout(function onTick() {
    changingDirection = false;
    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();
    main();
  }, 100);
}

function randomTen(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function createFood() {
  foodX = randomTen(0, gameCanvas.width - 10);
  foodY = randomTen(0, gameCanvas.height - 10);
  snake.forEach(function isFoodOnSnake(part) {
    const foodIsOnSnake = part.x == foodX && part.y == foodY;
    if (foodIsOnSnake) createFood();
  });
}

function drawFood() {
  context.fillStyle = "red";
  context.strokeStyle = "darkred";
  context.fillRect(foodX, foodY, 10, 10);
  context.strokeRect(foodX, foodY, 10, 10);
}
let gameOverInterval;

function didGameEnd() {
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > gameCanvas.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > gameCanvas.height - 10;

  for (let i = 4; i < snake.length; i++) {
    const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y;

    if (
      didCollide ||
      hitLeftWall ||
      hitRightWall ||
      hitToptWall ||
      hitBottomWall
    ) {
      updateHighScore();
      startGameOver();
      return true;
    }
  }

  if (hitLeftWall || hitRightWall || hitToptWall || hitBottomWall) {
    startGameOver();
    return true;
  }
  return false;
}

let gameOverVisible = true;

function drawGameOver() {
  if (gameOverVisible) {
    context.fillStyle = "black";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.font = "normal bold 60px 'Jersey 15'";
    context.fillText("Game Over!", gameCanvas.width / 2, gameCanvas.height / 2);
  }
}

function startGameOver() {
  gameOverInterval = setInterval(() => {
    gameOverVisible = !gameOverVisible;

    drawGameOver();
  }, 400);
}
function displayHighScore() {}

function restartGame() {
  clearInterval(gameOverInterval);
  gameOverVisible = false;

  // Reset game variables to their initial state
  snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 },
  ];
  score = 0;
  dx = 10;
  dy = 0;
  // Restart the game loop
  main();
}

document.addEventListener("keydown", changeDirection);
