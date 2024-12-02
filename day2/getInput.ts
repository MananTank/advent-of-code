import fs from "node:fs";
import path from "node:path";

export function getInput() {
  const inputFilePath = path.resolve(__dirname, "input.txt");
  const content = fs.readFileSync(inputFilePath, "utf-8");
  const lines = content.split("\n");

  const reports = lines.map((line) =>
    line.split(" ").map((v) => Number.parseInt(v))
  );

  return { reports };
}
