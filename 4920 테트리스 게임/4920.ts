// const input = require('fs').readFileSync('/dev/stdin/').toString().trim();
const input = `4 
70  2  1 7
 7  1 30 6 
 4 30 30 5 
 3  1 30 2 
 5
 15 1 2 3 4
 1 2 3 4 5
 1 2 3 4 5
 12 2 3 4 5
 1 2 3 4 5
0`;

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
  type gridsType = gridType[];

  const init: gridsType = [];
  const grids: gridsType = input
    .split("\n")
    .slice(0, -1)
    .map((v) => v.match(/\d+/g))
    .reduce((a, c) => {
      if (c?.length === 1) {
        a.push([]);
        return a;
      } else {
        a[a.length - 1].push(c?.map((x) => Number(x))!);
        return a;
      }
    }, init);

  function solve(grid: gridType): number {
    /**
     * k,l이 i,j보다 오른쪽 아래에 있는지 반환하는 함수.
     */
    function isLower(i: number, j: number, k: number, l: number): boolean {
      if (l > j) return true;
      else if (l === j) {
        if (k > i) return true;
        else return false;
      } else return false;
    }

    /**
     * curriedIsLower를 만들어주는 함수
     * @returns curriedIsLower(k, l)
     */
    function makeCurriedIsLower(i: number, j: number) {
      const curriedIsLower = (k: number, l: number) => isLower(i, j, k, l);
      return curriedIsLower;
    }

    const move = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    function makeCombination<T>(arr: T[], n: number): T[][] {
      if (n === 1) {
        return arr.map((x) => [x]);
      }
      let returnArr: T[][] = [];

      arr.forEach((a, i, arr) => {
        const rest = arr.filter((_, j) => i < j);
        const combi = makeCombination(rest, n - 1);
        const result = combi.map((v) => [a, ...v]);
        returnArr.push(...result);
      });
      return returnArr;
    }
  }
  const result = grids.map(
    (grid, i) => (i + 1).toString() + ". " + solve(grid).toString()
  );
  return result.join("\n");
}
solution(input);
