import { ProductCardSkeleton } from './product-cart-skeleton';

const sectionClassname =
  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 w-full';

export const ProductsContainerSkeleton = ({ className = '' }) => {
  return (
    <div className={sectionClassname}>
      <ProductCardSkeleton className={className} />
      <ProductCardSkeleton className={className} />
      <ProductCardSkeleton className={className} />
      <ProductCardSkeleton className={className} />
      <ProductCardSkeleton className={className} />
      <ProductCardSkeleton className={className} />
      <ProductCardSkeleton className={className} />
      <ProductCardSkeleton className={className} />
      <ProductCardSkeleton className={className} />
      <ProductCardSkeleton className={className} />
    </div>
  );
};
