// https://leetcode.com/problems/subarray-sum-equals-k/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let psum = [];

  for (let [ind, num] of nums.entries()) {
    if (ind === 0) {
      psum.push(num);
    } else {
      psum.push(psum[ind - 1] + num);
    }
  }

  let mp = new Map();
  let cnt = 0;
  mp.set(0, 1);

  for (let sum of psum) {
    let req = sum - k;
    cnt += mp.get(req) || 0;

    mp.set(sum, (mp.get(sum) || 0) + 1);
  }

  return cnt;
};
