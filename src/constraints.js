export function constraintsInit(grid, row, col, symbol) {
  // Checking row symbol count...
  if (grid[row].filter(cell => cell === symbol).length >= 3) return false;

  // Checking column symbol count...
  let colCount = 0;
  for (let r = 0; r < 6; r++) {
    if (grid[r][col] === symbol) colCount++;
  }
  if (colCount >= 3) return false;

  // Check for 3 consecutive
  const consecutiveCheck = (arr) => {
    for(let i = 0; i < 4; i++) {
        if (arr[i] && arr[i + 1] && arr[i + 2] && arr[i] === symbol && arr[i + 1] === symbol && arr[i + 2] === symbol) {
          return true;
        }
    }
    return false;
  }

  // Checking for 3 consecutive in a row...
  const tempRow = [...grid[row]];
  tempRow[col] = symbol;
  if(consecutiveCheck(tempRow)) return false;

  // Checking for 3 consecutive in a column...
  const tempCol = grid.map((r, i) => i === row ? symbol : r[col]);
  if(consecutiveCheck(tempCol)) return false;

  return true;
}

export function constraintsCheck(arr, symbol) {
    // Checking row symbol count...
    if (arr.filter(cell => cell === symbol).length > 3) return false;

    // Checking three consecutive symbols...
    for(let i = 0; i < 4; i++) {
        if (arr[i] && arr[i + 1] && arr[i + 2] && arr[i] === symbol && arr[i + 1] === symbol && arr[i + 2] === symbol) {
          return false;
        }
    }
    return true;
}