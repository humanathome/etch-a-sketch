const gridSizeSlider = document.querySelector('.slider');
let gridSize = (gridSizeSlider.valueAsNumber);
let totalNumOfCells = gridSize * gridSize;

gridSizeSlider.oninput = getValue;
let rangeValueDisplay = document.querySelector('.range-slider-value');
rangeValueDisplay.textContent = gridSize;

function getValue() {
  gridSize = (gridSizeSlider.valueAsNumber);
  totalNumOfCells = gridSize * gridSize;
  rangeValueDisplay.textContent = gridSize;
}

// controls container
const controlsContainer = document.querySelector('.controls-container');
// create grid button
const makeGridBtn = document.createElement('button');
makeGridBtn.classList.add('make-grid-btn');
makeGridBtn.textContent = "Generate grid";
makeGridBtn.addEventListener('click', generateGrid);
controlsContainer.appendChild(makeGridBtn);

// create grid
const gridContainer = document.querySelector('.grid-container');

function generateGrid() {
  for (let i=1; i <= totalNumOfCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add(`grid`);
    cell.addEventListener('mouseover', changeBgColor);
    cell.addEventListener('mousedown', changeBgColor);
    gridContainer.appendChild(cell);
  }
  makeGridBtn.disabled = true;
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
}

// clear grid
const resetGridBtn = document.createElement('button');
resetGridBtn.classList.add('reset-grid-btn');
resetGridBtn.textContent = "Clear grid";
controlsContainer.appendChild(resetGridBtn);

resetGridBtn.addEventListener('click', () => {
  gridContainer.replaceChildren();
  makeGridBtn.disabled = false;
})

// generate a random color
let r;
let g;
let b;

function generateRandColor() {
  r = Math.floor(Math.random() * 256 );
  g = Math.floor(Math.random() * 256 );
  b = Math.floor(Math.random() * 256 );
  return `rgb(${r}, ${g}, ${b})`;
}

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
