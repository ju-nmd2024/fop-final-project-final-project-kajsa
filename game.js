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
  // createCanvas(800, 600);
  // createCanvas(1500, 1080);

  // Define levels
  levels = [
    {
      name: "level1",
      platforms: [
        { x: -800, y: 200, w: 900, h: 500},
        { x: -900, y: - 600, w: 700, h: 850},

        { x: 300, y: 100, w: 150, h: 50 },

        { x: 680, y: -100, w: 200, h: 50 },
        { x: 680, y: -850, w: 200, h: 600 },

        { x: 1060, y: 100, w: 150, h: 50 },

        { x: 1060, y: 100, w: 150, h: height },
        { x: 1200, y: 200, w: 150, h: height },

        { x: 1350, y: 500, w: 400, h: 800 },

        { x: 1600, y: -800, w: 550, h: 1050 },

        { x: 1850, y: 400, w: 550, h: 50 },

        { x: 1700, y: 800, w: 550, h: 500 },

        { x: 2000, y: -500, w: 1050, h: 1800 },

      ],

      levelEndX: 1900,

    },
    {
      name: "level2",

      fallingBricks: [

        { x: 600, y: 150, w: 150, h: 50 },
 
         { x: 850, y: 50, w: 150, h: 50 },
 
         { x: 1100, y: -50, w: 150, h: 50 },

         { x: 2000, y: -30, w: 150, h: 50 },
 
       ],

      platforms: [
        { x: -800, y: 200, w: 900, h: 500},
        { x: -900, y: - 600, w: 700, h: 850},

        { x: 200, y: 250, w: 320, h: 50 },

        { x: 1350, y: -150, w: 200, h: 800 },

        { x: 1350, y: -150, w: 150, h: 500 },

        { x: 1550, y: 150, w: 1050, h: 800 },

        { x: 1800, y: -1050, w: 800, h: 800 },

        { x: 2500, y: -100, w: 150, h: 50 },

        { x: 2600, y: -600, w: 1050, h: 1500 },


      ],

      spikes: [

        { x: 200, y: 100, w: 50, h: 70 },


      ],

      levelEndX: 2500,

    },
    {
      name: "level3",

      platforms: [

        { x: -50, y: -100, w: 350, h: 50 },
        
        { x: -800, y: 200, w: 900, h: 500},


      ],

      levelEndX: 2500,

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
for (let spike of spikes){
  spike.show();
  spike.checkCollision(player);
}

  // Check for level completion
  if (player.x > levels[currentLevel].levelEndX)  {
    currentLevel++;
    if (currentLevel >= levels.length) {
      gameState = "gameOver"; // End the game if no more levels
    } else {
      loadLevel(currentLevel); // Load the next level
      player.reset(); // Reset player position
    }
  } else if (player.x > levels[currentLevel].levelEndX){
    currentLevel++;
    if (currentLevel >= levels.length) {
      gameState = "gameOver"; // End the game if no more levels
    } else {
      loadLevel(currentLevel); // Load the next level
      player.reset(); // Reset player position
    }
  } else if (player.x > levels[currentLevel].levelEndX){
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

if (levelData.spikes){
  for (let s of levelData.spikes){
    spikes.push(new Spike (s.x, s.y, s.w, s.h));
  }
}
}

// Player class
class Player {
  constructor() {
    this.x = 0;
    this.y = 150; // Starting position above the ground
    // this.x = 2000;
    // this.y = -100; // Starting position above the ground
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
    this.x = 100;
    this.y = 50;
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
    const overlapX =
      Math.min(player.x + player.width - this.x, this.x + this.w - player.x);
    const overlapY =
      Math.min(player.y + player.height - this.y, this.y + this.h - player.y);
  
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

class FallingBrick{
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show(){
    fill(200);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }

  checkCollision(player) {
    const overlapX =
      Math.min(player.x + player.width - this.x, this.x + this.w - player.x);
    const overlapY =
      Math.min(player.y + player.height - this.y, this.y + this.h - player.y);
  
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
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show() {
    fill(155, 0, 0);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }

  checkCollision(player) {
    const overlapX =
      Math.min(player.x + player.width - this.x, this.x + this.w - player.x);
    const overlapY =
      Math.min(player.y + player.height - this.y, this.y + this.h - player.y);
  
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


class MovingEnemies{
  constructor(){
    
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
