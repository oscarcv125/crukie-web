"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { Cookie, COOKIE_VISUALS } from "@/lib/menu";
import { useOrder } from "@/lib/order-context";
import { IconCookie } from "@tabler/icons-react";

interface CookieCardProps {
  cookie: Cookie;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export default function CookieCard({ cookie, isSelected, onSelect }: CookieCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const { items, addItem, setQuantity } = useOrder();
  const visual = COOKIE_VISUALS[cookie.id] ?? { bg: "linear-gradient(135deg,#494331,#2A2319)" };
  const ordered = items.find((i) => i.cookieId === cookie.id);
  const qty = ordered?.quantity ?? 0;

  // Pulse on select
  useEffect(() => {
    const card = cardRef.current;
    if (isSelected && card) {
      animate(card, { scale: [1, 0.95, 1.03, 1], duration: 480, ease: "outBack(1.5)" });
    }
  }, [isSelected]);

  // 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 12}deg) rotateX(${-y * 9}deg) translateZ(8px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    animate(card, { rotateX: 0, rotateY: 0, translateZ: 0, duration: 450, ease: "outQuart" });
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(cookie.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(cookie.id); }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cookie-card relative w-full rounded-3xl overflow-hidden cursor-pointer group flex flex-col h-[400px]"
      style={{
        background: visual.bg,
        border: isSelected ? "2px solid #FAF0CA" : "2px solid transparent",
        boxShadow: isSelected
          ? "0 0 0 4px rgba(250,240,202,0.3), 0 16px 32px rgba(0,0,0,0.3)"
          : "0 8px 24px rgba(0,0,0,0.15)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      aria-pressed={isSelected}
      aria-label={`Ver detalles de ${cookie.name}`}
    >
      {/* Top text content */}
      <div className="p-6 relative z-10 pointer-events-none">
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3
            className="text-2xl font-bold leading-tight"
            style={{ fontFamily: "Garet, sans-serif", fontWeight: 850, letterSpacing: "-0.048em", color: "#FAF0CA" }}
          >
            {cookie.name}
          </h3>
          <span
            className="text-base font-bold shrink-0 bg-black/20 px-3 py-1 rounded-full"
            style={{ color: "#FAF0CA", fontFamily: "var(--font-momo), 'Momo Trust Display', sans-serif" }}
          >
            ${cookie.price}
          </span>
        </div>
        <p className="text-sm leading-snug line-clamp-3" style={{ color: "#FAF0CA", opacity: 0.85 }}>
          {cookie.description}
        </p>
      </div>

      {/* Full cookie at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[65%] pointer-events-none flex items-end justify-center">
        {!imgError && cookie.imageUrl ? (
          <div className="relative w-[90%] aspect-square transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] translate-y-[15%] group-hover:scale-[1.8] group-hover:translate-y-[45%]">
            <Image
              src={cookie.imageUrl}
              alt={cookie.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain drop-shadow-2xl"
              onError={() => setImgError(true)}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full pb-10">
            <IconCookie size={80} stroke={1.5} style={{ color: "#FAF0CA", opacity: 0.5 }} />
          </div>
        )}
      </div>

      {/* Center overlay "Ver detalles" */}
      <div className="absolute top-[40%] -translate-y-1/2 left-0 right-0 px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex justify-center">
         <span
            className="text-sm font-semibold px-5 py-2 rounded-full shadow-lg"
            style={{ backgroundColor: "#FAF0CA", color: "#011638" }}
          >
            Ver detalles
          </span>
      </div>

      {/* Order stepper overlay */}
      <div className="absolute bottom-5 left-6 right-6 z-20" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
        {qty === 0 ? (
          <button
            onClick={() => addItem(cookie.id, cookie.name, cookie.price)}
            className="w-full flex items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-bold cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] shadow-xl backdrop-blur-md"
            style={{
              backgroundColor: "rgba(250,240,202,0.95)",
              color: "#011638",
              fontFamily: "var(--font-momo), 'Momo Trust Display', sans-serif",
            }}
          >
            <span className="text-base leading-none">+</span>
            Agregar
          </button>
        ) : (
          <div className="flex items-center justify-between rounded-full px-2 py-1.5 shadow-xl backdrop-blur-md"
            style={{ backgroundColor: "rgba(250,240,202,0.95)" }}
          >
            <button
              onClick={() => setQuantity(cookie.id, qty - 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-base cursor-pointer transition-all duration-150 hover:bg-black/10"
              style={{ color: "#011638" }}
            >
              −
            </button>
            <span className="text-sm font-bold" style={{ color: "#011638" }}>
              {qty}
            </span>
            <button
              onClick={() => setQuantity(cookie.id, qty + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-base cursor-pointer transition-all duration-150 hover:bg-black/10"
              style={{ color: "#011638" }}
            >
              +
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
