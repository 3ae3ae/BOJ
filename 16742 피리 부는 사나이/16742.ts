const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim();

function solution(input: string) {
  const directionEnum = new Map([
    ["D", [1, 0]],
    ["L", [0, -1]],
    ["U", [-1, 0]],
    ["R", [0, 1]],
  ]);

  const directionMap = input
    .split("\n")
    .slice(1)
    .map((v) => v.match(/[A-Z]/g));

  const rootMap: (number | null)[][] = Array.from(
    { length: directionMap.length },
    () => new Array(directionMap[0]?.length).fill(null)
  );

  let answer = 0;

  function DFS(
    pos: [number, number],
    answer: number,
    route?: [number, number][]
  ) {
    let r: [number, number][] = [];
    const [y, x] = pos;
    if (route) {
      r = route;
    }
    r.push(pos);
    rootMap[y][x] = answer;
    const [nextY, nextX] = directionEnum
      .get(directionMap[y]![x]!.toString())!
      .map((v, i) => v + pos[i]);
    if (rootMap[nextY][nextX] === answer) {
      return 1;
    } else if (rootMap[nextY][nextX] !== null) {
      return 0;
    } else {
      return DFS([nextY, nextX], answer, r);
    }
  }
  let log = 0;
  for (let i = 0; i < rootMap.length; i++) {
    for (let j = 0; j < rootMap[0].length; j++) {
      if (rootMap[i][j] === null) {
        answer += DFS([i, j], log++);
      }
    }
  }

  return answer;
}

console.log(solution(input));
