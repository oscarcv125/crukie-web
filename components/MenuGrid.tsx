"use client";

import { useState, useEffect, useRef } from "react";
import { animate, stagger, createTimeline } from "animejs";
import { cookies } from "@/lib/menu";
import CookieCard from "./CookieCard";
import CookieDetail from "./CookieDetail";

// Two hardcoded rows for 3-column grid (spec: exactly 6 cookies)
const ROW_A = cookies.slice(0, 3);
const ROW_B = cookies.slice(3, 6);

export default function MenuGrid() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Animate heading in on scroll
  useEffect(() => {
    const heading = headingRef.current;
    const section = sectionRef.current;
    if (!heading || !section) return;

    heading.style.opacity = "0";
    heading.style.transform = "translateY(30px)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(heading, {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 650,
            ease: "outExpo",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(heading);
    return () => observer.disconnect();
  }, []);

  // Stagger cookie cards in on scroll
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

  const handleSelect = (id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const rowASelected = ROW_A.find((c) => c.id === selectedId) ?? null;
  const rowBSelected = ROW_B.find((c) => c.id === selectedId) ?? null;

  return (
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
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
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
            6 sabores, todos estilo Chunky New York. Haz click para ver más.
          </p>
          <div
            className="mx-auto mt-5 rounded-full"
            style={{ width: "48px", height: "3px", backgroundColor: "#6DAEDB" }}
          />
        </div>

        {/* Row A (cards 1–3) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
          {ROW_A.map((cookie) => (
            <CookieCard
              key={cookie.id}
              cookie={cookie}
              isSelected={selectedId === cookie.id}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Detail for Row A — appears inline below row, above Row B */}
        {rowASelected && (
          <CookieDetail
            key={`detail-${rowASelected.id}`}
            cookie={rowASelected}
            onClose={() => setSelectedId(null)}
          />
        )}

        {/* Spacer between rows */}
        <div className="mt-6" />

        {/* Row B (cards 4–6) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
          {ROW_B.map((cookie) => (
            <CookieCard
              key={cookie.id}
              cookie={cookie}
              isSelected={selectedId === cookie.id}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Detail for Row B */}
        {rowBSelected && (
          <CookieDetail
            key={`detail-${rowBSelected.id}`}
            cookie={rowBSelected}
            onClose={() => setSelectedId(null)}
          />
        )}
      </div>
    </section>
  );
}
