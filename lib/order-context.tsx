"use client";

import React, { createContext, useCallback, useContext, useMemo, useState, useEffect } from "react";

export interface OrderItem {
  cookieId: number;
  name: string;
  quantity: number;
  price: number;
}

interface OrderContextValue {
  items: OrderItem[];
  addItem: (cookieId: number, name: string, price: number, qty?: number) => void;
  setQuantity: (cookieId: number, qty: number) => void;
  clearOrder: () => void;
  totalItems: number;
  totalPrice: number;
  buildWhatsAppText: () => string;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("crukie-cart");
      if (stored) setItems(JSON.parse(stored));
    } catch (e) {
      console.error("Failed to load cart", e);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("crukie-cart", JSON.stringify(items));
    }
  }, [items, mounted]);

  const addItem = useCallback((cookieId: number, name: string, price: number, qty = 1) => {
    setItems((prev) => {
      const hit = prev.find((i) => i.cookieId === cookieId);
      if (hit) {
        return prev.map((i) =>
          i.cookieId === cookieId ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { cookieId, name, price, quantity: qty }];
    });
  }, []);

  const setQuantity = useCallback((cookieId: number, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.cookieId !== cookieId)
        : prev.map((i) => (i.cookieId === cookieId ? { ...i, quantity: qty } : i))
    );
  }, []);

  const clearOrder = useCallback(() => setItems([]), []);

  const totalItems = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items]);

  const buildWhatsAppText = useCallback(() => {
    const cookie = "🍪";
    const lines = items.map((i) => `• ${i.quantity}x ${i.name} ($${i.price * i.quantity} MXN)`).join("\n");
    return [
      `Hola! Me gustaria hacer un pedido de Crukies ${cookie}`,
      "",
      lines,
      "",
      `Total: ${totalItems} ${totalItems === 1 ? "galleta" : "galletas"} - $${totalPrice} MXN`,
    ].join("\n");
  }, [items, totalItems, totalPrice]);

  return (
    <OrderContext.Provider value={{ items, addItem, setQuantity, clearOrder, totalItems, totalPrice, buildWhatsAppText }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
}
