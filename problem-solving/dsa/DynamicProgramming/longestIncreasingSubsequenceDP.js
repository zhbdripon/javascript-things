// https://leetcode.com/problems/longest-increasing-subsequence/
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  // 10 | 9 | 2 | 5 | 3 | 7 | 101 | 18
  // 1  | 1 | 1 | 1 | 1 | 1 | 1   | 1
  // 1    1   1   2   2   3   4     4

  let len = nums.length;
  const dp = Array(len).fill(1);

  for (let i = 1; i < len; i++) {
    let cur = nums[i];
    for (let j = 0; j < i; j++) {
      let prev = nums[j];

      if (prev < cur) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
};
