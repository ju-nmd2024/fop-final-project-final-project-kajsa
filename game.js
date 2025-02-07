let image;

let levelImages = {};
let objectImages = {};
let screenImages = {};

let player;

let platforms = []; // Array to store platforms

let fallingBricks = [];

let spikes = [];

let enemies = [];

let gameState = "startScreen"; // Game states: startScreen, gameplay, gameOver
let currentLevel = 0; // Tracks the current level
let levels = []; // Array to store level configurations

let cameraX;
let cameraY;

let aspectRatio = 16 / 9;

let sizeWidth = 1500;
let sizeHeight = sizeWidth / aspectRatio;

function preload() {
  {
    levelImages["level.1.back"] = loadImage("images/level1back.png");
    levelImages["level.2.back"] = loadImage("images/level2back.png");
    levelImages["level.3.back"] = loadImage("images/level3back.png");

    levelImages["level.1"] = loadImage("images/level1.png");
    levelImages["level.2"] = loadImage("images/level2.png");
    levelImages["level.3"] = loadImage("images/level3.png");

    objectImages["enemy."] = loadImage("images/enemy.png");
    objectImages["falling."] = loadImage("images/falling.png");
    objectImages["player."] = loadImage("images/player.png");

    screenImages["startScreen."] = loadImage("images/startScreen.png");
    screenImages["gameOver."] = loadImage("images/gameOver.png");
    screenImages["gameWin."] = loadImage("images/gameWin.png");
  }
}

