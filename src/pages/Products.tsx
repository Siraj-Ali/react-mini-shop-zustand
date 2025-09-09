import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import type { ProductType } from "../types/productType";
import { useCartStore, useWishlistStore } from "../stores/cartStore"

export const Products = () => {
    const add = useCartStore((state) => state.add);
    const wishedItemsObj = useWishlistStore((state) => state.wishedItems)
    const wishedItems = Object.values(wishedItemsObj);
    const addOrRemoveWish = useWishlistStore((state) => state.addOrRemove)
    const [products, setProducts] = useState<ProductType[]>([])
    // const [wished, setWished] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
useEffect(() => {
    setIsLoading(true)
    fetch("/src/data/products.json")
    .then(resp => resp.json())
    .then((data: ProductType[]) => {
        setProducts(data)
        setIsLoading(false)
    })
    
}, [])

if(isLoading) {
    return (
        <p>Loading....</p>
    )
}

    return (
        <>
            <div className="container" style={{ marginTop: 16 }}>
                <div className="grid">
                    {products.map((p) => (
                    <div className="card" key={p.id}>
                    <div
                      style={{ height: 120, background: "#04142a", borderRadius: 8 }}
                    ></div>
                    <h3>{p.name}</h3>
                    <div style={{ color: "#9fb0c8" }}>{p.desc}</div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 8,
                      }}
                    >
                      <div style={{ fontWeight: 700, color: "#06d6a0" }}>
                        ${p.price ? p.price.toFixed(2) : 0}
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button className="btn" onClick={() =>add(p)}>
                          Add
                        </button>
                        <button className="btn" onClick={() => addOrRemoveWish(p)}>
                          {wishedItems.find((el) => el.id === p.id) ? "♥" : "♡"}
                        </button>
                        <Link className="btn btn-accent" to={`/products/${p.id}`}>
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                    ))}
                </div>
                </div>
        </>
    )
}