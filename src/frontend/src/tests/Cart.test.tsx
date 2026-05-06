import { render, screen } from "@testing-library/react";
import { Cart } from "../components/Cart";

const mockItems = [
  { product_id: 1, name: "Coca Cola", price: 15000, quantity: 2 }
];

test("renders empty cart message", () => {
  render(<Cart items={[]} total={0} onCheckout={() => {}} onClear={() => {}} />);
  expect(screen.getByText("Cart is empty")).toBeTruthy();
});

test("renders cart items and total", () => {
  render(
    <Cart items={mockItems} total={30000} onCheckout={() => {}} onClear={() => {}} />
  );
  expect(screen.getByText("Coca Cola")).toBeTruthy();
  // Dùng data-testid để tránh lỗi "Found multiple elements"
  expect(screen.getByTestId("cart-total").textContent).toContain("30,000");
});
