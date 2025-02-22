'use client';

import { GET_PRODUCTS_QUERY } from '@/graphql/queries/get-products-query';
import { useQuery } from '@apollo/client';

import { GetProductsType } from '@/types/product-type';

import { LoadingSpinner } from '../loader';
import { ProductCard } from './components/product-card';
import { GET_CART_QUERY } from '@/graphql/queries/get-cart-query';
import { CartResponseType } from '@/types/cart/cart-type';
import { useMemo } from 'react';

const sectionClassname =
  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 w-full';

export const Products = () => {
  const { data, loading } = useQuery<GetProductsType>(GET_PRODUCTS_QUERY);
  const { data: cartData } = useQuery<CartResponseType>(GET_CART_QUERY);

  const cartItemsHash = useMemo(() => {
    const hashMap: Record<string, number> = {};

    cartData?.getCart?.items.forEach((item) => {
      hashMap[item.product.title] = item.quantity;
    }, {});

    return hashMap;
  }, [cartData]);

  return (
    <section className="flex flex-1 flex-col items-start justify-start gap-2 xl:gap-4 relative">
      <h2 className="font-bold text-xl">Products</h2>
      <section className={sectionClassname}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          data?.getProducts?.products.map((product) => {
            return (
              <ProductCard
                key={product._id}
                product={product}
                notInCart={!Boolean(cartItemsHash?.[product.title])}
              />
            );
          })
        )}
      </section>
    </section>
  );
};
