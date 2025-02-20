import { ProductType } from "../product-type";

export type CartItemType = {
    _id: string;
    quantity: number;
    product: ProductType
  }