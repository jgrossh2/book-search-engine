const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password');

                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        // find user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password');
        },
        Mutation: {
            addUser: async (parent, args) => {
                const user = await User.create(args);
                const token = signToken(user);
                return { token, user };
            },
            login: async (parent, { email, password }) => {
                const user = await User.findOne({ email });

                if (!user) {
                    throw new AuthenticationError('Incorrect username or password');
                }

                const correctPw = await user.isCorrectPassword(password);

                if (!correctPw) {
                    throw new AuthenticationError('Incorrect username or password');
                }

                const token = signToken(ser);
                return { token, user };
            }
        }
    }
};

module.exports = resolvers