import fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();

function solution(input: string): number {
  const temp = input.split("\n");
  const weight = Number(temp[0].split(" ")[1]); //최대 무게
  const things: [number, number][] = temp
    .slice(1)
    .map((x) => x.split(" ").map((xy) => Number(xy)) as [number, number]); // [무게, 가치][]
  const dp: number[][] = Array.from({ length: things.length + 1 }, () =>
    new Array(weight + 1).fill(0)
  );
  for (let i = 1; i <= things.length; i++) {
    for (let j = 1; j <= weight; j++) {
      const [iw, iv] = things[i - 1];
      if (iw > j) dp[i][j] = dp[i - 1][j];
      else {
        dp[i][j] = Math.max(dp[i - 1][j], iv + (dp[i - 1]?.[j - iw] ?? -iv));
      }
    }
  }
  return dp[things.length][weight];
}
console.log(solution(input));
