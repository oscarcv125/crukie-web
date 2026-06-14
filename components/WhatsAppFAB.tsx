"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { WhatsAppIcon } from "./Icons";
import { WHATSAPP_ORDER_URL } from "@/lib/contact";

export default function WhatsAppFAB() {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  // Entrance animation
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.opacity = "0";
    btn.style.transform = "scale(0.5)";
    animate(btn, { opacity: [0, 1], scale: [0.5, 1], duration: 500, delay: 1200, ease: "outBack(1.4)" });
  }, []);

  // Pulse ring animation
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    animate(ring, {
      scale: [1, 1.9],
      opacity: [0.5, 0],
      duration: 1600,
      loop: true,
      ease: "outExpo",
    });
  }, []);

  return (
    <a
      ref={btnRef}
      href={WHATSAPP_ORDER_URL()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform duration-200 hover:scale-110"
      style={{ backgroundColor: "#25D366" }}
      aria-label="Ordenar por WhatsApp"
    >
      {/* Pulse ring */}
      <span
        ref={ringRef}
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: "#25D366", opacity: 0.5 }}
      />
      <WhatsAppIcon className="w-7 h-7 relative z-10" style={{ color: "#fff" }} />
    </a>
  );
}
