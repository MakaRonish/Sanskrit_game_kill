// const canvas = document.getElementById('canvas1');
// const ctx = canvas.getContext('2d');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// const collisionCanvas = document.getElementById('collisionCanvas');
// const collisionCtx = collisionCanvas.getContext('2d');
// collisionCanvas.width = window.innerWidth;
// collisionCanvas.height = window.innerHeight;
// let score = 0;
// let gameover = false;
// ctx.font = '50px impact'
// let timeToNextRaven = 0;
// let ravenInterval = 500;
// let lastTime = 0;

// let ravens = [];
// let pictures = [];
// for (let i = 1; i < 9; i++) {
//     pictures.push(`img${i}.png`);
// }
// console.log(pictures)
// class Raven {
//     constructor() {
//         this.spriteWidth = 862;
//         this.spriteHeight = 290;
//         this.sizeModifier = Math.random() * 0.6 + 0.4;
//         this.width = this.spriteWidth / 2;
//         this.height = this.spriteHeight / 2;
//         this.x = canvas.width;
//         this.y = Math.random() * (canvas.height - this.height)
//         this.markedForDeletion = false;
//         this.directionX = Math.random() * 2 + 3;
//         this.directionY = Math.random() * 2 - 2.5;
//         this.image = new Image();
//         this.image.src = 'images/' + pictures[Math.floor(Math.random() * 8)];
//         this.frame = 0;
//         this.maxFrame = 4;
//         this.timeSinceFlap = 0;
//         this.flapInterval = Math.random() * 50 + 50;
//         this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
//         this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
//     }
//     update(deltatime) {
//         if (this.y < 0 || this.y > canvas.height - this.height) {
//             this.directionY = this.directionY * -1;
//         }
//         this.x -= this.directionX;
//         this.y += this.directionY;
//         if (this.x < 0 - this.width) this.markedForDeletion = true;
//         this.timeSinceFlap += deltatime;
//         if (this.timeSinceFlap > this.flapInterval) {
//             if (this.frame > this.maxFrame) this.frame = 0;
//             else this.frame++;
//             this.timeSinceFlap = 0;

//         }


//     }
//     draw() {
//         collisionCtx.fillStyle = this.color;
//         collisionCtx.fillRect(this.x, this.y, this.width, this.height
//         );
//         ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);

//     }
// }
// let explosions = [];
// // let canvasPosition = canvas.getBoundingClientRect();
// // console.log(canvasPosition)

// class Explosion {
//     constructor(x, y, size) {
//         this.spriteWidth = 200;
//         this.spriteHeight = 179;
//         // this.width = this.spriteWidth / 2;
//         // this.height = this.spriteHeight / 2;
//         this.size = size;
//         this.x = x;
//         this.y = y;
//         this.image = new Image();
//         this.image.src = 'images/boom.png';
//         this.frame = 0;
//         this.timer = 0;
//         this.sound = new Audio;
//         this.sound.src = 'audio/boom.mp3';
//         this.timeSinceLastFrame = 0;
//         this.frameInterval = 200;
//         this.markedForDeletion = false;
//     }
//     update(deltatime) {
//         if (this.frame === 0) this.sound.play();
//         this.timeSinceLastFrame += deltatime;

//         if (this.timeSinceLastFrame > this.frameInterval) {
//             this.frame++;
//             this.timeSinceLastFrame = 0;
//             if (this.frame > 5) this.markedForDeletion = true;
//         }


//     }
//     draw() {
//         ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y - this.size / 4, this.size, this.size);

//     }
// }


// function drawscore() {
//     ctx.fillStyle = 'black';
//     ctx.fillText('Score:' + score, 50, 75);
//     ctx.fillStyle = 'white';
//     ctx.fillText('Score:' + score, 50, 80);
// }

// window.addEventListener('click', function (e) {
//     const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
//     console.log(detectPixelColor)
//     const pc = detectPixelColor.data;
//     ravens.forEach(object => {
//         if (object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]) {
//             //collision
//             object.markedForDeletion = true;
//             score++;
//             explosions.push(new Explosion(object.x, object.y, object.width));
//         }
//     })
// })


