"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { animate, createTimeline } from "animejs";
import { Cookie, COOKIE_VISUALS } from "@/lib/menu";
import { useOrder } from "@/lib/order-context";
import { InstagramIcon } from "./Icons";
import { IconX, IconCheck, IconArrowRight, IconCookie } from "@tabler/icons-react";

interface CookieDetailProps {
  cookie: Cookie;
  onClose: () => void;
}

export default function CookieDetail({ cookie, onClose }: CookieDetailProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const [localQty, setLocalQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem, items } = useOrder();
  const visual = COOKIE_VISUALS[cookie.id] ?? { bg: "linear-gradient(135deg,#494331,#2A2319)" };
  const inOrder = items.find((i) => i.cookieId === cookie.id)?.quantity ?? 0;

  const doClose = useCallback(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) { onClose(); return; }

    animate(panel, { opacity: [1, 0], scale: [1, 0.94], translateY: [0, 30], duration: 280, ease: "inQuart" });
    animate(overlay, {
      opacity: [1, 0],
      duration: 340,
      ease: "inQuart",
      onComplete: onClose,
    });
  }, [onClose]);

  // Animate in + scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const imgWrap = imgWrapRef.current;

    if (overlay) animate(overlay, { opacity: [0, 1], duration: 320, ease: "outQuart" });
    if (panel)
      animate(panel, {
        opacity: [0, 1],
        translateY: [50, 0],
        scale: [0.94, 1],
        duration: 520,
        ease: "outBack(1.1)",
      });

    // Morph cookie from flat top-down → angled perspective
    if (imgWrap) {
      animate(imgWrap, {
        rotateX: [0, -22],
        rotateY: [0, 7],
        translateY: [0, -16],
        duration: 950,
        delay: 400,
        ease: "outExpo",
      });
    }

    return () => { document.body.style.overflow = ""; };
  }, []);

  // Re-morph when switching cookies without closing
  useEffect(() => {
    const imgWrap = imgWrapRef.current;
    if (!imgWrap) return;
    // Reset to flat then re-angle
    animate(imgWrap, { rotateX: 0, rotateY: 0, translateY: 0, duration: 180, ease: "outQuart" });
    setTimeout(() => {
      if (!imgWrap) return;
      animate(imgWrap, {
        rotateX: [0, -22],
        rotateY: [0, 7],
        translateY: [0, -16],
        duration: 800,
        ease: "outExpo",
      });
    }, 200);
  }, [cookie.id]);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") doClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [doClose]);

  const handleAdd = () => {
    addItem(cookie.id, cookie.name, localQty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ backgroundColor: "rgba(1,22,56,0.88)", backdropFilter: "blur(14px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) doClose(); }}
    >
      <div
        ref={panelRef}
        className="relative w-full sm:max-w-5xl sm:rounded-3xl overflow-hidden"
        style={{ backgroundColor: "#003049", maxHeight: "92vh", overflowY: "auto" }}
      >
        {/* Close */}
        <button
          onClick={doClose}
          aria-label="Cerrar detalle"
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
          style={{ backgroundColor: "rgba(250,240,202,0.15)", color: "#FAF0CA" }}
        >
          <IconX size={18} />
        </button>

        <div className="flex flex-col md:flex-row min-h-[70vh] md:min-h-[65vh]">
          {/* ── Left: image with 3D tilt ── */}
          <div
            className="relative w-full md:w-1/2 flex items-center justify-center overflow-hidden"
            style={{ minHeight: "320px", perspective: "900px" }}
          >
            {/* gradient backdrop always visible */}
            <div className="absolute inset-0" style={{ background: visual.bg, opacity: 0.7 }} />

            <div
              ref={imgWrapRef}
              className="relative z-10"
              style={{
                width: "72%",
                maxWidth: "320px",
                transformOrigin: "center bottom",
                willChange: "transform",
              }}
            >
              {!imgError && cookie.imageUrl ? (
                <Image
                  src={cookie.imageUrl}
                  alt={cookie.name}
                  width={500}
                  height={500}
                  className="w-full h-auto"
                  style={{
                    borderRadius: "20px",
                    filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.55))",
                  }}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div
                  className="w-full aspect-square rounded-3xl flex items-center justify-center"
                  style={{ fontSize: "6rem", background: visual.bg }}
                >
                  <IconCookie size={80} stroke={1.5} style={{ color: "#FAF0CA" }} />
                </div>
              )}
            </div>
          </div>

          {/* ── Right: info ── */}
          <div
            className="w-full md:w-1/2 flex flex-col justify-center"
            style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {cookie.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-widest"
                  style={{ backgroundColor: "#6DAEDB", color: "#011638" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2
              className="font-bold mb-4"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                color: "#FAF0CA",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                lineHeight: 1.1,
              }}
            >
              {cookie.name}
            </h2>

            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "#FAF0CA", opacity: 0.82, maxWidth: "44ch" }}
            >
              {cookie.longDescription}
            </p>

            {/* Ingredients */}
            <div className="mb-8">
              <p
                className="text-xs uppercase tracking-[0.18em] mb-3"
                style={{ color: "#6DAEDB" }}
              >
                Ingredientes
              </p>
              <ul className="space-y-2">
                {cookie.ingredients.map((ing) => (
                  <li
                    key={ing}
                    className="flex items-center gap-2.5 text-sm"
                    style={{ color: "#FAF0CA", opacity: 0.8 }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: "#6DAEDB" }}
                    />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Add to order */}
            <div className="flex flex-col gap-3">
              {/* Qty stepper */}
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center gap-2 rounded-full px-1 py-1"
                  style={{ backgroundColor: "rgba(250,240,202,0.08)", border: "1px solid rgba(109,174,219,0.25)" }}
                >
                  <button
                    onClick={() => setLocalQty((q) => Math.max(1, q - 1))}
                    aria-label="Restar galleta"
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-base cursor-pointer transition-all duration-150 hover:scale-110"
                    style={{ backgroundColor: "rgba(250,240,202,0.1)", color: "#FAF0CA" }}
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-bold text-base" style={{ color: "#FAF0CA" }}>
                    {localQty}
                  </span>
                  <button
                    onClick={() => setLocalQty((q) => q + 1)}
                    aria-label="Sumar galleta"
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-base cursor-pointer transition-all duration-150 hover:scale-110"
                    style={{ backgroundColor: "#6DAEDB", color: "#011638" }}
                  >
                    +
                  </button>
                </div>
                {inOrder > 0 && (
                  <span className="text-xs" style={{ color: "#6DAEDB" }}>
                    Ya tienes {inOrder} en tu pedido
                  </span>
                )}
              </div>

              {/* Add button */}
              <button
                onClick={handleAdd}
                className="inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 hover:scale-105 active:scale-[0.97] cursor-pointer"
                style={{
                  backgroundColor: justAdded ? "#25D366" : "#6DAEDB",
                  color: "#011638",
                  padding: "14px 32px",
                  fontFamily: "var(--font-momo), 'Momo Trust Display', sans-serif",
                  boxShadow: justAdded
                    ? "0 4px 20px rgba(37,211,102,0.35)"
                    : "0 4px 20px rgba(109,174,219,0.3)",
                  transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                {justAdded ? (
                  <><IconCheck size={16} strokeWidth={2.5} />&nbsp;¡Agregado al pedido!</>
                ) : (
                  <>{`Agregar ${localQty > 1 ? `${localQty}x ` : ""}al pedido`}&nbsp;<IconArrowRight size={16} /></>
                )}
              </button>

              {/* Instagram link */}
              <a
                href="https://instagram.com/crukie.mty"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 hover:opacity-80"
                style={{
                  border: "2px solid rgba(250,240,202,0.25)",
                  color: "#FAF0CA",
                  padding: "12px 28px",
                  fontFamily: "var(--font-momo), 'Momo Trust Display', sans-serif",
                }}
              >
                <InstagramIcon className="w-4 h-4" />
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
