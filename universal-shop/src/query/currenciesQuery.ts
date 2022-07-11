import { gql } from "@apollo/client";

export const CURRENCIES_QUERY = gql`
query{
    currencies{
        label,
        symbol
    }
  }
`