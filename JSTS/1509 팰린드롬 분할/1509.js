"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim();
function solution(input) {
    const l = input.length;
    const dp = Array.from({ length: l }, () => Array(l).fill(false));
    for (let i = 0; i < l; i++) {
        dp[i][i] = true;
        if (input[i] === input[i + 1])
            dp[i][i + 1] = true;
    }
    for (let palinLen = 2; palinLen < l; palinLen++) {
        for (let s = 0; s + palinLen < l; s++) {
            const e = s + palinLen;
            if (input[s] === input[e]) {
                dp[s][e] = dp[s + 1][e - 1];
            }
        }
    }
    const result = [];
    for (let end = 0; end < l; end++) {
        result[end] = Infinity;
        for (let strt = 0; strt <= end; strt++) {
            if (dp[strt][end]) {
                result[end] = Math.min(result[end], (result[strt - 1] || 0) + 1);
            }
        }
    }
    return result[l - 1];
}
console.log(solution(input));
