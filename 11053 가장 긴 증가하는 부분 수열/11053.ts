import fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();

function solution(input: string){
  const seq = input.split("\n")[1].split(" ").map(x=>Number(x));
  const getMiddle = (l: number, r: number): number => Math.floor((l + r) / 2);
  
  function findOneWay(start:number, end:number, seq: number[], decrease = false):number {
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
    return b.length-1;
  }
  return findOneWay(0, seq.length, seq);
}

console.log(solution(input));