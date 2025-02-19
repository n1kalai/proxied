"use client"

import { gql, useQuery } from "@apollo/client";

const GET_CART_QUERY = gql`
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

export function Cart() {
  const { data, loading, error } = useQuery<{getCart: {items: string[]}}>(GET_CART_QUERY, {
    fetchPolicy: "network-only", // Always fetch fresh data
  });
  

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error loading cart</p>;
  
  if(!data?.getCart?.items.length) return <p>No cart items</p>;

  return (
    <div>
      {data?.getCart?.items?.map((item: any) => (
        <div key={item._id}>
          {item.product.title} - {item.quantity}
        </div>
      ))}
      
    </div>
  );
}