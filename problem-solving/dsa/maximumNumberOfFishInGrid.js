// https://leetcode.com/problems/maximum-number-of-fish-in-a-grid/
/**
 * @param {number[][]} grid
 * @return {number}
 */
var findMaxFish = function(grid) {

    y = grid.length
    x = grid[0].length
    let visit = Array.from({ length: y }, () => Array(x).fill(false));

    let dy = [1, -1, 0, 0]
    let dx = [0, 0, -1, 1]

    const valid = (yyy, xxx) => {
        if (yyy >= y || xxx >= x || yyy < 0 || xxx < 0) return false;
        if (visit[yyy][xxx]) return false;
        return true;
    }

    const dfs = (yy, xx) => {
        if (visit[yy][xx] || grid[yy][xx] === 0) return 0;
        visit[yy][xx] = true;
        let tot = grid[yy][xx];

        for (let k = 0; k < 4; k++) {

            let yyy = yy + dy[k];
            let xxx = xx + dx[k];

            if (valid(yyy, xxx)) {
                tot+=dfs(yyy, xxx);
            }
        }
        return tot;
    }

    let res = 0;
    for (let i = 0; i < y; i++) {
        for(let j  = 0; j < x; j++) {
            let val = grid[i][j];
            if (val && !visit[i][j]) {
                res = Math.max(res, dfs(i, j))
            }
        }
    }

    return res;
    
};