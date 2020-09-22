const assert = require('assert')
const { Before, Given, When, Then } = require('cucumber')
const {character} = require('../../lib/Character')
const {expect} = require('chai')

var myCharacter;

When('I create a character', function () {
  myCharacter = character()
});

Then('the characters health should be {int}', function (health) {
  expect(myCharacter.health).to.equal(health)
});

Then('the characters level should be {int}', function (level) {
  expect(myCharacter.level).to.equal(level)
});

Then('the character should be alive', function () {
  expect(myCharacter.isAlive).to.equal(true)
});