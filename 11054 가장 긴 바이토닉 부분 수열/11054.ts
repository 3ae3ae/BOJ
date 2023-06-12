import fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim();

function solution(input: string): number {
  const getMiddle = (l: number, r: number): number => Math.floor((l + r) / 2);
  const sequence = input
    .split("\n")[1]
    .split(" ")
    .map((x) => Number(x));
  /**
   * n이 seq에서 몇번째 위치에 들어가야할 지 반환하는 함수
   */
  function binarySearch(seq: number[], n: number, reversal = false) {
    let [l, r] = [0, seq.length - 1];
    let m = getMiddle(l, r);
    while (l <= r) {
      const condition = reversal ? n > seq[m] : n < seq[m];
      if (n === seq[m]) return m;
      if (condition) r = m - 1;
      else l = m + 1;
      m = getMiddle(l, r);
    }
    const condition = reversal ? seq[m] > n : seq[m] < n;
    if (condition) return m + 1;
    else return m - 1;
  }
  function findOneWay(seq: number[], decrease = false) {
    const b: number[] = [0];
    const d: number[] = [];
    if (decrease) b[0] = Infinity;
    for (let i = 0; i < seq.length; i++) {
      const p = binarySearch(b, seq[i], decrease);
      const condition = decrease ? b[p] >= seq[i] : b[p] <= seq[i];
      if (b[p] && condition) continue;
      else {
        b[p] = seq[i];
        d[p - 1] = i;
      }
    }
    return d;
  }

  const increasing = findOneWay(sequence);
  const decreasing = findOneWay(sequence, true);
  function findCenter(inc: number[], dec: number[], seq: number[]) {
    let [l, r] = [0, seq.length - 1];
    let m = getMiddle(l, r);
    while (l <= r) {
      const incTemp = binarySearch(inc, seq[m]);
      const [leftInc, rightInc];
    }
  }
  return 1;
}
console.time();
console.log(solution(input));
console.timeEnd();
