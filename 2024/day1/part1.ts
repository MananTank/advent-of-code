import { getInput } from "./getInput";

function main() {
  const input = getInput();

  // sort the left and right arrays
  input.left.sort((a, b) => a - b);
  input.right.sort((a, b) => a - b);

  // add up the differences between the numbers in each pair
  let totalDifference = 0;
  for (let i = 0; i < input.left.length; i++) {
    totalDifference += Math.abs(input.left[i] - input.right[i]);
  }

  console.log(totalDifference);
}

main();
