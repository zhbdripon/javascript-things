// https://leetcode.com/problems/remove-nth-node-from-end-of-list/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  const findAndRemove = (node) => {
    if (!node || !node.next) {
      return 1;
    }

    let numberFromEnd = findAndRemove(node.next);
    if (numberFromEnd === n) {
      node.next = node.next.next;
    }

    return numberFromEnd + 1;
  };

  let tempNode = new ListNode(-1, head);

  findAndRemove(tempNode);

  return tempNode.next;
};

// better solution, constant memory
var removeNthFromEnd = function(head, n) {
    let dummy = new ListNode(-1, head)
    let slow = dummy;
    let fast = dummy;

    for(let i = 0; i <= n; i++) {
        fast = fast.next;
    }

    while(fast) {
        fast = fast.next;
        slow = slow.next;
    }

    slow.next = slow.next.next;

    return dummy.next;

};
       
