import { useSubscription } from '@apollo/client';
import { CART_ITEM_SUBSCRIPTION } from '@/graphql/subscriptions/cart-item-subscription';
import { ProductType } from '@/types/product-type';

export type Payload = {
  _id: string;
  quantity: number;
  isOut?: boolean;
  product: ProductType;
};

type SocketResponse = {
  cartItemUpdate: {
    event: string;
    payload: Payload;
  };
};

export const useCartSubscription = () => {
  const { data, loading, error } = useSubscription<SocketResponse>(
    CART_ITEM_SUBSCRIPTION,
  );
  return { data, loading, error };
};
