import { getInput } from "./getInput";

/**

The unusual data (your puzzle input) consists of many reports, one report per line.
Each report is a list of numbers called levels that are separated by spaces. For example:

7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9

This example data contains six reports each containing five levels.

report only counts as safe if both of the following are true:
- The levels are either all increasing or all decreasing.
- Any two adjacent levels differ by at least one and at most three.

How many reports are safe?
 */

function isValidReport(report: number[]): boolean {
  const isIncreasingReport = report[0] < report[1];

  for (let i = 1; i < report.length; i++) {
    const inc = report[i] - report[i - 1];
    const isThisIncreasing = inc > 0;
    const absDiff = Math.abs(inc);
    if (isThisIncreasing !== isIncreasingReport || absDiff < 1 || absDiff > 3) {
      return false;
    }
  }

  return true;
}

const input = getInput();

let totalSafeReports = 0;
for (const report of input.reports) {
  if (isValidReport(report)) {
    totalSafeReports++;
  }
}

console.log(totalSafeReports);
