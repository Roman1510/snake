const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';
const cvs = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

let snake = [{ x: 200, y: 200 }, { x: 190, y: 200 }, { x: 180, y: 200 }, { x: 170, y: 200 }, { x: 160, y: 200 },];
// Horizontal velocity
let dx = 10;
// Vertical velocity
let dy = 0;
function clearCanvas() {
    //  Select the colour to fill the drawing
    ctx.fillStyle = board_background;
    //  Select the colour for the border of the canvas
    ctx.strokestyle = board_border;
    // Draw a "filled" rectangle to cover the entire canvas
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    // Draw a "border" around the entire canvas
    ctx.strokeRect(0, 0, cvs.width, cvs.height);
}
function drawSnakePart(snakePart) {
    ctx.fillStyle = 'lightblue';
    ctx.strokestyle = 'darkblue';
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

/*Function that prints the parts*/
function drawSnake() {
    snake.forEach(drawSnakePart);
}

main();

// main function called repeatedly to keep the game running
function main() {
    setTimeout(function onTick() {
        clearCanvas();
        move_snake();
        drawSnake();
        // Call main again
        main();
    }, 100)
}

function move_snake() {
    const head = { x: snake[0].x + dx, y: snake[0].y+dy };
    snake.unshift(head);
    snake.pop();
}
console.log("started")
function change_direction(event) {
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
document.addEventListener("keydown", change_direction)