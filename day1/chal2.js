const { readLines } = require("../helpers");

async function solve(result) {
  const data = await readLines("./input.txt");

  for (let i = 0; i < data.length; i++) {
    // there's a smarter way...
    for (let j = i; j < data.length; j++) {
      const n = data[i];
      const m = data[j];

      const x = data.find((j) => j == 2020 - n - m);

      if (x) {
        console.log(x, n, m);
        console.log(x * n * m);
        process.exit(0);
      }
    }
  }
}

solve(2020);
