let player;

let groundHeight = 50;

function setup() {
  createCanvas(800, 600);

  player = new Player();
}

function draw() {
  background(255, 255, 255);

  // Display and update player
  player.update();
  player.show();

  // Draw the ground
  fill(100, 200, 100); // Green ground
  rect(0, height - groundHeight, width, groundHeight);
}

class Player {
  constructor() {
    this.x = 100;
    this.y = height - groundHeight - 50; // Starting position above the ground
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

    // Collision with ground
    if (this.y >= height - groundHeight - this.height) {
      this.y = height - groundHeight - this.height;
      this.velocity = 0;
      this.onGround = true;
      this.canDoubleJump = true; // Reset double jump when on ground
    } else {
      this.onGround = false;
    }
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
    fill(0, 0, 0);
    rect(this.x, this.y, this.width, this.height);
  }
}

// Listen for jump input
function keyPressed() {
  if (keyCode === UP_ARROW) {
    player.jump();
  }
}
