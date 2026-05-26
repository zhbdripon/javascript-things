// https://leetcode.com/problems/climbing-stairs/submissions/2013306170/
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  let dp = Array(50).fill(-1);

  const search = (cur) => {
    if (cur > n) return 0;

    if (dp[cur] !== -1) {
      return dp[cur];
    }

    if (cur === n) {
      return 1;
    }

    dp[cur] = search(cur + 1) + search(cur + 2);
    return dp[cur];
  };

  return search(0, 0);
};