function setup() {
  createCanvas(sizeWidth, sizeHeight);

  // Define levels
  levels = [
    {
      name: "level.1",
      platforms: [
        { x: -800, y: 200, w: 900, h: 500 },
        { x: -800, y: -600, w: 600, h: 850 },

        { x: 300, y: 100, w: 150, h: 50 },

        { x: 680, y: -100, w: 200, h: 50 },
        { x: 680, y: -850, w: 200, h: 550 },

        { x: 1060, y: 100, w: 200, h: 1000 },
        { x: 1200, y: 250, w: 200, h: 800 },

        { x: 1350, y: 400, w: 400, h: 800 },

        { x: 1550, y: -950, w: 550, h: 1050 },

        { x: 1850, y: 275, w: 550, h: 50 },

        { x: 2000, y: -500, w: 1050, h: 1800 },
      ],

      spikes: [
        { x1: 755, y1: -100, x2: 805, y2: -100, x3: 780, y3: -150 },

        { x1: 1400, y1: 400, x2: 1450, y2: 400, x3: 1425, y3: 350 },
        { x1: 1450, y1: 400, x2: 1500, y2: 400, x3: 1475, y3: 350 },
        { x1: 1500, y1: 400, x2: 1550, y2: 400, x3: 1525, y3: 350 },
        { x1: 1550, y1: 400, x2: 1600, y2: 400, x3: 1575, y3: 350 },

        { x1: 1550, y1: 100, x2: 1600, y2: 100, x3: 1575, y3: 150 },
        { x1: 1600, y1: 100, x2: 1650, y2: 100, x3: 1625, y3: 150 },
        { x1: 1650, y1: 100, x2: 1700, y2: 100, x3: 1675, y3: 150 },
        { x1: 1700, y1: 100, x2: 1750, y2: 100, x3: 1725, y3: 150 },
        { x1: 1750, y1: 100, x2: 1800, y2: 100, x3: 1775, y3: 150 },
        { x1: 1800, y1: 100, x2: 1850, y2: 100, x3: 1825, y3: 150 },
      ],

      levelEndX: 1900,
    },
    {
      name: "level.2",

      platforms: [
        { x: -800, y: 200, w: 900, h: 500 },
        { x: -800, y: -600, w: 600, h: 850 },

        { x: 200, y: 250, w: 320, h: 50 },

        { x: 1350, y: -100, w: 250, h: 500 },

        { x: 1550, y: 150, w: 1550, h: 800 },

        { x: 1800, y: -1050, w: 1500, h: 800 },

        { x: 2480, y: -100, w: 1050, h: 50 },

        { x: 2580, y: -500, w: 1050, h: 1800 },
      ],

      fallingBricks: [
        { x: 600, y: 150, w: 150, h: 50 },

        { x: 850, y: 50, w: 150, h: 50 },

        { x: 1100, y: -50, w: 150, h: 50 },

        { x: 2000, y: -30, w: 150, h: 50 },
      ],

      spikes: [
        { x1: 335, y1: 250, x2: 385, y2: 250, x3: 360, y3: 200 },

        { x1: 2000, y1: 150, x2: 2050, y2: 150, x3: 2025, y3: 100 },
        { x1: 2050, y1: 150, x2: 2100, y2: 150, x3: 2075, y3: 100 },
        { x1: 2100, y1: 150, x2: 2150, y2: 150, x3: 2125, y3: 100 },
      ],

      enemies: [
        { x: 1750, y: 100, w: 100, h: 50 },
        { x: 2275, y: 100, w: 100, h: 50 },
      ],

      levelEndX: 2500,
    },
    {
      name: "level.3",

      platforms: [
        { x: -800, y: -600, w: 800, h: 2550 },

        { x: -800, y: -900, w: 1400, h: 800 },

        { x: -800, y: 200, w: 1000, h: 50 },

        { x: 400, y: -900, w: 300, h: 1750 },

        { x: 200, y: 400, w: 400, h: 50 },

        { x: -800, y: 600, w: 1000, h: 50 },

        { x: 200, y: 800, w: 450, h: 50 },

        { x: 0, y: 1100, w: 800, h: 1550 },

        { x: 900, y: 950, w: 150, h: 50 },

        { x: 1200, y: 850, w: 250, h: 50 },

        { x: 1600, y: 750, w: 350, h: 50 },

        { x: 1400, y: 50, w: 500, h: 500 },

        { x: 2050, y: 1000, w: 350, h: 450 },

        { x: 2400, y: 900, w: 250, h: 550 },

        { x: 2650, y: 800, w: 250, h: 750 },

        { x: 2900, y: 500, w: 1250, h: 1950 },

        { x: 2600, y: 550, w: 125, h: 50 },
      ],

      spikes: [
        { x1: 100, y1: 200, x2: 150, y2: 200, x3: 125, y3: 150 },

        { x1: 250, y1: 400, x2: 300, y2: 400, x3: 275, y3: 350 },

        { x1: 100, y1: 600, x2: 150, y2: 600, x3: 125, y3: 550 },

        { x1: 250, y1: 800, x2: 300, y2: 800, x3: 275, y3: 750 },

        { x1: 900, y1: 950, x2: 950, y2: 950, x3: 925, y3: 900 },

        { x1: 1200, y1: 850, x2: 1250, y2: 850, x3: 1225, y3: 800 },

        { x1: 1400, y1: 850, x2: 1450, y2: 850, x3: 1425, y3: 800 },

        { x1: 1600, y1: 550, x2: 1650, y2: 550, x3: 1625, y3: 600 },

        { x1: 1700, y1: 750, x2: 1750, y2: 750, x3: 1725, y3: 700 },

        { x1: 1800, y1: 550, x2: 1850, y2: 550, x3: 1825, y3: 600 },

        { x1: 2250, y1: 1000, x2: 2300, y2: 1000, x3: 2275, y3: 950 },

        { x1: 2550, y1: 900, x2: 2600, y2: 900, x3: 2575, y3: 850 },

        { x1: 2600, y1: 900, x2: 2650, y2: 900, x3: 2625, y3: 850 },

        { x1: 2650, y1: 800, x2: 2700, y2: 800, x3: 2675, y3: 750 },

        { x1: 2700, y1: 800, x2: 2750, y2: 800, x3: 2725, y3: 750 },

        { x1: 2600, y1: 550, x2: 2650, y2: 550, x3: 2625, y3: 500 },
      ],

      enemies: [
        { x: 150, y: 1060, w: 100, h: 50 },
        { x: 550, y: 1060, w: 100, h: 50 },
      ],

      levelEndX: 3100,
    },
  ];

  // Load the first level
  loadLevel(currentLevel);

  // Initialize the player
  player = new Player();
}

function draw() {
  background(255);

  if (gameState === "startScreen") {
    drawStartScreen();
  } else if (gameState === "gameplay") {
    drawGamePlay();
  } else if (gameState === "gameOver") {
    drawGameOver();
  } else if (gameState === "gameWin") {
    drawGameWin();
  }
}

// Draw the start screen
function drawStartScreen() {
  image(screenImages["startScreen."], 0, 0);
}

// // Draw the start screen
// function drawStartScreen() {
//   textAlign(CENTER, CENTER);
//   textSize(32);
//   fill(0);
//   text("Rainbow Road", width / 2, height / 3);
//   text("Press ENTER to Start", width / 2, height / 2);
// }

