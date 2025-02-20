import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { AddToCartBtn } from './add-to-cart-btn';

export const ProductCard = ({
  title,
  cost,
  id,
}: {
  title: string;
  cost: number;
  id: string;
}) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{cost}</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-end">
        <AddToCartBtn productId={id} />
      </CardFooter>
    </Card>
  );
};
