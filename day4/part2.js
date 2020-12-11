const fs = require("fs");
const readline = require("readline");
const readInterface = readline.createInterface({
  input: fs.createReadStream("./input.txt"),
  console: false,
});

const passports = [];

let passportIndex = 0;
let validPassports = 0;

const validators = {
  byr: (value) => {
    try {
      const parsedValue = parseInt(value);
      return parsedValue >= 1920 && parsedValue <= 2002;
    } catch (e) {
      return false;
    }
  },
  iyr: (value) => {
    try {
      const parsedValue = parseInt(value);
      return parsedValue >= 2010 && parsedValue <= 2020;
    } catch (e) {
      return false;
    }
  },
  eyr: (value) => {
    try {
      const parsedValue = parseInt(value);
      return parsedValue >= 2020 && parsedValue <= 2030;
    } catch (e) {
      return false;
    }
  },
  hgt: (value) => {
    const regx = new RegExp(/([0-9]+)(in|cm)/g);
    const matches = regx.exec(value);
    if (matches) {
      const [input, value, type] = matches;
      const parsedValue = parseInt(value);
      if (type === "cm") {
        return parsedValue >= 150 && parsedValue <= 193;
      } else if (type === "in") {
        return parsedValue >= 59 && parsedValue <= 76;
      }
    }
    return false;
  },
  hcl: (value) => {
    const regx = new RegExp(/#([a-zA-Z0-9]+)/g);
    const matches = regx.exec(value);
    if (matches) {
      const [input, hexValue] = matches;
      return hexValue.length === 6;
    }
    return false;
  },
  ecl: (value) => {
    const validColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    return validColors.includes(value);
  },
  pid: (value) => {
    const regx = new RegExp(/[0-9]*/g);
    const matches = regx.exec(value);
    if (matches) {
      const [matchValue] = matches;
      return matchValue.length === 9;
    }
    return false;
  },
};

const checkPassport = () => {
  const keys = Object.keys(passports[passportIndex]);
  const keysLength = keys.length;
  let valid = true;
  if (keysLength >= 8 || (keysLength === 7 && !keys.includes("cid"))) {
    valid = keys.reduce((acc, key) => {
      if (validators[key]) {
        acc = acc && validators[key](passports[passportIndex][key]);
      }
      return acc;
    }, true);
    if (valid) {
      validPassports++;
    }
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
