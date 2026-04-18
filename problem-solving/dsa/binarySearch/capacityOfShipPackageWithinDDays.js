// https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/

/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
var shipWithinDays = function (weights, days) {
  let l = Math.max(...weights);
  let r = weights.reduce((acc, cur) => (acc += cur), 0);

  while (l < r) {
    let mid = Math.floor((l + r) / 2);

    let totDays = 0;
    let curWeightSum = 0;
    let possible = true;

    for (let w of weights) {
      if (curWeightSum + w <= mid) {
        curWeightSum += w;
      } else {
        totDays++;
        curWeightSum = w;
      }

      if (totDays > days) {
        possible = false;
        break;
      }
    }

    if (possible && totDays + 1 <= days) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }

  return r;
};
