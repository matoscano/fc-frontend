import styled, { css } from "styled-components";

const baseLinkCss = css`
  outline: none;
  display: block;
  text-align: center;
  text-decoration: none !important;
  opacity: 0.9;
  cursor: pointer;
  color: white;
  background-image: linear-gradient(135deg, #3e294f, #db6e6b) !important;
  background-origin: border-box;
  background-clip: border-box;
  box-shadow: inset 1px 100px 1px #110c12;
  border-radius: 50px;
  width: fit-content;
  padding: 1.5rem 2rem;
  border: 2px solid transparent;
  transition: all 150ms ease-in-out;

  &:hover,
  &:focus {
    box-shadow: inherit;
  }

  ${(props) =>
    props.disabled
      ? css`
          opacity: 0.4;
          cursor: not-allowed;
        `
      : css``};
`;

const Button = styled.button`
  ${baseLinkCss}
`;

export default Button;
