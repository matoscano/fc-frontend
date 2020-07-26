import React from "react";
import styled, { css } from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_ALL_MOVIES } from "../../../api/queries";
import Rectangle from "../../../components/ui/rectangle";
import Link from "../../../components/ui/link";
import { Link as routerLink } from "react-router-dom";

const Container = styled.section`
  position: relative;
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

const MovieList = () => {
  const { loading, error, data } = useQuery(GET_ALL_MOVIES);

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
        {data.getAllMovies.map((movie) => (
          <div key={movie.id}>
            <p>{movie.title}</p>
          </div>
        ))}
      </Rectangle>
      <NewMovieBtn>New</NewMovieBtn>
    </Container>
  );
};

export default MovieList;
