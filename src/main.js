/**
 * Rules of the Puzzle:
 * 1. Each row must contain exactly 3 yins and 3 yangs.
 * 2. Each column must contain exactly 3 yins and 3 yangs.
 * 3. There cannot be 3 consecutive yins or yangs anywhere in the puzzle.
 * 
 * Steps:
 * 1. Generate a puzzle solution.
 * 2. Make a copy of that solution and remove a majority of the symbols to use as the puzzle problem.
 * 3. Display the puzzle problem where user can click a cell to toggle between 'yin', 'yang' and empty (null)
 * 4. Set the timer to 0 and start it on user's first toggle.
 * 5. Hitting the submit button should check whether the user's solution is valid by testing whether it follows the rules of the puzzle. (Do not check it by comparing it to the original solution that was generated since there can be multiple ways to solve the same puzzle problem.)
 * 6. Hitting the 'Assist' button must trigger a function to check every cell manipulated by the user so as to assist them into completing the puzzle.
 * 7. Everytime the user manipulates a cell, check whether the puzzle abides by the rules and highlight the cells that cause a problem.
 */


import './style.css'
import { constraintsInit, constraintsCheck } from './constraints.js'
//import { setupCounter } from './counter.js'

const puzzleCompleteSound = new Audio('complete.mp3');

// Generating a solution grid for the Puzzle...
const grid = generatePuzzleSolution();

// Generating the Puzzle grid by erasing cells at random from the solution grid...
const puzzleGrid = grid.map(row => 
  row.map(cell => Math.random() < 0.3 ? cell : '')
);
//console.log(puzzleGrid);

// Rendering the Webpage...
renderPuzzlePage();

// Function to generate a Puzzle Grid
function generatePuzzleSolution() {
  const SIZE = 6; //cells per row/column
  const symbols = ['sunny', 'bedtime']; //symbols

  // Generating a puzzle grid and filling it with null values initially...
  const grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));

  // For generating the puzzle grid
  function aSolution(grid, row = 0, col = 0) {
    if (row === SIZE) return true;

    const nextRow = col === SIZE - 1 ? row + 1 : row;
    const nextCol = col === SIZE - 1 ? 0 : col + 1;

    const shuffledSymbols = [...symbols].sort(() => Math.random() - 0.5);
    for (const symbol of shuffledSymbols) {
      if (constraintsInit(grid, row, col, symbol)) {
        grid[row][col] = symbol;
        if (aSolution(grid, nextRow, nextCol)) return true;
        grid[row][col] = null;
      }
    }
    return false;
  }
  // error handling just in case...
  if (!aSolution(grid)) throw new Error("Couldn't generate a valid grid");
  return grid;
}

function renderPuzzle() {
  // Adding the Puzzle to HTML DOM...
  return puzzleGrid.map((row, rowIndex) =>
    row.map((symbol, colIndex) => `
      <button 
        id="cell-${rowIndex}-${colIndex}" 
        data-row="${rowIndex}" 
        data-col="${colIndex}" 
        data-value="${symbol}" 
        class="cell material-symbols-outlined ${symbol !== '' ? 'bg-neutral-200' : ''}"
        ${symbol !== '' ? 'disabled' : ''}
      >${symbol}</button>
    `).join('')
  ).join('');
}

function toggleSymbol(e) {
  const cell = e.target;
  // symbol states array for sequential rotation when clicking the cells
  const states = ['sunny', 'bedtime', ''];
  const currentIndex = states.indexOf(cell.textContent);
  // toggling symbols sequentially...
  cell.textContent = states[(currentIndex + 1) % states.length];
  cell.classList.remove('text-red-500');
  cell.dataset.value = cell.textContent;
  const puzzleProgress = [...puzzleGrid];
  puzzleProgress[cell.dataset.row][cell.dataset.col] = cell.dataset.value;

  const checkRow = constraintsCheck(puzzleProgress.map(row => row[cell.dataset.col]), cell.dataset.value);
  const checkCol = constraintsCheck(puzzleProgress[cell.dataset.row], cell.dataset.value);
  if(cell.dataset.value === 'sunny' || cell.dataset.value === 'bedtime') {
    if (!checkRow || !checkCol) {
      // turning the incorrect cells red...
      setTimeout(() => {
        cell.classList.add('text-red-500');
      }, 10);
    } else {
      cell.classList.remove('text-red-500');
      // When no empty cells left...
      if(!puzzleProgress.some(row => row.some(cell => cell === ''))) {
        document.querySelectorAll('.cell').forEach(cell => {
          cell.classList.remove('bg-neutral-200');
          cell.classList.add('animate-complete', 'cursor-default');
          cell.disabled = true;
        });
        setTimeout(() => {
          puzzleCompleteSound.volume = 0.5;
          puzzleCompleteSound.play().catch((e) => {
            console.warn('Audio autoplay blocked:', e);
          });
          document.querySelector('.done').classList.remove('hidden');
        }, 1000);
        setTimeout(() => {
          // removing the 'appear' animation so that 'disappear' animation works
          document.querySelector('.done').classList.remove('animate-exist');
        }, 1500);
      }
    }
  }
}

