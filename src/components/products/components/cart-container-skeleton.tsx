import { CartItemSkeleton } from './cart-item-skeleton';

const sectionClassname =
  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 w-full';

export const CartContainerSkeleton = () => {
  return (
    <div className={sectionClassname}>
      <CartItemSkeleton />
      <CartItemSkeleton />
      <CartItemSkeleton />
      <CartItemSkeleton />
      <CartItemSkeleton />
      <CartItemSkeleton />
      <CartItemSkeleton />
      <CartItemSkeleton />
      <CartItemSkeleton />
      <CartItemSkeleton />
    </div>
  );
};
