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

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            console.log("args", args)
            try {
            if (context.user) {
                const saveBook = await Book.create({
                    ...args,
                    username: context.user.username
                    
                });
                console.log("saveBook", saveBook)

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: book._id } },
                    { new: true }
                );
                console.log("savedBooks", savedBooks)
                }
            }catch(error) {
                console.log(error)
            } 
                return savedBooks;
            
            throw new AuthenticationError("You need to be logged in to save your books.")
        }
    }
};

module.exports = resolvers;