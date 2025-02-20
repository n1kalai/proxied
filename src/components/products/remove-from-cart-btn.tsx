import { useRemoveItem } from '@/hooks/use-remove-item';

import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { RemoveFromCartIcon } from '../icons/remove-from-cart';
import { NumberButtonGroup } from '../ui/button-group';

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
  const { toast } = useToast();

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
      <NumberButtonGroup initialValue={initialValue} min={0} max={max} />
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
