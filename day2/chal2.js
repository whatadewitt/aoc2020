const { readLines } = require("../helpers");

function isValid(data) {
  let [rule, pass] = data.split(":");
  let [count, val] = rule.split(" ");
  let [char1, char2] = count.split("-");

  // because of the split, the 0 index is the space :D
  return (
    (pass[char1] === val && pass[char2] !== val) ||
    (pass[char1] !== val && pass[char2] === val)
  );
}

async function solve() {
  const data = await readLines("./input.txt");

  const valid = data.filter((p) => isValid(p));
  console.log(valid.length);
}

solve();
