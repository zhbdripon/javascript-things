// https://leetcode.com/problems/minimum-window-substring/description/

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let charCount = new Map();

  for (let ch of t) {
    charCount.set(ch, (charCount.get(ch) || 0) + 1);
  }

  let left = 0;
  let res = s.length;
  let resString = "";
  let count = 0;

  const updateResult = (left, right) => {
    if (right - left + 1 <= res) {
      res = right - left + 1;
      resString = s.substring(left, right + 1);
    }
  };

  for (let i = 0; i < s.length; i++) {
    let ch = s[i];

    let needed = charCount.get(ch);

    if (needed !== undefined) {
      if (needed > 0) {
        count++;
      }

      charCount.set(ch, needed - 1);
    }

    if (count === t.length) {
      updateResult(left, i);

      while (left < i && count === t.length) {
        const leftChar = s[left];
        const leftCharCount = charCount.get(leftChar);
        charCount.set(leftChar, charCount.get(leftChar) + 1);
        left++;

        if (leftCharCount === undefined) {
          updateResult(left, i);
        } else {
          if (leftCharCount >= 0) {
            count--;
            break;
          } else {
            updateResult(left, i);
          }
        }
      }
    }
  }

  return resString;
};
