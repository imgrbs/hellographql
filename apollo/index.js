const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const PORT = 3001

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const stores = [
   {
      title: 'The Mall',
   },
   {
      title: 'Central',
   },
   {
      title: 'Siamparagon',
   },
]

// The GraphQL schema in string form
const typeDefs = `
  input BookInput { title: String, author: String }
  type Book { title: String, author: String }
  type Store { title: String }
  type Query { books: [Book], stores: [Store] }
  type Mutation {
    addBook (title: String!, author: String): [Book]
    updateBook(oldBook: Book, updateBook: Book): [Book]
    deleteBook (title: String!, author: String!): [Book]
  }
`;

const findIndex = async (obj, findValue )=> {
  return await obj.findIndex((value) => {
    return value.title === findValue.title && value.author === findValue.author
  });
}

// The resolvers
const resolvers = {
  Query: { books: () => books, stores: () => stores },
  Mutation: {
    addBook: (_, newBooks) => {
      books.push(newBooks);
      return books;
    },
    updateBook: async (_, oldBook, updatebook) => {
      let bookIndex = await findIndex(books, oldBook);
      if (bookIndex != -1) {
        books[bookIndex] = updatebook;
      }
      return updatebook;
    },
    deleteBook: async (_, deleteBook) => {
      let bookIndex = await findIndex(books, deleteBook);
      if (bookIndex != -1) {
        books.splice(bookIndex, 1);
      }
      return books;
    }
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', cors(), bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
});