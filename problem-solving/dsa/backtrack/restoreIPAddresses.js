//https://leetcode.com/problems/restore-ip-addresses

/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  let res = [];
  let path = [];

  const backtrack = (curInd) => {
    const pathLen = path.length;

    if (curInd >= s.length && pathLen < 4) {
      return;
    }

    if (pathLen === 4 && curInd < s.length) {
      return;
    }

    if (pathLen === 4 && curInd === s.length) {
      res.push(path.join("."));
      return;
    }

    if (s[curInd] === "0") {
      path.push("0");
      backtrack(curInd + 1);
      path.pop();
    } else {
      let seg = "";
      for (let i = curInd; i <= Math.min(curInd + 2, s.length - 1); i++) {
        seg += s[i];

        if (+seg > 255) break;

        path.push(seg);
        backtrack(i + 1);
        path.pop();
      }
    }
  };

  backtrack(0);

  return res;
};
