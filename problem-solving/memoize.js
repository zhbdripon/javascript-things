//https://leetcode.com/problems/memoize/?envType=study-plan-v2&envId=30-days-of-javascript
/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {

    let memo = new Map()
    
    return (...args) => {
        let [a, b] = args
        let key = String(a);
        if (b) key+=`:${b}`

        if (memo.has(key)) {
            return memo.get(key)
        }else {
            let res = fn(...args);
            memo.set(key, res);
            return res;
        }
    }
}


/** 
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1 
 */