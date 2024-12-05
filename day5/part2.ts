import { getInput } from "./getInput";

const { rules, updates } = getInput();

// rules is an array of arrays of two numbers
// first number must come before second number in an array of numbers called an "update"
// if all the numbers in an update follow the rules, then the update is valid

function isUpdateValid(update: number[]): boolean {
  // for each number in the update - store its index in array
  const numberToIndexMap = new Map<number, number>();
  update.forEach((number, index) => {
    numberToIndexMap.set(number, index);
  });

  // check that each rule is followed in the update
  return rules.every(([a, b]) => {
    const aIndex = numberToIndexMap.get(a);
    const bIndex = numberToIndexMap.get(b);
    if (aIndex === undefined || bIndex === undefined) {
      return true;
    }

    return aIndex !== undefined && bIndex !== undefined && aIndex < bIndex;
  });
}

function getFixedUpdate(update: number[]): number[] {
  const numberToIndexMap = new Map<number, number>();
  update.forEach((number, index) => {
    numberToIndexMap.set(number, index);
  });

  while (true) {
    let fixesAdded = false;
    for (const [a, b] of rules) {
      const aIndex = numberToIndexMap.get(a);
      const bIndex = numberToIndexMap.get(b);
      if (aIndex === undefined || bIndex === undefined) {
        continue;
      }

      // swap a and b if they are in the wrong order
      if (aIndex > bIndex) {
        numberToIndexMap.set(b, aIndex);
        numberToIndexMap.set(a, bIndex);
        update[aIndex] = b;
        update[bIndex] = a;
        fixesAdded = true;
      }
    }

    if (!fixesAdded) {
      break;
    }
  }

  return update;
}

// for each valid update, find the middle number and sum them all together
let total = 0;
for (const update of updates) {
  if (!isUpdateValid(update)) {
    const fixedUpdate = getFixedUpdate(update);
    total += fixedUpdate[(fixedUpdate.length - 1) / 2];
  }
}

console.log(total);
