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

/*
 * Advances the snake by changing the x-coordinates of its parts
 * according to the horizontal velocity and the y-coordinates of its parts
 * according to the vertical veolocity
 */

function advanceSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  snake.pop();
}

main();

function main() {
  setTimeout(function onTick() {
    clearCanvas();
    advanceSnake();
    drawSnake();
    main();
  }, 100);
}
