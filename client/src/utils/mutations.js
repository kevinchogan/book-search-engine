import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookData: bookData!) {
    saveBook(bookData: $bookData) {
      title
      authors
      description
      bookId
      image
      link
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      bookCount
      username
    }
  }
`;
