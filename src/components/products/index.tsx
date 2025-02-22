'use client';

import { GET_PRODUCTS_QUERY } from '@/graphql/queries/get-products-query';
import { useQuery } from '@apollo/client';

import { GetProductsType } from '@/types/product-type';

import { ProductsContainer } from './products-container';

export const Products = () => {
  const { data, loading } = useQuery<GetProductsType>(GET_PRODUCTS_QUERY);

  return (
    <ProductsContainer
      data={data?.getProducts?.products}
      loading={loading}
      title="Products"
    />
  );
};
