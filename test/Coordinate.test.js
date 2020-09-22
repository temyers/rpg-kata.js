const { coordinate } = require("../lib/Coordinate")
const { expect } = require("chai")

describe("coordinate", () => {
  it("should calculate the distance from itself", () => {
    const a = coordinate(0,0)
    expect(a.distanceFrom(a)).to.equal(0)
  })
  it("should calculate the distance from another coordinate along x axis", () => {
    const a = coordinate(0,0)
    const b = coordinate(600,0)
    expect(a.distanceFrom(b)).to.equal(600)
  })

  it("should calculate the distance from another coordinate along x + y axes", () => {
    const a = coordinate(0,0)
    const b = coordinate(300,400)
    expect(a.distanceFrom(b)).to.equal(500)
  })
})