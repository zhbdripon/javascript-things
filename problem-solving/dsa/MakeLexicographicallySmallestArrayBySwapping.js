// https://leetcode.com/problems/make-lexicographically-smallest-array-by-swapping-elements/
/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number[]}
 */
var lexicographicallySmallestArray = function(nums, limit) {
    if (nums.length < 2) {
        return nums;
    }
    
    const sortedArray = nums.slice().sort((a, b) => a - b);
    const mp = new Map()
    const groupBelong = new Map()
    let groupNumber = 0, saved = [sortedArray[0]];
    groupBelong.set(String(sortedArray[0]),0);

    for (let i = 1; i < sortedArray.length; i++) {
        let elem = sortedArray[i]
        let prev = sortedArray[i - 1]

        let diff = Math.abs(prev - elem);

        if (diff > limit) {
            mp.set(String(groupNumber), saved)
            saved = [elem];
            groupNumber++;
        }else {
            saved.push(elem);
        }

        groupBelong.set(String(elem), groupNumber);
    }

    mp.set(String(groupNumber), saved)
    groupNumber++;

    let currIndex = Array(groupNumber).fill(0);
    let res = Array(nums.length)

    for(let i = 0; i < nums.length; i++) {
        let groupNumber = groupBelong.get(String(nums[i]))
        let groupArr = mp.get(String(groupNumber))
        res[i] = groupArr[currIndex[groupNumber]++];

        // console.log(i, nums[i], groupNumber, groupArr, currIndex[groupNumber] - 1, res[i])
    }

    return res;
};