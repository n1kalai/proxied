import { gql } from "@apollo/client";

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts {
    getProducts {
      products {
        _id
        title
        cost
        availableQuantity
      }
      total
    }
  }
`;
