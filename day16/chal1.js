const { readLines } = require("../helpers");

async function solve() {
  let data = await readLines("./input.txt");

  // build rule set
  // 20 rules
  let valid = [];
  for (let i = 0; i < 20; i++) {
    let [, rules] = data[i].split(": ");
    // making a pretty big assumption here...
    let [set1, set2] = rules.split(" or ");

    let [set1Min, set1Max] = set1.split("-");
    let [set2Min, set2Max] = set2.split("-");

    for (let j = set1Min; j <= set1Max; j++) {
      valid.push(parseInt(j, 10));
    }

    for (let j = set2Min; j <= set2Max; j++) {
      valid.push(parseInt(j, 10));
    }
  }

  // sort for simplicity...
  valid = [...new Set(valid)].sort((a, b) => (a < b ? -1 : 1));
  const min = valid[0];
  const max = valid[valid.length - 1];

  let count = 0;
  // ticket input starts at 24...
  for (let i = 25; i < data.length; i++) {
    const ticket = data[i].split(",").map((n) => parseInt(n, 10));

    for (let j = 0; j < ticket.length; j++) {
      if (ticket[j] < min) {
        count += ticket[j];
      } else if (ticket[j] > max) {
        count += ticket[j];
      } else if (!valid.includes(ticket[j])) {
        console.log("miss", ticket[j]);
        count += ticket[j];
      }
    }
  }

  console.log(count);
}

solve();
