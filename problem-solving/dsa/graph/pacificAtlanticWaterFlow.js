// https://leetcode.com/problems/pacific-atlantic-water-flow/description/
/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
  const rows = heights.length;
  const cols = heights[0].length;

  const pacific = Array.from({ length: rows }, () => Array(cols).fill(false));
  const atlantic = Array.from({ length: rows }, () => Array(cols).fill(false));

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function dfs(r, c, visited) {
    visited[r][c] = true;

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || visited[nr][nc]) {
        continue;
      }

      if (heights[nr][nc] >= heights[r][c]) {
        dfs(nr, nc, visited);
      }
    }
  }

  for (let c = 0; c < cols; c++) {
    dfs(0, c, pacific);
  }

  for (let r = 0; r < rows; r++) {
    dfs(r, 0, pacific);
  }

  for (let c = 0; c < cols; c++) {
    dfs(rows - 1, c, atlantic);
  }

  for (let r = 0; r < rows; r++) {
    dfs(r, cols - 1, atlantic);
  }

  const result = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (pacific[r][c] && atlantic[r][c]) {
        result.push([r, c]);
      }
    }
  }

  return result;
};
