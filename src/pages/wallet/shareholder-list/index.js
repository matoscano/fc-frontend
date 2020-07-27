import React from "react";
import styled, { css } from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_ALL_SHAREHOLDERS } from "../../../api/queries";
import Rectangle from "../../../components/ui/rectangle";
import Card from "../../../components/ui/card";
import Loading from "../../../components/ui/loading";
import { Link as routerLink } from "react-router-dom";

const Container = styled.section`
  position: relative;
`;

const MoviesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 1rem;
`;

const Title = styled.h1`
  font-size: var(--text-xxxl);
  text-align: center;
  padding: 1rem;
  margin: 2rem auto;
`;

const additionalStyle = css`
  max-width: 60rem;
  margin: 0 auto;
`;

const CardContent = styled.div``;

const CardContentTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const CardContentLink = styled.a`
  text-decoration: none;
  color: var(--color-brand-secondary);
  margin-top: 1rem;
  display: block;
  text-align: end;
`;

const ShareholderList = ({ match }) => {
  const { loading, error, data } = useQuery(GET_ALL_SHAREHOLDERS, {
    fetchPolicy: "network-only",
  });

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  return (
    <Container>
      <Title>
        Shareholders{" "}
        <span role="img" aria-label="movie">
          &#128176;
        </span>
      </Title>
      <Rectangle additionalStyle={additionalStyle}>
        <MoviesContainer>
          {data.getAllShareholders.map((shareholder) => (
            <Card key={shareholder.id}>
              <CardContent>
                <CardContentTitle>
                  {shareholder.firstName} {shareholder.lastName}
                </CardContentTitle>
                <CardContentLink
                  as={routerLink}
                  to={{
                    pathname: `${match.url}/${shareholder.id}`,
                  }}
                >
                  View details
                </CardContentLink>
              </CardContent>
            </Card>
          ))}
        </MoviesContainer>
      </Rectangle>
    </Container>
  );
};

export default ShareholderList;
