const { readLines } = require("../helpers");

const PREAMBLE_LENGTH = 25;

async function solve() {
  let data = await readLines("./input.txt");
  data = data.map((x) => parseInt(x, 10));
  let n, i;

  for (i = PREAMBLE_LENGTH; i < data.length; i++) {
    n = data[i];
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
      break;
    }
  }

  found = false;
  let acc,
    min,
    max = 0;
  let iterator = 0;

  while (!found && iterator < i) {
    acc = min = max = 0;

    for (let j = iterator; j < i; j++) {
      if (min === 0 || data[j] < min) {
        min = data[j];
      }

      if (max === 0 || data[j] > max) {
        max = data[j];
      }

      acc += data[j];

      if (acc === n) {
        found = true;
        console.log(min, max, min + max);
        process.exit();
      } else if (acc > n) {
        break;
      }
    }

    iterator++;
  }
}

solve();
