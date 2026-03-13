// https://leetcode.com/problems/longest-consecutive-sequence/
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  if (nums.length === 0) return 0;

  nums.sort((a, b) => a - b);

  let cnt = 1,
    res = 1,
    prev = nums[0];

  for (let [ind, num] of nums.entries()) {
    if (ind === 0) continue;

    if (prev === num) continue;

    if (num === prev + 1) {
      cnt++;
      res = Math.max(res, cnt);
    } else {
      cnt = 1;
    }
    prev = num;
  }

  return res;
};
