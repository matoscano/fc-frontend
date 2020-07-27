import { gql } from "@apollo/client";

const CREATE_MOVIE = gql`
  mutation createMovieMutation($title: String!) {
    createMovie(title: $title) {
      id
      createAt
      title
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

export { CREATE_MOVIE, CREATE_SHAREHOLDER };
