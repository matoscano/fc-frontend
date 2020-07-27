import React from "react";
import styled from "styled-components";
import ErrorImage from "../../../assets/images/error.png";

const Container = styled.section`
  display: flex;
`;

const Wrapper = styled.div`
  margin: 10% auto;
`;

const ErrorText = styled.div`
text-align: center;
margin: 1rem auto;
font-size: var(--text-xl);
font-weight: var(--text-bold);
}`;

const ImageWrapper = styled.div``;

const Loading = () => {
  return (
    <Container>
      <Wrapper>
        <ImageWrapper>
          <img src={ErrorImage} title="Error img" alt="Error img"></img>
        </ImageWrapper>
        <ErrorText>Something went wrong...</ErrorText>
      </Wrapper>
    </Container>
  );
};

export default Loading;
