import React, { Component } from 'react';
import { ApolloProvider } from "react-apollo";

import client from './graphql/apolloClient'
import Landing from './components/landing';

const App = () => (
  <ApolloProvider client={client}>
    <Landing />
  </ApolloProvider>
);

export default App;
