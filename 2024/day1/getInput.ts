import fs from "node:fs";
import path from "node:path";

export function getInput() {
  const inputFilePath = path.resolve(__dirname, "input.txt");
  const content = fs.readFileSync(inputFilePath, "utf-8");
  const lines = content.split("\n");

  const left: number[] = [];
  const right: number[] = [];

  for (const line of lines) {
    const numbers = line.split("   ");
    left.push(Number.parseInt(numbers[0]));
    right.push(Number.parseInt(numbers[1]));
  }

  return { left, right };
}
