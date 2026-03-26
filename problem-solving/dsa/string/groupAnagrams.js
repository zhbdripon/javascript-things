// https://leetcode.com/problems/group-anagrams/

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    for (let [ind, str] of strs.entries()) {
        strs[ind] = {
            original: str,
            sorted: str.split("").sort().join("")
        }
    }

    strs.sort((a, b) => {
        return a.sorted.localeCompare(b.sorted);
    });
    
    let res = [];
    let curRes = [strs[0]];

    for (let [ind, cur] of strs.entries()) {
        if (ind === 0) {
            continue;
        }

        let prev = curRes[curRes.length - 1];
        if (cur.sorted === prev.sorted) {
            curRes.push(cur);
        }else {
            res.push(curRes.map(s => s.original));
            curRes = [cur];
        }
    }

    res.push(curRes.map(s => s.original)); 
    return res;
};