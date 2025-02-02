let player;

let platforms = []; // Array to store platforms

let fallingBricks = [];

let spikes = [];

let gameState = "gameplay"; // Game states: startScreen, gameplay, gameOver
let currentLevel = 0; // Tracks the current level
let levels = []; // Array to store level configurations

let cameraX;
let cameraY;

let aspectRatio = 16 / 9;

let sizeWidth = 1500;
let sizeHeight = sizeWidth / aspectRatio;

function setup() {
  createCanvas(sizeWidth, sizeHeight);

  // Define levels
  levels = [
    {
      name: "level1",
      platforms: [
        { x: -800, y: 200, w: 900, h: 500 },
        { x: -900, y: -600, w: 700, h: 850 },

        { x: 300, y: 100, w: 150, h: 50 },

        { x: 680, y: -100, w: 200, h: 50 },
        { x: 680, y: -850, w: 200, h: 600 },

        { x: 1060, y: 100, w: 150, h: 50 },

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
      name: "level2",

      platforms: [
        { x: -800, y: 200, w: 900, h: 500 },
        { x: -900, y: -600, w: 700, h: 850 },

        { x: 200, y: 250, w: 320, h: 50 },

        { x: 1350, y: -100, w: 250, h: 500 },

        { x: 1550, y: 150, w: 1550, h: 800 },

        { x: 1800, y: -1050, w: 1500, h: 800 },

        { x: 2500, y: -100, w: 1050, h: 50 },
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

        // { x1: 125, y1: 200, x2: 175, y2: 200, x3: 150, y3: 150 },
      ],

      levelEndX: 2500,
    },
    {
      name: "level3",

      platforms: [
        { x: -800, y: -600, w: 800, h: 2550 },

        { x: -800, y: -900, w: 1400, h: 800 },

        { x: -800, y: 200, w: 950, h: 50 },

        { x: 400, y: -900, w: 300, h: 1750 },

        { x: 250, y: 400, w: 350, h: 50 },

        { x: -800, y: 600, w: 950, h: 50 },

        { x: 250, y: 800, w: 350, h: 50 },

        { x: 0, y: 1100, w: 800, h: 1550 },

        { x: 900, y: 950, w: 150, h: 50 },

        { x: 1200, y: 850, w: 250, h: 50 },

        { x: 1600, y: 750, w: 350, h: 50 },

        { x: 1400, y: 50, w: 500, h: 500 },

        { x: 2050, y: 1000, w: 350, h: 450 },

        { x: 2400, y: 900, w: 250, h: 550 },

        { x: 2650, y: 800, w: 250, h: 750 },

        { x: 2900, y: 500, w: 850, h: 1950 },

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
  }
}

// Draw the start screen
function drawStartScreen() {
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(0);
  text("Platformer Game", width / 2, height / 3);
  text("Press ENTER to Start", width / 2, height / 2);
}

// Draw gameplay
function drawGamePlay() {
  // // Update camera position to follow the player
  cameraX = -player.x + width / -player.width + 600;
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

  // Display falling platforms
  for (let fallingBrick of fallingBricks) {
    fallingBrick.show();
    fallingBrick.checkCollision(player);
  }

  // display spikes
  for (let spike of spikes) {
    spike.show();
    spike.checkCollision(player);
  }

  // Check for level completion
  if (player.y < 700) {
    if (player.x > levels[currentLevel].levelEndX) {
      currentLevel++;
      if (currentLevel >= levels.length) {
        gameState = "gameOver"; // End the game if no more levels
      } else {
        loadLevel(currentLevel); // Load the next level
        player.reset(); // Reset player position
      }
    } else if (player.x > levels[currentLevel].levelEndX) {
      currentLevel++;
      if (currentLevel >= levels.length) {
        gameState = "gameOver"; // End the game if no more levels
      } else {
        loadLevel(currentLevel); // Load the next level
        player.reset(); // Reset player position
      }
    } else if (player.x > levels[currentLevel].levelEndX) {
      currentLevel++;
      if (currentLevel >= levels.length) {
        gameState = "gameOver"; // End the game if no more levels
      } else {
        loadLevel(currentLevel); // Load the next level
        player.reset(); // Reset player position
      }
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
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(0);
  text("Game Over", width / 2, height / 3);
  text("Press ENTER to Restart", width / 2, height / 2);
}

// Load a level based on the index
function loadLevel(index) {
  platforms = []; // Clear existing platforms
  fallingBricks = [];
  spikes = [];

  let levelData = levels[index];
  for (let p of levelData.platforms) {
    platforms.push(new Platform(p.x, p.y, p.w, p.h));
  }

  // https://chatgpt.com/share/6794e894-0624-8005-961d-00b68c4ec60a

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
}

// Player class
class Player {
  constructor() {
    this.x = 0;
    this.y = 50; // Starting position above the ground
    // this.x = 2600;
    // this.y = 700; // Starting position above the ground
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

  show() {
    fill(0);
    rect(this.x, this.y, this.width, this.height);
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
    fill(150);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }

  /** struggled a lot with the collisions to the walls of the platforms

https://chatgpt.com/share/67842921-e9f8-8005-8a9e-b14750cb799a

fix bug that makes jumping close to platform gets the player stuck

  **/

  // https://chatgpt.com/share/6794e894-0624-8005-961d-00b68c4ec60a

  checkCollision(player) {
    const overlapX = Math.min(
      player.x + player.width - this.x,
      this.x + this.w - player.x
    );
    const overlapY = Math.min(
      player.y + player.height - this.y,
      this.y + this.h - player.y
    );

    const isOverlappingHorizontally =
      player.x + player.width > this.x && player.x < this.x + this.w;
    const isOverlappingVertically =
      player.y + player.height > this.y && player.y < this.y + this.h;

    if (isOverlappingHorizontally && isOverlappingVertically) {
      // Resolve collision based on the smallest overlap
      if (overlapX < overlapY) {
        // Player hits the side
        if (player.x + player.width / 2 < this.x + this.w / 2) {
          player.x = this.x - player.width; // Left side
        } else {
          player.x = this.x + this.w; // Right side
        }
      } else {
        // Player hits the top or bottom
        if (player.y + player.height / 2 < this.y + this.h / 2) {
          player.y = this.y - player.height; // Top
          player.velocity = 0; // Stop falling
          player.onGround = true;
          player.canDoubleJump = true;
        } else {
          player.y = this.y + this.h; // Bottom
          player.velocity = 0;
        }
      }
    }
  }
}

class FallingBrick {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show() {
    fill(200);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }

  checkCollision(player) {
    const overlapX = Math.min(
      player.x + player.width - this.x,
      this.x + this.w - player.x
    );
    const overlapY = Math.min(
      player.y + player.height - this.y,
      this.y + this.h - player.y
    );

    const isOverlappingHorizontally =
      player.x + player.width > this.x && player.x < this.x + this.w;
    const isOverlappingVertically =
      player.y + player.height > this.y && player.y < this.y + this.h;

    if (isOverlappingHorizontally && isOverlappingVertically) {
      // Resolve collision based on the smallest overlap
      if (overlapX < overlapY) {
        // Player hits the side
        if (player.x + player.width / 2 < this.x + this.w / 2) {
          player.x = this.x - player.width; // Left side
        } else {
          player.x = this.x + this.w; // Right side
        }
      } else {
        // Player hits the top or bottom
        if (player.y + player.height / 2 < this.y + this.h / 2) {
          player.y = this.y - player.height; // Top
          player.velocity = 0; // Stop falling
          player.onGround = true;
          player.canDoubleJump = true;
        } else {
          player.y = this.y + this.h; // Bottom
          player.velocity = 0;
        }
      }
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

  // x1: 125, y1: 200, x2: 175, y2: 200, x3: 150, y3: 150

  show() {
    fill(155, 0, 0);
    noStroke();
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  }

  // https://chatgpt.com/share/67973222-9e74-8005-b310-b49fe778fec2

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

// Player class
class MovingEnemies {
  constructor() {
    this.x = 0;
    this.y = 50; // Starting position above the ground
    this.width = 50;
    this.height = 50;
    this.speed = 5;
    this.velocity = 0;
  }

  // automatic update //

  update() {
    if (this.x > -200 && keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
  }

  show() {
    fill(100, 100, 100);
    rect(this.x, this.y, this.width, this.height);
  }
}

// Handle key inputs
function keyPressed() {
  if (gameState === "startScreen" && keyCode === ENTER) {
    gameState = "gameplay"; // Start the game
  } else if (gameState === "gameplay" && keyCode === UP_ARROW) {
    player.jump(); // Make the player jump
  } else if (gameState === "gameOver" && keyCode === ENTER) {
    gameState = "startScreen"; // Restart the game
    currentLevel = 0; // Reset to the first level
    loadLevel(currentLevel); // Load the first level
    player.reset(); // Reset player
  }
}
