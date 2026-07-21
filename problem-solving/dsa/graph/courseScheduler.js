// https://leetcode.com/problems/course-schedule-ii/
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  let graph = Array.from({ length: numCourses }, () => []);
  let visit = Array(numCourses).fill(0);
  let res = [];

  for (let [v, u] of prerequisites) {
    graph[u].push(v);
  }

  const dfs = (u) => {
    visit[u] = 1;

    for (let v of graph[u]) {
      if (visit[v] === 1) {
        return true;
      }

      if (visit[v] === 0 && dfs(v)) {
        return true;
      }
    }

    visit[u] = 2;

    res.push(u);
    return false;
  };

  for (let i = 0; i < numCourses; i++) {
    if (visit[i] === 0 && dfs(i)) {
      return [];
    }
  }

  return res.reverse();
};
