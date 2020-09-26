import { MyWorld } from "../support/world";

const { Before, Given, When, Then } = require("cucumber");
const { character } = require("../../lib/Character");
const { expect } = require("chai");

Then("{word} should belong to no faction", function (
  this: MyWorld,
  name: string
) {
  const myFactions = this.characters[name].factions();
  expect(myFactions).to.be.empty;
});

Given("{word} is a member of faction {string}", function (
  this: MyWorld,
  name: string,
  faction: string
) {
  joinFaction(this, name, faction);
});
When("{word} joins faction {string}", function (
  this: MyWorld,
  name: string,
  faction: string
) {
  joinFaction(this, name, faction);
});

When("{word} leaves faction {string}", function (
  this: MyWorld,
  name: string,
  faction: string
) {
  this.characters[name].leaveFaction(faction);
});

function joinFaction(world: MyWorld, name: string, faction: string) {
  world.characters[name].joinFaction(faction);
}

When("{word} joins Factions", function (
  this: MyWorld,
  name: string,
  dataTable: any
) {
  dataTable.hashes().forEach((row: any) => {
    joinFaction(this, name, row.faction);
  });
});

Then("{word} should belong to {int} faction", shouldBelongToFactions);
Then("{word} should belong to {int} factions", shouldBelongToFactions);

function shouldBelongToFactions(this: MyWorld, name: string, expected: number) {
  const myFactions = this.characters[name].factions();
  expect(myFactions).to.have.length(expected);
}

Given("{word} and {word} are allies", function (
  this: MyWorld,
  subject: string,
  target: string
) {
  const faction = "Blood Brothers";

  joinFaction(this, subject, faction);
  joinFaction(this, target, faction);
});

Given("{word} and {word} are enemies", function (
  this: MyWorld,
  subject: string,
  target: string
) {
  joinFaction(this, subject, "ATeam");
  joinFaction(this, target, "BTeam");

  const c1 = this.characters[subject];
  const c2 = this.characters[target];
  expect(c1.isAlly(c2)).to.be.false;
});

Then("{word} and {word} should be allies", function (
  this: MyWorld,
  subject: string,
  target: string
) {
  const c1 = this.characters[subject];
  const c2 = this.characters[target];
  expect(c1.isAlly(c2)).to.be.true;
});
