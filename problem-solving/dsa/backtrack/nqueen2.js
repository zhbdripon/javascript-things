// https://leetcode.com/problems/n-queens-ii/?
/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function (n) {
  let count = 0;
  let board = Array.from({ length: n }, () => Array(n).fill(0));

  const isPossible = (c, r) => {
    for (let i = 0; i < n; i++) {
      if (board[i][r] || board[c][i]) {
        return false;
      }
    }

    let rr = r,
      cc = c;
    while (rr < n && cc < n) {
      if (board[cc][rr]) return false;
      rr++;
      cc++;
    }

    (rr = r), (cc = c);

    while (rr >= 0 && cc >= 0) {
      if (board[cc][rr]) return false;
      rr--;
      cc--;
    }

    (rr = r), (cc = c);

    while (rr < n && cc >= 0) {
      if (board[cc][rr]) return false;
      rr++;
      cc--;
    }

    (rr = r), (cc = c);

    while (rr >= 0 && cc < n) {
      if (board[cc][rr]) return false;
      rr--;
      cc++;
    }

    return true;
  };

  const backtrack = (col, q) => {
    if (q === n) {
      count++;
      return;
    }

    if (col >= n) {
      return;
    }

    for (let i = 0; i < n; i++) {
      if (isPossible(col, i)) {
        board[col][i] = 1;
        backtrack(col + 1, q + 1);
        board[col][i] = 0;
      }
    }
  };

  backtrack(0, 0);

  return count;
};
