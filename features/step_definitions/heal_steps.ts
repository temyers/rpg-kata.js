import { MyWorld } from "../support/world";

const { Before, Given, When, Then } = require("cucumber");
const { character } = require("../../lib/Character");
const { expect } = require("chai");
const { coordinate } = require("../../lib/Coordinate");
const { fail } = require("assert");

When("{word} heals {word} {int}", function (
  this: MyWorld,
  subject: string,
  recipient: string,
  heal: number
) {
  if ("themself" === recipient) {
    this.characters[subject].heal({ heal });
  } else {
    const target = this.characters[recipient];
    this.characters[subject].heal({ target, heal });
  }
});
