import fs from "node:fs";
import path from "node:path";

export function getInput() {
  const inputFilePath = path.resolve(__dirname, "input.txt");
  const content = fs.readFileSync(inputFilePath, "utf-8");
  const grid: string[][] = content.split("\n").map((line) => line.split(""));
  return { grid };
}
