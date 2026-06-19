import { createContext } from "react";

export interface CartItem {
  bookId: string;
  quantity: number;
}

export interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (bookId: string) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
