// https://leetcode.com/problems/course-schedule/
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  const inDegree = Array(numCourses).fill(0);
  const graph = Array.from({ length: numCourses }, () => []);

  for (let [a, b] of prerequisites) {
    inDegree[a]++;
    graph[b].push(a);
  }

  let stack = [];
  for (let i = 0; i < numCourses; i++) {
    if (!inDegree[i]) {
      stack.push(i);
    }
  }

  if (stack.length < 1) return false;

  let cnt = 0;
  while (stack.length > 0) {
    let top = stack.pop();
    cnt++;

    for (let v of graph[top]) {
      inDegree[v]--;

      if (inDegree[v] === 0) {
        stack.push(v);
      }
    }
  }

  return cnt >= numCourses;
};
