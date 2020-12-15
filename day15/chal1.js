const { readLines } = require("../helpers");

async function solve(turns) {
  let data = await (await readLines("./input.txt")).pop();
  data = data.split(",").map((i) => parseInt(i, 10));

  const hash = {};
  const history = [];
  let it = 0;

  while (history.length < turns) {
    if (history.length < data.length) {
      history.push(data[history.length]);
    } else {
      let last = history[history.length - 1];
      let lastIndex = history.lastIndexOf(last);
      let prevIndex = history.slice(0, lastIndex).lastIndexOf(last);

      if (prevIndex === -1) {
        // it was just called
        history.push(0);
      } else {
        history.push(Math.abs(lastIndex - prevIndex)); // abs prob not necessary here...
      }
    }
  }

  console.log(history.pop());
}

solve(2020);
