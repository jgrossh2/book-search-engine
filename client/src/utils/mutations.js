import gql from "graphql-tag";

// save_book
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;
export const SAVE_BOOK = gql`
    mutation saveBook($authors: String, $description: String!, $title: String!, $bookId: String!, $image: String, $link: String) {
        saveBook(authors: $String, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookID: $bookId) {
            _id
            username
            email
            bookCount
            book {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;