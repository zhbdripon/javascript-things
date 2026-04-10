/**
 * @param {Record<string, Array<string>} graph The adjacency list representing the graph.
 * @param {string} source The source node to start traversal from. It has to exist as a node in the graph.
 * @return {Array<string>} A DFS-traversed order of nodes.
 */
function depthFirstSearch(graph, source) {
    if (Object.keys(graph).length === 0) {
      return [];
    }
  
    let stack = [source];
    let res = [];
    let visit = {};
  
    while (stack.length > 0) {
      let u = stack[stack.length - 1];
      visit[u] = true;
      res.push(u);
      stack = (stack || [])
        .slice(
          0,
          stack.length - 1,
        )
        
      graph[u].forEach((v) => {
          if (!visit[v]) {
            stack.push(v);
          }
        });
    }
  
    return res;
  }