// Draw gameplay
function drawGamePlay() {
  // // Update camera position to follow the player
  cameraX = -player.x + width / -player.width + 600;
  cameraY = -player.y + height / 2 - player.height / 2;

  push();
  translate(cameraX, cameraY);

  // Display level background image if it exists
  let backgroundKey = levels[currentLevel].name + ".back";
  if (backgroundKey in levelImages) {
    let bgImage = levelImages[backgroundKey];
    image(bgImage, -800, -1100);
  }

  // Update and display the player
  player.update();
  player.show();

  // Display platforms
  for (let platform of platforms) {
    platform.show();
    platform.checkCollision(player);
  }

  // Display falling platforms
  for (let fallingBrick of fallingBricks) {
    fallingBrick.update(); // Ensure they fall when triggered
    fallingBrick.show();
    fallingBrick.checkCollision(player);
  }

  // display spikes
  for (let spike of spikes) {
    // spike.show();
    spike.checkCollision(player);
  }

  // display enemies
  for (let enemy of enemies) {
    enemy.update();
    enemy.show();
    enemy.checkCollision(player);
  }

  // Display level background image if it exists
  if (levels[currentLevel].name in levelImages) {
    // Dynamic positioning of the level images based on the current level
    let bgImage = levelImages[levels[currentLevel].name];
    let xOffset = 0; // Adjust x offset for each level, if needed
    let yOffset = 0; // Adjust y offset for each level, if needed

    // Adjust based on the level
    if (levels[currentLevel].name === "level.1") {
      xOffset = -800;
      yOffset = -950;
    } else if (levels[currentLevel].name === "level.2") {
      xOffset = -800;
      yOffset = -1060;
    } else if (levels[currentLevel].name === "level.3") {
      xOffset = -800;
      yOffset = -900;
    }

    image(bgImage, xOffset, yOffset);
  }

  if (player.x > levels[currentLevel].levelEndX) {
    currentLevel++;
    if (currentLevel >= levels.length) {
      gameState = "gameWin"; // Change to gameWin
      drawGameWin();
    } else {
      loadLevel(currentLevel);
      player.reset();
    }
  } else if (
    (player.y > 700 && currentLevel === 0) ||
    (player.y > 700 && currentLevel === 1)
  ) {
    gameState = "gameOver";
  } else if (player.y > 1200 && currentLevel === 2) {
    gameState = "gameOver";
  }
}

// Draw the game-over screen
function drawGameOver() {
  image(screenImages["gameOver."], 0, 0);
}

// // Draw the game-over screen
// function drawGameOver() {
//   textAlign(CENTER, CENTER);
//   textSize(32);
//   fill(0);
//   text("Game Over", width / 2, height / 3);
//   text("Press R to Restart", width / 2, height / 2);
//   text("Press S to go to start", width / 2, height / 2 - 50);
// }

// Draw the game-Win screen
function drawGameWin() {
  image(screenImages["gameWin."], 0, 0);
}

// // Draw the game-Win screen
// function drawGameWin() {
//   textAlign(CENTER, CENTER);
//   textSize(32);
//   fill(150, 150, 100);
//   text("YOU WIN!", width / 2, height / 3);
//   text("Press R to Restart", width / 2, height / 2);
//   text("Press S to go to start", width / 2, height / 2 - 50);
// }

// Load a level based on the index
function loadLevel(index) {
  platforms = []; // Clear existing platforms
  fallingBricks = [];
  spikes = [];
  enemies = [];

  let levelData = levels[index];
  for (let p of levelData.platforms) {
    platforms.push(new Platform(p.x, p.y, p.w, p.h));
  }

  /** got help to resolve a bug
   *  https://chatgpt.com/share/6794e894-0624-8005-961d-00b68c4ec60a
   **/

  if (levelData.fallingBricks) {
    for (let fb of levelData.fallingBricks) {
      fallingBricks.push(new FallingBrick(fb.x, fb.y, fb.w, fb.h));
    }
  }

  if (levelData.spikes) {
    for (let s of levelData.spikes) {
      spikes.push(new Spike(s.x1, s.y1, s.x2, s.y2, s.x3, s.y3));
    }
  }

  if (levelData.enemies) {
    for (let e of levelData.enemies) {
      enemies.push(new Enemy(e.x, e.y, e.w, e.h));
    }
  }
}

// Player class
class Player {
  constructor() {
    this.x = 0; // 0 Starting position above the ground
    this.y = 50; // 50 Starting position above the ground
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
    if (this.x > -200 && keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }

    // Apply gravity
    this.velocity += this.gravity;
    this.y += this.velocity;
  }

