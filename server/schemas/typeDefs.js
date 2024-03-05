const typeDefs = `
  type Book {
    _id: ID!
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    bookCount: Int
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input SaveBookInput {
    title: String!
    authors: [String]!
    description: String!
    bookId: String!
    image: String
    link: String
  }

  type Query {
    getUser(id: ID, username: String): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    login(usernameOrEmail: String!, password: String!): User
    saveBook(input: SaveBookInput!): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
