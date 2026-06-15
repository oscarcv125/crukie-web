import type { Metadata } from "next";
import { Playfair_Display, Momo_Trust_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const momoTrust = Momo_Trust_Display({
  subsets: ["latin"],
  variable: "--font-momo",
  display: "swap",
  weight: "400",
});



export const metadata: Metadata = {
  title: "Crukies — Galletas Artesanales en Monterrey",
  description:
    "Galletas artesanales hechas con ingredientes premium. Grandes, suaves por dentro y crujientes por fuera. Chispas de chocolate, Nutella, Oreo, Biscoff, Peanut Butter y Kinder.",
  openGraph: {
    title: "Crukies — Galletas Artesanales",
    description: "Galletas estilo New York, horneadas diariamente en Monterrey.",
    url: "https://crukie.mx",
    siteName: "Crukies",
    images: [
      {
        url: "/og-image.png",
        width: 1080,
        height: 1080,
        alt: "Crukies Menu",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crukies — Galletas Artesanales",
    description: "Galletas estilo New York, horneadas diariamente en Monterrey.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${momoTrust.variable}`}>
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
