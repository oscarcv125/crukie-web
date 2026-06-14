"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export interface OrderItem {
  cookieId: number;
  name: string;
  quantity: number;
}

interface OrderContextValue {
  items: OrderItem[];
  addItem: (cookieId: number, name: string, qty?: number) => void;
  setQuantity: (cookieId: number, qty: number) => void;
  clearOrder: () => void;
  totalItems: number;
  buildWhatsAppText: () => string;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);

  const addItem = useCallback((cookieId: number, name: string, qty = 1) => {
    setItems((prev) => {
      const hit = prev.find((i) => i.cookieId === cookieId);
      if (hit) {
        return prev.map((i) =>
          i.cookieId === cookieId ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { cookieId, name, quantity: qty }];
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

  const buildWhatsAppText = useCallback(() => {
    const lines = items.map((i) => `• ${i.quantity}x ${i.name}`).join("\n");
    return [
      "¡Hola! Me gustaría hacer un pedido de Crukies 🍪",
      "",
      "🛒 Mi pedido:",
      lines,
      "",
      `Total: ${totalItems} ${totalItems === 1 ? "galleta" : "galletas"}`,
      "",
      "Nombre:",
      "Fecha de entrega deseada:",
      "¿Tienes alergias?",
    ].join("\n");
  }, [items, totalItems]);

  return (
    <OrderContext.Provider value={{ items, addItem, setQuantity, clearOrder, totalItems, buildWhatsAppText }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
}
