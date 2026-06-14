import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crukie — Galletas Chunky New York en Monterrey",
  description:
    "Galletas artesanales estilo Chunky New York. Grandes, suaves por dentro y crujientes por fuera. Chispas de chocolate, Nutella, Oreo, Biscoff, Peanut Butter y Kinder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable}`}>
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
