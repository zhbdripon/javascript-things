// https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let res = [];

  const bs = (num, forbiddenIndex) => {
    let l = 0,
      r = numbers.length;

    while (l <= r) {
      let mid = Math.floor((r - l) / 2) + l;
      let midNumber = numbers[mid];
      if (midNumber === num) {
        if (mid === forbiddenIndex) {
          if (mid - 1 >= 0 && numbers[mid - 1] === num) {
            return mid - 1;
          } else if (mid + 1 < numbers.length && numbers[mid + 1] === num) {
            return mid + 1;
          } else return -1;
        } else {
          return mid;
        }
      } else if (midNumber < num) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }

    return -1;
  };

  for (let [index, number] of numbers.entries()) {
    let need = target - number;
    let needIndex = bs(need, index);
    if (needIndex !== -1) {
      return [needIndex + 1, index + 1].sort((a, b) => a - b);
    }
  }

  return [0, 0];
};
