const gridSizeSlider = document.querySelector('.slider');
const gridContainer = document.querySelector('.grid-container');
const controlsContainer = document.querySelector('.controls-container');
const clearGridBtn = document.querySelector('.reset-grid-btn');

let gridSize = gridSizeSlider.valueAsNumber;
let totalNumOfCells = gridSize * gridSize;
let rangeValueDisplay = document.querySelector('.range-slider-value');
rangeValueDisplay.textContent = gridSize;

// get new slider value and resize grid on slider mouseup
gridSizeSlider.oninput = getSliderValue;
gridSizeSlider.addEventListener('mouseup', clearGrid);

function getSliderValue() {
  gridSize = this.valueAsNumber;
  totalNumOfCells = gridSize * gridSize;
  rangeValueDisplay.textContent = gridSize;
}

// clear grid
clearGridBtn.addEventListener('click', clearGrid);
function clearGrid() {
  gridContainer.replaceChildren();
  generateGrid();
}

// create grid
function generateGrid() {
  for (let i=1; i <= totalNumOfCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add(`grid`);
    cell.addEventListener('mouseover', changeBgColor);
    cell.addEventListener('mousedown', changeBgColor);
    gridContainer.appendChild(cell);
  }
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
}

// generate a random color
function generateRandColor() {
  const r = Math.floor(Math.random() * 256 );
  const g = Math.floor(Math.random() * 256 );
  const b = Math.floor(Math.random() * 256 );
  return `rgb(${r}, ${g}, ${b})`;
}

// handle mouse events for coloring cells
let mouseDown = false
gridContainer.addEventListener('mousedown', (e) => {
  e.preventDefault();
  (mouseDown = true);
});

gridContainer.addEventListener('mouseup', (e) => {
  e.preventDefault();
  mouseDown = false
});

function changeBgColor(e) {
  // stop execution if both mouseover and mousedown events are not present
  if (e.type === 'mouseover' && !mouseDown) return;
  this.style.backgroundColor = generateRandColor();
}

window.onload = generateGrid;
