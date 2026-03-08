// https://leetcode.com/problems/maximum-product-subarray/description/

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let curMax = 1;
  let curMin = 1;
  let res = Number.MIN_SAFE_INTEGER;

  for (let [ind, num] of nums.entries()) {
    let tempMin = curMin * num;
    let tempMax = curMax * num;

    curMax = Math.max(num, Math.max(tempMin, tempMax));
    curMin = Math.min(num, Math.min(tempMin, tempMax));
    res = Math.max(res, curMax);
  }

  return res;
};
