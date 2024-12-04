import { getInput } from "./getInput";

const { grid } = getInput();

// rowIndex and colIndex are the starting point of the sequence
// direction is an array of 2 numbers, the first number is the row increment, the second number is the column increment
// [1, 0] means go right, [-1, 0] means go left ...etc - total 9 combinations (3*3)
function isSequenceFoundAt(
  rowIndex: number,
  colIndex: number,
  seq: string,
  direction: [number, number]
): boolean {
  const lastPointRowIndex = rowIndex + (seq.length - 1) * direction[0];
  const lastPointColIndex = colIndex + (seq.length - 1) * direction[1];

  // sequence can not possibly match because it will go out of bounds of grid
  if (
    lastPointRowIndex < 0 ||
    lastPointRowIndex >= grid.length ||
    lastPointColIndex < 0 ||
    lastPointColIndex >= grid[0].length
  ) {
    return false;
  }

  for (let i = 0; i < seq.length; i++) {
    const r = rowIndex + i * direction[0];
    const c = colIndex + i * direction[1];
    if (grid[r][c] !== seq[i]) {
      return false;
    }
  }

  return true;
}

function getTotalSequencesFoundAt(
  rowIndex: number,
  colIndex: number,
  seq: string
): number {
  let total = 0;

  // look for seq in all 8 directions starting at (rowIndex, colIndex) (9-1)
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) {
        continue;
      }

      if (isSequenceFoundAt(rowIndex, colIndex, seq, [dr, dc])) {
        total++;
      }
    }
  }

  return total;
}

let total = 0;
for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    total += getTotalSequencesFoundAt(row, col, "XMAS");
  }
}

console.log(total);
