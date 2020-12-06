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

  let max = -1;
  for (let i = 0; i < data.length; i++) {
    const id = findBinarySeatId(data[i]);

    if (id > max) {
      max = id;
    }
  }

  console.log(max);
}

solve();
