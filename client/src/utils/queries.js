import { gql } from "@apollo/client";

export const QUERY_SINGLE_USER = gql`
  query singleUser($username: String) {
    getUser(username: $username) {
      bookCount
      email
      password
      username
      _id
    }
  }
`;

export const QUERY_ME = gql`
  query getMe {
    me {
      _id
      username
      email
      savedBooks
    }
  }
`;
