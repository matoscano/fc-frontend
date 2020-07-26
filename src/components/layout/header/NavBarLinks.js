import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import breakpoints from "../../../assets/styles/base/breakpoints";

const LinkUnderlineEffect = css`
  position: relative;

  &.active::before {
    right: 0;
  }

  &::before {
    content: "";
    height: 1px;
    position: absolute;
    z-index: -1;
    background: var(--nav-bar-links-color);
    left: 0;
    bottom: 0;
    right: 100%;
    transition-property: right;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
  }

  &:hover::before,
  &:focus::before {
    right: 0;
  }
`;

const NavBarLinksContainer = styled.div`
  display: flex;
  align-items: start;
  align-self: center;

  @media (max-width: ${breakpoints.breakpointLg}) {
    width: 100%;
    flex-direction: column;
    padding: 1rem;
    background-color: var(--color-white);
    margin: 0;
    box-shadow: var(--shadow-md);
  }
`;
const NavBarLink = styled.a`
  align-self: center;
  letter-spacing: 1px;
  text-align: center;
  font-weight: 500;
  font-size: 13px;
  line-height: 29px;
  text-transform: uppercase;
  color: var(--nav-bar-links-color);
  margin: 0 1.75rem;
  text-decoration: none;

  ${LinkUnderlineEffect}

  @media (max-width: ${breakpoints.breakpointLg}) {
    font-size: 1.5rem;
    align-self: flex-start;
    text-transform: capitalize;
    margin: 1.75rem 0;
  }
`;

const NavBarLinks = ({ open }) => {
  return (
    <NavBarLinksContainer>
      <NavBarLink as={Link} to="/wallet/sdaf">
        Wallet
      </NavBarLink>
    </NavBarLinksContainer>
  );
};

export default NavBarLinks;
