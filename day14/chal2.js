const { readLines } = require("../helpers");

function buildCombination(bin, positions, current = 0) {
  let zero = [...bin];
  let one = [...bin];

  zero[positions[current]] = "0";
  one[positions[current]] = "1";

  if (current < positions.length - 1) {
    current++;
    zero = buildCombination(zero, positions, current);
    one = buildCombination(one, positions, current);
  }

  return [zero, one];
}

function findCombinations(bin) {
  let positions = [];

  for (let i = 0; i < bin.length; i++) {
    if (bin[i] === "X") {
      positions.push(i);
    }
  }

  let bins = buildCombination(bin, positions, 0);

  // ... there should be a better way here...
  while (bins.length < Math.pow(2, positions.length)) {
    bins = bins.flat();
  }

  return bins;
}

function applyMask(mask, bin) {
  let maskedBin = [];

  for (let i = mask.length - 1; i >= 0; i--) {
    switch (mask[i]) {
      case "0":
        maskedBin.unshift(bin.charAt(i));
        break;
      case "X":
      case "1":
      default:
        maskedBin.unshift(mask.charAt(i));
        break;
    }
  }

  const maskedBins = [];

  if (/X/.test(maskedBin)) {
    maskedBins.push(findCombinations(maskedBin));
  } else {
    maskedBins.push(maskedBin);
  }

  return maskedBins.flat().map((bin) => bin2dec(bin));
}

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

function bin2dec(bstr) {
  return parseInt((bstr + "").replace(/[^01]/gi, ""), 2);
}

async function solve() {
  const data = await readLines("./input.txt");

  let mask;
  let mem = {};
  for (let i = 0; i < data.length; i++) {
    if (/mask/.test(data[i])) {
      mask = data[i].split("=").pop().trim();
    } else {
      let [directive, int] = data[i].split("=");
      let loc = /mem\[(\d*)\]/.exec(directive)[1];
      let bin = dec2bin(parseInt(loc, 10)).padStart(mask.length, "0");

      let locations = applyMask(mask, bin);

      for (let j = 0; j < locations.length; j++) {
        mem[locations[j]] = parseInt(int, 10);
      }
    }
  }

  console.log(Object.values(mem).reduce((acc, curr) => acc + curr, 0));
}

solve();
