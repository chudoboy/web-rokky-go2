const canvas = document.getElementById("dinoCanvas");
const ctx = canvas.getContext("2d");
const jumpBtn = document.querySelector(".jump");
const scoreDisplay = document.querySelector(".score");

const cssWidth = 394;
const cssHeight = 56;

canvas.style.width = cssWidth + "px";
canvas.style.height = cssHeight + "px";
const scale = window.devicePixelRatio || 1;
canvas.width = cssWidth * scale;
canvas.height = cssHeight * scale;
ctx.setTransform(scale, 0, 0, scale, 0, 0);

const ground = cssHeight - 10;
const dinoX = 40;
let dinoY = ground;
let velocity = 0;
const gravity = 0.6;
let jumping = false;
let runFrame = 0;
let runTimer = 0;
let score = 0;
let gameOver = false;

const dinoRun1 = new Image();
const dinoRun2 = new Image();
const dinoJump = new Image();
const roadImg = new Image();
const cactusImages = [];

// 🛠 исправленные пути
dinoRun1.src = "/static/img/Running-1.svg";
dinoRun2.src = "/static/img/Running-2.svg";
dinoJump.src = "/static/img/Jumping.svg";
roadImg.src = "/static/img/doroga.svg";

for (let i = 1; i <= 5; i++) {
  const cactus = new Image();
  cactus.src = `/static/img/Cactus-${i}.svg`;
  cactusImages.push(cactus);
}

let obstacleX = cssWidth + 40;
let currentCactus = cactusImages[Math.floor(Math.random() * cactusImages.length)];
let obstacleWidth = 14;
let obstacleHeight = 15;
let passedCactus = false;
let roadOffset = 0;

jumpBtn.addEventListener("click", () => {
  if (!jumping && !gameOver) {
    velocity = -8;
    jumping = true;
  }
});

function updateScoreUI() {
  scoreDisplay.textContent = `${score} score`;
}

function resetGame() {
  obstacleX = cssWidth + 40;
  currentCactus = cactusImages[Math.floor(Math.random() * cactusImages.length)];
  dinoY = ground;
  velocity = 0;
  jumping = false;
  score = 0;
  passedCactus = false;
  gameOver = false;
  runFrame = 0;
  runTimer = 0;
  updateScoreUI();
  update();
}

function drawDino() {
  const sprite = jumping || dinoY < ground ? dinoJump : (runFrame % 2 === 0 ? dinoRun1 : dinoRun2);
  ctx.drawImage(sprite, dinoX, dinoY - 15, 15, 15);
}

function drawObstacle() {
  ctx.drawImage(currentCactus, obstacleX, ground - obstacleHeight + 2, obstacleWidth, obstacleHeight);
}

function drawRoad() {
  roadOffset -= 4;
  if (roadOffset <= -cssWidth) roadOffset = 0;
  ctx.drawImage(roadImg, roadOffset, ground, cssWidth, 6);
  ctx.drawImage(roadImg, roadOffset + cssWidth, ground, cssWidth, 6);
}

function checkCollision() {
  const dinoBox = { x: dinoX, y: dinoY - 15, width: 15, height: 15 };
  const obstacleBox = {
    x: obstacleX,
    y: ground - obstacleHeight + 2,
    width: obstacleWidth,
    height: obstacleHeight
  };

  const collide = !(
    dinoBox.x > obstacleBox.x + obstacleBox.width ||
    dinoBox.x + dinoBox.width < obstacleBox.x ||
    dinoBox.y > obstacleBox.y + obstacleBox.height ||
    dinoBox.y + dinoBox.height < obstacleBox.y
  );

  return collide;
}

function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, cssWidth, cssHeight);
  drawRoad();
  drawDino();
  drawObstacle();

  if (dinoY < ground || velocity < 0) {
    velocity += gravity;
    dinoY += velocity;
    if (dinoY >= ground) {
      dinoY = ground;
      velocity = 0;
      jumping = false;
    }
  }

  obstacleX -= 5.5;
  if (obstacleX + obstacleWidth < dinoX && !passedCactus) {
    score++;
    updateScoreUI();
    passedCactus = true;
  }

  if (obstacleX < -obstacleWidth) {
    obstacleX = cssWidth + Math.random() * 80 + 60;
    currentCactus = cactusImages[Math.floor(Math.random() * cactusImages.length)];
    passedCactus = false;
  }

  if (checkCollision()) {
    gameOver = true;
    setTimeout(resetGame, 800);
    return;
  }

  runTimer++;
  if (runTimer % 6 === 0) runFrame++;

  requestAnimationFrame(update);
}

update();
