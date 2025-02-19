// Set up canvas and game context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Game variables
const player = {
  x: 400,
  y: 300,
  width: 30,
  height: 30,
  speed: 3,
  color: "yellow",
};

const walls = [
  { x: 100, y: 100, width: 200, height: 20 },
  { x: 500, y: 150, width: 20, height: 400 },
  { x: 200, y: 400, width: 300, height: 20 },
  { x: 400, y: 500, width: 200, height: 20 },
  // Add more walls as needed
];

let keys = {
  up: false,
  down: false,
  left: false,
  right: false,
};

// Event listeners for player movement (WASD or Arrow keys)
document.addEventListener("keydown", (event) => {
  if (event.key === "w" || event.key === "ArrowUp") keys.up = true;
  if (event.key === "s" || event.key === "ArrowDown") keys.down = true;
  if (event.key === "a" || event.key === "ArrowLeft") keys.left = true;
  if (event.key === "d" || event.key === "ArrowRight") keys.right = true;
});

document.addEventListener("keyup", (event) => {
  if (event.key === "w" || event.key === "ArrowUp") keys.up = false;
  if (event.key === "s" || event.key === "ArrowDown") keys.down = false;
  if (event.key === "a" || event.key === "ArrowLeft") keys.left = false;
  if (event.key === "d" || event.key === "ArrowRight") keys.right = false;
});

// Collision detection function
function isColliding(player, wall) {
  return (
    player.x < wall.x + wall.width &&
    player.x + player.width > wall.x &&
    player.y < wall.y + wall.height &&
    player.y + player.height > wall.y
  );
}

// Update game logic
function update() {
  // Player movement
  if (keys.up) player.y -= player.speed;
  if (keys.down) player.y += player.speed;
  if (keys.left) player.x -= player.speed;
  if (keys.right) player.x += player.speed;

  // Collision detection with walls
  for (const wall of walls) {
    if (isColliding(player, wall)) {
      if (keys.up) player.y += player.speed;
      if (keys.down) player.y -= player.speed;
      if (keys.left) player.x += player.speed;
      if (keys.right) player.x -= player.speed;
    }
  }
}

// Draw the game elements
function draw() {
  // Background color (creepy yellowish, dim light theme)
  ctx.fillStyle = "brown"; // Light yellow background
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw walls
  ctx.fillStyle = "#8a3324";
  for (const wall of walls) {
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
  }

  // Draw the player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Main game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
