// https://leetcode.com/problems/maximum-depth-of-binary-tree/
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
var maxDepth = function (root) {
  let res = 0;
  const dfs = (root, level) => {
    if (!root) return;

    res = Math.max(res, level);

    if (root.left) dfs(root.left, level + 1);
    if (root.right) dfs(root.right, level + 1);
  };

  dfs(root, 1);
  return res;
};
