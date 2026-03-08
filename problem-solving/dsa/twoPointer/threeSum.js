// https://leetcode.com/problems/3sum/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  let prev = null;
  let res = [];
  for (let ind = 0; ind < nums.length - 2; ind++) {
    if (nums[ind] === prev) {
      prev = nums[ind];
      continue;
    }

    let left = ind + 1;
    let right = nums.length - 1;

    while (left < right) {
      while (left < right && nums[ind] + nums[left] + nums[right] > 0) {
        right--;
      }

      while (left < right && nums[ind] + nums[left] + nums[right] < 0) {
        left++;
      }

      if (left < right && nums[ind] + nums[left] + nums[right] === 0) {
        res.push([nums[ind], nums[left], nums[right]]);

        let tempLeft = nums[left];
        let tempRight = nums[right];

        while (left < right && nums[left] === tempLeft) {
          left++;
        }

        while (left < right && nums[right] === tempRight) {
          right--;
        }
      }
    }

    prev = nums[ind];
  }

  return res;
};
