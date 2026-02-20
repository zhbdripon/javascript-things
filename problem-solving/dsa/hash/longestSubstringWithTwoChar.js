// https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters?envType=problem-list-v2&envId=hash-table
// https://www.geeksforgeeks.org/dsa/longest-substring-with-at-most-two-distinct-characters/

function longSubstring(s) {
  let distictDigit = "";

  let st = 0,
    res = 0;
  let mp = new Map();

  for (let en = 0; en < s.length; en++) {
    let ch = s[en];
    mp.set(ch, (mp.get(ch) || 0) + 1);

    while (mp.size > 2) {
      let stCh = s[st];

      mp.set(stCh, mp.get(stCh) - 1);

      st++;

      if (mp.get(stCh) === 0) {
        mp.delete(stCh);
      }
    }

    res = Math.max(res, en - st + 1);
  }

  return res;
}

console.log(longSubstring("abaccc"));
