import { getInput } from "./getInput";

/**
There are two new instructions you'll need to handle:

The do() instruction enables future mul instructions.
The don't() instruction disables future mul instructions.

Only the most recent do() or don't() instruction applies.
At the beginning of the program, mul instructions are enabled.
 */

function main() {
  const input = getInput();
  console.log(getSumOfMultiplications(input.memory));
}

function getSumOfMultiplications(memory: string) {
  let total = 0;
  let isMultiplicationInstructionEnabled = true;

  // mul(x,y) -> adds x * y to total and returns the new index and calls success callback
  function handleMultiply(startIndex: number) {
    let x = startIndex;

    // mul()
    const mulInstructionStart = sequenceCollector(memory, x, "mul(");
    if (mulInstructionStart === "") {
      return;
    }

    x += mulInstructionStart.length;

    // <number>
    const firstNumber = characterCollector(memory, x, isNumber);
    if (firstNumber === "") {
      return;
    }

    x += firstNumber.length;

    // ,
    if (memory[x] !== ",") {
      return;
    }
    x++;

    // <number>
    const secondNumber = characterCollector(memory, x, isNumber);
    if (secondNumber === "") {
      return;
    }
    x += secondNumber.length;

    // )
    if (memory[x] !== ")") {
      return;
    }
    x++;

    // multiply and add to total
    total += Number.parseInt(firstNumber) * Number.parseInt(secondNumber);

    return x;
  }

  // handle do() instruction and if handled, return the new index where the instruction parsing should continue
  function handleDo(startIndex: number) {
    const collected = sequenceCollector(memory, startIndex, "do()");
    if (collected === "") {
      return;
    }

    isMultiplicationInstructionEnabled = true;
    return startIndex + collected.length;
  }

  // handle don't() instruction and if handled, the new index where the instruction parsing should continue
  function handleDont(startIndex: number) {
    const collected = sequenceCollector(memory, startIndex, "don't()");
    if (collected === "") {
      return;
    }

    isMultiplicationInstructionEnabled = false;
    return startIndex + collected.length;
  }

  let i = 0;
  while (i < memory.length) {
    let newIndex: number | undefined;

    if (isMultiplicationInstructionEnabled) {
      newIndex = handleMultiply(i);
      if (newIndex) {
        i = newIndex;
        continue;
      }
    }

    newIndex = handleDo(i);
    if (newIndex) {
      i = newIndex;
      continue;
    }

    newIndex = handleDont(i);
    if (newIndex) {
      i = newIndex;
      continue;
    }

    i++;
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
