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

  type Auth {
    token: String!
    user: User
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    bookCount: Int
  }

  type Query {
    getUser(id: ID, username: String): User
    me: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    
    saveBook(title: String!, authors: [String]!, description: String!, bookId: String!, image: String, link: String): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
