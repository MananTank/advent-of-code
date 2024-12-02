import { getInput } from "./getInput";

const inputs = getInput();

// sort the left and right arrays
inputs.left.sort((a, b) => a - b);
inputs.right.sort((a, b) => a - b);

// add up the differences between the numbers in each pair
let totalDifference = 0;
for (let i = 0; i < inputs.left.length; i++) {
  totalDifference += Math.abs(inputs.left[i] - inputs.right[i]);
}

console.log(totalDifference);
