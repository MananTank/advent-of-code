// tolerate a single bad level
// if removing a single level from an unsafe report would make it safe, the report instead counts as safe.

import { getInput } from "./getInput";

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

function isValidReportWithTolerance(report: number[]): boolean {
  // return true if report is valid without the need to remove any level
  if (isValidReport(report)) {
    return true;
  }

  // remove each level and check if the report becomes valid
  for (let i = 0; i < report.length; i++) {
    if (isValidReport([...report.slice(0, i), ...report.slice(i + 1)])) {
      return true;
    }
  }

  return false;
}

const input = getInput();

let totalSafeReports = 0;
for (const report of input.reports) {
  if (isValidReportWithTolerance(report)) {
    totalSafeReports++;
  }
}

console.log(totalSafeReports);
