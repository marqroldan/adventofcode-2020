const fs = require("fs");
const readline = require("readline");
const readInterface = readline.createInterface({
  input: fs.createReadStream("./input.txt"),
  console: false,
});

let highestSeatID = 0;
readInterface
  .on("line", function (line) {
    if (line.length === 10) {
      const regx = new RegExp(/((F|B){7})((R|L){3})/g);
      const matches = regx.exec(line);
      if (matches) {
        const [input, rowString, rs1, colString, cs1] = matches;

        let row,
          col,
          rowMin = 0,
          rowMax = 127,
          colMin = 0,
          colMax = 7;

        for (let i = 0; i < rowString.length; i++) {
          if (rowString[i] === "F") {
            rowMax = rowMin + Math.floor((rowMax - rowMin) / 2);
            if (i === rowString.length - 1) {
              row = rowMax;
            }
          } else if (rowString[i] === "B") {
            rowMin = rowMin + Math.ceil((rowMax - rowMin) / 2);
            if (i === rowString.length - 1) {
              row = rowMin;
            }
          }
        }

        for (let i = 0; i < colString.length; i++) {
          if (colString[i] === "L") {
            colMax = colMin + Math.floor((colMax - colMin) / 2);
            if (i === colString.length - 1) {
              col = colMax;
            }
          } else if (colString[i] === "R") {
            colMin = colMin + Math.ceil((colMax - colMin) / 2);
            if (i === colString.length - 1) {
              col = colMin;
            }
          }
        }

        const seatID = row * 8 + col;
        console.log("Row test", line, row, col, seatID);
        if (seatID >= highestSeatID) {
          highestSeatID = seatID;
        }
      }
    }
  })
  .on("close", () => {
    console.log("Highest Seat ID: ", highestSeatID);
  });
