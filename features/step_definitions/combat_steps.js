const { Before, Given, When, Then } = require("cucumber");
const { character } = require("../../lib/Character");
const { expect } = require("chai");
const { coordinate } = require("../../lib/Coordinate");
const { fail } = require("assert");

When('{word} attacks {word} with {int} damage', performAttack);

function performAttack(subject,target,damage) {
  this.characters[subject].attack({ target: this.characters[target], damage });

}

Then("{word}'s health should be {int}", thenCharactersHealthShouldBe);
Then("{word} health should be {int}", thenCharactersHealthShouldBe);

function thenCharactersHealthShouldBe(name,health){
  expect(this.characters[name].health).to.equal(health)

}

Given('{word} has {int} health', function (name,health) {
  this.characters[name].health = health
});

Given('{word} has died', function (name) {
  this.characters[name].kill()
});

Then('{word} should be dead', function (name) {
  expect(this.characters[name].isAlive).to.be.false
});

Then('{word} should be alive', function (name) {
  expect(this.characters[name].isAlive).to.be.true
});
