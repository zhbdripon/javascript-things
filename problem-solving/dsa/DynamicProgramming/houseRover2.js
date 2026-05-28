// https://leetcode.com/problems/house-robber-ii
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    if (nums.length < 4) {
        return Math.max(...nums)
    }
    
    const solve = (startInd, lastInd) => {
        const startVal = nums[startInd];
        const dp = Array(lastInd + 1).fill(0);
    
    for ( let ind = startInd; ind <= lastInd; ind++){
        let cur = nums[ind];
        if(ind === 0 || ind === 1){
            dp[ind] = startVal;
            continue;
        }
        
        const maxWithCur = (ind - 2 === 0 && ind === nums.length - 1) ? 0 : cur + dp[ind - 2];
        
        dp[ind] = Math.max(dp[ind - 1], maxWithCur);
    }
    
    return dp[lastInd]
    }

    const len = nums.length;
    return Math.max(solve(0, len - 2), solve(1, len - 1))
};
