const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();

function solution(input: string) {
  let a = Number(input);
  let b = 0;
  for (; a % 5 !== 0 && a > 0; a -= 3, ++b);
  if (a < 0) return -1;
  return a / 5 + b;
}
console.log(solution(input));
