// https://leetcode.com/problems/partition-equal-subset-sum/
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((sum, cur) => (sum += cur), 0);

  if (sum % 2) {
    return false;
  }

  const target = Math.floor(sum / 2);

  const dp = Array(target + 1).fill(nums.length);

  dp[0] = 0;

  for (let [ind, num] of nums.entries()) {
    for (let i = target; i > 0; i--) {
      if (i - num >= 0) {
        dp[i] = Math.min(dp[i], dp[i - num] + 1);
      }
    }
  }

  return dp[target] < nums.length;
};
