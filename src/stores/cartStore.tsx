import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartState, WishlistState } from '../types/cartTypes';
export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: {},
            add: (product:any, qty = 1) =>
                set((state:any) => {
                    const currentProduct = state.items[product.id];
                    const newQty = (currentProduct?.qty || 0) + qty;

                    return {
                        items: {
                            ...state.items, [product.id]: {...product, qty: newQty}
                        }
                    }
                }),
                
            increase: (id: any) => 
                set((state: any) => {
                  const current = state.items[id];
                  if(!current) return state;
                  
                  return {
                    items: {
                        ...state.items, [id]: {...current, qty: current.qty + 1 }
                    }
                  }
                }),
            decrease: (id: any) =>
                set((state: any) => {
                    const current = state.items[id];
                    if(!current) return state;

                    const newQty = current.qty - 1;
                    const updatedQty = {...state.items};

                    if(newQty <= 0) {
                        delete updatedQty[id]
                        return {items: updatedQty}
                    } 
                    updatedQty[id] = {...current, qty: newQty}
                    return {items: updatedQty}
                }),
            remove: (id: any) =>
                set((state: any) => {
                    const current = {...state.items};
                    delete current[id]

                    return {items: current};
                }),
            clear: () => set({items: {}}),
            
        }),
        {name: "cart-store"}
    )
);

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set) => ({
            wishedItems: {},
            addOrRemove: (p:any) => 
                set((state:any) => {
                    const currentItems = {...state.wishedItems};
                    if(currentItems[p.id]) delete currentItems[p.id]
                    else currentItems[p.id] = p;
                    return {wishedItems : currentItems}
                }),
            remove: (id: any) =>
                set((state: any) => {
                    const currentItem = {...state.wishedItems};
                    if(currentItem[id]) delete currentItem[id] ;

                    return {wishedItems:currentItem}
                }),
                
            clear: () => set({wishedItems: {}}),
        }),
        
    {name: "wish-store"}
    )

)