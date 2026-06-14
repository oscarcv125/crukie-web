"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { useOrder } from "@/lib/order-context";
import { COOKIE_VISUALS } from "@/lib/menu";
import { WhatsAppIcon, InstagramIcon } from "./Icons";
import { WHATSAPP_TEXT_URL, INSTAGRAM_URL } from "@/lib/contact";
import { IconShoppingBag, IconX } from "@tabler/icons-react";

export default function OrderPanel() {
  const { items, setQuantity, clearOrder, totalItems, buildWhatsAppText } = useOrder();
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const fabRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const prevTotal = useRef(0);

  // FAB slide-in / slide-out + bounce on count change
  useEffect(() => {
    const fab = fabRef.current;
    if (!fab) return;

    const wasZero = prevTotal.current === 0;
    const isZero = totalItems === 0;

    if (wasZero && !isZero) {
      fab.style.pointerEvents = "auto";
      animate(fab, { opacity: [0, 1], translateY: [72, 0], duration: 480, ease: "outBack(1.3)" });
    } else if (!wasZero && isZero) {
      animate(fab, {
        opacity: [1, 0],
        translateY: [0, 72],
        duration: 340,
        ease: "inQuart",
        onComplete: () => { fab.style.pointerEvents = "none"; },
      });
    } else if (!isZero) {
      // Count changed — pulse
      setAdded(true);
      setTimeout(() => setAdded(false), 600);
      animate(fab, { scale: [1, 1.1, 1], duration: 380, ease: "outBack(2)" });
    }

    prevTotal.current = totalItems;
  }, [totalItems]);

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [isOpen]);

  // Animate panel in when it mounts (isOpen becomes true)
  useEffect(() => {
    if (!isOpen) return;
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (overlay) animate(overlay, { opacity: [0, 1], duration: 280, ease: "outQuart" });
    if (panel)
      animate(panel, {
        opacity: [0, 1],
        translateY: [48, 0],
        scale: [0.96, 1],
        duration: 440,
        ease: "outBack(1.1)",
      });
  }, [isOpen]);

  const closePanel = () => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) { setIsOpen(false); return; }
    animate(panel, { opacity: [1, 0], translateY: [0, 32], scale: [1, 0.96], duration: 280, ease: "inQuart" });
    animate(overlay, { opacity: [1, 0], duration: 320, ease: "inQuart", onComplete: () => setIsOpen(false) });
  };

  const handleWhatsApp = () => {
    window.open(WHATSAPP_TEXT_URL(buildWhatsAppText()), "_blank");
  };

  const handleInstagram = async () => {
    try {
      await navigator.clipboard.writeText(buildWhatsAppText());
      setToast("¡Pedido copiado! 📋 Pégalo en el DM de Instagram");
      setTimeout(() => setToast(null), 3800);
    } catch {
      // clipboard unavailable — skip toast
    }
    window.open(INSTAGRAM_URL, "_blank");
  };

  return (
    <>
      {/* FAB pill — bottom-center, always in DOM, hidden via animation */}
      <div
        className="fixed bottom-6 inset-x-0 z-[60] flex justify-center"
        style={{ pointerEvents: "none" }}
      >
        <button
          ref={fabRef}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold shadow-2xl cursor-pointer transition-colors duration-200"
          style={{
            pointerEvents: "none",
            opacity: 0,
            transform: "translateY(72px)",
            backgroundColor: added ? "#6DAEDB" : "#011638",
            color: "#FAF0CA",
            border: "1.5px solid rgba(109,174,219,0.4)",
            fontFamily: "var(--font-momo), 'Momo Trust Display', sans-serif",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            willChange: "transform, opacity",
          }}
        >
          <IconShoppingBag size={18} stroke={1.8} />
          <span>Ver pedido</span>
          <span
            className="ml-0.5 px-2 py-0.5 rounded-full text-xs font-bold"
            style={{ backgroundColor: "#6DAEDB", color: "#011638" }}
          >
            {totalItems}
          </span>
        </button>
      </div>

      {/* Modal overlay */}
      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-6"
          style={{ backgroundColor: "rgba(1,22,56,0.9)", backdropFilter: "blur(14px)", opacity: 0 }}
          onClick={(e) => { if (e.target === overlayRef.current) closePanel(); }}
        >
          <div
            ref={panelRef}
            className="relative w-full sm:max-w-md sm:rounded-3xl overflow-hidden rounded-t-3xl"
            style={{ backgroundColor: "#003049", maxHeight: "88vh", opacity: 0 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid rgba(109,174,219,0.15)" }}
            >
              <div>
                <h2
                  className="font-bold text-lg"
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    color: "#FAF0CA",
                  }}
                >
                  Tu pedido
                </h2>
                <p className="text-xs mt-0.5" style={{ color: "#6DAEDB" }}>
                  {totalItems} {totalItems === 1 ? "galleta" : "galletas"} seleccionadas
                </p>
              </div>
              <div className="flex items-center gap-3">
                {items.length > 0 && (
                  <button
                    onClick={clearOrder}
                    className="text-xs cursor-pointer transition-opacity hover:opacity-100"
                    style={{ color: "#FAF0CA", opacity: 0.38 }}
                  >
                    Limpiar todo
                  </button>
                )}
                <button
                  onClick={closePanel}
                  className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
                  style={{ backgroundColor: "rgba(250,240,202,0.1)", color: "#FAF0CA" }}
                >
                  <IconX size={16} />
                </button>
              </div>
            </div>

            {/* Item list */}
            <div className="overflow-y-auto" style={{ maxHeight: "calc(88vh - 230px)" }}>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <span className="text-5xl">🍪</span>
                  <p className="text-sm" style={{ color: "#FAF0CA", opacity: 0.45 }}>
                    Agrega galletas desde el menú
                  </p>
                </div>
              ) : (
                <ul>
                  {items.map((item, idx) => {
                    const visual = COOKIE_VISUALS[item.cookieId] ?? { emoji: "🍪", bg: "" };
                    return (
                      <li
                        key={item.cookieId}
                        className="flex items-center gap-4 px-6 py-4"
                        style={{
                          borderBottom:
                            idx < items.length - 1
                              ? "1px solid rgba(109,174,219,0.1)"
                              : "none",
                        }}
                      >
                        <span className="text-3xl w-10 text-center shrink-0">{visual.emoji}</span>

                        <p
                          className="flex-1 text-sm font-semibold truncate"
                          style={{
                            color: "#FAF0CA",
                            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                          }}
                        >
                          {item.name}
                        </p>

                        {/* Stepper */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setQuantity(item.cookieId, item.quantity - 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm cursor-pointer transition-all duration-150 hover:scale-110"
                            style={{ backgroundColor: "rgba(250,240,202,0.1)", color: "#FAF0CA" }}
                          >
                            −
                          </button>
                          <span
                            className="w-6 text-center text-sm font-bold"
                            style={{ color: "#FAF0CA" }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(item.cookieId, item.quantity + 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm cursor-pointer transition-all duration-150 hover:scale-110"
                            style={{ backgroundColor: "#6DAEDB", color: "#011638" }}
                          >
                            +
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Send CTAs */}
            {items.length > 0 && (
              <div
                className="px-6 py-5 flex flex-col gap-3"
                style={{ borderTop: "1px solid rgba(109,174,219,0.15)" }}
              >
                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-center gap-2 rounded-full font-semibold py-3.5 text-sm cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    backgroundColor: "#25D366",
                    color: "#fff",
                    fontFamily: "var(--font-momo), 'Momo Trust Display', sans-serif",
                    boxShadow: "0 4px 24px rgba(37,211,102,0.35)",
                  }}
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Enviar pedido por WhatsApp
                </button>
                <button
                  onClick={handleInstagram}
                  className="w-full flex items-center justify-center gap-2 rounded-full font-semibold py-3.5 text-sm cursor-pointer transition-all duration-200 hover:opacity-80 active:scale-[0.98]"
                  style={{
                    border: "2px solid rgba(250,240,202,0.25)",
                    color: "#FAF0CA",
                    fontFamily: "var(--font-momo), 'Momo Trust Display', sans-serif",
                  }}
                >
                  <InstagramIcon className="w-5 h-5" />
                  Enviar por Instagram
                </button>
                <p
                  className="text-center text-xs mt-0.5"
                  style={{ color: "#FAF0CA", opacity: 0.3 }}
                >
                  Mínimo 72 hrs de anticipación · 50% anticipo al confirmar
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-28 inset-x-0 z-[400] flex justify-center px-4"
          style={{ pointerEvents: "none" }}
        >
          <div
            className="rounded-2xl px-5 py-3 text-sm font-medium shadow-xl"
            style={{
              backgroundColor: "#011638",
              color: "#FAF0CA",
              border: "1px solid rgba(109,174,219,0.35)",
            }}
          >
            {toast}
          </div>
        </div>
      )}
    </>
  );
}
