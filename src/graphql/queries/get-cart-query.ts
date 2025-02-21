import { gql } from "@apollo/client";

export const GET_CART_QUERY = gql`
  query GetCart {
    getCart {
      _id
      hash
      items {
        _id
        quantity
        product {
          title
          cost
          availableQuantity
        }
      }
    }
  }
`;