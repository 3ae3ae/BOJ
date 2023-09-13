const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim();

function solution(input: string) {
  const temp = input.split("\n");
  let goal = Number(temp[0].split(" ")[1]);
  const coins = temp.slice(1).map(Number);
  let i = coins.findIndex((x) => x > goal);
  i = i === -1 ? coins.length - 1 : i;
  let result = 0;
  for (; i >= 0; i--) {
    result += Math.floor(goal / coins[i]);
    goal %= coins[i];
  }
  return result;
}

console.log(solution(input));
