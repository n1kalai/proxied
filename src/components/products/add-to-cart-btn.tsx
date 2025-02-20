import { ADD_CART_ITEM_MUTATION } from '@/services/mutations/add-cart-item-mutation';
import { useMutation } from '@apollo/client';
import { Button } from '../ui/button';
import { AddToCartIcon } from '../icons/add-to-cart';

export const AddToCartBtn = ({ productId }: { productId: string }) => {
  const [addItem] = useMutation(ADD_CART_ITEM_MUTATION);

  const handleAddToCart = async () => {
    try {
      const { data } = await addItem({
        variables: {
          input: {
            productId,
            quantity: 1, // Default to 1, can be modified to dynamic
          },
        },
      });

      if (data?.addItem) {
        console.log('added', productId);
      }
    } catch (err) {
      console.error(err);
      //   setMessage('Failed to add item.');
    }
  };

  return (
    <Button variant="outline" onClick={handleAddToCart}>
      <AddToCartIcon />
    </Button>
  );
};
