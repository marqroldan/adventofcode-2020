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
    questionsCount: {};
  }
  */
};
let index = 0;
readInterface
  .on("line", function (line) {
    if (!line.length) {
      index++;
      return;
    }
    if (!data[index]) {
      data[index] = {
        peopleCount: 0,
        questions: [],
        questionsCount: {},
      };
    }
    data[index].peopleCount++;

    line.split("").map((item) => {
      if (!data[index].questionsCount[item]) {
        data[index].questionsCount[item] = 0;
      }
      data[index].questionsCount[item]++;
      if (!data[index].questions.includes(item)) {
        data[index].questions.push(item);
      }
    });
  })
  .on("close", () => {
    const totalQuestionCount = Object.values(data).reduce((acc, item) => {
      return (
        acc +
        Object.values(item.questionsCount).reduce((acc, itemValue) => {
          return acc + (itemValue === item.peopleCount ? 1 : 0);
        }, 0)
      );
    }, 0);
    console.log(totalQuestionCount);
  });
