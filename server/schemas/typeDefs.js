const typeDefs = `
  type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
    bookCount: Int
  }

  type Query {
    getUser(id: String, username: String): User
    me: User
  }

  input bookData {
    title: String
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    saveBook( bookData: bookData!): User
    deleteBook(bookId: String!): User  }
`;


module.exports = typeDefs;
