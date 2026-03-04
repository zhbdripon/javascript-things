function solve(n, arr = []) {
    let psum = 0;
    let freq = Array(n).fill(0);
    freq[0] = 1;
    
    for (let i = 0; i < arr.length; i++) {
        psum += arr[i];
        let remainder = (psum % n + n) % n;
        freq[remainder] += 1;
    }
    
    let res = 0;
    for (let count of freq) {
        res += (count * (count - 1)) / 2;
    }
    
    return res;
}

(function main() {
    console.log(solve(5, [3, 1, 2, 7, 4]));
}());

/*
Problem:
---
Given an array of n integers, your task is to count the number of subarrays where the sum of values is divisible by n.

Input
The first input line has an integer n the size of the array.
The next line has n integers a[1],a[2],...,a[n]​: the contents of the array.

Output
Print one integer: the required number of subarrays.

Constraints
1  ≤  n  ≤  2x10^5
−10^9  ≤  a[i]  ≤  10^9 

Example
Input:
5
3 1 2 7 4
Output:
1

*/


/*
Solution Explanation 
---
sum(l..r) % n = 0
(prefix[r] − prefix[l−1]) % n=0
prefix[r] % n = prefix[l−1] % n

If two prefix sums have the same remainder modulo n,
then the subarray between them is divisible by n.
*/