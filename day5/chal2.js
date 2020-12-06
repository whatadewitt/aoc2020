const { readLines } = require("../helpers");

function getSeatId(row, col) {
  return row * 8 + col;
}

function getVal(code) {
  const directions = code.split("");

  let val = 0;
  while (directions.length) {
    if ("F" !== directions[0] && "L" !== directions[0]) {
      val += Math.pow(2, directions.length) / 2;
    }

    directions.shift();
  }

  return val;
}

function findBinarySeatId(code) {
  const row = getVal(code.slice(0, -3));
  const col = getVal(code.slice(-3));

  return getSeatId(row, col);
}

async function solve() {
  const data = await readLines("./input.txt");

  let ids = [];
  for (let i = 0; i < data.length; i++) {
    ids.push(findBinarySeatId(data[i]));
  }

  ids = ids.sort();

  for (let i = 1; i < ids.length; i++) {
    if (ids[i - 1] !== ids[i] - 1 && ids[i + 1] !== ids[i] + 1) {
      console.log(ids[i - 1], ids[i + 1]);
    }
  }

  // solution ended up being ineligant as i had to parse the data...
}

solve();
