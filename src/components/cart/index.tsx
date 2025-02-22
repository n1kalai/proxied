'use client';

import { GET_CART_QUERY } from '@/graphql/queries/get-cart-query';
import { CartResponseType } from '@/types/cart/cart-type';
import { useQuery, useSubscription } from '@apollo/client';

import { LoadingSpinner } from '../loader';
import { CartProductCard } from '@/app/cart/components/cart-item-card';
import { CART_ITEM_SUBSCRIPTION } from '@/graphql/subscriptions/cart-item-subscription';
import { useEffect, useState } from 'react';

const sectionClassname =
  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 w-full';

export function Cart() {
  const { data, loading, error, refetch } =
    useQuery<CartResponseType>(GET_CART_QUERY);

  const { data: subscriptionData } = useSubscription(CART_ITEM_SUBSCRIPTION);

  const [cartItems, setCartItems] = useState(data?.getCart?.items || []);

  useEffect(() => {
    if (data?.getCart?.items) {
      setCartItems(data.getCart.items);
    }
  }, [data]);

  useEffect(() => {
    console.log('subscriptionData', subscriptionData);

    // TODO: check if item out of stock is inside cart and show alert
    // TODO: check if updated item quantity is inside cart and is updated correctly and show alert

    if (subscriptionData?.cartItemUpdate) {
      const { event, payload } = subscriptionData.cartItemUpdate;

      if (event === 'ITEM_OUT_OF_STOCK') {
        alert(
          `Item '${payload.product.title}' is out of stock! Removing from cart.`,
        );
      } else if (event === 'ITEM_QUANTITY_UPDATED') {
        alert(
          `Quantity updated for '${payload.product.title}'. New quantity: ${payload.quantity}`,
        );
      }

      refetch(); // Fetch latest cart data
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

  if (loading) return <LoadingSpinner />;
  if (error) {
    console.log('Err', error);

    return <p>Error loading cart</p>;
  }

  if (!data?.getCart?.items?.length) return <p>No cart items</p>;

  return (
    <section className="flex flex-col items-start justify-start gap-2 lg:gap-6">
      <header>
        <h2 className="font-bold text-xl">My cart items</h2>
        <p>Total: {total()}$</p>
      </header>

      <div className={sectionClassname}>
        {cartItems.map((item) => (
          <CartProductCard item={item} key={item._id} remove />
        ))}
      </div>
    </section>
  );
}
