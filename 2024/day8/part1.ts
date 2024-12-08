/**

Each antenna is tuned to a specific frequency indicated by a single lowercase letter, uppercase letter, or digit
You create a map (your puzzle input) of these antennas. For example:

............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............


signal only applies its nefarious effect at specific antinodes based on the resonant frequencies of the antennas.
In particular, an antinode occurs at any point that is perfectly in line with two antennas of the same frequency

but only when one of the antennas is twice as far away as the other.
This means that for any pair of antennas with the same frequency, there are two antinodes, one on either side of them.

..........
...#......
..........
....a.....
..........
.....a....
..........
......#...
..........
..........

Adding a third antenna with the same frequency creates several more antinodes. It would ideally add four antinodes, but two are off the right side of the map, so instead it adds only two:

..........
...#......
#.........
....a.....
........a.
.....a....
..#.......
......#...
..........
..........


Antennas with different frequencies don't create antinodes

However, antinodes can occur at locations that contain antennas.

How many unique locations within the bounds of the map contain an antinode?
 */

import { getInput } from "./getInput";

type Coordinate = [number, number];

function main() {
  const { grid } = getInput();
  // create a map of signalId to an array of position it appears in grid
  const signalMap = getSignalMap(grid);
  const uniqueAntiNodes = new Set<string>();

  for (const [signal, positions] of signalMap) {
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

  const antinode1: Coordinate = [signal1[0] + diffX, signal1[1] + diffY];
  const antinode2: Coordinate = [signal2[0] - diffX, signal2[1] - diffY];

  if (!isOutOfBounds(grid, antinode1)) {
    antiNodes.push(antinode1);
  }

  if (!isOutOfBounds(grid, antinode2)) {
    antiNodes.push(antinode2);
  }

  return antiNodes;
}

function isOutOfBounds(grid: string[][], position: Coordinate) {
  const [x, y] = position;
  return x < 0 || x >= grid.length || y < 0 || y >= grid[x].length;
}
