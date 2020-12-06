const { readLines } = require("../helpers");

function isValid(p) {
  const vals = p.split(" ");

  for (let i = 0; i < vals.length; i++) {
    const [prop, val] = vals[i].split(":");
    switch (prop) {
      case "byr":
        if (parseInt(val, 10) < 1920 || parseInt(val, 10) > 2002) {
          return false;
        }

        break;
      case "iyr":
        if (parseInt(val, 10) < 2010 || parseInt(val, 10) > 2020) {
          return false;
        }

        break;
      case "eyr":
        if (parseInt(val, 10) < 2020 || parseInt(val, 10) > 2030) {
          return false;
        }

        break;
      case "hgt":
        if (/in/.test(val)) {
          const height = parseInt(val.slice(0, -2), 10);
          if (height < 59 || height > 76) {
            return false;
          }
        } else if (/cm/.test(val)) {
          const height = parseInt(val.slice(0, -2), 10);
          if (height < 150 || height > 193) {
            return false;
          }
        } else {
          return false;
        }

        break;
      case "hcl":
        if (!/^#(?:[0-9a-fA-F]{6})$/.test(val)) {
          return false;
        }

        break;
      case "ecl":
        // better way to stay "exact" in case of something like gry-blu?
        if (!["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(val)) {
          return false;
        }

        break;
      case "pid":
        if (val.length != 9) {
          return false;
        }

        break;
      default:
        break;
    }
  }

  return true;
}

async function solve() {
  const data = await readLines("./input.txt");

  let passport = "";
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] === "") {
      if (
        /^(?=.*\bbyr\b)(?=.*\biyr\b)(?=.*\beyr\b)(?=.*\bhgt\b)(?=.*\bhcl\b)(?=.*\becl\b)(?=.*\bpid\b).*$/.test(
          passport
          // probably a better way but to hell with regex
        ) &&
        isValid(passport)
      ) {
        count++;
      }

      passport = "";
    } else {
      passport += ` ${data[i]}`;
    }
  }

  console.log(count);
}

solve();
