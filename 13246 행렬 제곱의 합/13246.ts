const input = `2 10000000000000
1 1
2 3`;

function solution(input: string): string {
  class Matrix {
    static matrix: bigint[][];
    addMatrix(
      mat1: typeof Matrix.matrix,
      mat2: typeof Matrix.matrix
    ): typeof Matrix.matrix {
      if (mat1.length !== mat2.length || mat1[0].length !== mat2[0].length)
        throw new Error(`Can't add matrix`);
      return mat1.map((v, y) =>
        v.map((vv, x) => (vv + mat2[y][x]) % BigInt(1000))
      );
    }
    /**
     * number[][] 리스트를 매트릭스 타입으로 변환해줌
     */
    makeMatrix(l: number[][]): typeof Matrix.matrix {
      if (l.some((ll) => ll.length !== l[0].length))
        throw new Error(`Can't make matrix`);
      return l.map((ll) => ll.map((lll) => BigInt(lll)));
    }
    /**
     * 행렬곱 함수
     */
    multiMatrix(
      mat1: typeof Matrix.matrix,
      mat2: typeof Matrix.matrix
    ): typeof Matrix.matrix {
      if (mat1[0].length !== mat2.length) throw new Error("행렬곱 불가");
      return Array.from({ length: mat1.length }, (_, y) =>
        new Array(mat2[0].length)
          .fill(0)
          .map(
            (__, x) =>
              mat1[y].reduce((a, c, i) => a + c * mat2[i][x], BigInt(0)) %
              BigInt(1000)
          )
      );
    }
    /**
     * 행렬 제곱 함수
     */
    powMatrix(mat: typeof Matrix.matrix): typeof Matrix.matrix {
      return this.multiMatrix(mat, mat);
    }
    /**
     * 빠른 행렬 제곱 함수
     * @param mat 행렬을
     * @param n 번 제곱
     */
    fastPowMatrix(mat: typeof Matrix.matrix, n: bigint): typeof Matrix.matrix {
      const bin = n.toString(2);
      const pows = new Array(bin.length).fill(0);

      pows.forEach((x, i, pows) =>
        i === 0 ? (pows[i] = mat) : (pows[i] = this.powMatrix(pows[i - 1]))
      );
      const unit: typeof Matrix.matrix = Array.from(
        { length: mat.length },
        () => new Array(mat.length).fill(BigInt(0))
      );
      for (let i = 0; i < unit.length; i++) unit[i][i] = BigInt(1);

      return [...bin]
        .reverse()
        .reduce(
          (a, c, i) => (c === "1" ? this.multiMatrix(a, pows[i]) : a),
          unit
        );
    }
  }
  function solve(mat: typeof matrix, n: bigint): typeof matrix {
    const m = new Matrix();
    const unit: typeof Matrix.matrix = Array.from({ length: mat.length }, () =>
      new Array(mat.length).fill(BigInt(0))
    );
    for (let i = 0; i < unit.length; i++) unit[i][i] = BigInt(1);
    if (n < BigInt(2)) return mat;
    if (n % BigInt(2) > 0) {
      return m.addMatrix(solve(mat, n - BigInt(1)), m.fastPowMatrix(mat, n));
    } else {
      return m.multiMatrix(
        solve(mat, n / BigInt(2)),
        m.addMatrix(unit, m.fastPowMatrix(mat, n / BigInt(2)))
      );
    }
  }

  const temp = input.split("\n");
  const b = BigInt(temp[0].split(" ")[1]);

  const m = new Matrix();
  const matrix = m.makeMatrix(
    temp.slice(1).map((v) => v.split(" ").map((x) => Number(x)))
  );
  if (b < BigInt(2))
    return matrix
      .map((v) => v.map((x) => Number(x) % 1000).join(" "))
      .join("\n");
  else
    return solve(matrix, b)
      .map((v) => v.map((x) => Number(x) % 1000).join(" "))
      .join("\n");
}

console.log(solution(input));
