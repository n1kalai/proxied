import { RemoveFromCartFooter } from '@/components/products/remove-from-cart-btn';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CartItemType } from '@/types/cart/cart-item-type';

export const CartProductCard = ({
  item,
}: {
  remove?: boolean;
  item: CartItemType;
}) => {
  const {
    product: { title, cost, availableQuantity },
    quantity,
    _id,
  } = item;

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{cost}</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-end">
        <RemoveFromCartFooter
          productId={_id}
          max={availableQuantity}
          initialValue={quantity}
        />
      </CardFooter>
    </Card>
  );
};
