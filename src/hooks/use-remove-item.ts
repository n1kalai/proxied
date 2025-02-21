import { REMOVE_ITEM_MUTATION } from '@/graphql/mutations/remove-cart-item';
import { useMutation } from '@apollo/client';
import { useToast } from './use-toast';

export const useRemoveItem = () => {
  const { toast } = useToast();
  const [removeItem, { loading, error }] = useMutation(REMOVE_ITEM_MUTATION, {
    onError: (err) => {
      console.error(err);
      toast({
        title: 'Failed to remove item',
        description: 'We could not remove item from your cart.',
        variant: 'destructive',
      });
    },
  });

  return { removeItem, loading, error };
};
