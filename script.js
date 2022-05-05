const gridSizeSlider = document.getElementById('grid-size-slider');
const gridContainer = document.getElementById('grid-container');
const clearGridBtn = document.getElementById('clear-grid-btn');
const colorPicker = document.getElementById('color-picker');

let gridSize = gridSizeSlider.valueAsNumber;
let totalNumOfCells = gridSize * gridSize;
let sliderValueDisplay = document.getElementById('slider-value');
sliderValueDisplay.textContent = `${gridSize} x ${gridSize}`;

let activeMode = 'rainbow';
let activeModeDisplay = document.getElementById('active-mode-display');
activeModeDisplay.textContent = `${activeMode}`;

// get new slider value and generate new grid on slider mouseup
function getSliderValue() {
  gridSize = this.valueAsNumber;
  totalNumOfCells = gridSize * gridSize;
  sliderValueDisplay.textContent = `${gridSize} x ${gridSize}`;
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
  if (e.type === 'mouseover' && !mouseDown) return;
  switch (activeMode) {
    case 'eraser':
      this.style.backgroundColor = '';
      break;
    case 'lighten':
      this.style.backgroundColor = lighten(e);
      break;
    case 'darken':
      this.style.backgroundColor = darken(e);
      break;
    case 'rainbow':
      this.style.backgroundColor = generateRandColor();
      break;
    case 'custom':
      this.style.backgroundColor = colorPicker.value;
      break;
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

function setActiveMode(color) {
  activeMode = color;
  activeModeDisplay.textContent = `${color}`;
}

// set different coloring modes on click
document.getElementById('eraser-btn').onclick = () => setActiveMode('eraser');
document.getElementById('lighten-btn').onclick = () => setActiveMode('lighten');
document.getElementById('darken-btn').onclick = () => setActiveMode('darken');
document.getElementById('rainbow-btn').onclick = () => setActiveMode('rainbow');
document.getElementById('custom-color-btn').onclick = () => setActiveMode('custom');

// toggle borders
const allCells = gridContainer.children;
document.getElementById('toggle-grid-btn').onclick = () => {
  for (const cell of allCells) {
    cell.classList.toggle('grid');
  }
}

window.onload = generateGrid;
