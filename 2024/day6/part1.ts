/*

....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...

The map shows the current position of the guard with ^
to indicate the guard is currently facing up from the perspective of the map).

Any obstructions - crates, desks, alchemical reactors, etc. - are shown as #.

If there is something directly in front of you, turn right 90 degrees.  Otherwise, take a step forward.
the guard moves up several times until she reaches an obstacle

This process continues for a while, but the guard eventually leaves the mapped area

By predicting the guard's route, you can determine which specific positions in the lab will be in the patrol path. Including the guard's starting position, the positions visited by the guard before leaving the area are marked with an X:

....#.....
....XXXXX#
....X...X.
..#.X...X.
..XXXXX#X.
..X.X.X.X.
.#XXXXXXX.
.XXXXXXX#.
#XXXXXXX..
......#X..

In this example, the guard will visit 41 distinct positions on your map.

Predict the path of the guard. How many distinct positions will the guard visit before leaving the mapped area?

*/

import { getInput } from "./getInput";

function main() {
  const { grid } = getInput();
  const answer = getTotalUniquePositionsBeforeLeavingGrid(grid).size;
  console.log(answer);
}

main();

function getTotalUniquePositionsBeforeLeavingGrid(grid: string[][]) {
  const initialPosition = findInitialPositionOfGuard(grid);

  // guard position
  let rowIndex = initialPosition[0];
  let columnIndex = initialPosition[1];

  // guard goes in up direction by default
  let currentDirection = [-1, 0] as [number, number];

  // set of unique positions visited by the guard
  const positionsVisited = new Set<string>(); // each value is row,col string

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

    const nextCell = grid[nextRowIndex]?.[nextColumnIndex];

    // if next position is out of bounds
    if (nextCell === undefined) {
      break;
    }

    // if its an obstacle, turn right 90 degrees
    if (nextCell === "#") {
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

function findInitialPositionOfGuard(grid: string[][]) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "^") {
        return [i, j] as [number, number];
      }
    }
  }

  throw new Error("Guard not found");
}
