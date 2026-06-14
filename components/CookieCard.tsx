"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { Cookie, COOKIE_VISUALS } from "@/lib/menu";

interface CookieCardProps {
  cookie: Cookie;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export default function CookieCard({ cookie, isSelected, onSelect }: CookieCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [imgError, setImgError] = useState(false);
  const visual = COOKIE_VISUALS[cookie.id] ?? { emoji: "🍪", bg: "linear-gradient(135deg,#494331,#2A2319)" };

  // Pulse animation on selection
  useEffect(() => {
    if (isSelected && cardRef.current) {
      animate(cardRef.current, {
        scale: [1, 0.96, 1.02, 1],
        duration: 500,
        ease: "outBack(1.5)",
      });
    }
  }, [isSelected]);

  return (
    <button
      ref={cardRef}
      onClick={() => onSelect(cookie.id)}
      className="cookie-card w-full text-left rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        border: isSelected ? "2px solid #6DAEDB" : "2px solid transparent",
        backgroundColor: "#fff",
        boxShadow: isSelected
          ? "0 0 0 4px rgba(109,174,219,0.2), 0 8px 32px rgba(0,48,73,0.15)"
          : "0 2px 16px rgba(73,67,49,0.09)",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
      }}
      aria-pressed={isSelected}
      aria-label={`Ver detalles de ${cookie.name}`}
    >
      {/* Image area */}
      <div className="relative overflow-hidden" style={{ height: "200px" }}>
        {!imgError && cookie.imageUrl ? (
          <Image
            src={cookie.imageUrl}
            alt={cookie.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center text-7xl"
            style={{ background: visual.bg }}
          >
            {visual.emoji}
          </div>
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,48,73,0.5)" }}
        >
          <span
            className="text-sm font-semibold px-5 py-2 rounded-full"
            style={{ backgroundColor: "#6DAEDB", color: "#011638" }}
          >
            Ver más
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3
          className="text-xl font-bold mb-1"
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            color: "#003049",
          }}
        >
          {cookie.name}
        </h3>

        <p className="text-sm mb-3" style={{ color: "#494331", opacity: 0.75 }}>
          {cookie.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {cookie.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: "#6DAEDB", color: "#011638" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
