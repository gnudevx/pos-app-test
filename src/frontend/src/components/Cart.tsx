import { CartItem } from "../types";

interface Props {
  items: CartItem[];
  total: number;
  onCheckout: () => void;
  onClear: () => void;
}

export function Cart({ items, total, onCheckout, onClear }: Props) {
  if (items.length === 0) {
    return <div className="cart empty"><p>Cart is empty</p></div>;
  }

  return (
    <div className="cart">
      <h2>Cart</h2>
      {items.map((item) => (
        <div key={item.product_id} className="cart-item">
          <span>{item.name}</span>
          <span>x{item.quantity}</span>
          <span>{(item.price * item.quantity).toLocaleString()} VND</span>
        </div>
      ))}
      <div className="cart-total">
        <strong>Total: {total.toLocaleString()} VND</strong>
      </div>
      <button onClick={onCheckout} className="btn-checkout">
        Checkout
      </button>
      <button onClick={onClear} className="btn-clear">
        Clear
      </button>
    </div>
  );
}
