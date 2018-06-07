import gql from "graphql-tag";

const GET_CURRENCY_AND_RATE = gql`
{
  rates(currency: "USD") {
    currency,
    rate
  }
}
`

export {
   GET_CURRENCY_AND_RATE
}