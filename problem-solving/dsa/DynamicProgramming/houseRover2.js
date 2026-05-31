// https://leetcode.com/problems/house-robber-ii
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const len = nums.length;

  const solve = (startInd, lastInd) => {
    const startVal = nums[startInd];
    const dp = Array(lastInd + 1).fill(0);

    for (let ind = startInd; ind <= lastInd; ind++) {
      let cur = nums[ind];
      if (ind === 0 || ind === 1) {
        dp[ind] = startVal;
        continue;
      }

      dp[ind] = Math.max(dp[ind - 1], cur + dp[ind - 2]);
    }

    return dp[lastInd];
  };

  return len === 1 ? nums[0] : Math.max(solve(0, len - 2), solve(1, len - 1));
};
