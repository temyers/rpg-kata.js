import { helloWorld } from "../lib/hello-world"
import {expect} from 'chai'

describe("hello-world", () => {
  it("should return hello world", () => {
    expect(helloWorld()).to.equal("hello world")
  })
})