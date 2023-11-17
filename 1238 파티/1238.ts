// const input = require('fs').readFileSync('/dev/stdin').toString().trim();
const input = `4 8 2
1 2 4
1 3 2
1 4 7
2 1 1
2 3 5
3 1 2
3 4 4
4 2 3`;

function solution(input: string): number {
  type matrix = number[][];

  function multi_matrix(mat1: matrix, mat2: matrix): matrix {
    if (mat1[0].length !== mat2.length) throw new Error("행렬곱 불가");
    return Array.from({ length: mat1.length }, (_, y) =>
      new Array(mat1[0].length)
        .fill(0)
        .map((__, x) => mat1[y].reduce((a, c, i) => a + c * mat2[x][i], 0))
    );
  }

  const divided_input = input.split("\n");
  const dest = Number(divided_input[0].split(" ")[2]);
  const N = Number(divided_input[0].split(" ")[0]);
  const graph: number[][] = Array.from({ length: N + 1 }, () =>
    new Array(N + 1).fill(Infinity)
  );
  for (let i = 1; i < divided_input.length; i++) {
    const [src, dst, dis] = divided_input[i].split(" ").map((x) => Number(x));
    graph[src][dst] = dis;
  }
  for (let i = 1; i < graph.length; i++) graph[i][i] = 0;

  for (let k = 1; k < graph.length; k++)
    for (let a = 1; a < graph.length; a++)
      for (let b = 1; b < graph.length; b++)
        if (graph[a][b] > graph[a][k] + graph[k][b])
          graph[a][b] = graph[a][k] + graph[k][b];

  let max = 0;
  for (let i = 1; i < graph.length; i++)
    max = Math.max(max, graph[i][dest] + graph[dest][i]);
  return max;
}
console.log(solution(input));
