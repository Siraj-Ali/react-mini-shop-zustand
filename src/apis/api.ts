import type { OrderResponse, OrderRequest } from './../types/productType';
// src/api.ts

export async function submitOrder(order: OrderRequest): Promise<OrderResponse> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 1500));

  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  if (!res.ok) {
    throw new Error("Failed to place order");
  }

  const data = await res.json();
  return {
    id: data.id,
    message: "Order placed successfully!",
  };
}
