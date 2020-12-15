const { readLines } = require("../helpers");

async function solve() {
  const data = await readLines("./input.txt");

  let min = null;
  let minBus = null;

  const time = parseInt(data[0], 10);
  const busses = data[1]
    .split(",")
    .filter((id) => id !== "x")
    .map((i) => parseInt(i, 10));

  for (let i = 0; i < busses.length; i++) {
    const wait = Math.ceil(time / busses[i]) * busses[i] - time;
    console.log(busses[i], wait);
  }
}

solve();
