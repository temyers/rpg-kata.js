// cucumber.js
let common = [
  // 'features/**/*.feature', // Specify our feature files
  '--require-module ts-node/register', // Load TypeScript module
  // '--require step-definitions/**/*.ts', // Load step definitions
  '--format summary', // Load custom formatter
  '--format progress', // Load custom formatter
  // '--format node_modules/cucumber-pretty', // Load custom formatter
  `--format-options '{"snippetInterface": "synchronous"}'`
].join(' ');


module.exports = {
  default: common
}
