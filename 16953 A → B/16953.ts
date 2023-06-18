import fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim() as string;

let [a, b] = input.split(" ").map((x) => BigInt(x));

let result = 1;

for (; a < b || a > b; result++) {
  if (b % BigInt(10) < 2 && b% BigInt(10) > 0) {
    b %= BigInt(10);
  } else if (b % BigInt(2) < 1) {
    b /= BigInt(2);
  } else if (a >= b && a <= b) {
    break;
  } else {
    result = -1;
    break;
  }
}
console.log(result);