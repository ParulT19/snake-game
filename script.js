const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");

const boxSize = 20;
const canvasSize = 400;

let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let food = generateFood();
let score = 0;

const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");

let highScore = localStorage.getItem("highScore") || 0;
highScoreEl.textContent = highScore;

// Keyboard Controls
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.keyCode;

    if (key === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (key === 38 && direction !== "DOWN") direction = "UP";
    else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (key === 40 && direction !== "UP") direction = "DOWN";
}

function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize,
        y: Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize,
    };
}

function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

    // Draw snake
    ctx.fillStyle = "lime";
    snake.forEach((segment) => {
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
    });

    // Snake head position
    let head = { ...snake[0] };

    if (direction === "LEFT") head.x -= boxSize;
    if (direction === "UP") head.y -= boxSize;
    if (direction === "RIGHT") head.x += boxSize;
    if (direction === "DOWN") head.y += boxSize;

    // Eat food
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreEl.textContent = score;
        food = generateFood();
    } else {
        snake.pop();
    }

    // Collision detection
    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= canvasSize ||
        head.y >= canvasSize ||
        snake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
        gameOver();
        return;
    }

    snake.unshift(head);
}

function gameOver() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }

    alert("Game Over! Your score: " + score);
    location.reload();
}

setInterval(draw, 120);