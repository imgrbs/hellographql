import gql from "graphql-tag";

// const GET_CURRENCY_AND_RATE = gql`
// query getCurrencyAndRate {
//   rates(currency: "THB") {
//     currency,
//     rate
//   }
// }
// `

const GET_ALL = gql`
{
	books {
    title
  }
  stores {
    title
  }
}
`

const GET_BOOK = gql`
   query getBooks {
      books {
         title
         author
      }
   }
`

const GET_STORE = gql`
   query getStores {
      stores {
         title
      }
   }
`

export {
   // GET_CURRENCY_AND_RATE,
   GET_ALL,
   GET_BOOK,
   GET_STORE
}