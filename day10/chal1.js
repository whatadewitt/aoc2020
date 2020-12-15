const { readLines } = require("../helpers");

async function solve() {
  let data = await readLines("./input.txt");
  data = data.map((x) => parseInt(x, 10)).sort((a, b) => (a < b ? -1 : 1));

  const dict = {
    1: 0,
    2: 0,
    3: 0,
  };

  data.unshift(0);

  for (let i = 1; i < data.length; i++) {
    dict[data[i] - data[i - 1]]++;
  }

  // my device jolt
  dict[3]++;
  console.log(dict, dict[1] * dict[3]);
}

solve();
