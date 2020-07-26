import React from "react";
import styled from "styled-components";
import FilmChainLogo from "../index";

const Wrapper = styled.div`
  padding: 2rem;
  background-color: black;
`;
export default {
  title: "FilmChainLogo",
  component: FilmChainLogo,
};

export const FilmChainLogoDefault = () => (
  <Wrapper>
    <FilmChainLogo />
  </Wrapper>
);
