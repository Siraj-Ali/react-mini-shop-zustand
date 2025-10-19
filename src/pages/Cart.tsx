import { useEffect, useState } from "react"
import { useCartStore } from "../stores/cartStore"
import { useNavigate } from "react-router-dom";

export const Cart = () => {
    
    // const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0)
    const cartItemsObject = useCartStore((state) => state.items);
    const increase = useCartStore((state) => state.increase);
    const decrease = useCartStore((state) => state.decrease);
    const remove = useCartStore((state) => state.remove);
    const cartItem = Object.values(cartItemsObject);

    const navigate = useNavigate();
    
    useEffect(() => {
        const totalPrice = cartItem.reduce((a,i) => a + i.qty * (i.price ?? 0), 0);
        setTotal(totalPrice)
    }, [cartItem])
    return (
        <>
            <div className="container" style={{ marginTop: 16 }}>
            <h2>Your Cart</h2>
            {cartItem.length === 0 ? (
                <p style={{ color: "#9fb0c8" }}>No items.</p>
            ) : (
                <div>
                {cartItem.map((i) => (
                    <div
                    key={i.id}
                    className="card"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 12,
                        marginBottom: 8,
                    }}
                    >
                    <div>
                        <div>{i.name}</div>
                        <div style={{ color: "#9fb0c8" }}>${i.price ? i.price.toFixed(2) : 0}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
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
                </div>
            )}
            <div className="btn-place-order"
            style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 12,
                    }}>
                 <button
                        className="btn"
                        onClick={() => navigate("/checkout")}
                        style={{ background: "#127310ff" }}
                        >
                        Checkout
                        </button>
            </div>
            </div>
        
        </>
    )
}