// https://leetcode.com/problems/maximum-number-of-points-from-grid-queries/
/**
 * @param {number[][]} grid
 * @param {number[]} queries
 * @return {number[]}
 */

var maxPoints = function(grid, queries) {
    const n = grid.length, m = grid[0].length;
    const sortedQueries =  queries.map((val, ind) => ({ val, ind})).sort((a, b) => a.val - b.val)
    let visit = Array.from({length: n}, (x) => Array(m).fill(false))
    let counter = 0;
    const answer = Array(queries.length).fill(0);
    const dr = [1, 0, -1, 0];
    const dc = [0, 1, 0, -1];
    const pq = new PriorityQueue((a, b) => a[0] - b[0]);
    pq.push([grid[0][0], [0, 0]])
    visit[0][0] = true;

    for (let query of sortedQueries) {
        const {val, ind} = query;

        while(!pq.isEmpty() && val > pq.front()[0]) {
            counter++;
            const [val, [row, col]] = pq.dequeue()

            for (let i = 0; i < 4; i++) {
                const newRow = row + dr[i];
                const newCol =  col + dc[i];

                if (newRow >= 0 && newCol >=0 && newRow < n && newCol < m && !visit[newRow][newCol]) {
                    visit[newRow][newCol] = true;
                    pq.push([grid[newRow][newCol], [newRow, newCol]]);
                }
            }

        }
        answer[ind] = counter;
    }

    return answer;
};