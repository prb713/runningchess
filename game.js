const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let isJumping = false;
let jumpHeight = 0;
let jumpSpeed = 0;

const groundY = canvas.height - 100;  // 공룡과 장애물이 서 있는 지면의 y좌표

const dino = {
    x: 50,
    y: groundY,
    width: 50,
    height: 50,
    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y - jumpHeight, this.width, this.height);
    }
};

const obstacle = {
    x: canvas.width,
    y: groundY,
    width: 50,
    height: 50,
    speed: 10,
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dino.draw();
    obstacle.draw();

    obstacle.x -= obstacle.speed;
    if (obstacle.x + obstacle.width < 0) {
        obstacle.x = canvas.width;
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
    }

    if (isJumping) {
        jumpHeight += jumpSpeed;
        jumpSpeed -= 0.5;
        if (jumpHeight <= 0) {
            jumpHeight = 0;
            isJumping = false;
        }
    }

    if (detectCollision(dino, obstacle)) {
        alert('Game Over! Your score: ' + score);
        document.location.reload();
    }

    requestAnimationFrame(update);
}

function detectCollision(dino, obstacle) {
    return dino.x < obstacle.x + obstacle.width &&
           dino.x + dino.width > obstacle.x &&
           dino.y - jumpHeight < obstacle.y + obstacle.height &&
           dino.y - jumpHeight + dino.height > obstacle.y;
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !isJumping) {
        isJumping = true;
        jumpSpeed = 10;
    }
});

update();
