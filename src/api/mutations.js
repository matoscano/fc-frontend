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

export { CREATE_MOVIE };
