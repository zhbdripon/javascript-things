// https://leetcode.com/problems/house-robber
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    const len = nums.length;
    const dp = Array(len).fill(0);
    
    for ( let [ind, cur] of nums.entries()){
        if(ind === 0){
            dp[ind] = cur;
            continue;
        }else if(ind === 1) {
            dp[ind] = Math.max(nums[0], nums[1]);
            continue;
        }
        
        dp[ind] = Math.max(dp[ind - 1], cur + dp[ind - 2]);
    }
    
    return dp[len - 1];
};