  jump() {
    if (this.onGround) {
      this.velocity = this.jumpPower;
      this.onGround = false;
    } else if (this.canDoubleJump) {
      this.velocity = this.jumpPower;
      this.canDoubleJump = false; // Consume the double jump
    }
  }

  // show() {
  //   fill(0);
  //   rect(this.x, this.y, this.width, this.height);
  // }

  show() {
    image(objectImages["player."], this.x, this.y - 20, 70, 70);
  }

  reset() {
    this.x = 0;
    this.y = 150;
    this.velocity = 0;
  }
}

// Platform class
class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show() {
    // fill(150);
    // noStroke();
    // rect(this.x, this.y, this.w, this.h);
  }

  /** struggled a lot with the collisions to the walls of the platforms
   *
   * got help and started from this
   * https://chatgpt.com/share/67842921-e9f8-8005-8a9e-b14750cb799a
   *
   * then had some problems with it
   * https://chatgpt.com/share/6794e894-0624-8005-961d-00b68c4ec60a
   *
   * during the making the collision detection has been modified to work better
   *
   **/

  checkCollision(player) {
    let playerRight = player.x + player.width;
    let playerBottom = player.y + player.height;
    let platformRight = this.x + this.w;
    let platformBottom = this.y + this.h;

    let colliding =
      player.x < platformRight &&
      playerRight > this.x &&
      player.y < platformBottom &&
      playerBottom > this.y;

    if (colliding) {
      let overlapX = Math.min(playerRight - this.x, platformRight - player.x);
      let overlapY = Math.min(playerBottom - this.y, platformBottom - player.y);

      if (overlapX < overlapY) {
        // **Side Collision (Left or Right)**
        if (playerRight > this.x && player.x < this.x) {
          // Player hits Left Side
          player.x = this.x - player.width;
        } else if (player.x < platformRight && playerRight > platformRight) {
          // Player hits Right Side
          player.x = platformRight;
        }
      } else {
        // **Top or Bottom Collision**
        if (playerBottom > this.y && player.y < this.y) {
          // Player lands on top
          player.y = this.y - player.height;
          player.velocity = 0;
          player.onGround = true;
          player.canDoubleJump = true;
        } else if (player.y < platformBottom && playerBottom > platformBottom) {
          // Player hits bottom and bounces down
          player.velocity = Math.max(player.velocity, 2);
          player.y = platformBottom;
        }
      }
    }
  }
}

class FallingBrick {
  constructor(x, y, w, h) {
    this.initialX = x; // Store original position
    this.initialY = y;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.visible = true;
    this.isFalling = false;
    this.fallSpeed = 0;
    this.gravity = 0.5;
    this.alpha = 255; // Opacity for fade-out effect
  }

  update() {
    if (this.isFalling) {
      this.fallSpeed += this.gravity;
      this.y += this.fallSpeed;
      this.alpha -= 5; // Gradually decrease opacity

      // If fully faded, reset after falling off screen
      if (this.alpha <= 0) {
        this.reset();
      }
    }
  }

  checkCollision(player) {
    let playerRight = player.x + player.width;
    let playerBottom = player.y + player.height;
    let brickRight = this.x + this.w;
    let brickBottom = this.y + this.h;

    let colliding =
      player.x < brickRight &&
      playerRight > this.x &&
      player.y < brickBottom &&
      playerBottom > this.y;

    if (colliding) {
      let overlapX = Math.min(playerRight - this.x, brickRight - player.x);
      let overlapY = Math.min(playerBottom - this.y, brickBottom - player.y);

      if (overlapX < overlapY) {
        // **Side Collision** (Left or Right)
        if (playerRight > this.x && player.x < this.x) {
          // Hitting Left Side
          player.x = this.x - player.width;
        } else if (player.x < brickRight && playerRight > brickRight) {
          // Hitting Right Side
          player.x = brickRight;
        }
      } else {
        // **Top or Bottom Collision**
        if (playerBottom > this.y && player.y < this.y) {
          // Player lands on top
          player.y = this.y - player.height;
          player.velocity = 0;
          player.onGround = true;
          player.canDoubleJump = true;
          this.startFalling(); // Brick falls only if landed on
        } else if (player.y < brickBottom && playerBottom > brickBottom) {
          // Player hits bottom, bounce down
          player.velocity = Math.max(player.velocity, 2); // Small bounce effect
          player.y = brickBottom;
        }
      }
    }
  }

