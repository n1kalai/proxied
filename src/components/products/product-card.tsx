import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { AddToCartBtn } from './add-to-cart-btn';
import { RemoveFromCartFooter } from './remove-from-cart-btn';
import { CartItemType } from '@/types/cart/cart-item-type';

export const ProductCard = ({
  remove = false,
  item,
}: {
  remove?: boolean;
  item: CartItemType;
}) => {
  const {
    product: { _id, title, cost, availableQuantity },
    quantity,
  } = item;
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{cost}</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-end">
        {remove ? (
          <RemoveFromCartFooter
            productId={_id}
            max={availableQuantity}
            initialValue={quantity}
          />
        ) : (
          <AddToCartBtn productId={_id} />
        )}
      </CardFooter>
    </Card>
  );
};
