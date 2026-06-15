"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { createTimeline } from "animejs";
import WaveCanvas from "./WaveCanvas";

export default function Hero() {
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    const title = titleRef.current;
    const tagline = taglineRef.current;
    const body = bodyRef.current;
    const cta = ctaRef.current;
    if (!logo || !title || !tagline || !body || !cta) return;

    [logo, title, tagline, body, cta].forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(32px)";
    });

    const tl = createTimeline({ defaults: { ease: "outExpo", duration: 700 } });
    tl.add(logo, { opacity: [0, 1], scale: [0.75, 1], translateY: [0, 0], duration: 800 })
      .add(title, { opacity: [0, 1], translateY: [32, 0] }, "-=500")
      .add(tagline, { opacity: [0, 1], translateY: [24, 0], duration: 600 }, "-=400")
      .add(body, { opacity: [0, 1], translateY: [20, 0], duration: 600 }, "-=350")
      .add(cta, { opacity: [0, 1], translateY: [20, 0], scale: [0.93, 1], duration: 600 }, "-=300");

    return () => { tl.revert(); };
  }, []);

  return (
    <section
      className="relative flex flex-col items-center justify-center px-6"
      style={{
        backgroundColor: "#003049",
        minHeight: "88vh",
        paddingBottom: "150px",
      }}
    >
      <div
        className="relative flex flex-col items-center text-center max-w-3xl mx-auto pt-20"
        style={{ zIndex: 10 }}
      >
        <div ref={logoRef} className="mb-6">
          <Image
            src="/logo-beige.svg"
            alt="Crukies Logo"
            width={200}
            height={200}
            className="mx-auto drop-shadow-xl"
            priority
          />
        </div>

        <h1
          ref={titleRef}
          className="font-bold tracking-tight mb-3"
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            color: "#FAF0CA",
            fontSize: "clamp(3.5rem, 10vw, 6rem)",
            lineHeight: 1.05,
          }}
        >
          Crukies
        </h1>

        <p
          ref={taglineRef}
          className="text-base sm:text-lg font-light uppercase tracking-[0.22em] mb-5"
          style={{ color: "#6DAEDB" }}
        >
          Galletas Artesanales
        </p>

        <p
          ref={bodyRef}
          className="text-base sm:text-lg max-w-xl leading-relaxed mb-10"
          style={{ color: "#FAF0CA", opacity: 0.82 }}
        >
          Artesanales, irresistibles. Hechas con ingredientes premium y un
          toque casero que se nota en cada mordida.
        </p>

        <a
          ref={ctaRef}
          href="#menu"
          className="inline-block rounded-full font-semibold transition-transform duration-200 hover:scale-105"
          style={{
            backgroundColor: "#6DAEDB",
            color: "#011638",
            padding: "14px 40px",
            fontSize: "1rem",
            fontFamily: "Garet, sans-serif",
            boxShadow: "0 4px 24px rgba(109,174,219,0.35)",
          }}
        >
          Ver el Menú
        </a>
      </div>

      <WaveCanvas />
    </section>
  );
}
