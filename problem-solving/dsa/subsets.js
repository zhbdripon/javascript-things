// https://leetcode.com/problems/subsets/submissions/1528912730/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    let res = [[]];

    let dfs = (cur, cnt, tot, inn) => {
        if (cnt === tot) {
            res.push(cur);
            return;
        }

        if (inn >= nums.length) {
            return;
        }

        dfs([...cur, nums[inn]], cnt + 1, tot, inn + 1);
        dfs(cur, cnt, tot, inn + 1);
    }

    let ln = nums.length;

    for(let i = 1; i <= ln; i++) {
        dfs([], 0, i, 0);
    }

    return res;
};