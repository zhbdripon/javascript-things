// https://leetcode.com/problems/set-matrix-zeroes/?envType=problem-list-v2&envId=hash-table
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
    let rowLen = matrix.length;
    let colLen = matrix[0].length;

    let isRowZero = Array(rowLen).fill(false);
    let isColZero = Array(colLen).fill(false);

    for (let r = 0; r < rowLen; r++) {
        for (let c = 0; c < colLen; c++) {
            if (matrix[r][c] === 0) {
                isRowZero[r] = true;
                break;
            }
        }

    }

    for (let c = 0; c < colLen; c++) {
        for (let r = 0; r < rowLen; r++) {
            if (matrix[r][c] === 0) {
                isColZero[c] = true;
                break;
            }
        }
    }

    for (let r = 0; r < rowLen; r++) {
        for (let c = 0; c < colLen; c++) {
            if (isRowZero[r] || isColZero[c]){
                matrix[r][c] = 0;
            }
        }
    }
};
