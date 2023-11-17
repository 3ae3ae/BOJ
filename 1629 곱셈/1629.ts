import fs from "fs";

const input = fs.readFileSync("./dev/stdin").toString().trim() as string;

const [a, b, c]: [bigint, bigint, bigint] = (
  input.split(" ") as [string, string, string]
).map((x) => BigInt(x)) as [bigint, bigint, bigint];

function fastPow(num: bigint, n: bigint, ccc: bigint): bigint {
  const bin = n.toString(2);
  const pows = [num];
  for (let i=1; i<bin.length; i++){
    pows[i] = pows[i-1]**BigInt(2)%ccc;
  }
  return [...bin]
    .reverse()
    .reduce(
      (a, c, i) => (c === "1" ? (a * pows[i]) % ccc : a % ccc),
      BigInt(1)
    );
}

console.log(Number(fastPow(a, b, c)));
