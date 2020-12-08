const { readLines } = require("../helpers");

async function solve() {
  const data = await readLines("./input.txt");

  let acc = 0;
  let iterator = 0;
  let hash = {};

  while (!hash[iterator]) {
    hash[iterator] = true;
    const [ins, val] = data[iterator].split(" ");

    switch (true) {
      case /jmp/.test(ins):
        iterator += parseInt(val, 10);
        break;
      case /acc/.test(ins):
        acc += parseInt(val, 10);
      case /nop/.test(ins):
        iterator++;
        break;
    }
  }

  console.log(acc);
}

solve();
