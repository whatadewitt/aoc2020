const { readLines } = require("../helpers");

async function solve() {
  const data = await readLines("./input.txt");

  // const passports = [];
  let passport = "";
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] === "") {
      // passports.push(passport.trim());
      if (
        /^(?=.*\bbyr\b)(?=.*\biyr\b)(?=.*\beyr\b)(?=.*\bhgt\b)(?=.*\bhcl\b)(?=.*\becl\b)(?=.*\bpid\b).*$/.test(
          passport
        )
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
