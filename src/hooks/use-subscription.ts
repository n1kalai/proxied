import { useSubscription } from '@apollo/client';
import { CART_ITEM_SUBSCRIPTION } from '@/graphql/subscriptions/cart-item-subscription';

export const useCartSubscription = () => {
  const { data, loading, error } = useSubscription(CART_ITEM_SUBSCRIPTION);
  return { data, loading, error };
};
