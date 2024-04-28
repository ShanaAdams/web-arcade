let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");

context.fillStyle = "white";
context.fillRect(0, 0, 300, 300);
context.strokeStyle = "black";
context.strokeRect(0, 0, 300, 300);

let snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 },
];

function drawSnakePart(snakePart) {
  context.fillStyle = "lightgreen";
  context.strokeStyle = "darkgreen";
  context.fillRect(snakePart.x, snakePart.y, 10, 10);
  context.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

drawSnake();