  startFalling() {
    if (!this.isFalling) {
      setTimeout(() => {
        this.isFalling = true;
      }, 500); // Delay before it starts falling
    }
  }

  reset() {
    this.isFalling = false;
    this.fallSpeed = 0;
    this.alpha = 255;
    this.x = this.initialX;
    this.y = this.initialY;
    this.visible = false; // Temporarily hide it

    setTimeout(() => {
      this.visible = true; // Make it visible again after 2 seconds
    }, 2000);
  }

  // show() {
  //   if (this.visible) {
  //     fill(255, 0, 0, this.alpha);
  //     rect(this.x, this.y, this.w, this.h);
  //   }
  // }

  show() {
    if (this.visible) {
      image(objectImages["falling."], this.x - 10, this.y - 7, 195, 65);
    }
  }
}

// Platform class
class Spike {
  constructor(x1, y1, x2, y2, x3, y3) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
  }

  show() {
    fill(155, 0, 0);
    noStroke();
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  }

  /**
   * got help with collision detection for the triangles
   *
   * https://chatgpt.com/share/67973222-9e74-8005-b310-b49fe778fec2
   *
   **/
  checkCollision(player) {
    const isColliding =
      this.pointInTriangle(
        player.x,
        player.y,
        this.x1,
        this.y1,
        this.x2,
        this.y2,
        this.x3,
        this.y3
      ) ||
      this.pointInTriangle(
        player.x + player.width,
        player.y,
        this.x1,
        this.y1,
        this.x2,
        this.y2,
        this.x3,
        this.y3
      ) ||
      this.pointInTriangle(
        player.x,
        player.y + player.height,
        this.x1,
        this.y1,
        this.x2,
        this.y2,
        this.x3,
        this.y3
      ) ||
      this.pointInTriangle(
        player.x + player.width,
        player.y + player.height,
        this.x1,
        this.y1,
        this.x2,
        this.y2,
        this.x3,
        this.y3
      );

    if (isColliding) {
      gameState = "gameOver"; // Game over if player touches the spike
    }
  }

  // Helper to check if a point is inside a triangle
  pointInTriangle(px, py, x1, y1, x2, y2, x3, y3) {
    const areaOrig = Math.abs(
      (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2
    );
    const area1 = Math.abs(
      (px * (y2 - y3) + x2 * (y3 - py) + x3 * (py - y2)) / 2
    );
    const area2 = Math.abs(
      (x1 * (py - y3) + px * (y3 - y1) + x3 * (y1 - py)) / 2
    );
    const area3 = Math.abs(
      (x1 * (y2 - py) + x2 * (py - y1) + px * (y1 - y2)) / 2
    );

    return areaOrig === area1 + area2 + area3;
  }
}

// enemy
class Enemy {
  constructor(x, y, w, h) {
    this.originX = x;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.speed = 7;

    this.direction = random(-0.5, 1);
  }

  update() {
    this.x += this.speed * this.direction; // Move enemy

    // Calculate the new position
    let newX = this.x + this.speed * this.direction;

    // Ensure the enemy stays within `originX` and `originX + 150`
    if (newX >= this.originX + 150 || newX <= this.originX - 150) {
      this.direction *= -1; // Reverse direction
    }
  }

  checkCollision(player) {
    if (
      player.x < this.x + this.w &&
      player.x + player.width > this.x &&
      player.y < this.y + this.h &&
      player.y + player.height > this.y
    ) {
      gameState = "gameOver"; // Collision detected
    }
  }

  // show() {
  //   fill(100, 100, 100);
  //   noStroke();
  //   rect(this.x, this.y, this.w, this.h);
  // }

  show() {
    image(objectImages["enemy."], this.x, this.y - 5, 100, 50);
  }
}

function keyPressed() {
  if (gameState === "startScreen" && keyCode === ENTER) {
    gameState = "gameplay"; // Start the game
    currentLevel = 0; // Reset to the first level
    loadLevel(currentLevel);
    player.reset();
  } else if (gameState === "gameplay" && keyCode === UP_ARROW) {
    player.jump(); // Make the player jump
  } else if (
    (gameState === "gameOver" || gameState === "gameWin") &&
    key === "r"
  ) {
    gameState = "gameplay"; // Restart the game
    currentLevel = 0; // Reset to the first level
    loadLevel(currentLevel);
    player.reset();
  } else if (key === "s") {
    gameState = "startScreen"; // Go back to the start screen
  }
}
