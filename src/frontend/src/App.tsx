import { useState, useEffect } from "react";
import { Product, CartItem } from "./types";
import { ProductCard } from "./components/ProductCard";
import { Cart } from "./components/Cart";
import { fetchProducts, addToCart, getCart, checkout } from "./api/client";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [receipt, setReceipt] = useState<object | null>(null);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
    refreshCart();
  }, []);

  function refreshCart() {
    getCart().then((data) => {
      setCartItems(data.items as CartItem[]);
      setTotal(data.total as number);
    }).catch(console.error);
  }

  async function handleAddToCart(product: Product) {
    await addToCart({
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
    refreshCart();
  }

  async function handleCheckout() {
    const result = await checkout();
    setReceipt(result.receipt as object);
    setCartItems([]);
    setTotal(0);
  }

  async function handleClear() {
    await fetch("http://localhost:8000/cart/clear", { method: "DELETE" });
    refreshCart();
  }

  return (
    <div className="app">
      <header><h1>POS System</h1></header>
      <main>
        <section className="products">
          <h2>Products</h2>
          <div className="product-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </section>
        <aside>
          <Cart
            items={cartItems}
            total={total}
            onCheckout={handleCheckout}
            onClear={handleClear}
          />
          {receipt && (
            <div className="receipt">
              <h3>Receipt</h3>
              <pre>{JSON.stringify(receipt, null, 2)}</pre>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}
