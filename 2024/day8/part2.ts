/**

it turns out that an antinode occurs at any grid position exactly in line with at least two antennas of the same frequency, regardless of distance.

T....#....
...T......
.T....#...
.........#
..#.......
..........
...#......
..........
....#.....
..........

 */

import { getInput } from "./getInput";

type Coordinate = [number, number];

function main() {
  const { grid } = getInput();
  // create a map of signalId to an array of position it appears in grid
  const signalMap = getSignalMap(grid);
  const uniqueAntiNodes = new Set<string>();

  for (const signalEntry of signalMap) {
    const positions = signalEntry[1];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const [signal1, signal2] = [positions[i], positions[j]];
        const antiNodes = getAntinodeForPair(grid, signal1, signal2);
        for (const antinode of antiNodes) {
          uniqueAntiNodes.add(`${antinode[0]},${antinode[1]}`);
        }
      }
    }
  }

  console.log(uniqueAntiNodes.size);
}

main();

function getSignalMap(grid: string[][]) {
  const signalMap = new Map<string, Coordinate[]>();
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const signal = grid[i][j];
      if (signal === ".") {
        continue;
      }

      const positions = signalMap.get(signal);
      if (!positions) {
        signalMap.set(signal, [[i, j]]);
      } else {
        positions.push([i, j]);
      }
    }
  }

  return signalMap;
}

function getAntinodeForPair(
  grid: string[][],
  signal1: Coordinate,
  signal2: Coordinate
) {
  const diffX = signal1[0] - signal2[0];
  const diffY = signal1[1] - signal2[1];
  const antiNodes: Coordinate[] = [];

  let i = 0;

  let is1OutOfBounds = false;
  let is2OutOfBounds = false;

  while (true) {
    const antiNodeCount = antiNodes.length;

    if (!is1OutOfBounds) {
      const antinode1: Coordinate = [
        signal1[0] + diffX * i,
        signal1[1] + diffY * i,
      ];

      if (!isOutOfBounds(grid, antinode1)) {
        antiNodes.push(antinode1);
      } else {
        is1OutOfBounds = true;
      }
    }

    if (!is2OutOfBounds) {
      const antinode2: Coordinate = [
        signal2[0] - diffX * i,
        signal2[1] - diffY * i,
      ];

      if (!isOutOfBounds(grid, antinode2)) {
        antiNodes.push(antinode2);
      } else {
        is2OutOfBounds = true;
      }
    }

    i++;

    if (antiNodes.length === antiNodeCount) {
      break;
    }
  }

  return antiNodes;
}

function isOutOfBounds(grid: string[][], position: Coordinate) {
  const [x, y] = position;
  return x < 0 || x >= grid.length || y < 0 || y >= grid[x].length;
}
