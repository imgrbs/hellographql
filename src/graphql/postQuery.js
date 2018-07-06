import gql from "graphql-tag";

const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String) {
   addBook(title: $title, author: $author) {
      title
      author
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation updateBook($oldBook: Book!, $updateBook: Book!) {
    updateBook(oldBook: $oldBook, updateBook: $updateBook) {
      oldBook
      updateBook
    }
  }
`

const DELETE_BOOK = gql`
  mutation deleteBook($title: String!, $author: String!) {
    deleteBook(title: $title, author: $author) {
      title
      author
    }
  }
`

export {
   ADD_BOOK,
   UPDATE_BOOK,
   DELETE_BOOK,
}