const fs = require("fs");
const readline = require("readline");
const readInterface = readline.createInterface({
  input: fs.createReadStream("./input.txt"),
  console: false,
});

const data = {
  /*
  [index] : {
    number of people in a group: number;
    answered questions: (a-z)[];
  }
  */
};
let index = 0;
readInterface
  .on("line", function (line) {
    if (!line.length) {
      index++;
    }
    if (!data[index]) {
      data[index] = {
        peopleCount: 0,
        questions: [],
      };
    }
    data[index].peopleCount++;

    line.split("").map((item) => {
      if (!data[index].questions.includes(item)) {
        data[index].questions.push(item);
      }
    });
  })
  .on("close", () => {
    const totalQuestionCount = Object.values(data).reduce((acc, item) => {
      return acc + item.questions.length;
    }, 0);
    console.log(totalQuestionCount);
  });
