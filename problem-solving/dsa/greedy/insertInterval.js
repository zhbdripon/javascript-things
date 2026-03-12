// https://leetcode.com/problems/insert-interval/
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  if (intervals.length === 0) {
    return [newInterval];
  }

  let res = [];

  const shouldMerge = (inter1, inter2) => {
    inter = [inter1, inter2];
    inter.sort((a, b) => a[0] - b[0]);
    const [first, second] = inter;

    return second[0] <= first[1] && second[0] >= first[0];
  };

  const merge = (inter1, inter2) => {
    return [Math.min(inter1[0], inter2[0]), Math.max(inter1[1], inter2[1])];
  };

  const shouldPlaceBetween = (inter1, inter, inter2) => {
    return inter[0] > inter1[1] && inter[1] < inter2[0];
  };

  for (let [ind, interv] of intervals.entries()) {
    if (
      ind < intervals.length - 1 &&
      shouldPlaceBetween(interv, newInterval, intervals[ind + 1])
    ) {
      intervals.splice(ind + 1, 0, newInterval);
      return intervals;
    }

    if (shouldMerge(interv, newInterval)) {
      let merged1 = merge(interv, newInterval);
      res.push(merged1);
      for (let i = ind + 1; i < intervals.length; i++) {
        if (shouldMerge(res[res.length - 1], intervals[i])) {
          res[res.length - 1] = merge(res[res.length - 1], intervals[i]);
        } else {
          res.push(intervals[i]);
        }
      }

      return res;
    }

    res.push(interv);
  }

  const first = intervals[0];

  return first[0] > newInterval[0]
    ? [newInterval, ...intervals]
    : [...intervals, newInterval];
};
