// https://www.hackerrank.com/challenges/gridland-metro/problem

"use strict";

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
  tracks.sort((a, b) => a[0] - b[0]);
  let prevTrack = [];
  let exclude = 0;

  const getRowExclude = (roads) => {
    roads.sort((a, b) => a[0] - b[0]);
    let prev = [];
    let exclu = 0;
    for (let [ind, road] of roads.entries()) {
      if (ind === 0) {
        prev = road;
        continue;
      }

      if (road[0] <= prev[1]) {
        prev = [prev[0], Math.max(road[1], prev[1])];
      } else {
        exclu += prev[1] - prev[0] + 1;
        prev = road;
      }
    }

    if (prev.length > 0) {
      exclu += prev[1] - prev[0] + 1;
    }

    return exclu;
  };

  for (let [ind, track] of tracks.entries()) {
    if (ind === 0) {
      prevTrack = [track[0], [[track[1], track[2]]]];
      continue;
    }

    if (prevTrack[0] !== track[0]) {
      exclude += getRowExclude(prevTrack[1]);
      prevTrack = [track[0], [[track[1], track[2]]]];
      continue;
    }

    prevTrack = [track[0], [...prevTrack[1], [track[1], track[2]]]];
  }

  if (prevTrack.length > 0) exclude += getRowExclude(prevTrack[1]);

  let res = BigInt(n) * BigInt(m) - BigInt(exclude);

  return res;
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
