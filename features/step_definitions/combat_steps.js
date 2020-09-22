const assert = require("assert");
const { Before, Given, When, Then } = require("cucumber");
const { character } = require("../../lib/Character");
const { expect } = require("chai");

var characters = {};

Given("characters Bill, Ben have been created", function () {
  characters.Bill = character();
  characters.Ben = character();
});

Given('{word} is level {int}', function (name,level) {
  characters[name].level = Number(level)
});

Then("{word}'s level should be {int}", function (name, level) {
  expect(characters[name].level).to.equal(level);
});


When('{word} attacks {word} with {int} damage', function (subject,target,damage) {
  characters[subject].attack({ target: characters[target], damage });
});

When('{word} heals themself {int}', function (subject,heal) {
  characters[subject].heal({ heal });
});

Then("{word}'s health should be {int}", function (name,health) {
  expect(characters[name].health).to.equal(health)
});

Given('{word} has {int} health', function (name,health) {
  characters[name].health = health
});

Given('{word} has died', function (name) {
  characters[name].kill()
});

Then('{word} should be dead', function (name) {
  expect(characters[name].isAlive).to.be.false
});

Then('{word} should be alive', function (name) {
  expect(characters[name].isAlive).to.be.true
});