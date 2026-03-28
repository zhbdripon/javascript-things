// https://leetcode.com/problems/string-to-integer-atoi/
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  if (s.length < 1) return 0;
  let str = s.trim();
  const isNeg = str[0] === "-";

  if (isNeg || str[0] === "+") {
    str = str.substring(1, str.length);
  }

  let pointer = 0;
  while (str[pointer] === "0") {
    pointer++;
  }

  str = str.substring(pointer, str.length);
  pointer = 0;

  while (str[pointer] >= "0" && str[pointer] <= "9") {
    pointer++;
  }

  str = str.substring(0, pointer);
  let digits = str.split("").reverse();
  let res = 0;

  for (let [ind, digit] of digits.entries()) {
    const _digit = digit.charCodeAt(0) - "0".charCodeAt(0);

    if (ind === 0) {
      res += _digit;
      continue;
    }

    res += _digit * Math.pow(10, ind);

    if (isNeg && res >= Math.pow(2, 31)) {
      res = Math.pow(2, 31);
      break;
    } else if (!isNeg && res > Math.pow(2, 31) - 1) {
      res = Math.pow(2, 31) - 1;
      break;
    }
  }

  if (isNeg) {
    res *= -1;
  }

  return res;
};
