import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { getCurrencyRates } from '../../graphql/getQuery'

import Layout from '../base/layout'

export default class Landing extends Component {
   render() {
      return (
         <Layout>
            <h1>Get Currency!</h1>
            <Query query={getCurrencyRates} >
            {({ loading, error, data }) => {
               if (loading) return <p>Loading...</p>;
               if (error) return <p>Error :(</p>;

               return data.rates.map(({currency, rate}) => (
                  <div key={currency}>
                     {`${currency} : ${rate}`}
                  </div>
               ));
            }}
            </Query>
         </Layout>
      )
   }
}