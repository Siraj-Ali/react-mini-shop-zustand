import type { CartItem } from "./cartTypes";

export interface ProductType {
    id:number,
    name: string | null
    desc: string | null
    price: number | null
    qty: number | null
}

export type OrderState = 
    | {status: "idle"} 
    | {status: "submitting"}
    | {status: "success"; message: string; orderId: number}
    | {status: "error"; error: string};

export type OrderFormData = {
    fullName: string
    email: string
    address: string
}

export interface OrderRequest {
  customer: OrderFormData;
  items: CartItem[];
  total: number;
}

export interface OrderResponse {
  id: number; // returned from API
  message: string;
}