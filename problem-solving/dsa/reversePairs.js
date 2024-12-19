// https://leetcode.com/problems/reverse-pairs/
/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums) {
    
    let counts = Array(nums.length).fill(0);
    let res = 0;

    function divAndConq(st, en) {
        if (st >=en) {
            return
        }

        let mid = Math.floor(( st + en ) / 2);

        divAndConq(st, mid)
        divAndConq(mid+1, en)

        let lp = st;
        let rp = mid + 1, i = st;


        while(lp < mid+1 && rp < en + 1 && i <=en) {
            if (nums[lp] <= nums[rp]) {
                counts[i] = nums[lp];
                i++;
                lp++;
            }else {
                counts[i] = nums[rp];
                rp++;
                i++;
            }
        }

        while(lp < mid + 1 && i <=en) {
            counts[i] = nums[lp]
            i++;
            lp++;
        }

        while(rp < en + 1 && i<=en) {
            counts[i] = nums[rp]
            i++;
            rp++;
        }
        
        let curJ = mid + 1;
        for (let i = st; i <= mid; i++) {

            while(curJ <= en && nums[i] > nums[curJ] * 2) {
                curJ++;
            }

            res+= (curJ - (mid+1))
            
        }

        for (let i = st; i <= en; i++) {
            nums[i] = counts[i];
        }
    }

    divAndConq(0, nums.length - 1);

    return res;
};