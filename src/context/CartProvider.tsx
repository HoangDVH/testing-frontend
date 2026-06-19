import { useMemo, useState, useCallback, type ReactNode } from "react";
import { catalogBooks } from "../data/siteData";
import { CartContext, type CartItem } from "./cartContext";

function getSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => {
    const book = catalogBooks.find((entry) => entry.id === item.bookId);
    return total + (book?.price ?? 0) * item.quantity;
  }, 0);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(() => getSubtotal(items), [items]);

  const addItem = useCallback((bookId: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.bookId === bookId);
      if (existing) {
        return prev.map((item) =>
          item.bookId === bookId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { bookId, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((bookId: string) => {
    setItems((prev) => prev.filter((item) => item.bookId !== bookId));
  }, []);

  const updateQuantity = useCallback((bookId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.bookId !== bookId));
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.bookId === bookId ? { ...item, quantity } : item,
      ),
    );
  }, []);

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, addItem, removeItem, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
