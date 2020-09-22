const assert = require("assert");
const { Before, Given, When, Then } = require("cucumber");
const { character } = require("../../lib/Character");
const { expect } = require("chai");

var myCharacter;

var characters = {};

When("I create a character", function () {
  myCharacter = character();
});

Then("the characters health should be {int}", function (health) {
  expect(myCharacter.health).to.equal(health);
});

Then("the characters level should be {int}", function (level) {
  expect(myCharacter.level).to.equal(level);
});

Then("the character should be alive", function () {
  expect(myCharacter.isAlive).to.equal(true);
});

Given("characters Bill, Ben have been created", function () {
  characters.Bill = character();
  characters.Ben = character();
});

When("Bill attacks Ben with {int} damage", function (damage) {
  characters.Bill.attack({ target: characters.Ben, damage });
});

When('Bill attacks Bill with damage {int}', function (damage) {
  characters.Bill.attack({ target: characters.Bill, damage });
});

When('Bill heals Ben {int}', function (heal) {
  characters.Bill.heal({ target: characters.Ben, heal });
});

Then("Ben's health should be {int}", function (health) {
  expect(characters.Ben.health).to.equal(health)
});

Then('Bill\'s health should be {int}', function (health) {
  expect(characters.Bill.health).to.equal(health)
});

Given('Ben has {int} health', function (health) {
  characters.Ben.health = health
});

Given('Ben has died', function () {
  characters.Ben.kill()
});

Then('Ben should be dead', function () {
  expect(characters.Ben.isAlive).to.be.false
});

Then('Ben should be alive', function () {
  expect(characters.Ben.isAlive).to.be.true
});