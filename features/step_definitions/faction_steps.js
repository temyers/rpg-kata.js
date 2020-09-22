const { Before, Given, When, Then } = require("cucumber");
const { character } = require("../../lib/Character");
const { expect } = require("chai");

Then("{word} should belong to no faction", function (name) {
  const myFactions = this.characters[name].factions();
  expect(myFactions).to.be.empty;
});

Given('{word} is a member of faction {string}', function (name,faction) {
  joinFaction(this,name,faction)
});
When("{word} joins faction {string}", function(name,faction){
  joinFaction(this,name,faction)
});

When('{word} leaves faction {string}', function (name,faction) {
  this.characters[name].leaveFaction(faction);
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

Given('{word} and {word} are allies', function (subject,target) {
  const faction = "Blood Brothers"

  joinFaction(this,subject,faction)
  joinFaction(this,target,faction)
});

Then('{word} and {word} should be allies', function (subject,target) {
  const c1 = this.characters[subject]
  const c2 = this.characters[target]
  expect(c1.isAlly(c2)).to.be.true
});
