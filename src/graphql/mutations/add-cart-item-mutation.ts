import { gql } from "@apollo/client";

export const ADD_CART_ITEM_MUTATION = gql`
  mutation AddItem($input: AddItemArgs!) {
    addItem(input: $input) {
      _id
      hash
      items {
        _id
        product {
          _id
          title
          cost
          availableQuantity
        }
        quantity
      }
    }
  }
`;