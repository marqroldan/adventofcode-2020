const fs = require("fs");
const readline = require("readline");
const readInterface = readline.createInterface({
  input: fs.createReadStream("./input.txt"),
  console: false,
});

let valid = 0;
readInterface.on("line", function (line) {
  const regx = new RegExp(/([0-9]*)-([0-9]*) ([a-z]): (.*)/g);
  const ans = regx.exec(line);

  const [originalLine, min, max, char, password] = ans;

  if (
    (password[min - 1] === char && password[max - 1] !== char) ||
    (password[min - 1] !== char && password[max - 1] === char)
  ) {
    valid = valid + 1;
    console.log("Valid Items so far", valid);
  }
});
