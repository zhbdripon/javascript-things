// https://leetcode.com/problems/valid-sudoku/
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    for (let ci = 0; ci < 9; ci++) {
        let arr = []
        for (let ri = 0; ri < 9; ri++) {
            let value = board[ci][ri]
            if (arr.includes(value)) {
                return false;
            }

            if (value !== ".")
                arr.push(value)
        }
    }

    for (let ri = 0; ri < 9; ri++) {
        let arr = []
        for (let ci = 0; ci < 9; ci++) {
            let value = board[ci][ri]
            if (arr.includes(value)) {
                return false;
            }

            if (value !== ".")
                arr.push(value)
        }
    }

    const valid = (ci, ri) => {
        let arr = []
        for (i = ci; i < ci+3; i++) {
            for (j = ri; j < ri + 3; j++) {
                let value = board[i][j];

                if (arr.includes(value)) {
                    return false;
                }

                if (value!==".") {
                    arr.push(value);
                }
            }
        }
        return true;
    }


    if (
        !valid(0, 0) || !valid(0, 3) || !valid(0, 6) ||
        !valid(3, 0) || !valid(3, 3) || !valid(3, 6) ||
        !valid(6, 0) || !valid(6, 3) || !valid(6, 6)
    ) {
        return false;
    }

    return true;
};