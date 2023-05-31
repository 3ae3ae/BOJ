// const input = require('fs').readFileSync('/dev/stdin').toString().trim();
const input = `4 
70  2  1 7
 7  1 30 6 
 4 30 30 5 
 3  1 30 2 
0`;

function solution(input: string) {
  const Tetro = {
    L: [
      [
        [1, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
    I: [
      [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
    T: [
      [
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
    S: [
      [
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
    O: [
      [
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
  };

  const copy = <T>(a: T) => JSON.parse(JSON.stringify(a)) as T;

  (function makeShape() {
    function rotate(T: number[][]) {
      const newT = copy(T);
      for (let x = 0; x < T[0].length; x++) {
        for (let y = 0; y < T.length; y++) {
          newT[-y + 3][x] = T[x][y];
        }
      }
      return newT;
    }

    function cut(T: number[][]) {
      while (T[T.length - 1].every((x) => x === 0)) T.pop();
      while (T[0].every((x) => x === 0)) T.shift();
      while (T.map((x) => x[0]).every((x) => x === 0))
        T.forEach((x) => x.shift());
      while (T.map((x) => x[x.length - 1]).every((x) => x === 0))
        T.forEach((x) => x.pop());
    }
    [...Object.keys(Tetro)].forEach((key: keyof typeof Tetro) => {
      for (let i = 0; i < 3; i++)
        Tetro[key].push(rotate(Tetro[key][Tetro[key].length - 1]));
      for (let i = 0; i < 4; i++) Tetro[key].forEach((x) => cut(x));
    });
  })();

  type gridType = number[][];
  type gridsType = gridType[];

  const grids: gridsType = [];
  input
    .split("\n")
    .slice(0, -1)
    .forEach((v) => {
      const row = v.match(/-*\d+/g)?.map((x) => Number(x)) as number[];
      if (row.length === 1) grids.push([]);
      else grids[grids.length - 1].push(row);
    });
  function solve(grid: gridType): number {
    let max = -Infinity;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        [...Object.values(Tetro)].forEach((T) =>
          T.forEach((t) => {
            if (
              t.every((tt, y) =>
                tt.every((ttt, x) =>
                  ttt === 0 ? true : grid[i + y]?.[j + x] !== undefined
                )
              )
            ) {
              max = Math.max(
                max,
                t.reduce(
                  (a, tt, y) =>
                    a +
                    tt.reduce(
                      (a, ttt, x) => (ttt === 0 ? a : a + grid[i + y][j + x]),
                      0
                    ),
                  0
                )
              );
            }
          })
        );
      }
    }
    return max;
  }
  return grids.map((grid, i) => `${i + 1}. ${solve(grid)}`).join("\n");
}
console.log(solution(input));
