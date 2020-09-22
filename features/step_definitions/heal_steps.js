const { Before, Given, When, Then } = require("cucumber");
const { character } = require("../../lib/Character");
const { expect } = require("chai");
const { coordinate } = require("../../lib/Coordinate");
const { fail } = require("assert");

When('{word} heals themself {int}', function (subject,heal) {
  this.characters[subject].heal({ heal });
});
