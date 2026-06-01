// https://leetcode.com/problems/longest-increasing-subsequence/description/
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  let seq = [];

  const findInsertIndex = (num) => {
    let st = 0,
      en = seq.length;

    while (st < en) {
      let mid = Math.floor((st + en) / 2);
      if (seq[mid] >= num) {
        en = mid;
      } else if (seq[mid] < num) {
        st = mid + 1;
      }
    }

    return st;
  };

  for (let num of nums) {
    const index = findInsertIndex(num);
    if (index === seq.length) {
      seq.push(num);
    } else {
      seq[index] = num;
    }
  }

  return seq.length;
};
