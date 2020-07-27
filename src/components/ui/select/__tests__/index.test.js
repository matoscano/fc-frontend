import React from "react";
import { render } from "@testing-library/react";
import { Field, Formik } from "formik";
import Select from "../index";

const moviesOptions = [
  { value: "1", label: "Test movie" },
  { value: "2", label: "Test movie 2" },
  { value: "3", label: "Test movie 3" },
];

it("renders a Select", () => {
  const { container } = render(
    <Formik initialValues={{ name: "" }} onSubmit={() => {}}>
      {(props) => {
        return (
          <form>
            <h1>Select test</h1>
            <Field component={Select} name="movieId" options={moviesOptions} />
          </form>
        );
      }}
    </Formik>
  );
  expect(container).toMatchSnapshot();
});
