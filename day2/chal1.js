const { readLines } = require("../helpers");

function isValid(data) {
  let [rule, pass] = data.split(":");
  let [count, val] = rule.split(" ");
  let [min, max] = count.split("-");

  const result = pass.match(new RegExp(val, "g"));
  return result && result.length >= min && result.length <= max;
}

async function solve() {
  const data = await readLines("./input.txt");

  const valid = data.filter((p) => isValid(p));
  console.log(valid.length);
}

solve();
