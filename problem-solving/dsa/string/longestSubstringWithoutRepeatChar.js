// https://leetcode.com/problems/longest-substring-without-repeating-characters/description/

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let lastPos = new Map();
  let lastPointer = 0;
  let res = 0;

  for (let [ind, ch] of s.split("").entries()) {
    if (lastPos.has(ch)) {
      let lastInd = lastPos.get(ch);
      lastPos.set(ch, ind);
      lastPointer = Math.max(lastInd + 1, lastPointer);
      res = Math.max(res, ind - lastPointer + 1);
    } else {
      lastPos.set(ch, ind);
      res = Math.max(res, ind - lastPointer + 1);
    }
  }

  return res;
};
