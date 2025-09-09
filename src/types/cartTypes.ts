// types/cartTypes.ts
import type { ProductType } from "../types/productType";

export type CartItem = ProductType & { qty: number };

export type CartState = {
  items: Record<string, CartItem>; // key = product.id
  add: (product: ProductType, qty?: number) => void;
  increase: (id: string | number) => void;
  decrease: (id: string | number) => void;
  remove: (id: string | number) => void;
  clear: () => void;
};

export type WishlistState = {
    wishedItems: Record<string, CartItem>;
    addOrRemove: (product: ProductType, qty?: number) => void;
    remove: (id: string | number) => void;
    clear: (id: string | number) => void;
}
