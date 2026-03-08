// https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let l = 0,
    r = nums.length - 1;

  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    console.log(l, r, mid);

    if (nums[mid] > nums[r]) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }

  return nums[l];
};

// 1 2 3 4 5
// 5 1 2 3 4
// 4 5 1 2 3
// 3 4 5 1 2
