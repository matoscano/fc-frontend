import React from "react";
import styled from "styled-components";
import Button from "../index";

const Wrapper = styled.div`
  padding: 2rem;
`;
export default {
  title: "UI/Button",
  component: Button,
};

export const LinkDefault = () => (
  <Wrapper>
    <Button> This is a link</Button>
  </Wrapper>
);
