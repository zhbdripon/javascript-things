// https://leetcode.com/problems/repeated-dna-sequences/
/**
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function (s) {
  let hash = 0;
  let encoding = {
    A: 0,
    C: 1,
    G: 2,
    T: 3,
  };

  let mp = new Map();
  let res = [];
  let idx = 0;

  s.split("").forEach((ch) => {
    hash = ((hash << 2) | encoding[ch]) & ((1 << 20) - 1);

    if (idx >= 9) {
      mp.set(hash, (mp.get(hash) || 0) + 1);
      if (mp.get(hash) === 2) {
        res.push(s.substring(idx - 9, idx + 1));
      }
    }

    idx++;
  });

  return res;
};
