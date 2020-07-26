import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid var(--color-brand-primary);
  border-radius: 1rem;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
  }
`;

const Body = styled.div`
  padding: 1rem;
`;

const Card = ({ children }) => (
  <Container>
    <img
      src="https://via.placeholder.com/150"
      alt="img movie"
      title="Image movie"
    />
    <Body>{children}</Body>
  </Container>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
