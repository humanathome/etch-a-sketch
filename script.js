let number = 16;
// calculate total number of cells to be inserted
const numberOfCells = number * number;
const gridContainer = document.querySelector('div.grid-container');

const makeGridBtn = document.createElement('button');
makeGridBtn.classList.add('make-grid-btn');
makeGridBtn.textContent = "Generate grid";
makeGridBtn.addEventListener('click', generateGrid);
document.body.appendChild(makeGridBtn);


function generateGrid() {
  for (let i=1; i <= numberOfCells; i++) {
    let cell = document.createElement('div');
    cell.classList.add(`grid`);
    cell.addEventListener('mouseover', changeBgColor);
    cell.addEventListener('mousedown', changeBgColor);
    gridContainer.appendChild(cell);
  }
  makeGridBtn.removeEventListener('click', generateGrid);
}

// set grid layout size
gridContainer.style.gridTemplateColumns = `repeat(${number}, 1fr)`;
gridContainer.style.gridTemplateRows = `repeat(${number}, 1fr)`;

// clear grid
const resetGridBtn = document.createElement('button');
resetGridBtn.classList.add('reset-grid-btn');
resetGridBtn.textContent = "Clear grid";
document.body.appendChild(resetGridBtn);

resetGridBtn.addEventListener('click', () => {
  gridContainer.replaceChildren();
  makeGridBtn.addEventListener('click', generateGrid);
})

// generate a random color
let r;
let g;
let b;

function generateRandColor() {
  r = Math.floor(Math.random() * 256 );
  g = Math.floor(Math.random() * 256 );
  b = Math.floor(Math.random() * 256 );
  let bkgColor;
  bkgColor = `rgb(${r}, ${g}, ${b})`;
  return bkgColor;
}


let mouseDown = false
document.body.onmousedown = () => (mouseDown = true);
document.body.addEventListener('mouseup', (e) => {
  e.preventDefault();
  mouseDown = false;
});


function changeBgColor(e) {
  e.preventDefault();
  if (e.type === 'mouseover' && mouseDown) {
    this.style.backgroundColor = generateRandColor();
  }
}
