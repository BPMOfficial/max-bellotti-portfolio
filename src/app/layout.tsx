import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const jbmono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  display: "swap",
});

const SITE = "https://max-bellotti-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Max Bellotti — Mechanical Engineering Portfolio",
  description:
    "Mechanical engineering, aerospace focus. Suspension hardware for a Formula SAE Michigan winning car, plasma chamber geometry for COMSOL at the Wirz Aerospace Lab, and parts cut by hand on a manual lathe and mill.",
  keywords: [
    "mechanical engineering",
    "aerospace",
    "Formula SAE",
    "Siemens NX",
    "COMSOL",
    "GD&T",
    "machining",
    "Oregon State University",
    "Max Bellotti",
  ],
  authors: [{ name: "Max Bellotti" }],
  openGraph: {
    title: "Max Bellotti — Mechanical Engineering Portfolio",
    description:
      "Design that reaches the shop floor: FSAE suspension hardware, plasma chamber CAD for COMSOL, and parts cut on manual machines.",
    url: SITE,
    siteName: "Max Bellotti",
    type: "website",
    images: [{ url: "/img/hero/autocross-pan.jpg", width: 2560, height: 1440 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Max Bellotti — Mechanical Engineering Portfolio",
    description:
      "Design that reaches the shop floor: FSAE suspension hardware, plasma chamber CAD for COMSOL, and parts cut on manual machines.",
    images: ["/img/hero/autocross-pan.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jbmono.variable} h-full antialiased`}
    >
      <head>
        {/* without JS the IntersectionObserver reveals never fire, so pin
            everything visible rather than serving a blank page */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full bg-ground text-chalk">{children}</body>
    </html>
  );
}
