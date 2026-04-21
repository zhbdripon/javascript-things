// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  let res = null;

  const traverse = (root) => {
    if (!root || res) return 0;

    let valueFromLeft = traverse(root.left);
    let valueFromRight = traverse(root.right);
    let curValue = root.val === p.val || root.val === q.val ? 1 : 0;

    let sum = valueFromLeft + valueFromRight + curValue;

    if (sum > 1 && res === null) {
      res = root;
    }

    return sum;
  };

  traverse(root);

  return res;
};
