const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products/`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function addToCart(item: {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
}) {
  const res = await fetch(`${BASE_URL}/cart/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json();
}

export async function checkout() {
  const res = await fetch(`${BASE_URL}/cart/checkout`, { method: "POST" });
  if (!res.ok) throw new Error("Checkout failed");
  return res.json();
}

export async function getCart() {
  const res = await fetch(`${BASE_URL}/cart/`);
  if (!res.ok) throw new Error("Failed to get cart");
  return res.json();
}
