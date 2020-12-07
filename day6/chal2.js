const { readLines } = require("../helpers");

async function solve() {
  const data = await readLines("./input.txt");

  let count = 0;
  let ys = {};
  let groupCount = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] === "") {
      count += Object.entries(ys).filter(([, val]) => val === groupCount)
        .length;

      ys = {};
      groupCount = 0;
    } else {
      let card = data[i].split("");
      while (card.length) {
        const val = card.pop();
        if (!ys[val]) {
          ys[val] = 0;
        }

        ys[val]++;
      }

      groupCount++;
    }
  }

  count += Object.entries(ys).filter(([, val]) => val === groupCount).length;

  console.log(count);
}

solve();
