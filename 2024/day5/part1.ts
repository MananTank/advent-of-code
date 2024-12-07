import { getInput } from "./getInput";

// rules is an array of arrays of two numbers
// first number must come before second number in an array of numbers called an "update"
// if all the numbers in an update follow the rules, then the update is valid
// find the middle number of each valid update and sum them all together

function main() {
  const { rules, updates } = getInput();

  // for each valid update, find the middle number and sum them all together
  let total = 0;
  for (const update of updates) {
    if (isUpdateValid(rules, update)) {
      total += update[(update.length - 1) / 2];
    }
  }

  console.log(total);
}

function isUpdateValid(rules: [number, number][], update: number[]): boolean {
  const numberToIndexMap = new Map<number, number>();
  update.forEach((number, index) => {
    numberToIndexMap.set(number, index);
  });

  // if a rule breaks, return false
  for (const rule of rules) {
    const aIndex = numberToIndexMap.get(rule[0]);
    const bIndex = numberToIndexMap.get(rule[1]);
    if (aIndex !== undefined && bIndex !== undefined && aIndex > bIndex) {
      return false;
    }
  }

  return true;
}

main();
