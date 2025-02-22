import { ProductType } from '@/types/product-type';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import { AddToCartBtn } from './add-to-cart-btn';

export const ProductCard = ({
  product,
  notInCart,
}: {
  product: ProductType;
  notInCart?: boolean;
}) => {
  const { _id, title, cost } = product;

  return (
    <Card className="flex flex-col justify-between h-[150px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{cost}</CardDescription>
      </CardHeader>

      {notInCart && (
        <CardFooter className="flex justify-end">
          <AddToCartBtn productId={_id} />
        </CardFooter>
      )}
    </Card>
  );
};
