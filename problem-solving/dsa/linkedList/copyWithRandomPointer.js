// https://leetcode.com/problems/copy-list-with-random-pointer/description/

/**
 * // Definition for a _Node.
 * function _Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function(head) {
    let refMap = new Map();
    let savedHead = head;

    while(head) {
        let curNode = refMap.get(head);

        if (curNode) {
            curNode.val = head.val;
        }else {
            curNode = new _Node(head.val);
            refMap.set(head, curNode);
        }

        const assignPointer = (node, pointer, key) => {
            if (pointer === null) {
                node[key] = null;
            }else if (refMap.has(pointer)) {
                node[key] = refMap.get(pointer);
            }else {
                node[key] = new _Node();
                refMap.set(pointer, node[key]);
            }
        }

        const randomPointer = head.random;
        const nextPointer = head.next;
        assignPointer(curNode, randomPointer, 'random');
        assignPointer(curNode, nextPointer, 'next');

        head = head.next;
    }

    return refMap.get(savedHead);
};


// more clean map based solution, using double pass but cleaner
var copyRandomList = function(head) {
    if (!head) return null;

    const map = new Map();

    // 1st pass: clone nodes
    let curr = head;
    while (curr) {
        map.set(curr, new _Node(curr.val));
        curr = curr.next;
    }

    // 2nd pass: assign pointers
    curr = head;
    while (curr) {
        const copy = map.get(curr);
        copy.next = curr.next ? map.get(curr.next) : null;
        copy.random = curr.random ? map.get(curr.random) : null;
        curr = curr.next;
    }

    return map.get(head);
};


// most optimal O(1) space. Interleave copied nodes inside original list 
var copyRandomList = function(head) {
    if (!head) return null;

    let curr = head;

    // 1. Insert cloned nodes
    while (curr) {
        const copy = new _Node(curr.val);
        copy.next = curr.next;
        curr.next = copy;
        curr = copy.next;
    }

    // 2. Assign random pointers
    curr = head;
    while (curr) {
        if (curr.random) {
            curr.next.random = curr.random.next;
        }
        curr = curr.next.next;
    }

    // 3. Separate lists
    curr = head;
    const newHead = head.next;

    while (curr) {
        const copy = curr.next;
        curr.next = copy.next;
        copy.next = copy.next ? copy.next.next : null;
        curr = curr.next;
    }

    return newHead;
};