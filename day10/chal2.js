const { readLines } = require("../helpers");

let combinations = [1];

// recursion works but dont work...
// function findArrangements(dict, key) {
//   if (key === 0) {
//     console.log(combinations++);
//     combinations++;
//     return [];
//   }

//   const vals = dict[key];
//   let arrangement = [];

//   if (vals.length === 1) {
//     arrangement = [...findArrangements(dict, vals[0]), vals[0]];
//   } else {
//     for (let i = 0; i < vals.length; i++) {
//       arrangement = [...findArrangements(dict, vals[i]), vals[i]];
//     }
//   }

//   return arrangement;
// }

function iterate(data, index, jolt) {
  return data[index - jolt] >= data[index] - 3
    ? Number(combinations[index - jolt])
    : 0;
}

async function solve() {
  let data = await readLines("./input.txt");
  data = data.map((x) => parseInt(x, 10)).sort((a, b) => (a < b ? -1 : 1));

  data.unshift(0);

  // add my adapter to the end of the list -- not needed?
  data.push(data[data.length - 1] + 3);

  // const dict = {};

  // for (let i = 0; i < data.length; i++) {
  //   dict[data[i]] = data.filter((n) => {
  //     return n !== data[i] && n >= data[i] - 3 && n <= data[i];
  //   });
  // }
  // const max = data[data.length - 1];
  // console.log(dict);

  // let arrangements = [1];
  // Object.keys(dict).forEach((key) => {
  //   if (dict[key].length === 2) {
  //     arrangements += 2;
  //   } else if (dict[key].length === 3) {
  //     arrangements += Math.pow(2, 2);
  //   }
  // });

  for (let i = 1; i < data.length; i++) {
    let count = iterate(data, i, 1) + iterate(data, i, 2) + iterate(data, i, 3);
    combinations.push(count);
  }

  // const arrangements = findArrangements(dict, max);
  console.log(combinations[combinations.length - 1]);
}

solve();
