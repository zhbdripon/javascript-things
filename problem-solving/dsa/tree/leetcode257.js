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
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
    const path = [root.val === undefined ? 0 : root.val];
    const res = [];
    const traverse = (u) => {
        if (u.left === null && u.right === null) {
            let localPath = "";
            for(let i = 0; i < path.length; i++){
                localPath+=path[i];

                if (i !== path.length - 1) {
                    localPath += '->';
                }
            }
            res.push(localPath);
            return;
        }

        
        if (u.left) {
            path.push(u.left.val);
            traverse(u.left);
            path.pop();
        }

        if (u.right) {
            path.push(u.right.val);
            traverse(u.right);
            path.pop();
        }

    }

    traverse(root);

    return res;
    
};