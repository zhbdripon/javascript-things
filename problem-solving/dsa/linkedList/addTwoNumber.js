// https://leetcode.com/problems/add-two-numbers/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let onHand = 0;
    let resNode = new ListNode(-1);
    let ret = resNode;

    while(l1 || l2 || onHand) {

        let digit1 = 0, digit2 = 0;

        if (l1) {
            digit1 = l1.val;
            l1 = l1.next;
        }

        if (l2) {
            digit2 = l2.val;
            l2 = l2.next;
        }


        let sum = digit1 + digit2 + onHand;
        let remainder = sum % 10;
        onHand = Math.floor(sum / 10);
        resNode.next = new ListNode(remainder);
        resNode = resNode.next;
    }

    resNode.next = null;

    return ret.next;
};