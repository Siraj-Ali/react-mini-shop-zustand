
import { Link } from "react-router-dom";
import { useWishlistStore } from "../stores/cartStore"

type WishPanelProps = {
    onClose: () => void;
  };

export const WishPanel = ({ onClose }: WishPanelProps) => {

    // const [items, setItems] = useState([{id: 1, name: "", desc: "", price: 12, qty: 1}])
    const wishlistItemObj = useWishlistStore((state) => state.wishedItems);
    const remove = useWishlistStore((state) => state.remove);
    const items = Object.values(wishlistItemObj);
    // const [total, setTotal] = useState(12)

  return (
    <div className="panel">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4>Wishlist</h4>
        <button className="btn" onClick={onClose}>
          Close
        </button>
      </div>
      {items.length === 0 ? (
        <p style={{ color: "#9fb0c8" }}>Empty.</p>
      ) : (
        items.map((i) => (
          <div
            key={i.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 8,
            }}
          >
            <div>
              <div>{i.name}</div>
              <div style={{ color: "#9fb0c8" }}>${i.price ? i.price.toFixed(2) : 0}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn" >
                Move
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

          
        ))
      )}
      <div style={{ marginTop: 12 }}>
          <Link to="/wishlist">
            <button
              className="btn btn-accent"
              onClick={() => {
                onClose();
                // window.location.href = "/cart";
              }}
            >
              View Wishlist
            </button>
            
            </Link>
          </div>
    </div>
  );
}
