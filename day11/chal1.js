const { readLines } = require("../helpers");

function printSeating(seats) {
  let str = "";
  for (let i = 0; i < seats.length; i++) {
    for (let j = 0; j < seats[i].length; j++) {
      str += seats[i][j];
    }
    str += "\n";
  }

  return str;
}

function getNeighbourCount(x, y, seats) {
  let count = 0;

  // on the top
  if (x - 1 >= 0 && seats[x - 1][y] === "#") {
    count++;
  }

  // on the bottom
  if (x + 1 < seats.length && seats[x + 1][y] === "#") {
    count++;
  }

  // on the left
  if (y - 1 >= 0 && seats[x][y - 1] === "#") {
    count++;
  }

  // on the right
  if (y + 1 <= seats[x].length && seats[x][y + 1] === "#") {
    count++;
  }

  // top left
  if (y - 1 >= 0 && x - 1 >= 0 && seats[x - 1][y - 1] === "#") {
    count++;
  }

  // bottom left
  if (y - 1 >= 0 && x + 1 < seats.length && seats[x + 1][y - 1] === "#") {
    count++;
  }

  // top right
  if (y + 1 <= seats[x].length && x - 1 >= 0 && seats[x - 1][y + 1] === "#") {
    count++;
  }

  // bottom right
  if (
    y + 1 <= seats[x].length &&
    x + 1 < seats.length &&
    seats[x + 1][y + 1] === "#"
  ) {
    count++;
  }

  return count;
}

function occupySeats(seats) {
  const newArrangement = [];

  for (let i = 0; i < seats.length; i++) {
    let row = [];
    for (let j = 0; j < seats[i].length; j++) {
      const pos = seats[i][j];
      const neighbours = getNeighbourCount(i, j, seats);
      if (pos === ".") {
        row.push(".");
        //newArrangement[i][j] = ".";
      } else if (pos === "#" && neighbours >= 4) {
        row.push("L");
        //newArrangement[i][j] = "L";
      } else if (pos === "L" && neighbours === 0) {
        row.push("#");
        //newArrangement[i][j] = "#";
      } else {
        row.push(pos);
        //newArrangement[i][j] = pos;
      }
    }

    newArrangement.push(row);
  }

  return newArrangement;
}

async function solve() {
  let data = await readLines("./input.txt");

  let seating = [];
  let prev = "";

  for (let i = 0; i < data.length; i++) {
    seating.push(data[i].split(""));
  }

  while (printSeating(seating) != prev) {
    prev = printSeating(seating);

    seating = occupySeats(seating);
  }

  console.log(printSeating(seating));

  console.log(seating.flat().filter((s) => s === "#").length);

  console.log("done");
}

solve();
