let player;
let platforms = [];
let gameState = "gameplay";
let currentLevel = 1;
let levels = [];
let cameraX; // Camera horizontal offset
let cameraY; // Camera vertical offset

function setup() {
  createCanvas(1920, 1080);
  // createCanvas(800, 600);

  levels = [
    {
      name: "level1",
      platforms: [
        { x: 200, y: 400, w: 100, h: 20 },
        { x: 400, y: 300, w: 150, h: 20 },
      ],
    },
    {
      name: "level2",
      platforms: [
        { x: 100, y: 450, w: 120, h: 20 },
        { x: 300, y: 350, w: 120, h: 20 },
        { x: 600, y: 250, w: 120, h: 20 },
      ],
    },
    {
      name: "level3",
      platforms: [
        { x: 100, y: 450, w: 120, h: 20 },
        { x: 300, y: 350, w: 120, h: 20 },
        { x: 600, y: 250, w: 120, h: 20 },
      ],
    },
  ];

  loadLevel(currentLevel);
  player = new Player(50, 90);
}

function draw() {
  background(255);

  if (gameState === "startScreen") {
    drawStartScreen();
  } else if (gameState === "gameplay") {
    drawGamePlay();
  } else if (gameState === "gameOver") {
    drawGameOver();
  }
}

function drawStartScreen() {
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(0);
  text("Platformer Game", width / 2, height / 3);
  text("Press ENTER to Start", width / 2, height / 2);
}

function drawGamePlay() {
  // Update camera position to follow the player
  cameraX = -player.x + width / 2 - player.width / 2;
  cameraY = -player.y + height / 2 - player.height / 2;

  push();
  translate(cameraX, cameraY);

  // Update and display the player
  player.update();
  player.show();

  // Display platforms
  for (let platform of platforms) {
    platform.show();
    platform.checkCollision(player);
  }

  pop();

  // Check for level completion
  if (player.x > width) {
    currentLevel++;
    if (currentLevel >= levels.length) {
      gameState = "gameOver";
    } else {
      loadLevel(currentLevel);
      player.reset();
    }
  }
}

function drawGameOver() {
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(0);
  text("Game Over", width / 2, height / 3);
  text("Press ENTER to Restart", width / 2, height / 2);
}

function loadLevel(index) {
  platforms = [];
  let levelData = levels[index];
  for (let p of levelData.platforms) {
    platforms.push(new Platform(p.x, p.y, p.w, p.h));
  }
}

class Player {
  constructor() {
    this.x = 100;
    this.y = 150;
    this.width = 50;
    this.height = 50;
    this.speed = 5;
    this.velocity = 0;
    this.gravity = 0.8;
    this.jumpPower = -15;
    this.onGround = false;
    this.canDoubleJump = true;
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }

    this.velocity += this.gravity;
    this.y += this.velocity;
  }

  jump() {
    if (this.onGround) {
      this.velocity = this.jumpPower;
      this.onGround = false;
    } else if (this.canDoubleJump) {
      this.velocity = this.jumpPower;
      this.canDoubleJump = false;
    }
  }

  show() {
    fill(0);
    rect(this.x, this.y, this.width, this.height);
  }

  reset() {
    this.x = 100;
    this.y = height - 50;
    this.velocity = 0;
  }
}

class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show() {
    fill(150);
    rect(this.x, this.y, this.w, this.h);
  }

  checkCollision(player) {
    if (
      player.x < this.x + this.w &&
      player.x + player.width > this.x &&
      player.y + player.height > this.y &&
      player.y + player.height < this.y + this.h &&
      player.velocity > 0
    ) {
      player.y = this.y - player.height;
      player.velocity = 0;
      player.onGround = true;
      player.canDoubleJump = true;
    }
  }
}

function keyPressed() {
  if (gameState === "startScreen" && keyCode === ENTER) {
    gameState = "gameplay";
  } else if (gameState === "gameplay" && keyCode === UP_ARROW) {
    player.jump();
  } else if (gameState === "gameOver" && keyCode === ENTER) {
    gameState = "startScreen";
    currentLevel = 0;
    loadLevel(currentLevel);
    player.reset();
  }
}
