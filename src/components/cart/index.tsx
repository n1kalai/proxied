'use client';

import { GET_CART_QUERY } from '@/services/queries/get-cart-query';
import { CartResponseType } from '@/types/cart/cart-type';
import { useQuery } from '@apollo/client';
import { ProductCard } from '../products/product-card';

export function Cart() {
  const { data, loading, error } = useQuery<CartResponseType>(GET_CART_QUERY, {
    fetchPolicy: 'network-only', // Always fetch fresh data
  });

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error loading cart</p>;

  if (!data?.getCart?.items?.length) return <p>No cart items</p>;

  return (
    <div>
      {data.getCart.items.map((item) => (
        <ProductCard
          key={item._id}
          cost={item.product.cost}
          title={item.product.title}
          id={item.product._id}
        />
      ))}
    </div>
  );
}
