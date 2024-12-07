/**

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet

On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

What is the sum of all of the calibration values?
 */

import { getInput } from "./getInput";

function main() {
  const { lines } = getInput();
  let total = 0;
  for (const line of lines) {
    total += getCalibrationValue(line);
  }
  console.log(total);
}

function getCalibrationValue(line: string): number {
  let i = 0;
  let j = line.length - 1;
  let firstNum: string | null = null;
  let lastNum: string | null = null;

  while (firstNum === null || lastNum === null) {
    if (firstNum === null) {
      if (!Number.isNaN(Number(line[i]))) {
        firstNum = line[i];
      } else {
        i++;
      }
    }

    if (lastNum === null) {
      if (!Number.isNaN(Number(line[j]))) {
        lastNum = line[j];
      } else {
        j--;
      }
    }
  }

  return Number(firstNum + lastNum);
}

main();
