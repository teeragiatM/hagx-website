import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "HAGX | Premium Aluminium & Glass Solutions",
    template: "%s | HAGX",
  },
  description:
    "HAGX delivers bespoke aluminium and glass architectural solutions — facades, curtain walls, skylights, and interior glazing — engineered for lasting luxury and precision.",
  keywords: [
    "aluminium glass solutions",
    "architectural glazing",
    "curtain wall systems",
    "premium facades",
    "HAGX",
    "glass partitions",
    "structural glazing",
  ],
  authors: [{ name: "HAGX" }],
  creator: "HAGX",
  metadataBase: new URL("https://hagx.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hagx.com",
    siteName: "HAGX",
    title: "HAGX | Premium Aluminium & Glass Solutions",
    description:
      "Bespoke aluminium and glass architectural solutions engineered for lasting luxury and precision.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HAGX Premium Aluminium & Glass",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HAGX | Premium Aluminium & Glass Solutions",
    description:
      "Bespoke aluminium and glass architectural solutions engineered for lasting luxury and precision.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}
