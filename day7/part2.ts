// The concatenation operator (||) combines the digits from its left and right inputs into a single number.

import { getInput } from "./getInput";

function main() {
  let sum = 0;
  const { equations } = getInput();

  for (const equation of equations) {
    const values = findAllPossibleValuesForEquation(
      equation.value,
      equation.numbers,
      equation.numbers.length - 1
    );

    if (values && values.includes(equation.value)) {
      sum += equation.value;
    }
  }

  console.log(sum);
}

main();

function findAllPossibleValuesForEquation(
  maxValue: number,
  numbers: number[],
  endIndex: number
): number[] {
  const lastNum = numbers[endIndex];

  // if there's only 1 number left, return it
  if (endIndex === 0) {
    return [lastNum];
  }

  // results from rest of the numbers
  const firstNumValues = findAllPossibleValuesForEquation(
    maxValue,
    numbers,
    endIndex - 1
  );

  const possibleValues = [];

  // include the current number by either adding or multiplying with the rest of the numbers
  for (const other of firstNumValues) {
    const num1 = Number(other.toString() + lastNum.toString());
    const num2 = other * lastNum;
    const num3 = other + lastNum;

    if (num1 <= maxValue) {
      possibleValues.push(num1);
    }

    if (num2 <= maxValue) {
      possibleValues.push(num2);
    }

    if (num3 <= maxValue) {
      possibleValues.push(num3);
    }
  }

  return possibleValues;
}
