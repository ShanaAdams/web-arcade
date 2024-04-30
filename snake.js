const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
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
    createFood();
  } else {
    snake.pop();
  }
}

createFood();
main();

function main() {
  setTimeout(function onTick() {
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
