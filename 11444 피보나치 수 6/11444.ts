// const input = require('fs').readFileSync('/dev/stdin').toString().trim();

const input = "1000000000000000";

function solution(input: string): Number {
  const biSame = (a: bigint, b: bigint) => a.toString() === b.toString();
  const Input = BigInt(input);
  if (biSame(Input, BigInt(0))) return 0;
  type matrix = bigint[][];

  function multiMatrix(mat1: matrix, mat2: matrix): matrix {
    if (mat1[0].length !== mat2.length) throw new Error("행렬곱 불가");
    return Array.from({ length: mat1.length }, (_, y) =>
      new Array(mat2[0].length)
        .fill(0)
        .map(
          (__, x) =>
            mat1[y].reduce((a, c, i) => a + c * mat2[i][x], BigInt(0)) %
            BigInt(1000000007)
        )
    );
  }
  function powMatrix(mat: matrix): matrix {
    return multiMatrix(mat, mat);
  }
  function fastPowMatrix(mat: matrix, n: bigint): matrix {
    const bin = n.toString(2);
    const pows = new Array(bin.length).fill(0);

    pows.forEach((x, i, pows) =>
      i === 0 ? (pows[i] = mat) : (pows[i] = powMatrix(pows[i - 1]))
    );
    const unit: matrix = Array.from({ length: mat.length }, () =>
      new Array(mat.length).fill(BigInt(0))
    );

    for (let i = 0; i < unit.length; i++) unit[i][i] = BigInt(1);

    return [...bin]
      .reverse()
      .reduce((a, c, i) => (c === "1" ? multiMatrix(a, pows[i]) : a), unit);
  }
  function getFibo(n: bigint): number {
    const mat1 = [
      [BigInt(1), BigInt(1)],
      [BigInt(1), BigInt(0)],
    ];

    const temp = fastPowMatrix(mat1, n);
    return Number(temp[0][1]);
  }

  return getFibo(Input) % 1000000007;
}

console.log(solution(input));
