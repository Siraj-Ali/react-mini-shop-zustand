import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartPanel from "./CartPanel";
import { WishPanel } from "./WishPanel";
import { useCartStore, useWishlistStore } from "../stores/cartStore"
export default function Header() {
  const [showCart, setShowCart] = useState(false);
  const [showWish, setShowWish] = useState(false);
  const [totalCartItemCount, setTotalCartItemCount] = useState<any>("");
  const [totalWishedItemCount, setTotalWishedItemCount] = useState<any>("");
  const wishedItemObj = useWishlistStore((state) => state.wishedItems);
  const wishedItems = Object.values(wishedItemObj);

  const cartItemObj = useCartStore((state) => state.items);
  const cartItems = Object.values(cartItemObj);

  useEffect(() => {
    setTotalCartItemCount(cartItems.reduce((a, i) => a + i.qty, 0));
    setTotalWishedItemCount(wishedItems.length)
  }, [])
  return (
    <header className="header">
      <div className="container nav">
        <div className="brand">
          <Link to="/">MiniShop</Link>
        </div>
        <div className="icons">
          <button
            className="btn"
            onClick={() => {
              setShowWish((v) => !v);
              setShowCart(false);
            }}
          >
            ♥{" "}
            {totalWishedItemCount > 0 && (
              <span style={{ marginLeft: 6 }}>{totalWishedItemCount}</span>
            )}
          </button>
          <button
            className="btn"
            onClick={() => {
              setShowCart((v) => !v);
              setShowWish(false);
            }}
          >
            🛒{" "}
            {totalCartItemCount > 0 && (
              <span style={{ marginLeft: 6 }}>{totalCartItemCount}</span>
            )}
          </button>
          {showWish && <WishPanel onClose={() => setShowWish(false)} />}{" "}
          {showCart && <CartPanel onClose={() => setShowCart(false)} />}
        </div>
      </div>
    </header>
  );
}
