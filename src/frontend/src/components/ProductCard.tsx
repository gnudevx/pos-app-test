import { Product } from "../types";

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: Props) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p className="price">{product.price.toLocaleString()} VND</p>
      <p className="stock">Stock: {product.stock}</p>
      <button onClick={() => onAddToCart(product)} disabled={product.stock === 0}>
        {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
