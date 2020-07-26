import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_ALL_MOVIES } from "../../../api/queries";
import Rectangle from "../../../components/ui/rectangle";
import Card from "../../../components/ui/card";
import Link from "../../../components/ui/link";
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

const NewMovieBtn = styled(Link)`
  font-size: 1.2rem;
  font-weight: bold;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const MovieList = ({ match }) => {
  const { loading, error, data } = useQuery(GET_ALL_MOVIES, {
    fetchPolicy: "network-only",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Container>
      <Title>
        Movies{" "}
        <span role="img" aria-label="movie">
          &#127909;
        </span>
      </Title>
      <Rectangle additionalStyle={additionalStyle}>
        <MoviesContainer>
          {data.getAllMovies.map((movie) => (
            <Card key={movie.id}>
              <p>{movie.title}</p>
            </Card>
          ))}
        </MoviesContainer>
      </Rectangle>
      <NewMovieBtn as={routerLink} to={`${match.url}/create-movie`}>
        New
      </NewMovieBtn>
    </Container>
  );
};

export default MovieList;
