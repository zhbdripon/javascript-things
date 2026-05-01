// https://leetcode.com/problems/daily-temperatures/
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const warmerIndx = Array(temperatures.length).fill(-1);
  const res = [];

  for (let i = temperatures.length - 1; i >= 0; i--) {
    let cur = temperatures[i];

    if (i === temperatures.length - 1) {
      res.push(0);
      continue;
    }

    let ind = i + 1;

    while (ind !== -1 && temperatures[ind] <= cur) {
      ind = warmerIndx[ind];
    }

    if (ind !== -1) {
      res.push(ind - i);
      warmerIndx[i] = ind;
    } else {
      res.push(0);
    }
  }

  return res.reverse();
};

// expected solution (monotonic stack)
var dailyTemperatures = function(temperatures) {
    const n = temperatures.length;
    const res = new Array(n).fill(0);
    const stack = []; // stores indices

    for (let i = 0; i < n; i++) {
        while (stack.length && temperatures[i] > temperatures[stack.at(-1)]) {
            const prev = stack.pop();
            res[prev] = i - prev;
        }
        stack.push(i);
    }

    return res;
};
