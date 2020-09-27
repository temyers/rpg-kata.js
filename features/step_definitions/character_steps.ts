import { MyWorld } from "../support/world";

const { Given, Then } = require("cucumber");
const { expect } = require("chai");

Given("the following characters exist:", async function (
  this: MyWorld,
  dataTable: any
) {
  for (const row of dataTable.hashes()) {
    const charClass = row.class || "melee";
    this.characters[row.name] = this.factory.character(charClass);
  }
});

Given("the characters are at location:", function (
  this: MyWorld,
  dataTable: any
) {
  dataTable.hashes().forEach((row: any) => {
    this.characters[row.name].location(Number(row.x), Number(row.y));
  });
});

Given("{word} is level {int}", function (
  this: MyWorld,
  name: string,
  level: number
) {
  this.characters[name].level = Number(level);
});

Then("{word}'s level should be {int}", function (
  this: MyWorld,
  name: string,
  level: number
) {
  expect(this.characters[name].level).to.equal(level);
});
