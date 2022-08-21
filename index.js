const { check } = require("./src/solve");
require("dotenv").config();
const { mazeOption } = require("./src/config/setting");

const final = check(mazeOption.maze, mazeOption.kickOff, mazeOption.pattern);

console.log(`The solution of the maze:`);
console.log(final);
