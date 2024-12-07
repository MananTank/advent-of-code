import fs from "node:fs";
import path from "node:path";

export function getInput() {
  const inputFilePath = path.resolve(__dirname, "input.txt");
  const content = fs.readFileSync(inputFilePath, "utf-8");
  const lines = content.split("\n");
  const equations = lines.map((line) => {
    const [testValue, numbersStr] = line.split(": ");
    return {
      value: Number(testValue),
      numbers: numbersStr.split(" ").map(Number),
    };
  });

  return { equations };
}
