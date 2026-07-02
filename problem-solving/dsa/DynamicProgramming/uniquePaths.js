// https://leetcode.com/problems/unique-paths/
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */

var uniquePaths = function (m, n) {
  const dp = Array.from({ length: m }, () => Array(n).fill(1));

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
};

/*
// unnecessary graph traversal solution
var uniquePaths = function (m, n) {
    const dp = Array.from({ length: m }, () => Array(n).fill(0));
    const visit = Array.from({ length: m }, () => Array(n).fill(false));
    const dx = [1, 0];
    const dy = [0, 1];

    const isValid = (r, c) => {
        if (r >= 0 && r < m && c < n && c >= 0) return true;

        return false;
    }

    const getValue = (r, c) => {
        if (isValid(r, c)) {
            return dp[r][c];
        }

        return 0;
    }


    const q = new Queue();
    q.push([0, 0]);
    visit[0][0] = true;

    while (!q.isEmpty()) {
        const [r, c] = q.pop();

        if (r === 0 && c === 0) {
            dp[r][c] = 1;
        } else {
            dp[r][c] = getValue(r - 1, c) + getValue(r, c - 1);
        }

        for (let i = 0; i < 2; i++) {
            const newRow = r + dy[i];
            const newCol = c + dx[i];

            if (isValid(newRow, newCol) && !visit[newRow][newCol]) {
                visit[newRow][newCol] = true;
                q.push([newRow, newCol]);
            }
        }
    }


    return dp[m - 1][n - 1];

};
*/
