// https://leetcode.com/problems/merge-intervals/description/

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let res = [];

  for (let [ind, interv] of intervals.entries()) {
    if (ind === 0) {
      res.push(interv);
    } else {
      let last = res[res.length - 1];

      if (last[1] >= interv[0]) {
        res.pop();
        res.push([Math.min(last[0], interv[0]), Math.max(interv[1], last[1])]);
      } else {
        res.push(interv);
      }
    }
  }

  return res;
};
