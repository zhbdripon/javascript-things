// https://leetcode.com/problems/search-a-2d-matrix/?envType=problem-list-v2&envId=binary-search
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    let row = matrix.length;
    let col =matrix[0].length;

    let st = 1, en = row * col;

    while(st <= en) {

        let mid = (Math.floor((en - st) / 2)) + st;

        let r = Math.floor((mid - 1) / col);
        let c = (mid - 1) % col;

        if (matrix[r][c] === target) {
            return true;
        }else if (matrix[r][c] < target) {
            st = mid + 1;
        }else {
            en = mid - 1;
        }
    }

    return false;

};