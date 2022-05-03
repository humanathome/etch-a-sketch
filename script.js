const gridSizeSlider = document.getElementById('grid-size-slider');
const gridContainer = document.getElementById('grid-container');
const clearGridBtn = document.getElementById('clear-grid-btn');

let gridSize = gridSizeSlider.valueAsNumber;
let totalNumOfCells = gridSize * gridSize;
let sliderValueDisplay = document.getElementById('slider-value');
sliderValueDisplay.textContent = gridSize;

let activeMode;
let activeModeDisplay = document.getElementById('active-mode-display');
activeModeDisplay.textContent = `${activeMode}`;

// get new slider value and generate new grid on slider mouseup
function getSliderValue() {
  gridSize = this.valueAsNumber;
  totalNumOfCells = gridSize * gridSize;
  sliderValueDisplay.textContent = gridSize;
}

gridSizeSlider.oninput = getSliderValue;
gridSizeSlider.addEventListener('mouseup', clearGrid);

// clear grid
function clearGrid() {
  gridContainer.replaceChildren();
  generateGrid();
}

clearGridBtn.addEventListener('click', clearGrid);

// create grid
function generateGrid() {
  for (let i=1; i <= totalNumOfCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid');
    cell.addEventListener('mouseover', changeBgColor);
    cell.addEventListener('mousedown', changeBgColor);
    gridContainer.appendChild(cell);
  }
  activeMode = 'rainbow';
  activeModeDisplay.textContent = `${activeMode}`;
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
}

// handle mouse events for coloring cells
let mouseDown = false;
gridContainer.addEventListener('mousedown', (e) => {
  e.preventDefault();
  mouseDown = true;
});

window.addEventListener('mouseup', () => {
  mouseDown = false;
});

// main function for color changing
function changeBgColor(e) {
  // stop execution if both mouseover and mousedown events are not present
  if (e.type === 'mouseover' && !mouseDown) return;
  if (activeMode === 'eraser') {
    this.style.backgroundColor = '';
  } else if (activeMode === 'black') {
    this.style.backgroundColor = 'rgb(0,0,0)';
  } else if (activeMode === 'lighten') {
    this.style.backgroundColor = lighten(e);
  } else if (activeMode === 'darken') {
    this.style.backgroundColor = darken(e);
  } else if (activeMode === 'rainbow') {
    this.style.backgroundColor = generateRandColor();
  }
}

// color functions
function lighten(e) {
  let currentColor = e.target.style.backgroundColor;
  if (currentColor === '') currentColor = 'rgb(255, 255, 255)';
  const rgbArray = currentColor.match(/\d+/g);
  let r = Number(rgbArray[0]);
  let g = Number(rgbArray[1]);
  let b = Number(rgbArray[2]);
  r += 26;
  g += 26;
  b += 26;
  return `rgb(${r}, ${g}, ${b})`;
}

function darken(e) {
  let currentColor = e.target.style.backgroundColor;
  if (currentColor === '') currentColor = 'rgb(255, 255, 255)';
  const rgbArray = currentColor.match(/\d+/g);
  let r = Number(rgbArray[0]);
  let g = Number(rgbArray[1]);
  let b = Number(rgbArray[2]);
  r -= 26;
  g -= 26;
  b -= 26;
  return `rgb(${r}, ${g}, ${b})`;
}

function generateRandColor() {
  const r = Math.floor(Math.random() * 255 );
  const g = Math.floor(Math.random() * 255 );
  const b = Math.floor(Math.random() * 255 );
  return `rgb(${r}, ${g}, ${b})`;
}

// set different coloring modes on click
document.getElementById('eraser-btn').onclick = () => {
  activeMode = 'eraser';
  activeModeDisplay.textContent = `${activeMode}`;
};

document.getElementById('black-btn').onclick = () => {
  activeMode = 'black';
  activeModeDisplay.textContent = `${activeMode}`;
};

document.getElementById('lighten-btn').onclick = () => {
  activeMode = 'lighten';
  activeModeDisplay.textContent = `${activeMode}`;
};

document.getElementById('darken-btn').onclick = () => {
  activeMode = 'darken';
  activeModeDisplay.textContent = `${activeMode}`;
};

document.getElementById('rainbow-btn').onclick = () => {
  activeMode = 'rainbow';
  activeModeDisplay.textContent = `${activeMode}`;
};

window.onload = generateGrid;
