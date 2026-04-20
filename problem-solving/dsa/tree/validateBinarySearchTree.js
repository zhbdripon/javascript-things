// https://leetcode.com/problems/validate-binary-search-tree/

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
 * @return {boolean}
 */
var isValidBST = function (root) {
  let res = true;

  const solve = (root) => {
    if (!root) return [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];

    const [leftMin, leftMax] = solve(root.left);
    const [rightMin, rightMax] = solve(root.right);

    res = res && leftMax < root.val;
    res = res && rightMin > root.val;

    return [
      Math.min(leftMin, Math.min(rightMin, root.val)),
      Math.max(rightMax, Math.max(leftMax, root.val)),
    ];
  };

  solve(root);

  return res;
};
