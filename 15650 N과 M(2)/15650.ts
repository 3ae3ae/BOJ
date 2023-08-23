import fs from "fs";
const input = fs.readFileSync("./dev/stdin").toString().trim();
// test
function solution(input: string) {
  function makeList(m: number) {
    return Array.from({ length: m }, (x, i) => i + 1);
  }

  function makePer(l: number[], n: number): number[][] {
    if (n === 1) return l.map((x) => [x]);
    const result: number[][] = [];
    l.forEach((x, i, l) => {
      if (l.length - 1 >= n) {
        const rest = l.slice(i + 1);
        const temp = makePer(rest, n - 1);
        const perm = temp.map((v) => [x, ...v]);
        result.push(...perm);
      }
    });
    return result;
  }

  const [m, n] = input.split(" ").map((x) => Number(x));
  const l = makeList(m);
  const result = makePer(l, n);
  return result.map((v) => v.join(" ")).join("\n");
}
console.log(solution(input));
