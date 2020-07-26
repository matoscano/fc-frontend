import React from "react"
import renderer from "react-test-renderer"

import Rectangle from "../index"

describe("Rectangle", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Rectangle>Test rectangle</Rectangle>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
