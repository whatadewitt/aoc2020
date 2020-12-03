const { readLines } = require("../helpers");

async function solve() {
  const data = await readLines("./input.txt");

  let x = 0;
  let hits = 0;
  for (let y = 0; y < data.length; y++) {
    if (data[y].charAt(x) === "#") {
      hits++;
    }

    x = (x + 3) % data[y].length;
  }

  console.log(hits);
}

solve();
