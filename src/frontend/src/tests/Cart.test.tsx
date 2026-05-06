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
  // ✅ Fix: dùng getAllByText thay vì getByText vì có nhiều element chứa 30,000
  const elements = screen.getAllByText(/30,000/);
  expect(elements.length).toBeGreaterThan(0);
});
