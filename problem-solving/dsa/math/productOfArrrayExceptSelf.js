// https://leetcode.com/problems/product-of-array-except-self/
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  let prod = 1;
  let zeroCnt = 0;

  for (let [ind, num] of nums.entries()) {
    if (num !== 0) {
      prod *= num;
    } else {
      zeroCnt++;
    }
  }

  if (zeroCnt > 1) {
    return Array(nums.length).fill(0);
  }

  let res = [];
  if (zeroCnt === 0) {
    for (let num of nums) {
      res.push(prod / num);
    }

    return res;
  }

  for (let [ind, num] of nums.entries()) {
    if (num !== 0) {
      res.push(0);
    } else {
      res.push(prod);
    }
  }

  return res;
};
