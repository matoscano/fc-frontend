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

export { GET_ALL_MOVIES };
