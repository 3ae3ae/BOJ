"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim();
function solution(input) {
    const palindromes = [];
    let i = 0;
    for (i = 0; input[i] === input[i + 1]; i++)
        ;
    if (i === input.length - 1)
        return 1;
    palindromes.push(input.slice(0, ++i), input[i++]);
    for (; i < input.length; i++) {
        const letter = input[i];
        if (palindromes[palindromes.length - 2].endsWith(letter)) {
            const temp = palindromes.pop();
            if (palindromes[palindromes.length - 1].length === 1) {
                palindromes.pop();
            }
            else {
                palindromes.splice(palindromes.length - 1, 1, palindromes[palindromes.length - 1].slice(-1));
            }
            palindromes.push(`${letter}${temp}${letter}`);
        }
        else {
            if ([...palindromes[palindromes.length - 1]].every((x) => x === letter)) {
                palindromes.splice(palindromes.length - 1, 1, palindromes[palindromes.length - 1] + letter);
            }
            else {
                palindromes.push(letter);
            }
        }
    }
    return palindromes.length;
}
console.log(solution(input));
