const { Before, Given, When, Then } = require("cucumber");
const { character } = require("../../lib/Character");
const { expect } = require("chai");
const { coordinate } = require("../../lib/Coordinate");
const { fail } = require("assert");

Then("{word} should belong to no faction", function (name) {
  const myFactions = this.characters[name].factions();
  expect(myFactions).to.be.empty;
});

When("{word} joins faction {string}", function (name, faction) {
  this.characters[name].joinFaction(faction)
});

Then("{word} should belong to {int} faction", function (name, expected) {
  const myFactions = this.characters[name].factions();
  expect(myFactions).to.have.length(expected);
});

