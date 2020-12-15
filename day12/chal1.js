const { readLines } = require("../helpers");

async function solve() {
  const data = await readLines("./input.txt");

  const regex = new RegExp(/(\D)(\d*)/);
  let compass = {
    N: 0,
    E: 0,
    S: 0,
    W: 0,
  };
  let facing = "E";

  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);

    const [, dir, count] = regex.exec(data[i]);

    if ("F" === dir) {
      compass[facing] += parseInt(count, 10);
    } else if ("R" === dir || "L" === dir) {
      const turn = count / 90;
      const dirs = Object.keys(compass);
      const idx = dirs.findIndex((d) => d === facing);
      if ("R" === dir) {
        facing = dirs[(idx + turn) % dirs.length];
      } else {
        facing = dirs[(idx + (dirs.length - turn)) % dirs.length];
      }
    } else {
      compass[dir] += parseInt(count, 10);
    }
  }

  console.log(
    Math.abs(compass.E - compass.W) + Math.abs(compass.N - compass.S)
  );
}

solve();
