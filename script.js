const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gridSize = 10;  // Size of each cell
const width = Math.floor(canvas.width / gridSize);
const height = Math.floor(canvas.height / gridSize);

// Create a 2D array of cells
let grid = new Array(height).fill(0).map(() => new Array(width).fill(0));

// Initialize the grid with random colors
for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        grid[i][j] = '#' + Math.floor(Math.random()*16777215).toString(16);
    }
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            ctx.fillStyle = grid[i][j];
            ctx.fillRect(j * gridSize, i * gridSize, gridSize, gridSize);
        }
    }
}

function updateGrid() {
    // Simple rule: set the color of each cell to the color of the cell above it
    for (let i = height - 1; i > 0; i--) {
        for (let j = 0; j < width; j++) {
            grid[i][j] = grid[i-1][j];
        }
    }
    // Set the color of the top row to a random color
    for (let j = 0; j < width; j++) {
        grid[0][j] = '#' + Math.floor(Math.random()*16777215).toString(16);
    }
}
function updateGrid() {
  let newGrid = JSON.parse(JSON.stringify(grid));
  for (let i = 1; i < height - 1; i++) {
      for (let j = 1; j < width - 1; j++) {
          // Random walk: randomly choose a direction
          let direction = Math.floor(Math.random() * 4);
          switch(direction) {
              case 0: // up
                  newGrid[i-1][j] = grid[i][j];
                  break;
              case 1: // down
                  newGrid[i+1][j] = grid[i][j];
                  break;
              case 2: // left
                  newGrid[i][j-1] = grid[i][j];
                  break;
              case 3: // right
                  newGrid[i][j+1] = grid[i][j];
                  break;
          }
      }
  }
  grid = newGrid;
}

function animate() {
    updateGrid();
    drawGrid();
    requestAnimationFrame(animate);
}

animate();
function animate() {
  updateGrid();
  drawGrid();
  setTimeout(() => requestAnimationFrame(animate), 100);  // delay 100ms between frames
}
