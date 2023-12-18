const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();

function solution(input: string): number {
  const l = input.length;
  const s: Set<string> = new Set();
  for (let i = 1; i < l + 1; ++i) {
    for (let j = 0; j + i < l + 1; ++j) {
      s.add(input.slice(j, j + i));
    }
  }
  return s.size;
}

console.log(solution(input));
