const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Query {
        me: [User]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(save: SaveBookInput): User
        removeBook(bookId: INT!): User
    }

    input SaveBookInput {
        book {
            author
            description
            title
            bookId
            image
            link
        }
    }

    type User {
        _id
        username
        email
        bookCount
        savedBooks: [Book]
    }

    type Book {
        bookId
        authors
        description
        title
        image
        link
    }

    type Auth {
        token
        user: [User]
    }
`;

module.exports = typeDefs;