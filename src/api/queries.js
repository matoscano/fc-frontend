import { gql } from "@apollo/client";

const GET_ALL_MOVIES = gql`
  {
    getAllMovies {
      id
      title
      createAt
    }
  }
`;

const GET_ALL_TRANSFER_BY_MOVIE = gql`
  query getAllTransfersByMovie($movieId: ID!) {
    getAllTransferByMovie(movieId: $movieId) {
      id
      amount
      description
    }
  }
`;

const GET_ALL_SHAREHOLDERS_BY_MOVIE = gql`
  query getAllShareholdersByMovie($movieId: ID!) {
    getAllShareholdersByMovie(movieId: $movieId) {
      id
      firstName
      lastName
    }
  }
`;

export {
  GET_ALL_MOVIES,
  GET_ALL_TRANSFER_BY_MOVIE,
  GET_ALL_SHAREHOLDERS_BY_MOVIE,
};
