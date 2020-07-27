import { gql } from "@apollo/client";

const CREATE_MOVIE = gql`
  mutation createMovieMutation($title: String!, $cover: String!) {
    createMovie(title: $title, cover: $cover) {
      id
      createAt
      title
      cover
    }
  }
`;

const CREATE_SHAREHOLDER = gql`
  mutation createShareholder(
    $firstName: String
    $lastName: String
    $address: String
    $iban: String
    $movieId: ID!
  ) {
    createShareholder(
      firstName: $firstName
      lastName: $lastName
      address: $address
      iban: $iban
      movieId: $movieId
    ) {
      id
      createAt
    }
  }
`;

const CREATE_TRANSFER = gql`
  mutation createTransfer(
    $amount: Float!
    $description: String
    $movieId: ID!
  ) {
    createTransfer(
      amount: $amount
      description: $description
      movieId: $movieId
    ) {
      id
      createAt
    }
  }
`;

export { CREATE_MOVIE, CREATE_SHAREHOLDER, CREATE_TRANSFER };
