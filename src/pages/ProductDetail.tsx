import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCartStore, useWishlistStore } from "../stores/cartStore";

export const ProductDetail = () => {
    
  const [p, setProduct] = useState({id: 1, name: "", desc: "", price: 12, qty: 0});
  const {id} = useParams();

  const addItemToCart = useCartStore((state) => state.add);
  const addItemToWish = useWishlistStore((state) => state.addOrRemove);
  const wishlistObj = useWishlistStore((state) => state.wishedItems);
  const wishedItems = Object.values(wishlistObj);

  useEffect(() => {
    fetch("/react-mini-shop-zustand/data/products.json")
    .then(resp => resp.json())
    .then((list) => setProduct(list.find((item:any) => String(item.id) === String(id))))
  }, [])
  
    return (
        <>
            <div className="container" style={{ marginTop: 16 }}>
      <Link className="btn" to="/products">
        ← Back
      </Link>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginTop: 12,
        }}
      >
        <div className="card">
          <div
            style={{ height: 220, background: "#04142a", borderRadius: 8 }}
          ></div>
        </div>
        <div className="card">
          <h2>{p.name}</h2>
          <p style={{ color: "#9fb0c8" }}>{p.desc}</p>
          <div style={{ fontWeight: 700, color: "#06d6a0" }}>
            ${p.price.toFixed(2)}
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button className="btn btn-accent" onClick={() => addItemToCart(p)}>
              Add to cart
            </button>
            <button className="btn" onClick={() => addItemToWish(p)}>
              {wishedItems.find((el) => el.id === p.id) ? "♥ Wished" : "♡ Wishlist"}
              {/* "♡ Wishlist" */}
            </button>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}