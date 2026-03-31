// https://leetcode.com/problems/decode-string/

/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  let result = "";

  for (let i = 0; i < s.length; i++) {
    let ch = s[i];

    if (ch >= "1" && ch <= "9") {
      let digitStack = [];
      let ind = i;

      while (s[ind] >= "0" && s[ind] <= "9") {
        digitStack.push(s[ind++].charCodeAt(0) - 48);
      }

      digitStack = digitStack.reverse();
      let numOfRepeat = 0;

      for (let [ii, digit] of digitStack.entries()) {
        if (ii === 0) {
          numOfRepeat = digit;
        } else {
          numOfRepeat += Math.pow(10, ii) * digit;
        }
      }

      let j = ind + 1;
      let k = ind + 1;
      let st = ["["];

      while (st.length > 0) {
        if (s[k] === "[") {
          st.push("[");
        } else if (s[k] === "]") {
          st.pop();
        }
        k++;
      }
      k -= 1;
      result += decodeString(s.substring(j, k)).repeat(numOfRepeat);
      i = k;
    } else {
      result += ch;
    }
  }

  return result;
};
