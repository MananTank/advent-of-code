// place the new obstruction in such a way that the guard will get stuck in a loop,
// Historians would like to know all of the possible positions for such an obstruction
// new obstruction can't be placed at the guard's starting position - the guard is there right now and would notice.
// get the guard stuck in a loop by adding a single new obstruction.
// How many different positions could you choose for this obstruction?

import { getInput } from "./getInput";

function main() {
  const { grid } = getInput();
  const initialPosition = findInitialPositionOfGuard(grid);

  let totalWaysToCreateLoop = 0;

  // get the positions where guard actually visits if we don't add any obstructions
  const positionsVisited = getTotalUniquePositionsBeforeLeavingGrid(
    grid,
    initialPosition
  );

  // put an obstruction at each position and check if guard gets stuck in a loop
  for (const position of positionsVisited) {
    const [i, j] = position.split(",").map(Number);
    // don't put obstruction at guard's starting position
    if (grid[i][j] === "^") {
      continue;
    }

    // if guard gets stuck in a loop - increment the counter
    const isGuardStuck = isGuardStuckInLoop(grid, initialPosition, [i, j]);
    if (isGuardStuck) {
      totalWaysToCreateLoop++;
    }
  }

  console.log(totalWaysToCreateLoop);
}

main();

function isGuardStuckInLoop(
  grid: string[][],
  initialPosition: [number, number],
  obstructionPosition: [number, number]
) {
  // guard position
  let rowIndex = initialPosition[0];
  let columnIndex = initialPosition[1];

  // guard goes in up direction by default
  let currentDirection = [-1, 0] as [number, number];
  const positionsVisited = new Set<string>(); // each value is row,col,directionX,directionY

  while (true) {
    const key = `${rowIndex},${columnIndex},${currentDirection[0]},${currentDirection[1]}`;

    if (positionsVisited.has(key)) {
      return true;
    }

    positionsVisited.add(key);

    // if guard is out of bounds
    if (
      rowIndex < 0 ||
      rowIndex >= grid.length ||
      columnIndex < 0 ||
      columnIndex >= grid[0].length
    ) {
      break;
    }

    const nextRowIndex = rowIndex + currentDirection[0];
    const nextColumnIndex = columnIndex + currentDirection[1];

    const nextCell = grid[nextRowIndex]?.[nextColumnIndex];

    // if next position is out of bounds
    if (nextCell === undefined) {
      break;
    }

    const hasObstructionAtNextCell =
      nextRowIndex === obstructionPosition[0] &&
      nextColumnIndex === obstructionPosition[1];

    // if there's an obstacle in the way
    // turn right 90 degrees ( don't move at the same time!)
    if (nextCell === "#" || hasObstructionAtNextCell) {
      // up -> right -> down -> left
      // [-1, 0] -> [0, 1] -> [1, 0] -> [0, -1]
      currentDirection = [currentDirection[1], -1 * currentDirection[0]];
    } else {
      // continue moving in the current direction
      rowIndex = nextRowIndex;
      columnIndex = nextColumnIndex;
    }
  }

  return false;
}

// same as day6/part1.ts -----

function getTotalUniquePositionsBeforeLeavingGrid(
  grid: string[][],
  initialPosition: [number, number]
) {
  // guard position
  let rowIndex = initialPosition[0];
  let columnIndex = initialPosition[1];

  // up by default
  let currentDirection = [-1, 0] as [number, number];
  const positionsVisited = new Set<string>(); // each value is row,col

  while (true) {
    positionsVisited.add(`${rowIndex},${columnIndex}`);

    // if guard is out of bounds
    if (
      rowIndex < 0 ||
      rowIndex >= grid.length ||
      columnIndex < 0 ||
      columnIndex >= grid[0].length
    ) {
      break;
    }

    const nextRowIndex = rowIndex + currentDirection[0];
    const nextColumnIndex = columnIndex + currentDirection[1];

    const nextPosition = grid[nextRowIndex]?.[nextColumnIndex];

    // if next position is out of bounds
    if (nextPosition === undefined) {
      break;
    }

    // if there's an obstacle in the way
    // turn right 90 degrees
    if (nextPosition === "#") {
      // up -> right -> down -> left
      // [-1, 0] -> [0, 1] -> [1, 0] -> [0, -1]
      currentDirection = [currentDirection[1], -1 * currentDirection[0]];
    } else {
      // continue moving in the current direction
      rowIndex = nextRowIndex;
      columnIndex = nextColumnIndex;
    }
  }

  return positionsVisited;
}

export function findInitialPositionOfGuard(grid: string[][]) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "^") {
        return [i, j] as [number, number];
      }
    }
  }

  throw new Error("Guard not found");
}
