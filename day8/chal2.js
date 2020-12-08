const { readLines } = require("../helpers");

async function solve() {
  const data = await readLines("./input.txt");

  let iterator = 0;
  let attempts = {};
  let acc = 0;

  while (iterator < data.length) {
    iterator = 0;
    acc = 0;
    let hash = {};
    let swapped = false;

    while (!hash[iterator] && iterator < data.length) {
      hash[iterator] = true;
      const [ins, val] = data[iterator].split(" ");

      switch (true) {
        case /jmp/.test(ins):
          if (!attempts[iterator] && !swapped) {
            // swap to a nop
            swapped = !swapped;
            attempts[iterator] = true;
            iterator++;
          } else {
            iterator += parseInt(val, 10);
          }
          break;
        case /acc/.test(ins):
          acc += parseInt(val, 10);
          iterator++;
          break;
        case /nop/.test(ins):
          if (!attempts[iterator] && !swapped) {
            // swap to a jmp
            swapped = !swapped;
            attempts[iterator] = true;
            iterator += parseInt(val, 10);
          } else {
            iterator++;
          }
          break;
      }
    }
  }

  console.log(acc);
}

solve();
