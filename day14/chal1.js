const { readLines } = require("../helpers");

function applyMask(mask, bin) {
  let maskedBin = [];

  for (let i = mask.length - 1; i >= 0; i--) {
    // console.log(`M ${mask[i]} B ${bin[i]}`);
    if (mask[i] !== "X") {
      maskedBin.unshift(mask.charAt(i));
      // console.log("use mask");
    } else {
      maskedBin.unshift(bin.charAt(i));
      // console.log("use bin");
    }
  }

  return maskedBin.join("");
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
      let bin = dec2bin(parseInt(int, 10)).padStart(mask.length, "0");
      let loc = /mem\[(\d*)\]/.exec(directive)[0];

      mem[loc] = applyMask(mask, bin);
    }
  }

  console.log(Object.values(mem).reduce((acc, curr) => acc + bin2dec(curr), 0));
}

solve();
