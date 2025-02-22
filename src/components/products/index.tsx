'use client';

import { GET_PRODUCTS_QUERY } from '@/graphql/queries/get-products-query';
import { useQuery } from '@apollo/client';

import { GetProductsType } from '@/types/product-type';

import { LoadingSpinner } from '../loader';
import { ProductCard } from './components/product-card';

const sectionClassname =
  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 w-full';

export const Products = () => {
  const { data, loading } = useQuery<GetProductsType>(GET_PRODUCTS_QUERY);

  return (
    <section className="flex flex-1 flex-col items-start justify-start gap-2 xl:gap-4 relative">
      <h2 className="font-bold text-xl">Popular Products</h2>
      <section className={sectionClassname}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          data?.getProducts?.products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </section>
    </section>
  );
};
