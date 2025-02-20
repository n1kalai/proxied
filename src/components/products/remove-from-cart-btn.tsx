import { useRemoveItem } from '@/hooks/use-remove-item';

import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { RemoveFromCartIcon } from '../icons/remove-from-cart';
import { NumberButtonGroup } from '../ui/button-group';
import { useMutation } from '@apollo/client';
import { UPDATE_ITEM_QUANTITY_MUTATION } from '@/services/mutations/update-cart-item-amount';
import { GET_CART_QUERY } from '@/services/queries/get-cart-query';
import { CartResponseType } from '@/types/cart/cart-type';
import { CartItemType } from '@/types/cart/cart-item-type';

export const RemoveFromCartFooter = ({
  productId,
  max,
  initialValue,
}: {
  productId: string;
  max: number;
  initialValue: number;
}) => {
  const { removeItem, loading } = useRemoveItem();

  const [updateItemQuantity, { loading: isUpdating }] = useMutation(
    UPDATE_ITEM_QUANTITY_MUTATION,
    {
      onError: (error) => {
        console.error('Error updating quantity:', error.message);
      },
      update: (cache, { data }) => {
        if (!data) return;

        // Get existing cart data from cache
        const existingCart = cache.readQuery({
          query: GET_CART_QUERY,
        }) as CartResponseType;

        if (existingCart && existingCart.getCart) {
          // Update the items in the cart
          const updatedCart = {
            ...existingCart.getCart,
            items: existingCart.getCart.items.map((item) =>
              item._id === productId
                ? {
                    ...item,
                    quantity: data.updateItemQuantity.items.find(
                      (i: CartItemType) => i._id === productId,
                    )?.quantity,
                  }
                : item,
            ),
          };

          // Write the updated cart back to the cache
          cache.writeQuery({
            query: GET_CART_QUERY,
            data: { getCart: updatedCart },
          });
        }
      },
    },
  );

  const { toast } = useToast();

  const handleItemIncrement = () => {
    updateItemQuantity({
      variables: {
        input: { cartItemId: productId, quantity: initialValue + 1 },
      },
    });
  };

  const handleItemDecrement = () => {
    updateItemQuantity({
      variables: {
        input: { cartItemId: productId, quantity: initialValue - 1 },
      },
    });
  };

  const handleRemoveFromCart = async () => {
    try {
      await removeItem({
        variables: {
          input: { cartItemId: productId },
        },
      });
    } catch (err) {
      console.error(err); // instead console send to sentry ...
      toast({
        title: 'Item not removed.',
        description: 'try again later please',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex justify-between w-full">
      <NumberButtonGroup
        initialValue={initialValue}
        min={1}
        max={max}
        onIncrement={handleItemIncrement}
        onDecrement={handleItemDecrement}
        isUpdating={isUpdating}
      />
      <Button
        disabled={loading}
        variant="outline"
        onClick={handleRemoveFromCart}
      >
        <RemoveFromCartIcon />
      </Button>
    </div>
  );
};
