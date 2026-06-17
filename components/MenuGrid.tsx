"use client";

import { useState, useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { cookies } from "@/lib/menu";
import CookieCard from "./CookieCard";
import CookieDetail from "./CookieDetail";

export default function MenuGrid() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Animate heading on scroll
  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;
    heading.style.opacity = "0";
    heading.style.transform = "translateY(30px)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(heading, { opacity: [0, 1], translateY: [30, 0], duration: 650, ease: "outExpo" });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(heading);
    return () => observer.disconnect();
  }, []);

  // Stagger cards on scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const allCards = section.querySelectorAll<HTMLElement>(".cookie-card");
    allCards.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(50px) scale(0.93)";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate(Array.from(allCards), {
            opacity: [0, 1],
            translateY: ["50px", "0px"],
            scale: [0.93, 1],
            delay: stagger(110, { start: 200 }),
            duration: 720,
            ease: "outQuart",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const selectedCookie = cookies.find((c) => c.id === selectedId) ?? null;

  return (
    <>
      <section
        ref={sectionRef}
        id="menu"
        className="py-20 px-6"
        style={{ backgroundColor: "#FAF0CA" }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div ref={headingRef} className="text-center mb-16">
            <h2
              className="font-bold mb-4"
              style={{
                fontFamily: "Garet, sans-serif", fontWeight: 850, letterSpacing: "-0.048em",
                color: "#494331",
                fontSize: "clamp(2rem, 6vw, 3.2rem)",
              }}
            >
              Nuestro Menú
            </h2>
            <p
              className="text-base max-w-sm mx-auto leading-relaxed"
              style={{ color: "#494331", opacity: 0.65 }}
            >
              6 sabores únicos. Haz click en cualquier galleta para conocerla.
            </p>
            <div
              className="mx-auto mt-5 rounded-full"
              style={{ width: "48px", height: "3px", backgroundColor: "#6DAEDB" }}
            />
          </div>

          {/* Grid — all 6 cards flat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cookies.map((cookie) => (
              <CookieCard
                key={cookie.id}
                cookie={cookie}
                isSelected={selectedId === cookie.id}
                onSelect={(id) => setSelectedId(id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Full-screen detail overlay — rendered outside the section so fixed works cleanly */}
      {selectedCookie && (
        <CookieDetail
          key={selectedCookie.id}
          cookie={selectedCookie}
          onClose={() => setSelectedId(null)}
        />
      )}
    </>
  );
}