// function animate(timestamp) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
//     let deltatime = timestamp - lastTime;
//     lastTime = timestamp
//     timeToNextRaven += deltatime;
//     if (timeToNextRaven > ravenInterval) {
//         ravens.push(new Raven());
//         timeToNextRaven = 0;
//         ravens.sort(function (a, b) {
//             return a.width - b.width;
//         })
//     };
//     drawscore();
//     [...ravens, ...explosions].forEach(object => object.update(deltatime));
//     [...ravens, ...explosions].forEach(object => object.draw());
//     ravens = ravens.filter(object => !object.markedForDeletion);
//     explosions = explosions.filter(object => !object.markedForDeletion);
//     // console.log(ravens);
//     requestAnimationFrame(animate);
// }
// animate(0);

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionCanvas = document.getElementById("collisionCanvas");
const collisionCtx = collisionCanvas.getContext("2d");
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;



let score = 0;
let lives = 5; // New: Lives counter
let gameover = false;
ctx.font = "50px impact";

let timeToNextRaven = 0;
let ravenInterval = 700;
let lastTime = 0;

let ravens = [];
let explosions = [];
let pictures = [
    "img1.png", "img2.png", "img3.png", "img4.png",
    "img5.png", "img6.png", "img7.png", "img8.png"
];



const meaningImages = {
    "img1.png": "images/img1.png", // Agni (Fire)
    "img2.png": "images/img2.png", // Jalam (Water)
    "img3.png": "images/img3.png", // Vayu (Air)
    "img4.png": "images/img4.png", // Prithvi (Earth)
    "img5.png": "images/img5.png", // Aakash (Sky)
    "img6.png": "images/img6.png", // Surya (Sun)
    "img7.png": "images/img7.png", // Chandra (Moon)
    "img8.png": "images/img8.png"  // Nadi (River)
};

const playAgainButton = document.createElement("button");
playAgainButton.innerText = "Play Again";
playAgainButton.style.position = "absolute";
playAgainButton.style.top = "60%";
playAgainButton.style.left = "50%";
playAgainButton.style.width = "200px";
playAgainButton.style.height = "70px";
playAgainButton.style.transform = "translate(-50%, -50%)";
playAgainButton.style.padding = "7px 20px";
playAgainButton.style.fontSize = "22px";
playAgainButton.style.fontWeight = "bold";
playAgainButton.style.backgroundColor = "#c2fbd7";
playAgainButton.style.borderRadius = "100px";
playAgainButton.style.boxShadow = "rgba(44, 187, 99, .2) 0 -25px 18px -14px inset, rgba(44, 187, 99, .15) 0 1px 2px, rgba(44, 187, 99, .15) 0 2px 4px, rgba(44, 187, 99, .15) 0 4px 8px, rgba(44, 187, 99, .15) 0 8px 16px, rgba(44, 187, 99, .15) 0 16px 32px";
playAgainButton.style.color = "green";
playAgainButton.style.cursor = "pointer";
playAgainButton.style.fontFamily = "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif";
playAgainButton.style.textAlign = "center";
playAgainButton.style.textDecoration = "none";
playAgainButton.style.transition = "all 250ms";
playAgainButton.style.border = "0";
playAgainButton.style.userSelect = "none";
playAgainButton.style.webkitUserSelect = "none";
playAgainButton.style.touchAction = "manipulation";
playAgainButton.style.display = "none"; // Hidden initially
document.body.appendChild(playAgainButton);


// Restart the Game
function restartGame() {
    score = 0;
    lives = 5;
    gameover = false;
    ravens = [];
    explosions = [];
    lastTime = 0;
    timeToNextRaven = 0;

    playAgainButton.style.display = "none";

    // Reinitialize or clear the canvas context
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);// Hide button
    drawScore();
    animate(0); // Restart animation loop
}

