const fs = require("fs");
const readline = require("readline");
const readInterface = readline.createInterface({
  input: fs.createReadStream("./input.txt"),
  console: false,
});

const xMove = 3;
const yMove = 1;

let currX = 0;
let currY = 0;
let numberOfTrees = 0;
let it = 0;
readInterface.on("line", function (line) {
  currX = currX + xMove;

  if (currY === yMove) {
    let index = (currX - xMove) % line.length;
    if (line[index] === "#") {
      numberOfTrees++;
    }
    console.log("Number of trees", numberOfTrees);
  } else {
    currY = yMove;
  }

  it++;
});
