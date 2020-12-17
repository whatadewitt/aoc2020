const { readLines } = require("../helpers");

async function solve() {
  let data = await readLines("./input.txt");

  // build rule set
  // 20 rules
  let ruleSet = {};
  let valid = [];

  for (let i = 0; i < 20; i++) {
    let [label, rules] = data[i].split(": ");
    // making a pretty big assumption here...
    let [set1, set2] = rules.split(" or ");

    let [lowerMin, lowerMax] = set1.split("-");
    let [upperMin, upperMax] = set2.split("-");

    ruleSet[label] = { lowerMin, lowerMax, upperMin, upperMax };

    // could clean this up but it was already done in step 1...
    for (let j = lowerMin; j <= lowerMax; j++) {
      valid.push(parseInt(j, 10));
    }

    for (let j = upperMin; j <= upperMax; j++) {
      valid.push(parseInt(j, 10));
    }
  }

  // sort for simplicity...
  valid = [...new Set(valid)].sort((a, b) => (a < b ? -1 : 1));
  const min = valid[0];
  const max = valid[valid.length - 1];

  // ticket input starts at 25...
  const validTickets = [];
  for (let i = 25; i < data.length; i++) {
    const ticket = data[i].split(",").map((n) => parseInt(n, 10));
    let isValid = true;

    for (let j = 0; j < ticket.length; j++) {
      if (ticket[j] < min) {
        isValid = false;
        break;
      } else if (ticket[j] > max) {
        isValid = false;
        break;
      } else if (!valid.includes(ticket[j])) {
        console.log("miss", ticket[j]);
        isValid = false;
        break;
      }
    }

    if (isValid) {
      validTickets.push(ticket);
    }
  }

  const ruleMappings = {};
  // Object.keys(ruleSet).forEach((key) => {
  //   ruleMappings[key] = [];
  //   for (let i = 0; i < 20; i++) {
  //     // 20 is rule count
  //     ruleMappings[key].push(i);
  //   }
  // });

  const indexMappings = [];
  for (let i = 0; i < 20; i++) {
    indexMappings.push(validTickets.map((ticket) => ticket[i]));
  }

  Object.keys(ruleSet).forEach((key, idx) => {
    const { lowerMin, lowerMax, upperMin, upperMax } = ruleSet[key];

    for (let i = 0; i < indexMappings.length; i++) {
      const invalid = indexMappings[i].find(
        (n) => n < lowerMin || n > upperMax || (n < upperMin && n > lowerMax)
      );
      if (!invalid) {
        if (!ruleMappings[key]) {
          ruleMappings[key] = [];
        }

        ruleMappings[key].push(i);
      }
    }
  });

  // for fun... because this was fuckin' cool...
  console.log(
    Object.values(ruleMappings)
      .map((v) => v.length)
      .sort((a, b) => a - b)
  );

  const toRemove = [];
  for (let i = 1; i <= 20; i++) {
    let [ruleLabel, ruleVals] = Object.entries(ruleMappings).find(
      ([key, val]) => {
        return val.length === i;
      }
    );

    ruleVals = ruleVals.filter((n) => !toRemove.includes(n));
    toRemove.push(...ruleVals);

    ruleMappings[ruleLabel] = ruleVals.pop();
  }

  // now i have the rules with their mappings, just need to use my ticket
  const myTicket = data[22].split(",").map((n) => parseInt(n, 10));
  let result = 1;

  Object.keys(ruleMappings).forEach((k) => {
    if (/departure/.test(k)) {
      console.log(k);
      result *= myTicket[ruleMappings[k]];
    }
  });

  console.log(result);
}

solve();
