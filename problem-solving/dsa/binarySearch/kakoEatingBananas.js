// https://leetcode.com/problems/koko-eating-bananas/

/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  let l = 0;
  let r = Math.max(...piles);

  while (l < r) {
    let mid = Math.floor((l + r) / 2);
    let tot = 0;
    let possible = true;
    for (let pile of piles) {
      tot += Math.ceil(pile / mid);

      if (tot > h) {
        possible = false;
        break;
      }
    }

    if (possible) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }

  return r;
};
