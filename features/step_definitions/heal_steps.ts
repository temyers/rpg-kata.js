import { MyWorld } from "../support/world";

const { When } = require("cucumber");

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
