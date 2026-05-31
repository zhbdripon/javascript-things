// https://leetcode.com/problems/coin-change-ii/
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  const dp = Array(amount + 1).fill(0);
  dp[0] = 1;

  for (let [ind, coin] of coins.entries()) {
    for (let j = coin; j <= amount; j++) {
      dp[j] = dp[j] + dp[j - coin];
    }
  }

  return dp[amount];
};

//    0 1 2 3 4 5
// 1  1 1 1 1 1 1
// 2  1 1 2 2 2 3
// 5  1 1 2 2 2 4
