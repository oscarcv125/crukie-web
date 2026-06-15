import Image from "next/image";
import { IconClock } from "@tabler/icons-react";
import { InstagramIcon, WhatsAppIcon } from "./Icons";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, WHATSAPP_ORDER_URL } from "@/lib/contact";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#011638" }}>
      {/* Main footer body */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <div className="flex items-center gap-3">
              <Image src="/LOGO.png" alt="Crukies" width={44} height={44} />
              <span
                className="text-2xl font-bold"
                style={{
                  fontFamily: "Garet, sans-serif", fontWeight: 850, letterSpacing: "-0.048em",
                  color: "#FAF0CA",
                }}
              >
                Crukies
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#FAF0CA", opacity: 0.55 }}>
              Galletas artesanales hechas con amor en Monterrey, México.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: "rgba(250,240,202,0.08)", color: "#FAF0CA" }}
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href={WHATSAPP_ORDER_URL()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: "rgba(37,211,102,0.15)", color: "#25D366" }}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-4 text-sm">
            <div>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#6DAEDB" }}>
                Navegar
              </p>
              <ul className="space-y-2.5">
                {[
                  { label: "Menú", href: "#menu" },
                  { label: "Cómo pedir", href: "#como-pedir" },
                ].map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="transition-opacity hover:opacity-70"
                      style={{ color: "#FAF0CA", opacity: 0.75 }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#6DAEDB" }}>
                Contacto
              </p>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
                    style={{ color: "#FAF0CA", opacity: 0.75 }}
                  >
                    <InstagramIcon className="w-3.5 h-3.5 shrink-0" />
                    {INSTAGRAM_HANDLE}
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP_ORDER_URL()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
                    style={{ color: "#FAF0CA", opacity: 0.75 }}
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Info callout */}
          <div
            className="rounded-2xl p-5 text-sm max-w-[220px]"
            style={{ backgroundColor: "rgba(109,174,219,0.08)", border: "1px solid rgba(109,174,219,0.2)" }}
          >
            <p className="font-semibold mb-2 flex items-center gap-2" style={{ color: "#6DAEDB" }}>
              <IconClock size={16} stroke={2} />
              Pedidos grandes (12+): 72 hrs de anticipo
            </p>
            <p style={{ color: "#FAF0CA", opacity: 0.6 }}>
              Pedidos urgentes (24–48 hrs) tienen un cargo adicional del 30%.
            </p>
          </div>
        </div>

        {/* Divider + copyright */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: "1px solid rgba(250,240,202,0.08)", color: "#FAF0CA", opacity: 0.35 }}
        >
          <p>© {new Date().getFullYear()} Crukies. Todos los derechos reservados.</p>
          <p>Hecho con 🍪 en Monterrey, México</p>
        </div>
      </div>
    </footer>
  );
}
