import gql from "graphql-tag";

const getCurrencyRates = gql`
{
  rates(currency: "USD") {
    currency,
    rate
  }
}
`

export {
   getCurrencyRates
}