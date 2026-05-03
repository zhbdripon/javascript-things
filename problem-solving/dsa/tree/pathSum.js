// https://leetcode.com/problems/path-sum/description/

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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  const solve = (node, sum) => {
    sum += node.val;

    let res = false;

    if (node.left) {
      res = res || solve(node.left, sum);
    }

    if (node.right) {
      res = res || solve(node.right, sum);
    }

    if (!node.left && !node.right) {
      return sum === targetSum;
    }

    return res;
  };

  return !!root && solve(root, 0);
};
