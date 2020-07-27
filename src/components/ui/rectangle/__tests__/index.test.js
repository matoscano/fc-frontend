import React from "react";
import { render } from "@testing-library/react";
import Rectangle from "../index";

it("renders a Rectangle", () => {
  const { container } = render(<Rectangle>Rectangle content</Rectangle>);
  expect(container).toMatchSnapshot();
});
