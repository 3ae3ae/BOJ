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
}
solution("");
