// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/ (both solution)

//https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/ (first solution)
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
    let curValue = root === p || root === q ? 1 : 0;

    let sum = valueFromLeft + valueFromRight + curValue;

    if (sum > 1 && res === null) {
      res = root;
    }

    return sum;
  };

  traverse(root);

  return res;
};

// optimal solution, using BST property, interview friendly
var lowestCommonAncestor = function (root, p, q) {
  while (root) {
    if (root.val < p.val && root.val < q.val) {
      root = root.right;
    } else if (root.val > p.val && root.val > q.val) {
      root = root.left;
    } else {
      return root;
    }
  }
};
