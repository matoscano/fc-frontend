import { gql } from "@apollo/client";

const GET_ALL_MOVIES = gql`
  {
    getAllMovies {
      id
      title
      cover
      createAt
    }
  }
`;

const GET_ALL_SHAREHOLDERS = gql`
  {
    getAllShareholders {
      id
      firstName
      lastName
    }
  }
`;

const GET_SHAREHOLDER_BY_ID = gql`
  query getShareholderById($shareholderId: ID!) {
    getShareholderById(shareholderId: $shareholderId) {
      id
      firstName
      lastName
      address
      iban
      Movie {
        id
        title
      }
      BalanceTransaction {
        id
        amount
        Transfer {
          id
          amount
          createAt
        }
      }
    }
  }
`;

const GET_ALL_TRANSFER_BY_MOVIE = gql`
  query getAllTransfersByMovie($movieId: ID!) {
    getAllTransferByMovie(movieId: $movieId) {
      id
      amount
      description
      createAt
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
  GET_ALL_SHAREHOLDERS,
  GET_SHAREHOLDER_BY_ID,
};
