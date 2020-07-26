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

{
}

export { GET_ALL_MOVIES, GET_ALL_TRANSFER_BY_MOVIE };
