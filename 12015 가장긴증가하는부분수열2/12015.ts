const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim();

function solution(input: string) {
  const numList: number[] = input
    .split("\n")[1]
    .split(" ")
    .map((x) => Number(x));
  const len: number[] = [0];
  const dp: number[] = [-Infinity];
  function binarySearch(list: number[], n: number) {
    const avg = (a: number, b: number) => Math.floor((a + b) / 2);
    let [l, r] = [0, list.length - 1];
    let m = avg(l, r);
    while (l <= r) {
      if (list[m] === n) return m;
      if (list[m] > n) {
        r = m - 1;
      } else {
        l = m + 1;
      }
      m = avg(l, r);
    }
    return l;
  }
  let max = 0;
  for (const num of numList) {
    const l = binarySearch(dp, num);
    if (max < l) max = l;
    if (dp[l] === undefined || dp[l] > num) {
      dp[l] = num;
    }
    len.push(l);
  }

  return max;
}

console.log(solution(input));
