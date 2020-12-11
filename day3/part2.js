const fs = require("fs");
const readline = require("readline");
const readInterface = readline.createInterface({
  input: fs.createReadStream("./input.txt"),
  console: false,
});

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const slopes2 = [[3, 1]];

const config = {};

readInterface.on("line", function (line) {
  slopes.map((slopeConf) => {
    const id = `${slopeConf[0]}${slopeConf[1]}`;
    const xMove = slopeConf[0];
    const yMove = slopeConf[1];
    if (config[id] == null) {
      config[id] = {};
    }

    if (config[id].currX == null || config[id].currY == null) {
      config[id] = {
        currX: 0,
        currY: 0,
        numberOfTrees: 0,
      };
    }

    if (config[id].currY === yMove) {
      config[id].currX = config[id].currX + xMove;
      let index = (config[id].currX - xMove) % line.length;
      if (line[index] === "#") {
        config[id].numberOfTrees++;
      }
      config[id].currY = 1;
    } else {
      if (config[id].currY === 0) {
        config[id].currX = config[id].currX + xMove;
      }
      config[id].currY = config[id].currY + 1;
    }
  });

  const product = Object.values(config).reduce((acc, value) => {
    return acc * value.numberOfTrees;
  }, 1);
  console.log("Product", product);
});

///7050893616
///3615842880
///2983070376
