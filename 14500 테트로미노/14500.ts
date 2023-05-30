// const input = require('fs').readFileSync('/dev/stdin').toString().trim();
const input = `5 5
1 2 3 4 5
5 4 3 2 1
2 3 4 5 6
6 5 4 3 2
1 2 1 2 1`;

function solution(input: string) {
  class Visited {
    visited: Map<number, Map<number, number>>;
    constructor(y?: number, x?: number) {
      if (y !== undefined && x !== undefined)
        this.visited = new Map([[y, new Map([[x, 1]])]]);
      else this.visited = new Map();
    }

    push(y: number, x: number) {
      if (this.visited.has(y)) this.visited.get(y)?.set(x, 1);
      else this.visited.set(y, new Map([[x, 1]]));
    }

    has(y: number, x: number) {
      if (this.visited.get(y)?.has(x)) return true;
      else return false;
    }

    area() {
      return [...this.visited.values()].reduce((a, c) => a + c.size, 0);
    }

    entries() {
      return [...this.visited.keys()].flatMap((y) =>
        [...this.visited.get(y)!.keys()].map((x) => [y, x])
      );
    }
  }

  class Queue<T = number> {
    protected q: T[];
    protected f: number;
    protected r: number;
    constructor(q: T[] = []) {
      this.q = q;
      this.f = 0;
      this.r = this.q.length;
    }

    push(n: T) {
      this.q[this.r++] = n;
    }

    pop() {
      const popedVal = this.q[this.f++];
      if (this.f > 10000) {
        this.q = this.q.slice(this.f);
        this.r -= this.f;
        this.f = 0;
      }
      return popedVal;
    }

    size() {
      return this.r - this.f;
    }
  }

  type gridType = number[][];

  const grid: gridType = input
    .split("\n")
    .slice(1)
    .map((v) => v.match(/-*\d+/g)?.map((x) => Number(x))!);

  function solve(grid: gridType): number {
    const BIGGEST = Math.max(...grid.flat());

    /**
     * curriedIsLower를 만들어주는 함수
     * @returns curriedIsLower(k, l)
     */
    function makeCurriedIsLower(i: number, j: number) {
      const curriedIsLower = (k: number, l: number) => {
        if (k > i) return true;
        else if (k === i) {
          if (l > j) return true;
          else return false;
        } else return false;
      };
      return curriedIsLower;
    }

    const move: [number, number][] = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    function getMaxThreeWay(i: number, j: number) {
      const temp: (number | undefined)[] = move.map(
        (m) => grid[i + m[0]]?.[j + m[1]]
      );
      if (temp.includes(undefined)) return -Infinity;
      else
        return (
          grid[i][j] +
          (temp as number[]).reduce((a, c) => a + c, 0) -
          Math.min(...(temp as number[]))
        );
    }

    function BFS(i: number, j: number, n: number, grid: gridType) {
      const q = new Queue<[[number, number], number, number, Visited]>();
      q.push([[i, j], grid[i][j], 1, new Visited(i, j)]);
      while (q.size()) {
        const [[y, x], sum, t, visited] = q.pop();
        if (n === t) {
          // 여기까지
        }
      }
    }

    let threeWayMax = -Infinity;
    for (let i = 0; i < grid.length; i++)
      for (let j = 0; j < grid[0].length; j++)
        threeWayMax = Math.max(threeWayMax, getMaxThreeWay(i, j));

    let max = threeWayMax;
    for (let j = 0; j < grid[0].length; j++) {
      for (let i = 0; i < grid.length; i++) {
        max = Math.max(BFS(i, j, 4, grid), max);
      }
    }
    return max;
  }
  const result = solve(grid);
  return result;
}
console.log(solution(input));
