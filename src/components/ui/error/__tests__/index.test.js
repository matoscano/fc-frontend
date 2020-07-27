import React from "react";
import { render } from "@testing-library/react";
import Error from "../index";

it("renders a Error", () => {
  const { container } = render(<Error />);
  expect(container).toMatchSnapshot();
});
