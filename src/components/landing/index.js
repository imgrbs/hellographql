import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";

import apolloClient from '../../graphql/apolloClient';

import Layout from '../base/layout';

import {
   // GET_CURRENCY_AND_RATE,
   GET_ALL,
   GET_BOOK,
   GET_STORE,
} from '../../graphql/getQuery'
import {
   ADD_BOOK,
   UPDATE_BOOK,
   DELETE_BOOK,
 } from '../../graphql/postQuery'

export default class LandingGet extends Component {
   render() {
      let list = [];
      let input1;
      let input2;
      return (
         <Layout>
            <h1>Get Books!</h1>

            <Mutation
               mutation={
                  ADD_BOOK
               }
               update={(cache, { data: { addBook } }) => {
                  const { books } = cache.readQuery({ query: GET_BOOK });
                  cache.writeQuery({
                    query: GET_BOOK,
                    data: { books: addBook }
                  });
                }}
            >
               {(addBook, { data }) => (
                  <div>
                     <form
                     onSubmit={e => {
                        e.preventDefault();
                        addBook({ variables: { title: input1.value, author: input2.value } });
                        input1.value = "";
                        input2.value = "";
                     }}
                     >
                     <input ref={node => { input1 = node; }} />
                     <input ref={node => { input2 = node; }} />
                     <button type="submit">Add Book</button>
                     </form>
                  </div>
               )}
            </Mutation>
            <Query query={GET_BOOK} >
            {({ loading, error, data: { books } }) => {
               if (loading) return <p>Loading...</p>;
               if (error)return <p>Error :(</p>;
               console.log('query ', books)
               return books.map(({title, author}) => (
                  <div key={title+author+(Math.random() * 99)}>
                     {title} , {author}

                     <Mutation
                        mutation={UPDATE_BOOK}
                        update={(cache, { data: { updateBook } }) => {
                           const { books } = cache.readQuery({ query: GET_BOOK });
                           cache.writeQuery({
                           query: GET_BOOK,
                           data: { books: updateBook }
                           });
                        }}
                     >
                     {(updateBook, { data }) => (
                        <span>
                           <form
                           onSubmit={e => {
                              e.preventDefault();
                              updateBook({ variables: { title, author } });
                           }}
                           >
                           {title} , {author}
                           <button type="submit">Update Book</button>
                           </form>
                        </span>
                     )}
                     </Mutation>
                     
                     <Mutation
                        mutation={DELETE_BOOK}
                        update={(cache, { data: { deleteBook } }) => {
                           const { books } = cache.readQuery({ query: GET_BOOK });
                           cache.writeQuery({
                           query: GET_BOOK,
                           data: { books: deleteBook }
                           });
                        }}
                     >
                     {(deleteBook, { data }) => (
                        <span>
                           <form
                           onSubmit={e => {
                              e.preventDefault();
                              deleteBook({ variables: { title, author } });
                           }}
                           >
                           <button type="submit">Delete Book</button>
                           </form>
                        </span>
                     )}
                     </Mutation>
                  </div>
               ))
            }}
            </Query>
         </Layout>
      )
   }
}
