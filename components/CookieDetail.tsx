"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { Cookie, COOKIE_VISUALS } from "@/lib/menu";

interface CookieDetailProps {
  cookie: Cookie;
  onClose: () => void;
}

export default function CookieDetail({ cookie, onClose }: CookieDetailProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const visual = COOKIE_VISUALS[cookie.id] ?? { emoji: "🍪", bg: "linear-gradient(135deg,#494331,#2A2319)" };

  // Animate in on mount
  useEffect(() => {
    if (!panelRef.current) return;
    animate(panelRef.current, {
      opacity: [0, 1],
      translateY: ["-28px", "0px"],
      scale: [0.96, 1],
      duration: 480,
      ease: "outQuart",
    });
  }, []);

  // Re-animate when cookie changes (user clicks different card)
  useEffect(() => {
    if (!panelRef.current) return;
    animate(panelRef.current, {
      opacity: [0.4, 1],
      translateX: ["-12px", "0px"],
      duration: 350,
      ease: "outQuart",
    });
  }, [cookie.id]);

  const orderMessage = encodeURIComponent(
    `Hola! Me interesa ordenar la galleta ${cookie.name} de Crukie 🍪`
  );

  return (
    <div ref={panelRef} className="mt-6 rounded-2xl overflow-hidden" style={{ backgroundColor: "#003049" }}>
      <div className="flex flex-col md:flex-row">
        {/* Image / visual left panel */}
        <div className="relative w-full md:w-[45%]" style={{ minHeight: "280px" }}>
          {!imgError && cookie.imageUrl ? (
            <Image
              src={cookie.imageUrl}
              alt={cookie.name}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center text-9xl"
              style={{ background: visual.bg }}
            >
              {visual.emoji}
            </div>
          )}
          {/* Gradient overlay on image for readability */}
          {!imgError && cookie.imageUrl && (
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, transparent 60%, rgba(0,48,73,0.5) 100%)",
              }}
            />
          )}
        </div>

        {/* Info right panel */}
        <div className="w-full md:w-[55%] p-8 md:p-10 flex flex-col justify-between">
          <div>
            <button
              onClick={onClose}
              className="mb-5 text-xs uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity cursor-pointer flex items-center gap-1.5"
              style={{ color: "#6DAEDB" }}
            >
              ← Cerrar
            </button>

            <h3
              className="font-bold mb-3"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                color: "#FAF0CA",
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              }}
            >
              {cookie.name}
            </h3>

            <p className="text-base mb-6 leading-relaxed" style={{ color: "#FAF0CA", opacity: 0.78 }}>
              {cookie.description}
            </p>

            <div className="mb-6">
              <p
                className="text-xs uppercase tracking-widest mb-3"
                style={{ color: "#6DAEDB" }}
              >
                Ingredientes
              </p>
              <ul className="space-y-2">
                {cookie.ingredients.map((ing) => (
                  <li
                    key={ing}
                    className="text-sm flex items-center gap-2.5"
                    style={{ color: "#FAF0CA", opacity: 0.85 }}
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

            <div className="flex flex-wrap gap-2 mb-8">
              {cookie.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full font-semibold"
                  style={{ backgroundColor: "#6DAEDB", color: "#011638" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <a
            href={`https://wa.me/?text=${orderMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: "#6DAEDB",
              color: "#011638",
              padding: "14px 32px",
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              boxShadow: "0 4px 20px rgba(109,174,219,0.3)",
            }}
          >
            Ordenar por WhatsApp →
          </a>
        </div>
      </div>
    </div>
  );
}
