//https://leetcode.com/problems/count-servers-that-communicate/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var countServers = function (grid) {
  let col = grid.length;
  let row = col > 0 ? grid[0].length : 0;

  let rowCounts = Array(row).fill(0);
  let colCounts = Array(col).fill(0);

  for (let i = 0; i < col; i++) {
    let sum = 0;
    for (let j = 0; j < row; j++) {
      sum += grid[i][j];
    }

    rowCounts[i] = sum;
  }

  for (let i = 0; i < row; i++) {
    let sum = 0;
    for (let j = 0; j < col; j++) {
      sum += grid[j][i];
    }

    colCounts[i] = sum;
  }

  let res = 0;

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      if (grid[i][j]) {
        res += colCounts[j] > 1 || rowCounts[i] > 1 ? 1 : 0;
      }
    }
  }

  return res;
};
