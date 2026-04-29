// https://leetcode.com/problems/serialize-and-deserialize-binary-tree/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    const nodes = []

    const recordNode = (node) => {
        if (!node) {
            nodes.push(null);
            return;
        }

        nodes.push(node.val)

        recordNode(node.left);
        recordNode(node.right);
    }

    recordNode(root)

    return nodes.join(',');
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    const nodes = data.split(',').map(item => item === '' ? null : Number(item));
    let ind = 0;

    const buildTree = () => {
        if (nodes[ind] === null){
            ind++;
            return null;
        }

        const node =  new TreeNode(nodes[ind++]);

        node.left = buildTree();
        node.right = buildTree();

        return node;

    }

    return buildTree();
    
};