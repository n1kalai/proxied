import {
  cartAddItemSchema,
  cartRemoveItemSchema,
  cartUpdateItemQuantitySchema,
} from '../schemas';

export const validateAddItem = (productId: string, quantity: number) => {
  const result = cartAddItemSchema.safeParse({ productId, quantity });

  if (!result.success) {
    console.error(result.error.format());
    alert('Invalid input: ' + JSON.stringify(result.error.format(), null, 2));
    return false;
  }
  return true;
};

export const validateRemoveItem = (cartItemId: string) => {
  const result = cartRemoveItemSchema.safeParse({ cartItemId });

  if (!result.success) {
    console.error(result.error.format());
    alert('Invalid input: ' + JSON.stringify(result.error.format(), null, 2));
    return false;
  }
  return true;
};

export const validateUpdateItemQuantity = (
  cartItemId: string,
  quantity: number,
) => {
  const result = cartUpdateItemQuantitySchema.safeParse({
    cartItemId,
    quantity,
  });

  if (!result.success) {
    console.error(result.error.format());
    alert('Invalid input: ' + JSON.stringify(result.error.format(), null, 2));
    return false;
  }
  return true;
};
