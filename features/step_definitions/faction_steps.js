const { Before, Given, When, Then } = require("cucumber");
const { character } = require("../../lib/Character");
const { expect } = require("chai");

Then("{word} should belong to no faction", function (name) {
  const myFactions = this.characters[name].factions();
  expect(myFactions).to.be.empty;
});

When("{word} joins faction {string}", function(name,faction){
  joinFaction(this,name,faction)
});

function joinFaction(world, name, faction) {
  world.characters[name].joinFaction(faction);
}

When("{word} joins Factions", function (name, dataTable) {
  dataTable.hashes().forEach((row) => {
    joinFaction(this,name, row.faction);
  });
});

Then("{word} should belong to {int} faction", shouldBelongToFactions);
Then("{word} should belong to {int} factions", shouldBelongToFactions);

function shouldBelongToFactions(name, expected) {
  const myFactions = this.characters[name].factions();
  expect(myFactions).to.have.length(expected);
}
