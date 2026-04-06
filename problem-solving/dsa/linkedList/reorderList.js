// https://leetcode.com/problems/reorder-list

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  // dividing into two part
  let slow = head;
  let fast = head;

  while (fast && fast.next && fast.next.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  let slice2 = slow.next;
  slow.next = null;
  let slice1 = head;

  // reversing the second part
  let slice2Reverse = null;

  while (slice2) {
    const next = slice2.next;
    slice2.next = slice2Reverse;
    slice2Reverse = slice2;
    slice2 = next;
  }

  // merge
  while (slice2Reverse) {
    const save = slice1.next;
    const save2 = slice2Reverse.next;

    slice1.next = slice2Reverse;
    slice2Reverse.next = save;

    slice2Reverse = save2;
    slice1 = save;
  }
};
