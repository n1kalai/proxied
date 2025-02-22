import { useRemoveItem } from '@/hooks/use-remove-item';

import { Button } from '../../ui/button';
import { useToast } from '@/hooks/use-toast';
import { RemoveFromCartIcon } from '../../icons/remove-from-cart';
import { NumberButtonGroup } from '../../ui/button-group';
import { useMutation } from '@apollo/client';
import { UPDATE_ITEM_QUANTITY_MUTATION } from '@/graphql/mutations/update-cart-item-amount';

import { validateRemoveItem, validateUpdateItemQuantity } from '@/validations';

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
    },
  );

  const { toast } = useToast();

  const handleItemIncrement = () => {
    if (!validateUpdateItemQuantity(productId, 1)) return;

    updateItemQuantity({
      variables: {
        input: { cartItemId: productId, quantity: initialValue + 1 },
      },
    });
  };

  const handleItemDecrement = () => {
    if (!validateUpdateItemQuantity(productId, 1)) return;

    updateItemQuantity({
      variables: {
        input: { cartItemId: productId, quantity: initialValue - 1 },
      },
    });
  };

  const handleRemoveFromCart = async () => {
    if (!validateRemoveItem(productId)) return;

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
