// https://leetcode.com/problems/binary-tree-level-order-traversal/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    let res = [];

    const traverse = (root, level) => {
        if (!root) return;

        if (res[level]) {
            res[level].push(root.val);
        }else {
            res[level] = [root.val];
        }

        if(root.left) traverse(root.left, level + 1);
        if(root.right) traverse(root.right, level + 1);
    }

    traverse(root, 0);

    return res;
};