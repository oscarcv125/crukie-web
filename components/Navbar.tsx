"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { InstagramIcon, WhatsAppIcon } from "./Icons";
import { INSTAGRAM_URL, WHATSAPP_ORDER_URL } from "@/lib/contact";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(0,48,73,0.96)" : "rgba(0,48,73,0)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.22)" : "none",
      }}
    >
      <nav className="relative max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo / wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 shrink-0"
          aria-label="Crukies — inicio"
        >
          <Image
            src="/logo-beige.svg"
            alt="Crukies"
            width={34}
            height={34}
            className="drop-shadow-sm"
            priority
          />
          <span
            className="text-xl font-bold hidden sm:block"
            style={{
              fontFamily: "Garet, sans-serif", fontWeight: 850, letterSpacing: "-0.048em",
              color: "#FAF0CA",
            }}
          >
            Crukies
          </span>
        </a>

        {/* Center links — absolutely centered regardless of logo/CTA widths */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8 text-sm font-medium">
          <a
            href="#menu"
            className="transition-opacity hover:opacity-70"
            style={{ color: "#FAF0CA" }}
          >
            Menú
          </a>
          <a
            href="#como-pedir"
            className="transition-opacity hover:opacity-70"
            style={{ color: "#FAF0CA" }}
          >
            Cómo pedir
          </a>
        </div>

        {/* Right: social icons + CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ color: "#FAF0CA", opacity: 0.85 }}
            aria-label="Instagram de Crukies"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>

          <a
            href={WHATSAPP_ORDER_URL()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: "#25D366",
              color: "#fff",
              fontFamily: "var(--font-momo), 'Momo Trust Display', sans-serif",
            }}
            aria-label="WhatsApp de Crukies"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Ordenar
          </a>
        </div>
      </nav>
    </header>
  );
}
