// https://leetcode.com/problems/find-eventual-safe-states/

/**
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function(graph) {

    let visit = Array(graph.length).fill(false);
    let isSafe = Array(graph.length).fill(false);

    let res = [];

    const dfs = (u) => {
        if (isSafe[u]) return true;
        if (visit[u]) return false;
        visit[u] = true;
        let isValid = true;

        for (let v of graph[u]) {

            if (u !== v) {
                if (isSafe[v]) continue;
                let child = dfs(v);
                isValid = isValid && child;
                if (!isValid) {
                    break;
                }
            } else {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            res.push(u);
            isSafe[u] = true;
        }

        return isValid;

    }
    
    for (let i = 0; i < graph.length; i++) {
        if (!visit[i]) {
            dfs(i);
        }
    }

    return res.sort((a, b) => a - b);
    
};