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
  query me {
    me {
    username
    email
    bookCount
    savedBooks {
      _id
      authors
      bookId
      description
      image
      link
      title
    }
  }
  }
`;
