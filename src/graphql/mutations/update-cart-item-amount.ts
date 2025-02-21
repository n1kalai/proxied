import { gql } from '@apollo/client';

export const UPDATE_ITEM_QUANTITY_MUTATION = gql`
  mutation UpdateItemQuantity($input: UpdateItemQuantityArgs!) {
    updateItemQuantity(input: $input) {
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
