const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim();

function solution(input: string) {
  function calc(input: string) {
    let chapters = input.split(" ").map((x) => Number(x));
    let dp = Array.from({ length: chapters.length }, () =>
      Array(chapters.length).fill(-1)
    );
    let sum = Array(chapters.length).fill(0);
    sum[0] = chapters[0];
    dp[0][0] = 0;

    for (let i = 1; i < chapters.length; ++i) {
      sum[i] = sum[i - 1] + chapters[i];
      dp[i][i] = 0;
      dp[i - 1][i] = chapters[i - 1] + chapters[i];
    }

    function sch(src: number, dst: number) {
      if (dp[src][dst] != -1) return dp[src][dst];
      let min = Infinity;

      for (let i = src; i < dst; ++i) {
        min = Math.min(min, sch(src, i) + sch(i + 1, dst));
      }
      dp[src][dst] = min;
      return dp[src][dst];
    }
    return sch(0, chapters.length - 1);
  }
  const datas = input.split("\n");
  let result = "";
  for (let i = 2; i < datas.length; i += 2) result += calc(datas[i]) + "\n";
  return result;
}
console.log(solution(input));
