const fs = require("fs");
const readline = require("readline");

module.exports = {
  readLines: async (file) => {
    const data = [];

    const fileStream = fs.createReadStream(file);
    const rl = readline.createInterface({
      input: fileStream,
    });

    for await (const line of rl) {
      data.push(line);
    }

    return data;
  },
};
