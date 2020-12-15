const { readLines } = require("../helpers");

function inv(a, b) {
  const b0 = b;
  let [x0, x1] = [0, 1];

  if (b === 1) {
    return 1;
  }

  while (a > 1) {
    const q = Math.floor(a / b);
    [a, b] = [b, a % b];
    [x0, x1] = [x1 - q * x0, x0];
  }

  if (x1 < 0) {
    x1 += b0;
  }

  return x1;
}

function findMin(nums, rems) {
  // compute product of all numbers
  const prod = nums.reduce((acc, curr) => {
    return acc * curr;
  }, 1);

  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    let pp = Math.floor(prod / nums[i]);
    result += rems[i] * pp * inv(pp, nums[i]);
  }

  return result % prod;
}

async function solve() {
  const data = await readLines("./input.txt");

  let busses = data[1].split(",");

  const remainders = [];

  for (let i = 0; i < busses.length; i++) {
    if (busses[i] !== "x") {
      let id = parseInt(busses[i], 10);
      let remainder = id - i;
      while (remainder < 0) {
        remainder += id;
      }
      remainders.push(remainder % id);
    }
  }

  busses = busses.filter((id) => id !== "x").map((i) => parseInt(i, 10));

  console.log("Result:", findMin(busses, remainders));
}

solve();
