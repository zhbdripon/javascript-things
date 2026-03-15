// https://www.hackerrank.com/challenges/gridland-metro/problem

"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'gridlandMetro' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 *  3. INTEGER k
 *  4. 2D_INTEGER_ARRAY track
 */

function gridlandMetro(n, m, k, tracks) {
  let grid = Array.from({ length: n }, () => Array(m).fill(false));

  for (let track of tracks) {
    let [r, c1, c2] = track;
    r -= 1;
    c1 -= 1;
    c2 -= 1;
    for (let i = c1; i <= c2; i++) {
      grid[r][i] = true;
    }
  }
  let cnt = 0;
  for (let row of grid) {
    for (let cell of row) {
      if (!cell) {
        cnt += 1;
      }
    }
  }

  return cnt;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const n = parseInt(firstMultipleInput[0], 10);

  const m = parseInt(firstMultipleInput[1], 10);

  const k = parseInt(firstMultipleInput[2], 10);

  let track = Array(k);

  for (let i = 0; i < k; i++) {
    track[i] = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((trackTemp) => parseInt(trackTemp, 10));
  }

  const result = gridlandMetro(n, m, k, track);

  ws.write(result + "\n");

  ws.end();
}
