const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;
let score = 0;
let gameover = false;
ctx.font = '50px impact'
let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;

let ravens = [];
let pictures = [];
for (let i = 1; i < 9; i++) {
    pictures.push(`img${i}.png`);
}
console.log(pictures)
class Raven {
    constructor() {
        this.spriteWidth = 862;
        this.spriteHeight = 290;
        this.sizeModifier = Math.random() * 0.6 + 0.4;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height)
        this.markedForDeletion = false;
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;
        this.image = new Image();
        this.image.src = 'images/' + pictures[Math.floor(Math.random() * 8)];
        this.frame = 0;
        this.maxFrame = 4;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50;
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
    }
    update(deltatime) {
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY = this.directionY * -1;
        }
        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.x < 0 - this.width) this.markedForDeletion = true;
        this.timeSinceFlap += deltatime;
        if (this.timeSinceFlap > this.flapInterval) {
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;
            this.timeSinceFlap = 0;

        }


    }
    draw() {
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height
        );
        ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);

    }
}
let explosions = [];
// let canvasPosition = canvas.getBoundingClientRect();
// console.log(canvasPosition)

class Explosion {
    constructor(x, y, size) {
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        // this.width = this.spriteWidth / 2;
        // this.height = this.spriteHeight / 2;
        this.size = size;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = 'images/boom.png';
        this.frame = 0;
        this.timer = 0;
        this.sound = new Audio;
        this.sound.src = 'audio/boom.mp3';
        this.timeSinceLastFrame = 0;
        this.frameInterval = 200;
        this.markedForDeletion = false;
    }
    update(deltatime) {
        if (this.frame === 0) this.sound.play();
        this.timeSinceLastFrame += deltatime;

        if (this.timeSinceLastFrame > this.frameInterval) {
            this.frame++;
            this.timeSinceLastFrame = 0;
            if (this.frame > 5) this.markedForDeletion = true;
        }


    }
    draw() {
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y - this.size / 4, this.size, this.size);

    }
}


function drawscore() {
    ctx.fillStyle = 'black';
    ctx.fillText('Score:' + score, 50, 75);
    ctx.fillStyle = 'white';
    ctx.fillText('Score:' + score, 50, 80);
}

window.addEventListener('click', function (e) {
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
    console.log(detectPixelColor)
    const pc = detectPixelColor.data;
    ravens.forEach(object => {
        if (object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]) {
            //collision
            object.markedForDeletion = true;
            score++;
            explosions.push(new Explosion(object.x, object.y, object.width));
        }
    })
})


function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
    let deltatime = timestamp - lastTime;
    lastTime = timestamp
    timeToNextRaven += deltatime;
    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven());
        timeToNextRaven = 0;
        ravens.sort(function (a, b) {
            return a.width - b.width;
        })
    };
    drawscore();
    [...ravens, ...explosions].forEach(object => object.update(deltatime));
    [...ravens, ...explosions].forEach(object => object.draw());
    ravens = ravens.filter(object => !object.markedForDeletion);
    explosions = explosions.filter(object => !object.markedForDeletion);
    // console.log(ravens);
    requestAnimationFrame(animate);
}
animate(0);