import { gql } from '@apollo/client';

export const REMOVE_ITEM_MUTATION = gql`
  mutation RemoveItem($input: RemoveItemArgs!) {
    removeItem(input: $input) {
      _id
      hash
      items {
        _id
        product {
          title
          cost
          availableQuantity
        }
        quantity
      }
    }
  }
`;
