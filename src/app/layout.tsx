import SmoothScroll from "@/components/effects/SmoothScroll";
import type { Metadata } from "next";
import { Anuphan } from "next/font/google";
import "./globals.css";

const anuphan = Anuphan({
  subsets: ["thai", "latin"],
  variable: "--font-anuphan",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "HAGX | Premium Aluminium & Glass",
    template: "%s | HAGX",
  },
  description:
    "HAGX ผู้เชี่ยวชาญด้านงานอลูมิเนียมและกระจกสถาปัตยกรรม ออกแบบ ผลิต และติดตั้งด้วยความแม่นยำระดับอุตสาหกรรม",
  authors: [{ name: "HAGX" }],
  creator: "HAGX",
  metadataBase: new URL("https://hagx.co"),
  robots: { index: true, follow: true },
  keywords: [
    "อลูมิเนียม",
    "กระจก",
    "สถาปัตยกรรม",
    "aluminium",
    "glass",
    "architecture",
    "HAGX",
  ],
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://hagx.co",
    siteName: "HAGX",
    title: "HAGX | Premium Aluminium & Glass",
    description:
      "HAGX ผู้เชี่ยวชาญด้านงานอลูมิเนียมและกระจกสถาปัตยกรรม ออกแบบ ผลิต และติดตั้งด้วยความแม่นยำระดับอุตสาหกรรม",
    images: [
      { url: "/images/hagx-logo.svg", width: 1200, height: 630, alt: "HAGX" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HAGX | Premium Aluminium & Glass",
    description:
      "HAGX ผู้เชี่ยวชาญด้านงานอลูมิเนียมและกระจกสถาปัตยกรรม ออกแบบ ผลิต และติดตั้งด้วยความแม่นยำระดับอุตสาหกรรม",
    images: ["/images/hagx-logo.svg"],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${anuphan.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="HAGX" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-screen antialiased">
        <SmoothScroll>{children}</SmoothScroll>
        {modal}
      </body>
    </html>
  );
}
