'use client';

import { GET_CART_QUERY } from '@/services/queries/get-cart-query';
import { CartResponseType } from '@/types/cart/cart-type';
import { useQuery } from '@apollo/client';

import { LoadingSpinner } from '../loader';
import { CartProductCard } from '@/app/cart/cart-item-card';

const sectionClassname =
  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 w-full';

export function Cart() {
  const { data, loading, error } = useQuery<CartResponseType>(GET_CART_QUERY, {
    fetchPolicy: 'network-only', // Always fetch fresh data
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error loading cart</p>;

  if (!data?.getCart?.items?.length) return <p>No cart items</p>;

  return (
    <div className={sectionClassname}>
      {data.getCart.items.map((item) => (
        <CartProductCard item={item} key={item._id} remove />
      ))}
    </div>
  );
}
