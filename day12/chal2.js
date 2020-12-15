const { readLines } = require("../helpers");

async function solve() {
  const data = await readLines("./input.txt");

  const regex = new RegExp(/(\D)(\d*)/);
  let waypoints = {
    N: 1,
    E: 10,
    S: 0,
    W: 0,
  };
  let compass = {
    N: 0,
    E: 0,
    S: 0,
    W: 0,
  };
  let waypointX = "E";
  let waypointY = "N";

  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);

    const [, dir, count] = regex.exec(data[i]);
    const val = parseInt(count, 10);

    if ("F" === dir) {
      const pos = {
        x: waypoints.E - waypoints.W,
        y: waypoints.N - waypoints.S,
      };
      let dirX, dirY;

      if (pos.x > 0) {
        dirX = "E";
      } else if (pos.x < 0) {
        dirX = "W";
      } else {
        dirX = "X";
      }

      if (pos.y > 0) {
        dirY = "N";
      } else if (pos.y < 0) {
        dirY = "S";
      } else {
        dirY = "X";
      }

      console.log(dirX, dirY);

      if (dirX !== "X") {
        compass[dirX] += Math.abs(pos.x) * val;
      }

      if (dirY !== "X") {
        compass[dirY] += Math.abs(pos.y) * val;
      }
    } else if ("R" === dir || "L" === dir) {
      const turn = count / 90;
      const vals = Object.values(waypoints); // always going to be N E S W

      // surely there's a better way here...
      console.log(`PRE TURN ${turn}${dir}: `, waypoints);
      if ("R" === dir) {
        waypoints = {
          N: vals[(-turn + vals.length) % 4],
          E: vals[(1 - turn + vals.length) % 4],
          S: vals[(2 - turn + vals.length) % 4],
          W: vals[(3 - turn + vals.length) % 4],
        };
      } else {
        waypoints = {
          N: vals[(turn - 4 + vals.length) % 4],
          E: vals[(turn - 3 + vals.length) % 4],
          S: vals[(turn - 2 + vals.length) % 4],
          W: vals[(turn - 1 + vals.length) % 4],
        };
      }
      console.log("POST", waypoints);
    } else {
      waypoints[dir] += val;
    }

    console.log("STEP", i);
    console.log("C", compass);
    console.log("W", waypoints);
  }

  console.log(compass);
  console.log(
    Math.abs(compass.E - compass.W) + Math.abs(compass.N - compass.S)
  );
}

solve();
