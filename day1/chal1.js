const { readLines } = require("../helpers");

async function solve(result) {
  const data = await readLines("./input.txt");

  for (let i = 0; i < data.length; i++) {
    const n = data[i];
    const x = data.find((j) => j == result - n);

    if (x) {
      console.log(x, n);
      console.log(x * n);
      process.exit(0);
    }
  }
}

solve(2020);
