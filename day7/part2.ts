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

    if (values.includes(equation.value)) {
      sum += equation.value;
    }
  }

  console.log(sum);
}

main();

function findAllPossibleValuesForEquation(
  value: number,
  numbers: number[],
  endIndex: number
): number[] {
  const possibleValues = [];
  const lastNum = numbers[endIndex];

  // if there's only 1 number left, return it
  if (endIndex === 0) {
    return [lastNum];
  }

  // results from rest of the numbers
  const firstNumValues = findAllPossibleValuesForEquation(
    value,
    numbers,
    endIndex - 1
  );

  // include the current number by either adding or multiplying with the rest of the numbers
  for (const other of firstNumValues) {
    possibleValues.push(lastNum + other);
    possibleValues.push(lastNum * other);
    possibleValues.push(Number(other.toString() + lastNum.toString()));
  }

  return possibleValues;
}
