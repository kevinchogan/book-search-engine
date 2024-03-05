const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getUser: async (parent, { id, username }) => {
      let query = {};
      if (id) {
        query._id = id;
      } else if (username) {
        query.username = username;
      } else {
        throw new Error("You must provide either an ID or a username.");
      }

      const foundUser = await User.findOne(query);

      if (!foundUser) {
        throw new Error("Cannot find a user with this ID or username.");
      }

      return foundUser;
    },
  },
  Mutation: {
    createUser: async (parent, { input }) => {
      try {
        const user = await User.create(input);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error("Unable to create user.");
      }
    },
    login: async (parent, { usernameOrEmail, password }) => {
      try {
        const user = await User.findOne({
          $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        });
        if (!user) {
          throw new Error("Can't find this user");
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new Error("Wrong password!");
        }
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error("Unable to login: " + error.message);
      }
    },
    saveBook: async (parent, { input }, context) => {
      try {
        if (!context.user) {
          throw new Error("You must be logged in to save a book.");
        }
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: input } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (error) {
        throw new Error("Unable to save book: " + error.message);
      }
    },
    deleteBook: async (parent, { bookId }, context) => {
      try {
        if (!context.user) {
          throw new Error("You must be logged in to delete a book.");
        }
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        if (!updatedUser) {
          throw new Error("Couldn't find user with this id!");
        }
        return updatedUser;
      } catch (error) {
        throw new Error("Unable to delete book: " + error.message);
      }
    },
  },
  User: {
    bookCount: (parent) => parent.savedBooks.length,
  },
};

module.exports = resolvers;
