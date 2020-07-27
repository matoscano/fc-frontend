import React, { useState } from "react";
import styled from "styled-components";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import NavBarLinks from "./NavBarLinks";
import breakpoints from "../../../assets/styles/base/breakpoints";
import FilmChainLogo from "../../ui/filmchain-logo";

const HeaderContainer = styled.header`
  position: fixed;
  z-index: 100;
  background-color: var(--color-gray-3);
  width: 100%;
  top: 0;
  box-shadow: var(--shadow-md);
  transition: box-shadow 0.3s ease-in-out;
`;

const Container = styled.div`
  display: flex;
  position: relative;
  max-width: var(--section-max-width-xl);
  height: var(--header-height);
  margin: 0 auto;
  padding: var(--header-padding);
  justify-content: space-between;

  @media (max-width: ${breakpoints.breakpointLg}) {
    height: var(--header-height-mobile);
    padding: var(--header-padding-mobile);
  }
`;
const Toggle = styled.div`
  display: none;
  cursor: pointer;
  height: 17px;
  align-self: center;
  @media (max-width: ${breakpoints.breakpointLg}) {
    display: flex;
  }
`;

const Hamburger = styled.div`
  background-color: var(--button-main-color);
  width: 24px;
  height: 3px;
  transition: all 0.3s linear;
  align-self: center;
  position: relative;
  transform: ${(props) => (props.open ? "rotate(-45deg)" : "inherit")};
  border-radius: 2px;
  ::before,
  ::after {
    width: 24px;
    height: 3px;
    background-color: var(--button-main-color);
    border-radius: 2px;
    content: "";
    position: absolute;
    transition: all 0.3s linear;
  }
  ::before {
    transform: ${(props) =>
      props.open ? "rotate(-90deg) translate(-8px, 0px)" : "rotate(0deg)"};
    top: -8px;
  }
  ::after {
    opacity: ${(props) => (props.open ? "0" : "1")};
    transform: ${(props) => (props.open ? "rotate(90deg) " : "rotate(0deg)")};
    top: 8px;
  }
`;

const NavBarContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: ${breakpoints.breakpointLg}) {
    display: ${(props) => (props.open ? "flex" : "none")};
    position: fixed;
    flex-direction: column;
    z-index: 2;
    width: 100%;
    justify-content: flex-start;
    transition: all 0.3s ease-in;
    left: 0;
    top: var(--header-height-mobile);
    overflow: scroll;
  }
`;

const FilmChainLogoContainer = styled.a`
  text-decoration: none;
  position: relative;
  top: 5px;

  svg {
    width: 160px;
    height: auto;
    vertical-align: middle;
  }

  @media (max-width: ${breakpoints.breakpointLg}) {
    svg {
      width: 120px;
    }

    div {
      font-size: 9px;
    }
  }
`;

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const [showShadow, setShowShadow] = useState(false);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      if (currPos.y < 72) {
        setShowShadow(true);
      } else {
        setShowShadow(false);
      }
    },
    [showShadow],
    false,
    false,
    0
  );

  return (
    <HeaderContainer open={navbarOpen}>
      <Container>
        <FilmChainLogoContainer
          href="/"
          alt="FilmChain logo"
          aria-label="FilmChain logo link"
        >
          <FilmChainLogo />
        </FilmChainLogoContainer>

        <Toggle data-testid="toggle" onClick={() => setNavbarOpen(!navbarOpen)}>
          <Hamburger open={navbarOpen} />
        </Toggle>
        <NavBarContainer open={navbarOpen}>
          <NavBarLinks open={navbarOpen} />
        </NavBarContainer>
      </Container>
    </HeaderContainer>
  );
};
export default Header;
