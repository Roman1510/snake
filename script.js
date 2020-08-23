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
let food_x;
let food_y;
let changing_direction = false;
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
    if (has_game_ended()) return;

    changing_direction = false;
    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        move_snake();
        drawSnake();
        // Repeat
        main();
    }, 100)
}

function move_snake() {
      // Create the new Snake's head
      const head = {
          x: snake[0].x + dx,
          y: snake[0].y + dy
      };
      // Add the new head to the beginning of snake body
      snake.unshift(head);
      const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
      if (has_eaten_food) {
          // Increase score
          score += 10;
          // Display score on screen
          document.getElementById('score').innerHTML = score;
          // Generate new food location
          gen_food();
      } else {
          // Remove the last part of snake body
          snake.pop();
      }
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

function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
        const has_collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y
        if (has_collided)
            return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > cvs.width - 10;
    const hitToptWall = snake[0].y <0;
    0;
    const hitBottomWall = snake[0].y > cvs.height - 10;

    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}


//everything about food


function random_food(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function gen_food() {
    food_x = random_food(0, snakeboard.width - 10);
    food_y = random_food(0, snakeboard.height - 10);
    snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) gen_food();
    });
}

function drawFood() {
    ctx.fillStyle = 'lightgreen';
    ctx.strokestyle = 'darkgreen';
    ctx.fillRect(food_x, food_y, 10, 10);
    ctx.strokeRect(food_x, food_y, 10, 10);
}