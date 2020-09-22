const { Before, Given, When, Then } = require("cucumber");
const { character } = require("../../lib/Character");
const { expect } = require("chai");
const { coordinate } = require("../../lib/Coordinate");
const { fail } = require("assert");

Given('the following characters exist:', function (dataTable) {
  dataTable.hashes().forEach(row => {
    this.characters[row.name] = character(row.class)
  })
});

Given('the characters are at location:', function (dataTable) {
  dataTable.hashes().forEach(row => {
    this.characters[row.name].location(Number(row.x), Number(row.y))
  })
});

Given('{word} is level {int}', function (name,level) {
  this.characters[name].level = Number(level)
});

Then("{word}'s level should be {int}", function (name, level) {
  expect(this.characters[name].level).to.equal(level);
});
