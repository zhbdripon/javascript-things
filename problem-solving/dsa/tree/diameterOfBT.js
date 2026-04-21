// https://leetcode.com/problems/diameter-of-binary-tree
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
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  let res = 0;
  const solve = (node) => {
    if (!node) return 0;

    const leftRes = solve(node.left);
    const rightRes = solve(node.right);

    res = Math.max(res, leftRes + rightRes);
    return Math.max(leftRes + 1, rightRes + 1);
  };

  solve(root);

  return res;
};
