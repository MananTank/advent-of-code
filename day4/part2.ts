import { getInput } from "./getInput";

const { grid } = getInput();

/**

MAS can be written forwards or backwards in diagonal * 2

M.S
.A.
M.S

S.M
.A.
S.M

etc..

...

 */

function isPatternFoundAt(rowIndex: number, colIndex: number): boolean {
  // A in center
  if (grid[rowIndex][colIndex] !== "A") {
    return false;
  }

  const topLeft = grid[rowIndex - 1][colIndex - 1];
  const topRight = grid[rowIndex - 1][colIndex + 1];
  const bottomLeft = grid[rowIndex + 1][colIndex - 1];
  const bottomRight = grid[rowIndex + 1][colIndex + 1];

  // all or them should be S or M
  if (
    [topLeft, topRight, bottomLeft, bottomRight].find(
      (c) => c !== "S" && c !== "M"
    )
  ) {
    return false;
  }

  // opposite diagonals should be different ( if one is M, the other should be S)
  if (topLeft === bottomRight || bottomLeft === topRight) {
    return false;
  }

  return true;
}

let total = 0;

// first and last row and column are not considered - because the pattern can not be found there for sure
for (let row = 1; row < grid.length - 1; row++) {
  for (let col = 1; col < grid[row].length - 1; col++) {
    if (isPatternFoundAt(row, col)) {
      total += 1;
    }
  }
}

console.log(total);
