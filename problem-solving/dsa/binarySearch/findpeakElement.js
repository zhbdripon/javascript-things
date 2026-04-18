// https://leetcode.com/problems/find-peak-element/

/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
    let l = 0, r = nums.length - 1;
    
    while(l < r) {
        console.log(l, r)
        let mid = Math.floor((l + r) / 2);
        let midVal = nums[mid];
        let nextVal = nums[mid+1];

        if(midVal > nextVal) {
            r = mid;
        }else {
            l = mid + 1;
        }
    }

    return l; 
};