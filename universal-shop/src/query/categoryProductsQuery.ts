import { gql } from "@apollo/client";

export const CATEGORY_PRODUCTS = (title:string) => gql`
query{
  category(input:{title: "${ title }"}){
    name,
    products{
      id,
      name,
      inStock,
      gallery,
      category,
      prices{
        currency{
          label,
          symbol
        },
        amount
      },
      brand
    }
  }
}
`;

