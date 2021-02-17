//window.myNameSpace = window.myNameSpace || { };

const pi = Math.PI;

// canvas setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 625;

let score = 0;
let gameFrame = 0;
ctx.font = "50px Georgia";

// mouse interactivity
let canvasPosition = canvas.getBoundingClientRect();

const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}

canvas.addEventListener("mousedown", function (event) {
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
});
canvas.addEventListener("mouseup", function () {
    mouse.click = false;
});

// player
class Player {
    constructor() {
        this.p = new Vector(canvas.width/2, canvas.height/2);
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 80;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 15;
        this.spriteHeight = 10;
    }
    update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        if (dx !== 0 && dy !== 0) {
            this.angle = Math.acos(dx / Math.sqrt(dx*dx + dy*dy)); // dot product with (1|0)
            if (dy < 0)
                this.angle *= -1;
        }
        if (dx !== 0) {
            this.x += dx/25;
        }
        if (dy !== 0) {
            this.y += dy/25;
        }
    }
    draw() {
        if (mouse.click) {
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.angle + pi/8, this.angle + pi*15/8);
        ctx.lineTo(this.x, this.y);
        ctx.closePath();
        ctx.fill();
    }
}
const player = new Player();

// bubbles

// animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.draw();
    requestAnimationFrame(animate);
}
animate();