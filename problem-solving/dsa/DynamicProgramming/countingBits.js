[200~// https://leetcode.com/problems/counting-bits/
/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {

    if (n == 0) return [0];

    let dp = Array(n + 1).fill(-1);
    dp[0] = 0;
    dp[1] = 1;

    const solve = (x) => {
        if (x <= 1) return x;;

        if (dp[x] !== -1) {
            return dp[x];
        }

        return dp[x] = solve(Math.floor(x / 2)) + (x % 2);
    }

    for (let i = 1; i <= n; i++)
        solve(i);

    return dp;
};