class Raven {
    constructor() {
        this.spriteWidth = 862;
        this.spriteHeight = 290;
        this.sizeModifier = Math.random() * 0.6 + 0.4;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.markedForDeletion = false;
        this.directionX = Math.random() * 2 + 2;
        this.directionY = Math.random() * 2 - 2.5;

        this.image = new Image();
        this.imageName = pictures[Math.floor(Math.random() * pictures.length)];
        this.image.src = "images/" + this.imageName;

        this.frame = 0;
        this.maxFrame = 4;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50;
        this.randomColors = [
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255)
        ];
        this.color = `rgb(${this.randomColors[0]}, ${this.randomColors[1]}, ${this.randomColors[2]})`;
    }

    update(deltatime) {
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY = this.directionY * -1;
        }
        this.x -= this.directionX;
        this.y += this.directionY;

        // Lose a life if a raven exits the screen
        if (this.x < 0 - this.width) {
            this.markedForDeletion = true;
            lives--;
            if (lives <= 0) gameover = true;
        }

        this.timeSinceFlap += deltatime;
        if (this.timeSinceFlap > this.flapInterval) {
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;
            this.timeSinceFlap = 0;
        }
    }

    draw() {
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

class Explosion {
    constructor(x, y, size) {
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.size = size;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = 'images/boom.png';
        this.frame = 0;
        this.timer = 0;
        this.sound = new Audio();
        this.sound.src = 'audio/boom.mp3';
        this.timeSinceLastFrame = 0;
        this.frameInterval = 200;
        this.markedForDeletion = false;
    }
    update(deltatime) {
        this.sound.volume = 1;
        if (this.frame === 0) this.sound.play();
        this.timeSinceLastFrame += deltatime;

        if (this.timeSinceLastFrame > this.frameInterval) {
            this.frame++;
            this.timeSinceLastFrame = 0;
            if (this.frame > 5) this.markedForDeletion = true;
        }
    }
    draw() {
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y - this.size / 4, this.size / 2, this.size / 2);
    }
}

// Click event to pop ravens
let displayedImage = null;
let imageX = 50;
let imageY = 150;
let imageTimeout = null;

window.addEventListener("click", function (e) {
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
    const pc = detectPixelColor.data;

    ravens.forEach((object) => {
        if (
            object.randomColors[0] === pc[0] &&
            object.randomColors[1] === pc[1] &&
            object.randomColors[2] === pc[2]
        ) {
            object.markedForDeletion = true;
            score++;

            explosions.push(new Explosion(object.x, object.y, object.width));

            // Show Meaning Image
            setTimeout(() => {
                let imagePath = meaningImages[object.imageName];
                if (imagePath) {
                    displayedImage = new Image();
                    displayedImage.src = imagePath;
                    imageX = object.x - 50;
                    imageY = object.y - 50;

                    clearTimeout(imageTimeout);
                    imageTimeout = setTimeout(() => {
                        displayedImage = null;
                    }, 3000);
                }
            }, 300); // Delay to sync with explosion
        }
    });
});

function drawScore() {
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 100, 75);
    ctx.fillText("Lives: " + lives, 100, 125);
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 100, 80);
    ctx.fillText("Lives: " + lives, 100, 130);

    if (displayedImage) {
        ctx.drawImage(displayedImage, imageX, imageY, 430, 130);
    }
}

// Create an audio object for the background music
const backgroundMusic = new Audio('audio/background.mp3');

// Set the audio to loop continuously
backgroundMusic.loop = true;

// Set the volume (optional: adjust as needed)
backgroundMusic.volume = 0.5; // Set volume to 30% of full volume (adjust as needed)

// Start playing the music as soon as the game is loaded
backgroundMusic.play().catch((error) => {
    console.log("Music playback failed: ", error);
});


// Handle Game Over
function gameOver() {

    ctx.textAlign = 'center';
    ctx.fillStyle = "black";
    ctx.fillText("Game Over! Score is " + score, canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = "white";
    ctx.fillText("Game Over! Score is" + score, canvas.width / 2 + 5, canvas.height / 2 + 5);
    playAgainButton.style.display = "block";
}

// Game loop
function animate(timestamp) {
    if (gameover) {
        gameOver()

        return;
    } // Stop animation if game over

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += deltatime;

    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven());
        timeToNextRaven = 0;
        ravens.sort((a, b) => a.width - b.width);
    }

    drawScore();

    [...ravens, ...explosions].forEach((object) => object.update(deltatime));
    [...ravens, ...explosions].forEach((object) => object.draw());

    ravens = ravens.filter((object) => !object.markedForDeletion);
    explosions = explosions.filter((object) => !object.markedForDeletion);

    requestAnimationFrame(animate);
}
playAgainButton.addEventListener("click", restartGame);

animate(0);

// Start playing the background music after the user clicks anywhere
window.addEventListener('click', () => {
    backgroundMusic.play().catch((error) => {
        console.log("Music playback failed: ", error);
    });
});



