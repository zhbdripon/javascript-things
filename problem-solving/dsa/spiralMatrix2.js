// https://leetcode.com/problems/spiral-matrix-ii/

/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {

    let resArray = Array.from({ length: n}, () => Array(n).fill(0))

    let dx = [1,0, -1, 0]
    let dy = [0, 1, 0, -1]

    let adx = [0, 1,0, -1]
    let ady = [-1, 0, 1, 0]


    let ascend = false;
    let cx = 0, cy = 0, nx, ny, curval = 1;

    resArray[0][0] = curval++;

    const nextMove = (x, y) => {
        if (!ascend) {
            for (let i = 0; i < 4; i++) {
                let xx = x + dx[i], yy = y + dy[i];

                if (xx < n && xx >=0 && yy < n && yy >=0 && resArray[yy][xx] === 0) {
                    nx = xx;
                    ny = yy;

                    if (i===3) ascend = true;
                    return true;
                }
            }
        }else {
            for (let i = 0; i < 4; i++) {
                let xx = x + adx[i], yy = y + ady[i];

                if (xx < n && xx >=0 && yy < n && yy >=0 && resArray[yy][xx] === 0) {
                    nx = xx;
                    ny = yy;

                    if (i!==0) ascend = false;
                    return true;
                }
            }
        }

        return false;
    }

    while(nextMove(cx, cy)) {
        resArray[ny][nx] = curval++;
        cx = nx;
        cy = ny;
    }

    return resArray;
};
