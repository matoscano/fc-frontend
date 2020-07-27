import React from "react";
import { render } from "@testing-library/react";
import Loading from "../index";

it("renders a Loading", () => {
  const { container } = render(<Loading />);
  expect(container).toMatchSnapshot();
});
