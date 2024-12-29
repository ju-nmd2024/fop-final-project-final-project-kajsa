let player;

let platforms = []; // Array to store platforms

let gameState = "gameplay"; // Game states: startScreen, gameplay, gameOver
let currentLevel = 1; // Tracks the current level
let levels = []; // Array to store level configurations

function setup() {
  createCanvas(800, 600);

  // Define levels
  levels = [
    {
      name: "level1",
      platforms: [
        { x: 200, y: 400, w: 100, h: 20 }, // A simple platform
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

  // Load the first level
  loadLevel(currentLevel);

  // Initialize the player
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
  // Update and display the player
  player.update();
  player.show();

  // Display platforms
  for (let platform of platforms) {
    platform.show();
    platform.checkCollision(player);
  }

  // Check for level completion
  if (player.x > width) {
    currentLevel++;
    if (currentLevel >= levels.length) {
      gameState = "gameOver"; // End the game if no more levels
    } else {
      loadLevel(currentLevel); // Load the next level
      player.reset(); // Reset player position
    }
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
  let levelData = levels[index];
  for (let p of levelData.platforms) {
    platforms.push(new Platform(p.x, p.y, p.w, p.h));
  }
}

// Player class
class Player {
  constructor() {
    this.x = 100;
    this.y = 150; // Starting position above the ground
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

    // Apply gravity
    this.velocity += this.gravity;
    this.y += this.velocity;

    // // Collision with the ground
    // if (this.y >= height - this.height) {
    //   this.y = height - this.height;
    //   this.velocity = 0;
    //   this.onGround = true;
    //   this.canDoubleJump = true; // Reset double jump when on ground
    // } else {
    //   this.onGround = false;
    // }
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
    this.x = 100;
    this.y = height - 50;
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
      // Place the player on top of the platform
      player.y = this.y - player.height;
      player.velocity = 0;
      player.onGround = true;
      player.canDoubleJump = true; // Reset double jump when on a platform
    }
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
