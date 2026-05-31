/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const inf = 123456789;
  const dp = Array(amount + 1).fill(inf);
  dp[0] = 0;

  for (let j = 1; j <= amount; j++) {
    for (let [ind, coin] of coins.entries()) {
      if (j >= coin) {
        dp[j] = Math.min(dp[j], dp[j - coin] + 1);
      }
    }
  }

  return dp[amount] === inf ? -1 : dp[amount];
};

// 1 2 3 4 5 6 7 8 9 10 11
// 1 2 3 4 5 6 7 8 9 10 11
// 1 1 2 2 3 3 4 4 5 5  6
// 1 1 2 2 1 2 2 3 3 2 3
