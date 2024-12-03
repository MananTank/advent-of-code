import fs from "node:fs";
import path from "node:path";

export function getInput() {
  const inputFilePath = path.resolve(__dirname, "input.txt");
  const memory = fs.readFileSync(inputFilePath, "utf-8");
  return { memory };
}
