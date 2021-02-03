import gql from "graphql-tag";

// save_book
// remove_book
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
// export const SAVE_BOOK = gql`
// `;
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