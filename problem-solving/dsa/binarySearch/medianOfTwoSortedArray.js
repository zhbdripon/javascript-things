// https://leetcode.com/problems/median-of-two-sorted-arrays/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const smallArr = nums1.length <= nums2.length ? nums1 : nums2;
  const largeArr = smallArr === nums1 ? nums2 : nums1;
  const smallArrLen = smallArr.length;
  const largeArrLen = largeArr.length;
  const totalLen = smallArrLen + largeArrLen;
  const half = Math.floor(totalLen / 2);

  let l = 0,
    r = smallArrLen - 1;

  while (true) {
    let smallArrPointer = Math.floor((l + r) / 2);
    let largeArrPointer = half - smallArrPointer - 2;
    const smallArrVal =
      smallArrPointer < 0 ? Number.MIN_SAFE_INTEGER : smallArr[smallArrPointer];

    const smallArrNextVal =
      smallArrPointer + 1 >= smallArrLen
        ? Number.MAX_SAFE_INTEGER
        : smallArr[smallArrPointer + 1];

    const largeArrVal =
      largeArrPointer < 0 ? Number.MIN_SAFE_INTEGER : largeArr[largeArrPointer];

    const largeArrNextVal =
      largeArrPointer + 1 >= largeArrLen
        ? Number.MAX_SAFE_INTEGER
        : largeArr[largeArrPointer + 1];

    if (smallArrVal <= largeArrNextVal && largeArrVal <= smallArrNextVal) {

      if (totalLen % 2) {
        return Math.min(largeArrNextVal, smallArrNextVal);
      } else {
        const first = Math.max(largeArrVal, smallArrVal);
        const second = Math.min(largeArrNextVal, smallArrNextVal);
        return (first + second) / 2;
      }
      
    } else if (smallArrVal > largeArrNextVal) {
      r = smallArrPointer - 1;
    } else {
      l = smallArrPointer + 1;
    }
  }
};
