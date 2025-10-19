import React, { useReducer, useState } from "react";
import type { OrderState, OrderFormData, OrderRequest } from "../types/productType";
import { useCartStore } from "../stores/cartStore";
import type { CartItem } from "../types/cartTypes";
import { submitOrder } from "../apis/api";

const initialForm: OrderFormData = {
  fullName: "",
  email: "",
  address: "",
};

function orderReducer(state: OrderState, action: OrderState): OrderState {
    console.log(state);
    switch(action.status) {
        case "submitting": return {status: "submitting"};
        
        case "success": return {status: "success", message: action.message, orderId: action.orderId};
        
        case "error": return {status: "error", error: action.error};

        case "idle": return {status: "idle"}
    }
}

export const PlaceOrderForm: React.FC<{ total: number }> = ({total}) => {
  
    const [form, setForm] = useState<OrderFormData>(initialForm);
    const [state, dispatch] = useReducer(orderReducer, {status: "idle"});
    const cartItems = Object.values(useCartStore((state) => state.items)) as CartItem[];
    const clearCart = useCartStore((state) => state.clear);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Items:', cartItems);
        if(cartItems.length === 0) {
            dispatch({status: "error", error: "Your Cart is empty.."})
            return;
        }
        console.log("Submited")

        dispatch({status: "submitting"})

        const order: OrderRequest = {
            customer: form,
            items: cartItems,
            total,
        }

        try {
            const resp = await submitOrder(order);

            const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
            
            storedOrders.push({
                id: resp.id,
                ...order,
                placedAt: new Date().toISOString()
            });

            localStorage.setItem("orders", JSON.stringify(storedOrders));
            
            dispatch({status: "success", message: resp.message, orderId: resp.id});
            setTimeout(() => {
                clearCart?.();
                setForm(initialForm);
            }, 500);
            setForm(initialForm);

        }catch (err) {
            dispatch({ status: "error", error: (err as Error).message });
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(e.target);
        const {name, value} = e.target;
        console.log(value);
        setForm((prev) => ({...prev, [name]: value}))
    }
  return (
    <div style={{ marginTop: 32 }}>
      <h3>Place Your Order</h3>

      {/* {state.status === "success" && <p style={{ color: "green" }}>{state.message}</p>}
      {state.status === "error" && <p style={{ color: "red" }}>{state.error}</p>} */}

{state.status === "success" && (
        <div style={{ color: "green", background: "#e8f5e9", padding: 10, borderRadius: 6 }}>
          ✅ {state.message} (Order ID: {state.orderId})
        </div>
      )}
      {state.status === "error" && (
        <div style={{ color: "red", background: "#ffebee", padding: 10, borderRadius: 6 }}>
          ❌ {state.error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Delivery Address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <button
          className="btn"
          type="submit"
          disabled={state.status === "submitting"}
          style={{ background: "#00b894", color: "#fff" }}
        >
          {state.status === "submitting" ? "Placing Order..." : `Place Order ($${total.toFixed(2)})`}
        </button>
      </form>
    </div>
  );
};
