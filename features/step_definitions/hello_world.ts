const { Before, Given, When, Then } = require('cucumber')
import {expect} from 'chai'
import { helloWorld } from '../../lib/hello-world';

let result 
When('I shout', function () {
  result = helloWorld()
});

Then('I should hear Hello World', function () {
  expect(result).to.equal("hello world")
});