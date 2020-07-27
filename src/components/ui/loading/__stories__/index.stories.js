import React from "react";
import styled from "styled-components";
import Loading from "../index";

const Wrapper = styled.div`
  padding: 2rem;
`;
export default {
  title: "UI/Loading",
  component: Loading,
};

export const LoadingDefault = () => (
  <Wrapper>
    <Loading />
  </Wrapper>
);
