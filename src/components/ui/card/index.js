import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid var(--color-brand-primary);
  border-radius: 1rem;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  img {
    width: 100%;
    height: auto;
  }
`;

const Body = styled.div`
  padding: 1rem;
`;

const Card = ({ children, imgUrl }) => (
  <Container>
    <ImageWrapper>
      <img
        src={imgUrl ? imgUrl : "https://via.placeholder.com/150"}
        alt="img movie"
        title="Image movie"
      />
    </ImageWrapper>

    <Body>{children}</Body>
  </Container>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  imgUrl: PropTypes.string.isRequired,
};

export default Card;
