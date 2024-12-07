/**

190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20

Each line represents a single equation.

The test value appears before the colon on each line;
it is your job to determine whether the remaining numbers can be combined with operators to produce the test value.

Operators are always evaluated left-to-right

two different types of operators: add (+) and multiply (*).

Example:

190: 10 19 has only one position that accepts an operator: between 10 and 19.
Choosing + would give 29, but choosing * would give the test value (10 * 19 = 190).

Determine which equations could possibly be true. What is their total calibration result?
 */

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
  const currentNum = numbers[endIndex];

  // if there's only 1 number left, return it
  if (endIndex === 0) {
    return [currentNum];
  }

  // results from rest of the numbers
  const others = findAllPossibleValuesForEquation(value, numbers, endIndex - 1);

  // include the current number by either adding or multiplying with the rest of the numbers
  for (const other of others) {
    possibleValues.push(currentNum + other);
    possibleValues.push(currentNum * other);
  }

  return possibleValues;
}
