const { User, Book } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    getUser: async (parent, { id, username }) => {
      const param = id ? { _id: id } : {username: username};
      const foundUser = await User.findOne(param);
      if (!foundUser) {
        console.log("User not found with that id or username!")
        throw new Error("Invalid ID or username.");
      }
      return foundUser;
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {

      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { input }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: input } },
          { new: true, runValidators: true }
        );
      }
      throw AuthenticationError;
    },
    deleteBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return Book.findOneAndDelete({ _id: bookId });
      }
      throw AuthenticationError;
    },
 },
  User: {
    bookCount: (parent) => parent.savedBooks.length,
  },
};

module.exports = resolvers;
