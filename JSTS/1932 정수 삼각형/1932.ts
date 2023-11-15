import fs from 'fs';

const input = fs.readFileSync('./dev/stdin').toString().trim() as string;

function solution(input:string) {
  const graph = input.split("\n").slice(1).map(v => v.split(" ").map(x=> Number(x)));
  for (let i=1; i<graph.length; i++){
    for (let j=0; j<graph[i].length; j++){
      graph[i][j] = Math.max(graph[i-1]?.[j-1] || 0, graph[i-1]?.[j] || 0) + graph[i][j];
    }
  }
  return Math.max(...graph[graph.length-1]);
}

console.log(solution(input));