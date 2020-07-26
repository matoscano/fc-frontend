import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  box-shadow: var(--rectangle-box-shadow);
  border-radius: var(--rectangle-border-radius);
  background-color: var(--color-white);
  padding: var(--rectangle-padding);
  width: 100%;

  ${(props) => props.additionalStyle};
`;

const Rectangle = ({ children, additionalStyle }) => {
  return <Container additionalStyle={additionalStyle}>{children}</Container>;
};

Rectangle.propTypes = {
  children: PropTypes.node.isRequired,
  additionalStyle: PropTypes.array,
};

export default Rectangle;
