// const input = require('fs').readFileSync('/dev/stdin').toString().trim();
const input = `4 
70  2  1 7
 7  1 40 6 
 4 40 -1 5 
 41  1 40 2 
 5
 -1 -2 -3 -4 -5
 -1 -4 -5 -6 -67
 -1 -2 -3 -4 -5
 -1 -2 -3 -4 -5
 -2 -23 -4 -5 -56
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
    .map((v) => v.match(/-*\d+/g))
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

    const move: [number, number][] = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    function makeCombination<T = number>(arr: T[], n: number): T[][] {
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

    /**
     * arr1의 아이템 중 arr2에 포함이 안 된 아이템들의 리스트를 반환하는 함수
     */
    function returnNotIncludesIn<T = number>(arr1: T[], arr2: T[]) {
      return arr1.filter((x) => !arr2.includes(x));
    }

    function BFS(i: number, j: number, n: number, grid: gridType): number {
      const q = new Queue<[[number, number][], Visited, number, number]>();
      q.push([[[i, j]], new Visited(i, j), grid[i][j], 1]);
      let max = -Infinity;
      const curriedIsLower = makeCurriedIsLower(i, j);
      while (q.size()) {
        const [start, visited, sum, t] = q.pop();
        if (t === n) {
          max = Math.max(sum, max);
          continue;
        }
        const candidate = start.flatMap((x) => {
          const [i, j] = x;
          return move
            .map((m: [number, number]) => [i + m[0], j + m[1]])
            .filter((m: [number, number]) => {
              const [mi, mj] = m;
              if (
                grid[mi]?.[mj] !== undefined &&
                !visited.has(mi, mj) &&
                curriedIsLower(mi, mj)
              )
                return true;
              else return false;
            });
        }) as [number, number][];

        if (candidate.length === 0) continue;
        const temp = Array.from({ length: candidate.length }, (_, i) => i);
        const tempComb: number[][] = [];
        for (let l = 1; l <= n - t; l++)
          tempComb.push(...makeCombination(temp, l));
        if (tempComb.length === 0) continue;
        const tempVisitedComb = tempComb.map((x) =>
          returnNotIncludesIn(temp, x)
        );
        const comb: [number, number][][] = tempComb.map((x) =>
          x.map((y) => candidate[y])
        );
        const visitedComb = tempVisitedComb.map((x) =>
          x.map((y) => candidate[y])
        );
        // comb의 구조: [[생1, 생2], [생2, 생3]] = [[[생1y, 생1x], [생2y, 생2x]], [[생2y, 생2x], [생3y, 생3x]]]
        // cp의 구조: [[생1y, 생1x], [생2y, 생2x]]
        // vcp의 구조: 상동
        const oldVisited = visited.entries();
        for (const [cp, vcp] of [comb, visitedComb]) {
          const qvisit = new Visited();
          for (const [i, j] of oldVisited) qvisit.push(i, j);
          for (const [i, j] of cp) qvisit.push(i, j);
          if (vcp?.length > 0) for (const [i, j] of vcp) qvisit.push(i, j);
          const newSum = sum + cp.reduce((a, c) => a + grid[c[0]][c[1]], 0);
          q.push([cp, qvisit, newSum, t + cp.length]);
        }
      }
      return max;
    }
    let max = -Infinity;
    for (let j = 0; j < grid[0].length; j++) {
      for (let i = 0; i < grid.length; i++) {
        max = Math.max(BFS(i, j, 4, grid), max);
      }
    }
    return max;
  }
  const result = grids.map(
    (grid, i) => (i + 1).toString() + ". " + solve(grid).toString()
  );
  return result.join("\n");
}
console.log(solution(input));
