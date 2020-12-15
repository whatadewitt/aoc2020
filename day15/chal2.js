const { readLines } = require("../helpers");

async function solve(turns) {
  let data = await (await readLines("./input.txt")).pop();
  data = data.split(",").map((i) => parseInt(i, 10));
  // let data = [0, 3, 6];

  const hash = {};
  let it = 0;
  let last;

  while (it < turns) {
    if (it < data.length) {
      hash[data[it]] = [it];
      last = data[it];
    } else {
      if (hash[last].length === 1) {
        // it was just called
        last = 0;
      } else {
        // take the last 2 times it was called and shout it out
        const prevIdx = hash[last][0];
        const lastIdx = hash[last][1];

        last = lastIdx - prevIdx;
      }

      if (!hash[last]) {
        hash[last] = [it];
      } else {
        hash[last] = [hash[last].pop(), it];
      }
    }

    it++;
  }

  console.log(last);
}

solve(30000000);
