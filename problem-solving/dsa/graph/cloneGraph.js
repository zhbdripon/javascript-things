// https://leetcode.com/problems/clone-graph/description/
/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function (node) {
  if (!node) {
    return null;
  }

  const nodeRef = new Map();

  const traverse = (parent, parentCopy) => {
    nodeRef.set(parent, parentCopy);

    for (let [ind, child] of parent.neighbors.entries()) {
      if (nodeRef.has(child)) {
        parentCopy.neighbors.push(nodeRef.get(child));
      } else {
        let copy = new _Node(child.val);
        parentCopy.neighbors.push(copy);
        traverse(child, copy);
      }
    }
  };

  let copy = new _Node(node.val);

  traverse(node, copy);

  return copy;
};
