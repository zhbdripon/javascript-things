// https://leetcode.com/problems/container-with-most-water/
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let left = 0;
  let right = height.length - 1;
  let res = 0;

  let cal = (left, right) => {
    let commonHeight = Math.min(height[left], height[right]);
    return commonHeight * (right - left);
  };

  while (left < right) {
    res = Math.max(res, cal(left, right));

    if (height[left] <= height[right]) {
      left++;
    } else if (height[left] > height[right]) {
      right--;
    }
  }

  return res;
};
