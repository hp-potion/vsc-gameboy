let board = document.getElementById('board');
let minesHundredElement = document.getElementById('mines_hundred');
let minesTenElement = document.getElementById('mines_ten');
let minesOneElement = document.getElementById('mines_one');
let timeHundredElement = document.getElementById('time_hundred');
let timeTenElement = document.getElementById('time_ten');
let timeOneElement = document.getElementById('time_one');
let startButton = document.querySelector('.btn_start');

let startTime = null;
let timeInterval;
let mineCount = 10;
let remainingMines = mineCount;
let revealedCells = 0;
let isGameActive = true;
let boardSize = 9;

let boradArray = [];

function initializeBoard() {
  startTime = null;
  remainingMines = mineCount;
  revealedCells = 0;
  isGameActive = true;
  boradArray = [];
  board.innerHTML = '';
  clearInterval(timeInterval);
  setMineDigit(mineCount);
  setTimeDigit(0);

  for (let i = 0; i < boardSize; i++) {
    const row = [];
    for (let j = 0; j < boardSize; j++) {
      row.push({ isMine: false, isRevealed: false });
    }
    boradArray.push(row);
  }

  placeMines();
  updateMinesCount();
  renderBoard();
}

function placeMines() {
  for (let i = 0; i < mineCount; i++) {
    let row, col;
    do {
      row = Math.floor(Math.random() * boardSize);
      col = Math.floor(Math.random() * boardSize);
    } while (boradArray[row][col].isMine);

    boradArray[row][col].isMine = true;
  }
}

function updateMinesCount() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (!boradArray[i][j].isMine) {
        let count = 0;

        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            const newRow = i + x;
            const newCol = j + y;
            if (
              newRow >= 0 &&
              newRow < boardSize &&
              newCol >= 0 &&
              newCol < boardSize
            ) {
              if (boradArray[newRow][newCol].isMine) {
                count++;
              }
            }
          }
        }

        boradArray[i][j].minesCount = count;
      }
    }
  }
}

function getDigitNum(num) {
  const digitNum = String(num).padStart(3, '0');
  return { one: digitNum[2], ten: digitNum[1], hundred: digitNum[0] };
}

function setMineDigit(num) {
  const { one, ten, hundred } = getDigitNum(num);

  minesHundredElement.dataset.num = hundred;
  minesTenElement.dataset.num = ten;
  minesOneElement.dataset.num = one;
}

function setTimeDigit(num) {
  const { one, ten, hundred } = getDigitNum(num);

  timeHundredElement.dataset.num = hundred;
  timeTenElement.dataset.num = ten;
  timeOneElement.dataset.num = one;
}

function renderBoard() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener('click', cellClick);
      cell.addEventListener('contextmenu', cellRightClick);
      board.appendChild(cell);
    }
  }
}

function cellClick(event) {
  if (!isGameActive) {
    return;
  }

  if (startTime === null) {
    startTime = Date.now();
    timeInterval = setInterval(updateTime, 1000);
  }

  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);

  if (boradArray[row][col].isMine) {
    event.target.classList.add('fail');
    startButton.classList.add('lose');
    revealMines();
    clearInterval(timeInterval);
    isGameActive = false;
  } else {
    revealCell(row, col);
  }
}

function cellRightClick(event) {
  event.preventDefault();

  if (!isGameActive) {
    return;
  }

  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);
  const cell = boradArray[row][col];

  if (!cell.isRevealed) {
    cell.isFlagged = !cell.isFlagged;

    if (cell.isFlagged) {
      setMineDigit(--remainingMines);
      event.target.classList.add('flag');
    } else {
      setMineDigit(++remainingMines);
      event.target.classList.remove('flag');
    }
  }
}

function revealCell(row, col) {
  const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

  if (!cell || boradArray[row][col].isRevealed) {
    return;
  }

  boradArray[row][col].isRevealed = true;
  revealedCells++;

  if (boradArray[row][col].isFlagged) {
    boradArray[row][col].isFlagged = !boradArray[row][col].isFlagged;
  }

  if (boradArray[row][col].minesCount > 0) {
    cell.textContent = boradArray[row][col].minesCount;
    cell.dataset.mines = boradArray[row][col].minesCount;
  } else {
    cell.classList.add('revealed');
    cell.textContent = '';

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        const newRow = row + x;
        const newCol = col + y;

        if (
          newRow >= 0 &&
          newRow < boardSize &&
          newCol >= 0 &&
          newCol < boardSize
        ) {
          revealCell(newRow, newCol);
        }
      }
    }
  }

  if (revealedCells === boardSize * boardSize - mineCount) {
    clearInterval(timeInterval);
    isGameActive = false;
  }
}

function revealMines() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (boradArray[i][j].isMine) {
        const cell = document.querySelector(
          `[data-row="${i}"][data-col="${j}"]`
        );
        cell.classList.add('mine');
      }
    }
  }
}

function updateTime() {
  const currentTime = Math.floor((Date.now() - startTime) / 1000);

  setTimeDigit(currentTime);
}

initializeBoard();

startButton.addEventListener('click', () => {
  initializeBoard();
  startButton.classList.remove('lose');
});
