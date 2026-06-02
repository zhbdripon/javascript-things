// https://leetcode.com/problems/longest-common-subsequence/description/
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  const len1 = text1.length;
  const len2 = text2.length;
  const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

  for (let [ind1, ch1] of text1.split("").entries()) {
    for (let [ind2, ch2] of text2.split("").entries()) {
      if (ch1 === ch2) {
        dp[ind1 + 1][ind2 + 1] = dp[ind1][ind2] + 1;
      } else {
        dp[ind1 + 1][ind2 + 1] = Math.max(
          dp[ind1 + 1][ind2],
          dp[ind1][ind2 + 1],
        );
      }
    }
  }

  return dp[len1][len2];
};
