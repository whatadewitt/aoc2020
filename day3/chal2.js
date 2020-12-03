const { readLines } = require("../helpers");

async function solve() {
  const data = await readLines("./input.txt");

  const slopes = [
    {
      right: 1,
      down: 1,
    },
    {
      // we already know this answer...
      right: 3,
      down: 1,
    },
    {
      right: 5,
      down: 1,
    },
    {
      right: 7,
      down: 1,
    },
    {
      right: 1,
      down: 2,
    },
  ];

  let totalHits = [];
  for (let i = 0; i < slopes.length; i++) {
    let hits = 0;
    let x = 0;

    for (let y = 0; y < data.length; y += slopes[i].down) {
      if (data[y].charAt(x) === "#") {
        hits++;
      }

      x = (x + slopes[i].right) % data[y].length;
    }

    totalHits.push(hits);
  }

  console.log(totalHits.reduce((acc, curr) => acc * curr, 1));
}

solve();
