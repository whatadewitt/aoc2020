const { readLines } = require("../helpers");

function findBags(bags, color) {
  let possibilities = [];
  console.log("searching", color);
  Object.entries(bags).filter(([key, val]) => {
    if (val.includes(color)) {
      possibilities.push(key);
      console.log("pushing", key);
      possibilities.push(findBags(bags, key));
    }
  });

  return possibilities.flat();
}

async function solve() {
  const data = await readLines("./input.txt");

  const bags = {};
  for (let i = 0; i < data.length; i++) {
    const [bag, contains] = data[i].split("bags contain ");

    bags[bag.trim()] = contains
      .split(",")
      .map((b) =>
        b
          .replace(/[0-9]/, "")
          .replace("bags", "bag")
          .replace("bag", "")
          .replace(".", "")
          .trim()
      );
  }

  const possibilities = findBags(bags, "shiny gold");
  console.log(new Set(possibilities).size);
}

solve();
