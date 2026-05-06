export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  barcode?: string;
}

export interface CartItem {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}