// Initial render...
function renderPuzzlePage() {
  document.querySelector('#app').innerHTML = `
    <main class="relative max-w-dvw min-h-dvh mx-2 bg-white flex flex-col items-center justify-start gap-2 font-primary">
      <header class="p-4 flex flex-col items-center">
        <h1 class="text-7xl font-triad">YinYang</h1>
        <h3 class="">Bring Balance!</h3>
      </header>
      <section class="h-full w-full flex flex-col gap-4 items-center">
        <section class="w-fit p-2 flex flex-col gap-2 items-center justify-center">
          <section class="done hidden absolute flex flex-col gap-4 items-center justify-center p-6 pb-12 shadow-2xl bg-white animate-exist z-10">
            <button id="close-btn" class="material-symbols-outlined self-end text-gray-400 hover:text-black transition-colors duration-300">close</button>
            <span class="material-symbols-outlined scale-200">sentiment_very_satisfied</span>
            <h2 class="text-5xl font-bold">Nice work!</h2>
            <p>Refresh for a new puzzle!</p>
          </section>
          <section class="board w-full grid grid-cols-6 p-1 gap-1 rounded-md bg-black text-center">
            ${renderPuzzle()}
          </section>
        </section>
        <section class="w-full sm:max-w-md p-2 flex flex-col gap-0 border-1 border-neutral-200 rounded-md">
          <header class="flex items-center justify-between">
            <h1 class="text-xl">How to play</h1>
            <button id="howto" class="material-symbols-outlined cursor-pointer hover:bg-neutral-200 p-1 rounded-full transition-all duration-300">
              expand_circle_down
            </button>
          </header>
          <section class="howtoplay">
            <ul class="list-disc px-4">
              <li>
                Fill the grid so that each cell contains either a <span class="material-symbols-outlined scale-80 align-bottom">sunny</span> or a <span class="material-symbols-outlined scale-80 align-bottom">bedtime</span> .
              </li>
              <li>
                No more than 2 <span class="material-symbols-outlined scale-80 align-bottom">sunny</span> or <span class="material-symbols-outlined scale-80 align-bottom">bedtime</span> may be next to each other, either vertically or horizontally.
                <ul class="list-disc px-4">
                  <li>
                    <span class="material-symbols-outlined scale-80 align-bottom">sunny</span>
                    <span class="material-symbols-outlined scale-80 align-bottom">sunny</span>
                    <span class="material-symbols-outlined scale-80 align-bottom">check</span>
                  </li>
                  <li>
                    <span class="material-symbols-outlined scale-80 align-bottom">sunny</span>
                    <span class="material-symbols-outlined scale-80 align-bottom">sunny</span>
                    <span class="material-symbols-outlined scale-80 align-bottom">sunny</span>
                    <span class="material-symbols-outlined scale-80 align-bottom">close</span>
                  </li>
                </ul>
              </li>
              <li>
                Each row (and column) must contain the same number of <span class="material-symbols-outlined scale-80 align-bottom">sunny</span> and <span class="material-symbols-outlined scale-80 align-bottom">bedtime</span> .
              </li>
            </ul>
          </section>
        </section>
        <section class="timer flex gap-2">
          
        </section>
      </section>
    </main>
  `;
  document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', toggleSymbol);
  });
  document.getElementById('close-btn').addEventListener('click', () => {
    document.querySelector('.done').classList.add('animate-die');
    setTimeout(() => {
      document.querySelector('.done').classList.add('hidden');
    }, 300);
  });
  document.getElementById('howto').addEventListener('click', () => {
    const btn = document.getElementById('howto');
    const howToPlay = document.querySelector('.howtoplay');
    howToPlay.classList.toggle('show');
    if (howToPlay.classList.contains('show')) {
      howToPlay.style.maxHeight = howToPlay.scrollHeight + 'px';
      btn.textContent = 'expand_circle_up';
    } else {
      howToPlay.style.maxHeight = '0';
      btn.textContent = 'expand_circle_down';
    }
  });
  /*
  document.getElementById('check').addEventListener('click', checkPuzzle);
  document.getElementById('submit').addEventListener('click', checkTriad);
  */
}