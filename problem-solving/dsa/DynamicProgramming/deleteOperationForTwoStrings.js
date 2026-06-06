/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const len1 = word1.length;
  const len2 = word2.length;

  const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) {
    dp[i][0] = i;
  }

  for (let i = 0; i <= len2; i++) {
    dp[0][i] = i;
  }

  for (let [ind1, ch1] of word1.split("").entries()) {
    for (let [ind2, ch2] of word2.split("").entries()) {
      if (ch1 === ch2) {
        dp[ind1 + 1][ind2 + 1] = dp[ind1][ind2];
      } else {
        dp[ind1 + 1][ind2 + 1] =
          Math.min(dp[ind1][ind2 + 1], dp[ind1 + 1][ind2]) + 1;
      }
    }
  }

  return dp[len1][len2];
};

//     s e a
//   0 1 2 3
// e 1 2 1 2
// a 2 3 2 1
// t 3 4 3 2
