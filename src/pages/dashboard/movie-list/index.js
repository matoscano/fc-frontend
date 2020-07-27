import React from "react";
import styled, { css } from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_ALL_MOVIES } from "../../../api/queries";
import Rectangle from "../../../components/ui/rectangle";
import Card from "../../../components/ui/card";
import Link from "../../../components/ui/link";
import Loading from "../../../components/ui/loading";
import { Link as routerLink } from "react-router-dom";
import {
  PageTitle,
  CardContentTitle,
  CardContentLink,
  GridContainer,
} from "../../../styled-components";

const Container = styled.section`
  position: relative;
`;

const additionalStyle = css`
  max-width: 60rem;
  margin: 0 auto;
`;

const ButtonsContainer = styled.div`
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: row;
`;

const NewResourceBtn = styled(Link)`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 1rem;
  width: 100%;
`;

const MovieList = ({ match }) => {
  const { loading, error, data } = useQuery(GET_ALL_MOVIES, {
    fetchPolicy: "network-only",
  });

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  return (
    <Container>
      <PageTitle>
        Dashboard{" "}
        <span role="img" aria-label="movie">
          &#128736;
        </span>
      </PageTitle>
      <Rectangle additionalStyle={additionalStyle}>
        <ButtonsContainer>
          <NewResourceBtn as={routerLink} to={`${match.url}/create-movie`}>
            New movie
          </NewResourceBtn>
          <NewResourceBtn
            as={routerLink}
            to={`${match.url}/create-shareholder`}
          >
            New shareholder
          </NewResourceBtn>
          <NewResourceBtn as={routerLink} to={`${match.url}/create-transfer`}>
            New transfer
          </NewResourceBtn>
        </ButtonsContainer>
        <GridContainer>
          {data.getAllMovies.map((movie) => (
            <Card key={movie.id}>
              <>
                <CardContentTitle>{movie.title}</CardContentTitle>
                <CardContentLink
                  as={routerLink}
                  to={{
                    pathname: `${match.url}/${movie.id}`,
                    state: { movie: movie },
                  }}
                >
                  View details
                </CardContentLink>
              </>
            </Card>
          ))}
        </GridContainer>
      </Rectangle>
    </Container>
  );
};

export default MovieList;
