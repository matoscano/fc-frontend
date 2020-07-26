import React from "react";
import styled from "styled-components";
import breakpoints from "../../assets/styles/base/breakpoints";
import Header from "./header";

const Main = styled.main`
  padding-top: var(--header-height);
  padding-left: 1rem;
  padding-right: 1rem;

  @media (max-width: ${breakpoints.breakpointLg}) {
    padding-top: var(--header-height-mobile);
  }
`;

const Layout = ({ children, excludeFooter }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
