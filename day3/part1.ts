import { getInput } from "./getInput";

// we only care about mul(X,Y),
// the program's memory has been corrupted, there are also many invalid characters that should be ignored
// Sequences like mul(4*, mul(6,9!, ?(12,34), or mul (2,4) do nothing.
// xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
// valid ones: mul(2,4) mul(5,5) mul(11,8) mul(8,5)
// Scan the corrupted memory for uncorrupted mul instructions.
// What do you get if you add up all of the results of the multiplications?

function main() {
  const input = getInput();
  console.log(getSumOfMultiplications(input.memory));
}

function getSumOfMultiplications(memory: string) {
  let total = 0;

  let i = 0;
  while (i < memory.length) {
    // mul()
    const mulInstructionStart = sequenceCollector(memory, i, "mul(");
    if (mulInstructionStart === "") {
      i++;
      continue;
    }

    i += mulInstructionStart.length;

    // <number>
    const firstNumber = characterCollector(memory, i, isNumber);
    if (firstNumber === "") {
      continue;
    }

    i += firstNumber.length;

    // ,
    if (memory[i] !== ",") {
      continue;
    }
    i++;

    // <number>
    const secondNumber = characterCollector(memory, i, isNumber);
    if (secondNumber === "") {
      continue;
    }
    i += secondNumber.length;

    // )
    if (memory[i] !== ")") {
      continue;
    }
    i++;

    // multiply and add to total
    total += Number.parseInt(firstNumber) * Number.parseInt(secondNumber);
  }

  return total;
}

function characterCollector(
  str: string,
  startIndex: number,
  shouldCollect: (character: string) => boolean
) {
  let collected = "";
  let i = startIndex;
  while (shouldCollect(str[i])) {
    collected += str[i];
    i++;
  }

  return collected;
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

function isNumber(str: string) {
  return !Number.isNaN(Number.parseInt(str));
}

main();
