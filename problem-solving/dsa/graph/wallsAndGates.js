// https://leetcode.com/problems/walls-and-gates/description/?envType=problem-list-v2&envId=breadth-first-search

function wallsAndGates(grid) {
  if (!grid || grid.length === 0) return;

  const row = grid.length;
  const col = grid[0].length;
  const queue = [];
  const INF = 2147483647;
  const dirs = [[1,0], [-1,0], [0,1], [0,-1]];

  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (grid[r][c] === 0) {
        queue.push([r, c]);
      }
    }
  }

  while (queue.length > 0) {
    const [r, c] = queue.shift();

    for (const [dr, dc] of dirs) {
      const rr = r + dr;
      const cc = c + dc;

      if (
        rr < 0 || rr >= row ||
        cc < 0 || cc >= col ||
        grid[rr][cc] !== INF
      ) continue;

      grid[rr][cc] = grid[r][c] + 1;
      queue.push([rr, cc]);
    }
  }

  return grid;
}