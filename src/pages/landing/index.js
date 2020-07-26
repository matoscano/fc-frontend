import React from "react";
import styled from "styled-components";
import Link from "../../components/ui/link";
import { Link as routerLink } from "react-router-dom";
import FilmChainVideo from "../../assets/videos/filmchain-hero.mp4";
import FilmChainLogo from "../../components/ui/filmchain-logo";

const Container = styled.section`
  position: relative;
  min-height: 100vh;
`;

const VideoWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -10;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LogoWrapper = styled.div`
  display: block;
  max-width: 30rem;
  margin: 0 auto;
  padding: 2rem;
`;

const CTAButton = styled(Link)`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 2rem auto;
  text-transform: uppercase;
`;

const Footer = styled.p`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 1.2rem;
`;

const Landing = () => {
  return (
    <Container>
      <VideoWrapper>
        <video playsinline="true" autoplay="true" muted="true" loop="true">
          <source src={FilmChainVideo} type="video/mp4" />
        </video>
      </VideoWrapper>
      <LogoWrapper>
        <FilmChainLogo />
      </LogoWrapper>
      <CTAButton as={routerLink} to="/dashboard">
        Go to dashboard
      </CTAButton>
      <Footer>
        Made with{" "}
        <span role="img" aria-label="fire">
          &#10084;&#65039;
        </span>{" "}
        by <strong>Miguel Angel Toscano</strong> 
      </Footer>
    </Container>
  );
};

export default Landing;
