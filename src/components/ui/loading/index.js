import React from "react";
import styled from "styled-components";

const Container = styled.section`
  display: flex;
`;

const Wrapper = styled.div`
  margin: 10% auto;
`;

const LoadingText = styled.div`
text-align: center;
margin: 1rem auto;
font-size: var(--text-xl);
font-weight: var(--text-bold);
}`;

const LoadingSpinner = styled.div`
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;

const Loading = () => {
  return (
    <Container>
      <Wrapper>
        <LoadingSpinner />
        <LoadingText>Loading...</LoadingText>
      </Wrapper>
    </Container>
  );
};

export default Loading;
