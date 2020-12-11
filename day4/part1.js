const fs = require("fs");
const readline = require("readline");
const readInterface = readline.createInterface({
  input: fs.createReadStream("./input.txt"),
  console: false,
});

const passports = [];

let passportIndex = 0;
let validPassports = 0;

const checkPassport = () => {
  const keys = Object.keys(passports[passportIndex]);
  const keysLength = keys.length;
  if (keysLength >= 8 || (keysLength === 7 && !keys.includes("cid"))) {
    validPassports++;
  }
  console.log("Valid Passports", validPassports);
};

readInterface
  .on("line", function (line) {
    if (!line.length) {
      checkPassport();
      passportIndex++;
      return;
    }

    const regx = new RegExp(/(.[a-z].):(.\S*)/g);
    let match = regx.exec(line);

    while (match != null) {
      const [input, key, value] = match;
      passports[passportIndex] = {
        ...passports[passportIndex],
        [key]: value,
      };
      match = regx.exec(line);
    }
  })
  .on("close", checkPassport);
