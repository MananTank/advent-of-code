//one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".
// you now need to find the real first and last digit on each line. For example:

import { getInput } from "./getInput";

function main() {
  const { lines } = getInput();
  let total = 0;
  for (const line of lines) {
    total += getCalibrationValue(line);
  }
  console.log(total);
}

const numbersRecord = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function getCalibrationValue(line: string): number {
  let i = 0;
  let j = line.length - 1;
  let firstNum: number | null = null;
  let lastNum: number | null = null;

  while (firstNum === null || lastNum === null) {
    if (firstNum === null) {
      const numMeta = isNumberAt(line, i);
      if (numMeta) {
        firstNum = numMeta.number;
        i += numMeta.length;
      } else {
        i++;
      }
    }

    if (lastNum === null) {
      const numMeta = isNumberAt(line, j);
      if (numMeta) {
        lastNum = numMeta.number;
        j -= numMeta.length;
      } else {
        j--;
      }
    }
  }

  return Number(`${firstNum}${lastNum}`);
}

function isNumberAt(str: string, index: number) {
  const charNum = Number(str[index]);

  // if it's a number
  if (!Number.isNaN(Number(str[index]))) {
    return {
      number: charNum,
      length: 1,
    };
  }

  for (const numberStr in numbersRecord) {
    const matched = sequenceCollector(str, index, numberStr);
    if (matched.length) {
      return {
        number: numbersRecord[numberStr as keyof typeof numbersRecord],
        length: numberStr.length,
      };
    }
  }
}

function sequenceCollector(str: string, startIndex: number, seq: string) {
  let collected = "";
  let i = 0;
  while (i < seq.length) {
    if (str[startIndex + i] !== seq[i]) {
      return "";
    }
    collected += str[startIndex + i];
    i++;
  }

  return collected;
}

main();
