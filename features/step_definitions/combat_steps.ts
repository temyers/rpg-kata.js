import { MyWorld } from "../support/world";

const { Before, Given, When, Then } = require("cucumber");
const { character } = require("../../lib/Character");
const { expect } = require("chai");
const { coordinate } = require("../../lib/Coordinate");
const { fail } = require("assert");

When("{word} attacks {word} with {int} damage", performAttack);

function performAttack(
  this: MyWorld,
  subject: string,
  target: string,
  damage: number
) {
  this.characters[subject].attack({ target: this.characters[target], damage });
}

Then("{word}'s health should be {int}", thenCharactersHealthShouldBe);

function thenCharactersHealthShouldBe(
  this: MyWorld,
  name: string,
  health: string
) {
  expect(this.characters[name].health).to.equal(health);
}

Given("{word} has {int} health", function (
  this: MyWorld,
  name: string,
  health: number
) {
  this.characters[name].health = health;
});

Given("{word} has died", function (this: MyWorld, name: string) {
  this.characters[name].kill();
});

Then("{word} should be dead", function (this: MyWorld, name: string) {
  expect(this.characters[name].isAlive).to.be.false;
});

Then("{word} should be alive", function (this: MyWorld, name: string) {
  expect(this.characters[name].isAlive).to.be.true;
});
