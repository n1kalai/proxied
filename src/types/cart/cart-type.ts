import { CartItemType } from "./cart-item-type";

export type CartResponseType = {
    getCart: {
      _id: string;
      hash: string;
      items: CartItemType[];
    };
  } 