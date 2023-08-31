import fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim();

function solution(input: string) {
  const palindromes: string[] = [];
  palindromes.push(input[0]);

  // 1. 그냥 붙는경우
  // 2. 붙지 않는 경우
  // 3. 붙을 수 있지만 앞을 뜯어야 하는 경우

  for (let i = 1; i < input.length; i++) {
    const letter = input[i];
    if (returnSecondFromBack(palindromes)?.endsWith(letter)) {
      ("blabla");
    } else if (returnLastItem(palindromes)?.endsWith(letter)) {
      ("blablabla");
    } else {
      palindromes.push(letter);
    }
  }
}

function isPalindrome(input: string): boolean {
  const l = input.length;
  if (l === 0) return true;
  for (let i = 0; i < l / 2; i++) {
    if (input[i] !== input[l - i - 1]) return false;
  }
  return true;
}

function returnLastItem<T>(l: Array<T>): T | undefined {
  return l[l.length - 1];
}

function returnSecondFromBack<T>(l: Array<T>): T | undefined {
  return l[l.length - 2];
}

console.log(solution(input));
