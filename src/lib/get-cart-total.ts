import { CartItemType } from '@/types/cart/cart-item-type';

export const getCartTotal = (cartItems: CartItemType[]) => {
  if (!cartItems.length) return [];

  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.product.cost * item.quantity;
  }, 0);
  const formattedPrice = totalPrice.toFixed(2);

  return formattedPrice;
};
