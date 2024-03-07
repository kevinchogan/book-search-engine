const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    getUser: async (parent, { id, username }) => {
      const param = id ? { _id: id } : { username: username };
      const foundUser = await User.findOne(param);
      if (!foundUser) {
        console.log("User not found with that id or username!");
        throw new Error("Invalid ID or username.");
      }
      return foundUser;
    },
    me: async (parent, args, context) => {
      console.log("Context: ", context);
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      console.log("In login route")

      const user = await User.findOne({ email });

      console.log("Got user")

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      console.log("Got password")

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    deleteBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
