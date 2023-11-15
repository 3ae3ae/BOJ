const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim();

function solution(input: string): string {
  /**
   * [index, value]
   */
  const list = input
    .split("\n")
    .slice(1)
    .map((str) => str.split(" ").map((x) => Number(x)));

  list.sort((a, b) => a[0] - b[0]);

  const d = [[0, -1]]; // [distance, index]
  const dp = [0]; // list[i]

  function binarySearch(li: number[], n: number): number {
    const avrg = (a: number, b: number) => Math.floor((a + b) / 2);
    let [l, r] = [0, li.length - 1];
    let m = avrg(l, r);
    while (l <= r) {
      if (li[m] === n) return m;
      if (li[m] > n) {
        r = m - 1;
      } else {
        l = m + 1;
      }
      m = avrg(l, r);
    }
    return l;
  }

  for (let i = 0; i < list.length; i++) {
    const dpIndex = binarySearch(dp, list[i][1]);
    if (!dp[dpIndex]) {
      dp.push(list[i][1]);
    } else if (dp[dpIndex] >= list[i][1]) {
      dp.splice(dpIndex, 1, list[i][1]);
    }
    d.push([dpIndex, list[i][0]]);
  }

  let max = dp.length - 1;
  const result: number[] = [];
  d.reverse();
  for (const [distance, index] of d) {
    if (distance === max) {
      max--;
    } else {
      result.push(index);
    }
  }
  return [result.length, ...result.sort((a, b) => a - b)].join("\n");
}

console.log(solution(input));
