const { Before, Given, When, Then } = require("cucumber");
const { character } = require("../../lib/Character");
const { expect } = require("chai");
const { coordinate } = require("../../lib/Coordinate");
const { fail } = require("assert");

When("{word} heals {word} {int}", function (subject, recipient, heal) {
  if ("themself" === recipient) {
    this.characters[subject].heal({ heal });
  } else {
    const target = this.characters[recipient]
    this.characters[subject].heal({ target, heal });
  }
});

