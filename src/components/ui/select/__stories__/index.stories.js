import React from "react";
import styled from "styled-components";
import { Field, Formik } from "formik";
import Select from "../index";

const Wrapper = styled.div`
  padding: 2rem;
`;

const moviesOptions = [
  { value: "1", label: "Test movie" },
  { value: "2", label: "Test movie 2" },
  { value: "3", label: "Test movie 3" },
];
export default {
  title: "UI/Select",
  component: Select,
};

export const SelectDefault = () => (
  <Wrapper>
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
  </Wrapper>
);
