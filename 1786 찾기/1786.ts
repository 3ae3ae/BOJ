import fs from "fs"
const input = fs.readFileSync('./dev/stdin').toString().trim() as string;

function solution(input: string){
  const [T, P] = input.split("\n");
  function getPi(p:string){
    const pi:number[] = [0];

    function comparePreSu(str: string, interval:number){
      const m = (str.length-1)/2;
      const [l, r] = [m-interval, m+interval];
      if (l<=0) return 0;
      else {
        if (str.slice(0, Math.ceil(l))===str.slice(Math.floor(r+1))) return str.slice(0, Math.ceil(l)).length;
        else return 0;
      }

    }
    for (let i=1; i<=p.length; i++){
      let max = 0;
      for (let j=0; j<=i/2; j++) max = Math.max(comparePreSu(p.slice(0, i), j), max);
      pi[i] = max;
    }
    return pi;
  }
  const pi = getPi(P);
  const countCh = (str1: string, str2: string):number => {
    if (str1===str2) return str1.length;
    for (let i=0; i<str1.length; i++) if (str1[i] !== str2[i]) return i;
    return str1.length;
  }
  const result:number[] = [];
  const l = P.length;
  for (let i=0; i<T.length; i++){
    const c = countCh(P, T.slice(i, i+l));
    if (c===l) result.push(i+1);
    if (pi[c])
      i += c -1 - pi[c];
  }
  return [result.length, result.join(" ")].join("\n");
}

console.log(solution(input));