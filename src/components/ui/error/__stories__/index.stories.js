import React from "react";
import styled from "styled-components";
import Error from "../index";

const Wrapper = styled.div`
  padding: 2rem;
`;
export default {
  title: "UI/Error",
  component: Error,
};

export const ErrorDefault = () => (
  <Wrapper>
    <Error />
  </Wrapper>
);
