import { useMemo } from 'react';
import { useCartStore } from '../stores/cartStore';
import type { CartItem } from '../types/cartTypes';
import { PlaceOrderForm } from '../components/PlaceOrderForm';
export const PlaceOrder = () => {

    const cartItems = Object.values(useCartStore((state) => state.items)) as CartItem[];

    const total = useMemo(() => {
        return cartItems.reduce((a, i) => a + i.qty * (i.price ?? 0), 0);
    }, [cartItems])
    return (
        <>
    <div className="container" style={{ marginTop: 16 }}>
      <h2>Checkout</h2>

      {cartItems.length !== 0 && (
        <div style={{ marginBottom: 20 }}>
            <h4>Your Items:</h4>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  borderBottom: "1px solid #1a2b3d",
                }}
              >
                <span>
                  {item.name} (x{item.qty})
                </span>
                <span>${(item.qty * (item.price ?? 0)).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
              <strong>Total:</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>
          </div>
      )} 
          

          {/* ✅ Type-safe order form */}
          <PlaceOrderForm  total={total}/>
    </div>
        </>
    )
}