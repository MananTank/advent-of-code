import fs from "node:fs";
import path from "node:path";

export function getInput() {
  const inputFilePath = path.resolve(__dirname, "input.txt");
  const content = fs.readFileSync(inputFilePath, "utf-8");
  const [rulesContent, updatesContent] = content.split("\n\n");

  return {
    rules: rulesContent
      .split("\n")
      .map((rule) => rule.split("|").map(Number) as [number, number]),
    updates: updatesContent
      .split("\n")
      .map((update) => update.split(",").map(Number)),
  };
}
