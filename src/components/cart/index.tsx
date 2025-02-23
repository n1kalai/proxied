'use client';

import { GET_CART_QUERY } from '@/graphql/queries/get-cart-query';
import { CartResponseType } from '@/types/cart/cart-type';
import { useQuery } from '@apollo/client';

import { CartProductCard } from '@/components/cart/components/cart-item-card';

import { useEffect, useState } from 'react';
import { Payload, useCartSubscription } from '@/hooks/use-subscription';
import { ConditionalDialog } from '../dialog';

import { Skeleton } from '../ui/skeleton';
import { getCartTotal } from '@/lib/get-cart-total';
import { CartContainerSkeleton } from '../products/components/cart-container-skeleton';

export function Cart() {
  const { data, loading, error, refetch } =
    useQuery<CartResponseType>(GET_CART_QUERY);
  const { data: subscriptionData } = useCartSubscription();
  const total = getCartTotal(data?.getCart?.items || []);

  const [updatedItems, setUpdatedItems] = useState<Payload[]>([]);

  useEffect(() => {
    if (subscriptionData?.cartItemUpdate) {
      const { event, payload } = subscriptionData.cartItemUpdate;

      if (event === 'ITEM_OUT_OF_STOCK') {
        setUpdatedItems((pre) => [...pre, { ...payload, isOut: true }]);
      } else if (event === 'ITEM_QUANTITY_UPDATED') {
        setUpdatedItems((pre) => [...pre, { ...payload }]);
      }
    }
  }, [subscriptionData]);

  if (error) {
    return <p>Error loading cart</p>;
  }

  if (!loading && !data?.getCart?.items?.length) return <p>No cart items</p>;

  return (
    <>
      <section className="flex flex-col items-start justify-start gap-2 lg:gap-6 w-full">
        <header>
          <h2 className="font-bold text-xl">My cart items</h2>
          <div className="flex gap-1 items-center">
            Total: {loading ? <Skeleton className="h-4 w-[40px]" /> : total}$
          </div>
        </header>

        {loading ? (
          <CartContainerSkeleton />
        ) : (
          <div className="sectionClassname">
            {data?.getCart.items.map((item) => (
              <CartProductCard item={item} key={item._id + item.quantity} />
            ))}
          </div>
        )}
      </section>
      <ConditionalDialog
        data={updatedItems}
        onClose={() => {
          refetch();
          setUpdatedItems([]);
        }}
      />
    </>
  );
}
