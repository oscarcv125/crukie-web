import Hero from "@/components/Hero";
import MenuGrid from "@/components/MenuGrid";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <main>
      <Hero />
      <MenuGrid />

      <footer
        className="py-12 px-6 text-center"
        style={{ backgroundColor: "#003049" }}
      >
        <div className="max-w-4xl mx-auto">
          <p
            className="text-2xl font-bold mb-2"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              color: "#FAF0CA",
            }}
          >
            Crukie
          </p>
          <p className="text-sm mb-6" style={{ color: "#6DAEDB" }}>
            Galletas Chunky New York · Monterrey, México
          </p>

          <div className="flex justify-center gap-8 mb-8">
            <a
              href="https://instagram.com/crukie.mty"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-opacity hover:opacity-80"
              style={{ color: "#FAF0CA" }}
            >
              Instagram
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-opacity hover:opacity-80"
              style={{ color: "#FAF0CA" }}
            >
              WhatsApp
            </a>
          </div>

          <p className="text-xs" style={{ color: "#FAF0CA", opacity: 0.4 }}>
            © {new Date().getFullYear()} Crukie. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      <ChatBot />
    </main>
  );
}
