export type ProductType = {
    title: string;
    cost: number;
    availableQuantity: number;
    __typename: string; 
    _id: string
  };

export type GetProductsType = {
    getProducts: {
      products: ProductType[];
      total: number;
      __typename: string
    }
  }
