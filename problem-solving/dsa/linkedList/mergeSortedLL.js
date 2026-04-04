// https://leetcode.com/problems/merge-two-sorted-lists/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {

    let curNode = new ListNode(-1, null);
    const ret = curNode;


    while(list1 || list2) {
        if (list1 && list2) {
            if (list1.val <= list2.val) {
                curNode.next = list1;
                list1 = list1.next;
            }else {
                curNode.next = list2;
                list2 = list2.next;
            }
        }else if (list1) {
            curNode.next = list1;
            break;
        }else {
            curNode.next = list2;
            break;
        }

        curNode = curNode.next;

    }

    return ret.next;

};