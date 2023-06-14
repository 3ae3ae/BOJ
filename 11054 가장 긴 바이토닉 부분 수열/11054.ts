// import fs = require("fs");
// const input = fs.readFileSync("./dev/stdin").toString().trim();

const input = `5
1 2 1 2 1`

function solution(input: string): number {
  const getMiddle = (l: number, r: number): number => Math.floor((l + r) / 2);
  const sequence = input
    .split("\n")[1]
    .split(" ")
    .map((x) => Number(x));
  
  function findOneWay(start:number, end:number, seq: number[], decrease = false):[number, number] {
    /**
     * n이 seq에서 몇번째 위치에 들어가야할 지 반환하는 함수
    */
    function binarySearch(seq: number[], n: number) {
      let [l, r] = [0, seq.length - 1];
      let m = getMiddle(l, r);
      for (; l <= r; m = getMiddle(l, r)) {
        if (n === seq[m]) return m;
        if (n < seq[m]) r = m - 1;
        else l = m + 1;
      }
      if (seq[m] < n) return m + 1;
      else return m - 1;
    }
    const b: number[] = [0];
    let max = 0;
    const cdt = (i: number, start: number, end: number) => decrease ? i>=start : i<end;
    for (let i = decrease ? end-1 : start; cdt(i, start, end); decrease ? i-- : i++) {
      const p = binarySearch(b, seq[i]);
      if (b[p] && b[p] <= seq[i]) continue;
      else {
        if (b[p]===undefined) max = seq[i];
        b[p] = seq[i];
      }
    }
    return [b.length-1, max];
  }

  const increasing = findOneWay(0, sequence.length, sequence)[0];
  const decreasing = findOneWay(0, sequence.length, sequence, true)[0];

  let max = Math.max(increasing, decreasing);
  for (let i=0; i<sequence.length; i++){
    const [inc, ic] = findOneWay(0, i+1, sequence);
    const [dec, dc] = findOneWay(i, sequence.length, sequence, true);
    let tempmax = inc+dec;
    if (ic===dc) tempmax--;
    max = Math.max(max, tempmax);
  }

  return max;

  
}
console.log(solution(input));
