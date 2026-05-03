/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  const inOrderValueIndx = new Map();

  for (let [ind, val] of inorder.entries()) {
    inOrderValueIndx.set(val, ind);
  }

  let curInd = 0;

  const solve = (st, en) => {
    if (st > en) return null;

    const node = new TreeNode(preorder[curInd++]);

    const mid = inOrderValueIndx.get(node.val);

    node.left = solve(st, mid - 1);
    node.right = solve(mid + 1, en);

    return node;
  };

  return solve(0, inorder.length - 1);
};
