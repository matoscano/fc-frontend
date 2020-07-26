import React from "react";
import { render } from "@testing-library/react";
import FilmChainLogo from "../index";

it("renders a FilmChainLogo", () => {
  const { container } = render(<FilmChainLogo />);
  expect(container).toMatchSnapshot();
});
