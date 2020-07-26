import React from "react";
import styled from "styled-components";
import Link from "../index";

const Wrapper = styled.div`
  padding: 2rem;
`;
export default {
  title: "Link",
  component: Link,
};

export const LinkDefault = () => (
  <Wrapper>
    <Link> This is a link</Link>
  </Wrapper>
);
