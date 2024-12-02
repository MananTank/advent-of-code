import { getInput } from "./getInput";

// Calculate a total similarity score by adding up each number in the left list after multiplying it
// by the number of times that number appears in the right list.

const input = getInput();

// create a map that store how many times each number appears in the right list
const rightListNumberCounts = new Map<number, number>();
for (const number of input.right) {
  const currentCount = rightListNumberCounts.get(number) ?? 0;
  rightListNumberCounts.set(number, currentCount + 1);
}

// go over the numbers on the left list and calculate the similarity score
// by multiplying the number by the number of times it appears in the right list

let totalSimilarity = 0;
for (const number of input.left) {
  const count = rightListNumberCounts.get(number) ?? 0;
  totalSimilarity += number * count;
}

console.log(totalSimilarity);
