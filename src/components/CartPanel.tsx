import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/cartStore"
type CartPanelProps = {
    onClose: () => void;  // a function that returns nothing
  };
  
export default function CartPanel({
  onClose,
}: CartPanelProps) {

    // const [items, setItems] = useState([{id: 1, name: "", desc: "", price: 12, qty: 1}])
    const [total, setTotal] = useState(0)

    const cartItemsObj = useCartStore((state) => state.items);
    const increase = useCartStore((state) => state.increase);
    const decrease = useCartStore((state) => state.decrease);
    const remove = useCartStore((state) => state.remove);
    const cartItems = Object.values(cartItemsObj);

    const itemTotal = cartItems.reduce((a, i) => a + i.qty * (i.price ?? 0) , 0);

    useEffect(() => {
        setTotal(itemTotal);
    }, [cartItems])

  return (
    <div className="panel">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4>Your Cart</h4>
        <button className="btn" onClick={onClose}>
          Close
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p style={{ color: "#9fb0c8" }}>No items.</p>
      ) : (
        <>
          {cartItems.map((i) => (
            <div
              key={i.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 8,
                borderBottom: "1px solid #112233",
              }}
            >
              <div>
                <div>{i.name}</div>
                <div style={{ color: "#9fb0c8" }}>${i.price ? i.price.toFixed(2) : 0}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button className="btn" onClick={() => decrease(i.id)}>
                  -
                </button>
                <div
                  style={{
                    padding: "4px 8px",
                    background: "#031428",
                    borderRadius: 8,
                  }}
                >
                  {i.qty}
                </div>
                <button className="btn" onClick={() => increase(i.id)}>
                  +
                </button>
                <button
                  className="btn"
                  onClick={() => remove(i.id)}
                  style={{ background: "#ff5a5f" }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            <strong>Total</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <div style={{ marginTop: 12 }}>
          <Link to="/cart">
            <button
              className="btn btn-accent"
              onClick={() => {
                onClose();
                // window.location.href = "/cart";
              }}
            >
              View Cart
            </button>
            
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
