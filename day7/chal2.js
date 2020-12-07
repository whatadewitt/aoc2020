const { readLines } = require("../helpers");

function getInsideBags(bags, color) {
  let total = 1;

  if ("no other" === color) {
    return 0;
  }

  for (let i = 0; i < bags[color].length; i++) {
    const count = bags[color][i].match(/\d/g);

    total +=
      count * getInsideBags(bags, bags[color][i].replace(/[0-9]/, "").trim());
  }

  return total;
}

async function solve() {
  const data = await readLines("./input.txt");

  const bags = {};
  for (let i = 0; i < data.length; i++) {
    const [bag, contains] = data[i].split("bags contain ");

    bags[bag.trim()] = contains
      .split(",")
      .map((b) =>
        b.replace("bags", "bag").replace("bag", "").replace(".", "").trim()
      );
  }

  console.log(getInsideBags(bags, "shiny gold") - 1); // -1 we don't count our shiny bag...
}

solve();
