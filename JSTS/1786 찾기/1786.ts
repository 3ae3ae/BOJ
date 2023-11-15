import fs from "fs";
const input = fs.readFileSync("./dev/stdin").toString() as string;

function solution(input: string) {
  const [T, P] = input.split("\n");

  function getPi(p: string) {
    const l = p.length;
    const pi: number[] = new Array(l + 1).fill(0);
    let j = 0;
    for (let i = 1; i < l; i++) {
      while (j > 0 && p[i] !== p[j]) {
        j = pi[j - 1];
      }
      if (p[i] === p[j]) pi[i] = ++j;
    }
    return pi;
  }

  const pi = getPi(P);

  const result: number[] = [];
  const l = P.length;
  const Tl = T.length;
  let j = 0;
  for (let i = 0; i < Tl; i++) {
    while (j > 0 && T[i] !== P[j]) {
      j = pi[j - 1];
    }
    if (T[i] === P[j]) {
      if (j === l - 1) {
        result.push(i + 1 - j);
        j = pi[j];
      } else j++;
    }
  }
  return [result.length, result.join(" ")].join("\n");
}

console.log(solution(input));
