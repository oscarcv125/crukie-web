"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import {
  IconMessageCircle,
  IconClipboardList,
  IconCreditCard,
  IconConfetti,
  IconCookie,
} from "@tabler/icons-react";
import { InstagramIcon, WhatsAppIcon } from "./Icons";
import { INSTAGRAM_URL, WHATSAPP_ORDER_URL } from "@/lib/contact";

type StepIcon = React.ComponentType<{ size?: number; stroke?: number; style?: React.CSSProperties }>;

interface Step {
  num: string;
  icon: StepIcon;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    icon: IconCookie,
    title: "Elige tu galleta",
    body: "Explora nuestro menú de 6 sabores artesanales. ¿No puedes decidir? Pide más de uno.",
  },
  {
    num: "02",
    icon: IconMessageCircle,
    title: "Escríbenos",
    body: "Contáctanos por Instagram o WhatsApp. Respondemos rápido y con gusto te asesoramos.",
  },
  {
    num: "03",
    icon: IconClipboardList,
    title: "Cuéntanos todo",
    body: "Nombre, sabor, cantidad, fecha de entrega y si tienes alergias. Mientras más detalle, mejor.",
  },
  {
    num: "04",
    icon: IconCreditCard,
    title: "Confirma con anticipo",
    body: "50% al confirmar el pedido. El resto lo pagas al recibir tu orden. Transferencia o efectivo.",
  },
  {
    num: "05",
    icon: IconConfetti,
    title: "¡A disfrutar!",
    body: "Recoge en domicilio o recibe envío a tu zona. Pedidos grandes (12+ galletas) requieren 72 hrs de anticipación.",
  },
];

export default function HowToOrder() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const heading = headingRef.current;
    const steps = stepsRef.current;
    if (!heading || !steps) return;

    heading.style.opacity = "0";
    heading.style.transform = "translateY(28px)";
    const cards = steps.querySelectorAll<HTMLElement>(".step-card");
    cards.forEach((c) => {
      c.style.opacity = "0";
      c.style.transform = "translateY(40px)";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate(heading, { opacity: [0, 1], translateY: [28, 0], duration: 600, ease: "outExpo" });
          animate(Array.from(cards), {
            opacity: [0, 1],
            translateY: [40, 0],
            delay: stagger(100, { start: 200 }),
            duration: 650,
            ease: "outQuart",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="como-pedir"
      className="py-24 px-6"
      style={{ backgroundColor: "#003049" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              color: "#FAF0CA",
              fontSize: "clamp(2rem, 6vw, 3rem)",
            }}
          >
            ¿Cómo pedir?
          </h2>
          <p className="text-base max-w-sm mx-auto leading-relaxed" style={{ color: "#FAF0CA", opacity: 0.6 }}>
            En 5 pasos sencillos, tu Crukies llega a tus manos.
          </p>
          <div
            className="mx-auto mt-5 rounded-full"
            style={{ width: "48px", height: "3px", backgroundColor: "#6DAEDB" }}
          />
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="step-card rounded-2xl p-6 flex flex-col gap-3"
              style={{ backgroundColor: "rgba(250,240,202,0.06)", border: "1px solid rgba(109,174,219,0.18)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: "#FAF0CA", color: "#011638" }}
                >
                  <step.icon size={28} stroke={1.5} />
                </div>
                <span
                  className="text-xs font-bold tracking-widest"
                  style={{ color: "#6DAEDB" }}
                >
                  {step.num}
                </span>
              </div>
              <h3
                className="text-base font-bold"
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  color: "#FAF0CA",
                }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#FAF0CA", opacity: 0.65 }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={WHATSAPP_ORDER_URL()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full font-semibold px-7 py-3.5 transition-all duration-200 hover:scale-105 text-sm"
            style={{
              backgroundColor: "#25D366",
              color: "#fff",
              fontFamily: "var(--font-momo), 'Momo Trust Display', sans-serif",
              boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
            }}
          >
            <WhatsAppIcon className="w-5 h-5" />
            Hacer mi pedido por WhatsApp
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full font-semibold px-7 py-3.5 transition-all duration-200 hover:opacity-80 text-sm"
            style={{
              border: "2px solid rgba(250,240,202,0.3)",
              color: "#FAF0CA",
              fontFamily: "var(--font-momo), 'Momo Trust Display', sans-serif",
            }}
          >
            <InstagramIcon className="w-5 h-5" />
            Escríbenos por Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
