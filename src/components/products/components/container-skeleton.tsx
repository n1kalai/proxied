import { ProductCardSkeleton } from './product-cart-skeleton';

export const ProductsContainerSkeleton = () => {
  return (
    <div className="sectionClassname" data-testid="loading-skeleton">
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </div>
  );
};
