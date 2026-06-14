"use client";

import { OrderProvider } from "@/lib/order-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <OrderProvider>{children}</OrderProvider>;
}
