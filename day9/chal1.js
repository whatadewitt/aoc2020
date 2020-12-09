const { readLines } = require("../helpers");

const PREAMBLE_LENGTH = 25;

async function solve() {
  let data = await readLines("./input.txt");
  data = data.map((x) => parseInt(x, 10));

  for (let i = PREAMBLE_LENGTH; i < data.length; i++) {
    const n = data[i];

    const preamble = [...data].splice(i - PREAMBLE_LENGTH, PREAMBLE_LENGTH);

    let x = preamble.pop();
    let found = false;
    while (preamble.length) {
      const y = preamble.find((j) => j == n - x);

      if (y) {
        found = true;
        preamble.length = 0;
      }

      x = preamble.pop();
    }

    if (!found) {
      console.log(n);
      process.exit(0);
    }
  }
}

solve();
