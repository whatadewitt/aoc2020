const { readLines } = require("../helpers");

async function solve() {
  const data = await readLines("./input.txt");

  let count = 0;
  let ys = new Set();
  for (let i = 0; i < data.length; i++) {
    if (data[i] === "") {
      console.log(ys);
      count += ys.size;

      ys = new Set();
    } else {
      let card = data[i].split("");
      while (card.length) {
        ys.add(card.pop());
      }
    }
  }

  count += ys.size;

  console.log(count);
}

solve();
