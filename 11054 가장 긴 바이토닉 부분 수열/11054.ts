const input = `10
1 5 2 1 3 2.5 4 5 2 1`;
function solution (input: string): number{
  const sequence = input.split("\n")[1].split(" ").map(x=>Number(x));
  const copy = <T>(a:T):T => JSON.parse(JSON.stringify(a));
  // 증가하는 부분 수열찾는 함수
  // 다이나믹 프로그래밍. 뒤에 들어오는 값이 그냥 들어올 수 있으면 들여보내고, 없으면 그 값이 꼭 들어온다는 가정하에 부분 수열을 만들어보고 비교.
  // 부분 수열 만들 때는 맨 뒤 값보다 큰 수 다 삭제하고 남은 수보다 큰값이면서 맨뒤값보다 작은 값 채용
  function find_increasing(sequence:number[]): number[]{
    type indexedNumber = [number, number]
    const indexedSQ:indexedNumber[] = sequence.map((x,i)=> [x,i]);
    const dp: indexedNumber[][] = [];
    dp.push([indexedSQ[0]])
    for (let i=1; i<indexedSQ.length; i++){
      const [x, j] = indexedSQ[i];
      if (x<dp[i-i][dp[i-1].length-1][0])
        dp.push([...dp[i-1], [x,j]]);
      else {
        const tdp = [...dp[i-1]].filter(d=> d[0]<x);
        const [y, k] = tdp[tdp.length-1]
        if (indexedSQ.slice(k+1, j).every(xx=> ))
      }
    }
  }
}
