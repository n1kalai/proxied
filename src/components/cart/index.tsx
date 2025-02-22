'use client';

import { GET_CART_QUERY } from '@/graphql/queries/get-cart-query';
import { CartResponseType } from '@/types/cart/cart-type';
import { useQuery } from '@apollo/client';

import { CartProductCard } from '@/components/cart/components/cart-item-card';

import { useEffect, useState } from 'react';
import { Payload, useCartSubscription } from '@/hooks/use-subscription';
import { ConditionalDialog } from '../dialog';
import { ProductsContainerSkeleton } from '../products/components/container-skeleton';
import { Skeleton } from '../ui/skeleton';

const sectionClassname =
  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 w-full';

export function Cart() {
  const { data, loading, error, refetch } =
    useQuery<CartResponseType>(GET_CART_QUERY);

  const { data: subscriptionData } = useCartSubscription();

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
  }, [subscriptionData, refetch]);

  const total = () => {
    if (!data?.getCart?.items?.length) return [];

    const totalPrice = data.getCart.items.reduce((acc, item) => {
      return acc + item.product.cost * item.quantity;
    }, 0);

    const formattedPrice = totalPrice.toFixed(2);

    return formattedPrice;
  };

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
            Total: {loading ? <Skeleton className="h-4 w-[40px]" /> : total()}$
          </div>
        </header>

        {loading ? (
          <ProductsContainerSkeleton className="h-[170px]" />
        ) : (
          <div className={sectionClassname}>
            {data?.getCart.items.map((item) => (
              <CartProductCard item={item} key={item._id + item.quantity} />
            ))}
          </div>
        )}
      </section>
      <ConditionalDialog
        data={updatedItems}
        onClose={() => {
          setUpdatedItems([]);
          refetch();
        }}
      />
    </>
  );
}
