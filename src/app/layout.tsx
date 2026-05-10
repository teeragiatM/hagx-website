import type { Metadata } from "next";
import { Anuphan } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

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
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <html
      lang="th"
      className={`${anuphan.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <SmoothScroll>{children}</SmoothScroll>
        {modal}
      </body>
    </html>
  );
}
