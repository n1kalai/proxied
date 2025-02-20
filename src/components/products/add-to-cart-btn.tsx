import { ADD_CART_ITEM_MUTATION } from '@/services/mutations/add-cart-item-mutation';
import { useMutation } from '@apollo/client';
import { Button } from '../ui/button';
import { AddToCartIcon } from '../icons/add-to-cart';
import { useToast } from '@/hooks/use-toast';

export const AddToCartBtn = ({ productId }: { productId: string }) => {
  const [addItem] = useMutation(ADD_CART_ITEM_MUTATION);
  const { toast } = useToast();

  const handleAddToCart = async () => {
    try {
      const { data } = await addItem({
        variables: {
          input: {
            productId,
            quantity: 1, // Default to 1, can be modified to dynamic
          },
        },
        onCompleted: () => {
          toast({
            title: 'Added to cart',
            description: 'Item added to cart successfully.',
          });
        },

        onError: () => {
          toast({
            title: 'Failed to add item',
            description: 'Something went wrong, please try again later.',
            variant: 'destructive',
          });
        },
      });

      console.log('data', data);
    } catch (err) {
      toast({
        title: 'Failed to add item',
        description: JSON.stringify(err),
        variant: 'destructive',
      });
      //   setMessage('Failed to add item.');
    }
  };

  return (
    <Button variant="outline" onClick={handleAddToCart}>
      <AddToCartIcon />
    </Button>
  );
};
